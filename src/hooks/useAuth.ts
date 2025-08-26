// src/hooks/useAuth.ts
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

export function useAuth() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => apiFetch<{ authenticated: true }>("/admin/sales"),
    retry: false, // no reintentar si da 401
  });
}
