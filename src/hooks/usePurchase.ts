// src/hooks/usePurchase.ts
import { useMutation } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL || "https://back.pyt-store.com";

async function createCustomer(payload: any) {
  const res = await fetch(`${API_URL}/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("No se pudo crear el cliente");
  return res.json();
}

async function createSale(payload: any) {
  const res = await fetch(`${API_URL}/sales`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("No se pudo crear la venta");
  return res.json();
}

async function createPreference(saleId: string) {
  const res = await fetch(
    `${API_URL}/payments/mercadopago/create-preference/${saleId}`,
    { method: "POST" }
  );
  if (!res.ok) throw new Error("No se pudo iniciar el pago");
  return res.json();
}

export function usePurchase() {
  return useMutation({
    mutationFn: async (data: {
      customer: any;
      sale: any; // allow extra fields like paymentMethod
    }) => {
      // 1) Crear cliente
      const customer = await createCustomer(data.customer);

      // 2) Crear venta
      const salePayload: any = {
        customerId: customer.id,
        quantity: data.sale.quantity,
        unitPrice: data.sale.unitPrice,
        subtotal: data.sale.quantity * data.sale.unitPrice,
        totalAmount: data.sale.totalAmount,
      };
      // forward any extra sale fields (e.g., paymentMethod)
      Object.assign(salePayload, data.sale);

      const sale = await createSale(salePayload);

      // 3) Crear preferencia
      const pref = await createPreference(sale.id);

      return { pref, sale, customer };
    },
  });
}
