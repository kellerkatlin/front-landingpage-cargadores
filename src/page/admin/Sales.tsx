import { useEffect, useMemo, useState } from "react";
import {
  useSales,
  useUpdatePayment,
  useUpdateFulfillment,
  type PaymentStatus,
  type FulfillmentStatus,
} from "@/hooks/useSales";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, ChevronLeft, ChevronRight, Search } from "lucide-react";

// traducciones.ts
const PAYMENT_LABELS: Record<string, string> = {
  UNPAID: "No pagado",
  PENDING: "Pendiente",
  PAID: "Pagado",
  FAILED: "Fallido",
  REFUNDED: "Reembolsado",
};

const FULFILLMENT_LABELS: Record<string, string> = {
  NOT_PREPARED: "No preparado",
  PREPARED: "Preparado",
  DISPATCHED: "Despachado",
  DELIVERED: "Entregado",
  RETURNED: "Devuelto",
};

const PAYMENT_OPTS: PaymentStatus[] = [
  "UNPAID",
  "PENDING",
  "PAID",
  "FAILED",
  "REFUNDED",
];
const FULFILLMENT_OPTS: FulfillmentStatus[] = [
  "NOT_PREPARED",
  "PREPARED",
  "DISPATCHED",
  "DELIVERED",
  "RETURNED",
];

// Usa un sentinel:
const ALL = "ALL";

export default function SalesPage() {
  // filtros de backend (opcionales)
  const [paymentFilter, setPaymentFilter] = useState<PaymentStatus | "">("");
  const [fulfillmentFilter, setFulfillmentFilter] = useState<
    FulfillmentStatus | ""
  >("");

  // búsqueda y paginación local
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const { data, isLoading, isFetching, error } = useSales({
    payment: paymentFilter || undefined,
    fulfillment: fulfillmentFilter || undefined,
  });

  // reset de página ante cambios
  useEffect(
    () => setPage(1),
    [search, paymentFilter, fulfillmentFilter, pageSize]
  );

  // Filtrado local por término
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!data) return [];
    if (!term) return data;

    return data.filter((s) => {
      const fullName = [s.customer?.name, s.customer?.lasName]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const email = (s.customer?.email || "").toLowerCase();
      const phone = (s.customer?.phone || "").toLowerCase();
      const notes = (s.notes || "").toLowerCase();
      return (
        s.id.toLowerCase().includes(term) ||
        fullName.includes(term) ||
        email.includes(term) ||
        phone.includes(term) ||
        notes.includes(term)
      );
    });
  }, [data, search]);

  // Paginación local
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageClamped = Math.min(page, totalPages);
  const start = (pageClamped - 1) * pageSize;
  const end = start + pageSize;
  const pageRows = filtered.slice(start, end);

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  // Mutations
  const updatePayment = useUpdatePayment();
  const updateFulfillment = useUpdateFulfillment();

  return (
    <div className="p-4 md:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Ventas</h1>
          <p className="text-sm text-muted-foreground">
            Búsqueda y paginación local. Cambia estados de pago y fulfilment.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por ID, cliente, email, teléfono, notas…"
              className="pl-9 w-[280px]"
            />
          </div>
          // PAYMENT
          <Select
            value={paymentFilter ?? ALL}
            onValueChange={(v) =>
              setPaymentFilter(v === ALL ? "" : (v as PaymentStatus))
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pago (todos)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Pago: todos</SelectItem>
              {PAYMENT_OPTS.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          // FULFILLMENT
          <Select
            value={fulfillmentFilter ?? ALL}
            onValueChange={(v) =>
              setFulfillmentFilter(v === ALL ? "" : (v as FulfillmentStatus))
            }
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Fulfillment (todos)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Fulfillment: todos</SelectItem>
              {FULFILLMENT_OPTS.map((f) => (
                <SelectItem key={f} value={f}>
                  {f}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* Page size */}
          <Select
            value={String(pageSize)}
            onValueChange={(v) => setPageSize(Number(v))}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Filas/pág" />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 50, 100].map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n} / pág
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex items-center gap-2 text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" /> Cargando ventas…
          </div>
        ) : error ? (
          <div className="p-8 text-destructive">Error al cargar ventas.</div>
        ) : (
          <>
            <Table>
              <TableCaption>
                {isFetching
                  ? "Actualizando…"
                  : `Mostrando ${pageRows.length} de ${total} ventas`}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Cant.</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Pago</TableHead>
                  <TableHead>Fulfillment</TableHead>
                  <TableHead className="text-right">Creado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageRows.length ? (
                  pageRows.map((s) => {
                    const fullName =
                      [s.customer?.name, s.customer?.lasName]
                        .filter(Boolean)
                        .join(" ") || "—";
                    const created = new Date(s.createdAt).toLocaleString();
                    return (
                      <TableRow key={s.id} className="hover:bg-muted/40">
                        <TableCell className="font-mono text-xs">
                          {s.id.slice(0, 8)}…
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">{fullName}</span>
                            <span className="text-xs text-muted-foreground">
                              {s.customer?.email || s.customer?.phone
                                ? `${s.customer?.email ?? ""} ${
                                    s.customer?.phone ?? ""
                                  }`.trim()
                                : "—"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{s.quantity}</TableCell>
                        <TableCell>S/ {s.unitPrice.toFixed(2)}</TableCell>
                        <TableCell className="font-semibold">
                          S/ {s.totalAmount.toFixed(2)}
                        </TableCell>

                        {/* Payment status editable */}
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">
                              {PAYMENT_LABELS[s.paymentStatus]}
                            </Badge>
                            <Select
                              onValueChange={(val) =>
                                updatePayment.mutate({
                                  id: s.id,
                                  status: val as PaymentStatus,
                                })
                              }
                            >
                              <SelectTrigger className="h-8 w-[110px]">
                                <SelectValue placeholder="Cambiar" />
                              </SelectTrigger>
                              <SelectContent>
                                {PAYMENT_OPTS.map((p) => (
                                  <SelectItem key={p} value={p}>
                                    {PAYMENT_LABELS[p]}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>

                        {/* Fulfillment status editable */}
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              {FULFILLMENT_LABELS[s.fulfillmentStatus]}
                            </Badge>
                            <Select
                              onValueChange={(val) =>
                                updateFulfillment.mutate({
                                  id: s.id,
                                  status: val as FulfillmentStatus,
                                })
                              }
                            >
                              <SelectTrigger className="h-8 w-[130px]">
                                <SelectValue placeholder="Cambiar" />
                              </SelectTrigger>
                              <SelectContent>
                                {FULFILLMENT_OPTS.map((f) => (
                                  <SelectItem key={f} value={f}>
                                    {FULFILLMENT_LABELS[f]}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>

                        <TableCell className="text-right">{created}</TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Sin resultados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Paginación local */}
            <div className="flex items-center justify-between p-3 border-top border-border">
              <div className="text-xs text-muted-foreground">
                Página {pageClamped} de {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goPrev}
                  disabled={pageClamped <= 1}
                >
                  <ChevronLeft className="w-4 h-4" /> Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goNext}
                  disabled={pageClamped >= totalPages}
                >
                  Siguiente <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
