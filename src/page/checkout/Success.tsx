// src/page/checkout/Success.tsx
import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { usePublicSale } from "@/hooks/useSales";
import { Button } from "@/components/ui/button";
import { CheckCircle, MessageCircle } from "lucide-react";

// (opcional) helpers mínimos:
const fbqPurchase = (
  value: number,
  currency: string,
  contents: { id: string; quantity: number }[],
  eventID?: string
) => {
  if (
    typeof window !== "undefined" &&
    typeof (window as any).fbq === "function"
  ) {
    // Enviar con eventID para de-duplicar con CAPI
    (window as any).fbq(
      "track",
      "Purchase",
      {
        value,
        currency,
        contents,
        content_type: "product",
      },
      eventID ? { eventID } : undefined
    );
  }
};

export default function CheckoutSuccess() {
  const [params] = useSearchParams();
  const saleId = params.get("sale") || undefined;
  const { data, isLoading, error } = usePublicSale(saleId);

  // -----> DISPARO DE PIXEL (solo cuando está PAID y solo 1 vez por saleId)
  useEffect(() => {
    if (!saleId || !data) return;

    const paid = data?.paymentStatus === "PAID";
    if (!paid) return;

    const alreadyFiredKey = `pixel_purchase_fired_${saleId}`;
    if (sessionStorage.getItem(alreadyFiredKey)) return; // evita duplicados por reload

    const amount = Number(data?.totalAmount || 0);
    const qty = Number(data?.itemsQuantity || data?.quantity || 1); // ajusta según tu payload real
    const contents = [
      // Si tienes el ID real del producto, úsalo. Aquí dejo un fallback.
      { id: data?.productId ?? "charger_typec_lightning", quantity: qty },
    ];

    // Usa el saleId como eventID para poder hacer match con CAPI
    const eventID = `sale_${saleId}`;

    fbqPurchase(amount, "PEN", contents, eventID);

    sessionStorage.setItem(alreadyFiredKey, "1");
  }, [saleId, data]);

  // -----------------------------------------

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
