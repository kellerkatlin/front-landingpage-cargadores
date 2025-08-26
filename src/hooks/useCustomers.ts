import { useQuery } from "@tanstack/react-query";

export type Customer = {
  id: string;
  name: string;
  lasName?: string | null;
  email?: string | null;
  phone?: string | null;
  dni?: string | null;
  direccion?: string | null;
  distrito?: string | null;
  provincia?: string | null;
  departamento?: string | null;
  referencia?: string | null;
  createdAt: string; // ISO
};

const API_URL = import.meta.env.VITE_API_URL || "https://back.pyt-store.com";

/**
 * Trae TODOS los customers del backend (sin paginación).
 * Luego se pagina en el front.
 */
export function useAllCustomers() {
  return useQuery<Customer[]>({
    queryKey: ["customers-all"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/customers`, {});
      if (!res.ok) throw new Error(String(res.status));
      return res.json();
    },
    staleTime: 60_000, // 1 minuto
  });
}
