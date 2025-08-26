import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`https://back.pyt-store.com/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        throw new Error("Contraseña incorrecta");
      }
      const data = await res.json();

      if (data.ok) {
        // 👉 aquí seteas tu cookie manual
        document.cookie = `admin-token=kasdkasd213123; path=/; max-age=${
          7 * 24 * 60 * 60
        }; SameSite=Lax`;

        // luego rediriges
        window.location.href = "/admin";
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <form
        onSubmit={handleLogin}
        className="bg-card shadow-card border border-border rounded-lg p-8 w-full max-w-sm space-y-4"
      >
        <h1 className="text-xl font-semibold text-center">Login Admin</h1>
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button
          type="submit"
          className="w-full"
          disabled={loading || !password}
        >
          {loading ? "Ingresando..." : "Entrar"}
        </Button>
      </form>
    </div>
  );
}
