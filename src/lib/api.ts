// src/lib/api.ts
export const API_URL =
  import.meta.env.VITE_API_URL || "https://back.pyt-store.com";

export async function apiFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });
  if (!res.ok) {
    // Deja que 401/403 caigan como error para redirigir
    throw new Error(String(res.status));
  }
  return res.json();
}
