// src/components/auth/RequireAuth.tsx
import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import Cookies from "js-cookie";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const location = useLocation();

  // lee cookie
  const token = Cookies.get("admin-token");
  console.log(token);
  // si no existe o no es "ok" → redirige al login
  if (!token) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  // si existe la cookie correcta → deja pasar
  return <>{children}</>;
}
