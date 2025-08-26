// src/page/checkout/Failure.tsx
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { XCircle, MessageCircle } from "lucide-react";

export default function CheckoutFailure() {
  const [params] = useSearchParams();
  const saleId = params.get("sale") || undefined;

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-card border border-border rounded-lg p-6 w-full max-w-lg text-center space-y-4">
        <XCircle className="w-10 h-10 text-destructive mx-auto" />
        <h1 className="text-2xl font-semibold">Pago no completado</h1>
        <p className="text-muted-foreground">
          Tu transacción no pudo completarse o fue rechazada. Puedes intentar de
          nuevo o escribirnos si tienes dudas.
        </p>

        {saleId && (
          <div className="text-xs text-muted-foreground">
            ID de venta: <span className="font-mono">{saleId}</span>
          </div>
        )}

        <div className="flex gap-3 justify-center">
          <a
            href="https://wa.me/51932567344?text=Hola,%20mi%20pago%20falló%20y%20necesito%20ayuda"
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
