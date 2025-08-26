// src/page/checkout/Success.tsx
import { useSearchParams, Link } from "react-router-dom";
import { usePublicSale } from "@/hooks/useSales";
import { Button } from "@/components/ui/button";
import { CheckCircle, MessageCircle } from "lucide-react";

export default function CheckoutSuccess() {
  const [params] = useSearchParams();
  const saleId = params.get("sale") || undefined;
  const { data, isLoading, error } = usePublicSale(saleId);

  if (!saleId) {
    return (
      <div className="p-6">
        Falta el parámetro <code>sale</code>.
      </div>
    );
  }

  if (isLoading) {
    return <div className="p-6">Verificando tu pago…</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-destructive">
        Ocurrió un problema al verificar tu pago.
      </div>
    );
  }

  const paid = data?.paymentStatus === "PAID";

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-card border border-border rounded-lg p-6 w-full max-w-lg text-center space-y-4">
        <CheckCircle className="w-10 h-10 text-success mx-auto" />
        <h1 className="text-2xl font-semibold">
          {paid ? "¡Pago confirmado!" : "Pago recibido, en proceso"}
        </h1>
        <p className="text-muted-foreground">
          {paid
            ? "Gracias por tu compra. Te contactaremos para coordinar la entrega."
            : "Tu pago está siendo procesado. En breve se actualizará el estado."}
        </p>

        <div className="bg-muted/40 rounded p-4 text-left text-sm">
          <div className="flex justify-between">
            <span>ID de venta</span>
            <span className="font-mono">{data?.id}</span>
          </div>
          <div className="flex justify-between">
            <span>Monto</span>
            <span className="font-semibold">
              S/ {data?.totalAmount?.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Estado de pago</span>
            <span className="font-medium">{data?.paymentStatus}</span>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <a
            href="https://wa.me/51932567344?text=Hola,%20tengo%20dudas%20sobre%20mi%20compra"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="outline" className="gap-2">
              <MessageCircle className="w-4 h-4" />
              Tengo dudas
            </Button>
          </a>
          <Link to="/">
            <Button>Volver al inicio</Button>
          </Link>
        </div>

        {!paid && (
          <p className="text-xs text-muted-foreground">
            Si esta página no cambia a “Pago confirmado” en unos segundos, no te
            preocupes: te contactaremos por WhatsApp o correo cuando el pago se
            acredite.
          </p>
        )}
      </div>
    </div>
  );
}
