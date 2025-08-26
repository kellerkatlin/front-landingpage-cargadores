import { useMemo, useState, useEffect } from "react";
import { useAllCustomers } from "@/hooks/useCustomers";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, ChevronLeft, ChevronRight, Search } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function CustomersPage() {
  // UI state
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const { data, isLoading, isFetching, error } = useAllCustomers();

  // reset page when search changes
  useEffect(() => setPage(1), [search, pageSize]);

  // Filtrado local
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!data) return [];
    if (!term) return data;

    return data.filter((c) => {
      const fullName = [c.name, c.lasName]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return (
        fullName.includes(term) ||
        (c.email || "").toLowerCase().includes(term) ||
        (c.dni || "").toLowerCase().includes(term) ||
        (c.phone || "").toLowerCase().includes(term)
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

  return (
    <div className="p-4 md:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Clientes</h1>
          <p className="text-sm text-muted-foreground">
            Búsqueda y paginación local (client-side).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative max-w-sm w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar nombre, email, DNI, teléfono…"
              className="pl-9"
            />
          </div>

          <Select
            value={String(pageSize)}
            onValueChange={(v) => setPageSize(Number(v))}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Filas/pág" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 / pág</SelectItem>
              <SelectItem value="20">20 / pág</SelectItem>
              <SelectItem value="50">50 / pág</SelectItem>
              <SelectItem value="100">100 / pág</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex items-center gap-2 text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            Cargando clientes…
          </div>
        ) : error ? (
          <div className="p-8 text-destructive">Error al cargar clientes.</div>
        ) : (
          <>
            <Table>
              <TableCaption>
                {isFetching
                  ? "Actualizando…"
                  : `Mostrando ${pageRows.length} de ${total} clientes`}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>DNI</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead className="text-right">Creado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageRows.length ? (
                  pageRows.map((c) => {
                    const fullName = [c.name, c.lasName]
                      .filter(Boolean)
                      .join(" ");
                    const location = [c.distrito, c.provincia, c.departamento]
                      .filter(Boolean)
                      .join(", ");
                    const created = new Date(c.createdAt).toLocaleString();
                    return (
                      <TableRow key={c.id} className="hover:bg-muted/40">
                        <TableCell className="font-medium">
                          {fullName || "—"}
                        </TableCell>
                        <TableCell>{c.email || "—"}</TableCell>
                        <TableCell>{c.phone || "—"}</TableCell>
                        <TableCell>{c.dni || "—"}</TableCell>
                        <TableCell
                          className="max-w-[240px] truncate"
                          title={location}
                        >
                          {location || "—"}
                        </TableCell>
                        <TableCell className="text-right">{created}</TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Sin resultados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Paginación local */}
            <div className="flex items-center justify-between p-3 border-t border-border">
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
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goNext}
                  disabled={pageClamped >= totalPages}
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
