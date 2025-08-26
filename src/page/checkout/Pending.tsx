// src/page/checkout/Pending.tsx
import { useSearchParams, Link } from "react-router-dom";
import { usePublicSale } from "@/hooks/useSales";
import { Button } from "@/components/ui/button";
import { Clock, MessageCircle } from "lucide-react";

export default function CheckoutPending() {
  const [params] = useSearchParams();
  const saleId = params.get("sale") || undefined;
  const { data, isLoading } = usePublicSale(saleId);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-card border border-border rounded-lg p-6 w-full max-w-lg text-center space-y-4">
        <Clock className="w-10 h-10 text-primary mx-auto" />
        <h1 className="text-2xl font-semibold">Pago en proceso</h1>
        <p className="text-muted-foreground">
          {isLoading
            ? "Verificando tu transacción…"
            : "Estamos esperando la confirmación de tu pago."}
        </p>

        {data && (
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
        )}

        <div className="flex gap-3 justify-center">
          <a
            href="https://wa.me/51999999999?text=Hola,%20tengo%20dudas%20sobre%20mi%20pago"
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
      </div>
    </div>
  );
}
