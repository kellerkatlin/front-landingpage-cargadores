import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export type PaymentStatus =
  | "UNPAID"
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "REFUNDED";

export type FulfillmentStatus =
  | "NOT_PREPARED"
  | "PREPARED"
  | "DISPATCHED"
  | "DELIVERED"
  | "RETURNED";
export type SaleStatus = "CREATED" | "CANCELED" | "COMPLETED";

export type Sale = {
  id: string;
  customerId: string;
  customer?: {
    id: string;
    name: string;
    lasName?: string | null;
    email?: string | null;
    phone?: string | null;
  } | null;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  totalAmount: number;
  saleStatus: SaleStatus;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  notes?: string | null;
  createdAt: string; // ISO
  updatedAt: string; // ISO
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * Trae TODAS las ventas; filtra opcionalmente por estados desde el back
 * (si tu endpoint /admin/sales acepta ?payment=&fulfillment=).
 * Si no quieres filtros en el back, puedes omitir los query params.
 */
export function useSales(filters?: {
  payment?: PaymentStatus;
  fulfillment?: FulfillmentStatus;
}) {
  const qs = new URLSearchParams();
  if (filters?.payment) qs.set("payment", filters.payment);
  if (filters?.fulfillment) qs.set("fulfillment", filters.fulfillment);

  return useQuery<Sale[]>({
    queryKey: ["sales-all", filters ?? {}],
    queryFn: async () => {
      const res = await fetch(
        `${API_URL}/admin/sales${qs.toString() ? `?${qs.toString()}` : ""}`
      );
      if (!res.ok) throw new Error(String(res.status));
      return res.json();
    },
    staleTime: 60_000,
  });
}

/** Mutaciones para cambiar estados */
export function useUpdatePayment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (p: { id: string; status: PaymentStatus }) => {
      const res = await fetch(`${API_URL}/admin/sales/${p.id}/payment`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: p.status }),
      });
      if (!res.ok) throw new Error(String(res.status));
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sales-all"] }),
  });
}

export function useUpdateFulfillment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (p: { id: string; status: FulfillmentStatus }) => {
      const res = await fetch(`${API_URL}/admin/sales/${p.id}/fulfillment`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: p.status }),
      });
      if (!res.ok) throw new Error(String(res.status));
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["sales-all"] }),
  });
}

export function usePublicSale(saleId?: string) {
  return useQuery<Sale>({
    queryKey: ["sale", saleId],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/sales/${saleId}`);
      if (!res.ok) throw new Error("No se pudo cargar la venta");
      return res.json() as Promise<Sale>;
    },
    enabled: !!saleId,
    // v5: el callback recibe el Query; usa query.state.data
    refetchInterval: (query) =>
      query.state.data?.paymentStatus === "PENDING" ? 3000 : false,
  });
}
