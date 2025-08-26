import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Lock, Plus, Minus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePurchase } from "@/hooks/usePurchase";

const PRICE = 1;

const regions = {
  Lima: ["Lima", "Callao"],
  Arequipa: ["Arequipa", "Camaná", "Caravelí"],
  Cusco: ["Cusco", "Anta", "Calca"],
  "La Libertad": ["Trujillo", "Ascope", "Chepén"],
  Piura: ["Piura", "Sullana", "Talara"],
  Lambayeque: ["Chiclayo", "Ferreñafe", "Lambayeque"],
  Ancash: ["Huaraz", "Chimbote", "Casma"],
  Ica: ["Ica", "Chincha", "Pisco"],
  Junín: ["Huancayo", "Tarma", "Satipo"],
  Cajamarca: ["Cajamarca", "Jaén", "Chota"],
};

const districts: Record<string, string[]> = {
  Lima: [
    "Miraflores",
    "San Isidro",
    "Barranco",
    "Surco",
    "La Molina",
    "San Borja",
    "Magdalena",
    "Jesús María",
    "Lince",
    "Pueblo Libre",
  ],
  Callao: ["Callao", "Bellavista", "Carmen de la Legua", "La Perla"],
  Arequipa: ["Arequipa", "Cayma", "Cerro Colorado", "Paucarpata"],
  Trujillo: ["Trujillo", "La Esperanza", "El Porvenir", "Florencia de Mora"],
  Chiclayo: ["Chiclayo", "José Leonardo Ortiz", "La Victoria"],
  Piura: ["Piura", "Castilla", "Catacaos"],
  Cusco: ["Cusco", "San Jerónimo", "San Sebastián", "Wanchaq"],
  Huancayo: ["Huancayo", "El Tambo", "Chilca"],
  // Add more districts as needed
};

const formSchema = z.object({
  firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  address: z.string().min(10, "Ingresa una dirección completa"),
  region: z.string().min(1, "Selecciona una región"),
  province: z.string().min(1, "Selecciona una provincia"),
  district: z.string().min(1, "Selecciona un distrito"),
  reference: z.string().optional(),
  quantity: z.number().min(1).max(5),
});

type FormData = z.infer<typeof formSchema>;

interface PurchaseModalProps {
  isOpen: boolean;
  initialQuantity?: number;
  onClose: () => void;
}

export const PurchaseModal = ({
  isOpen,
  onClose,
  initialQuantity,
}: PurchaseModalProps) => {
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedProvince, setSelectedProvince] = useState<string>("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      region: "",
      province: "",
      district: "",
      reference: "",
      quantity: initialQuantity ?? 1,
    },
  });

  const quantity = form.watch("quantity");
  const total = quantity * PRICE;

  const availableProvinces = selectedRegion
    ? regions[selectedRegion as keyof typeof regions] || []
    : [];
  const availableDistricts = selectedProvince
    ? districts[selectedProvince] || []
    : [];

  useEffect(() => {
    form.setValue("quantity", initialQuantity ?? 1);
  }, [initialQuantity, form]);

  const purchase = usePurchase();

  const onSubmit = (data: FormData) => {
    purchase.mutate(
      {
        customer: {
          name: data.firstName,
          lasName: data.lastName,
          direccion: data.address,
          distrito: data.district,
          provincia: data.province,
          departamento: data.region,
          referencia: data.reference,
        },
        sale: {
          quantity: data.quantity,
          unitPrice: PRICE,
          totalAmount: total,
        },
      },
      {
        onSuccess: ({ pref }) => {
          // redirige a Mercado Pago
          window.location.href = pref.init_point;
        },
        onError: (err: any) => {
          alert(err.message || "Error al procesar la compra");
        },
      }
    );
  };

  const handleQuantityChange = (increment: boolean) => {
    const currentQuantity = form.getValues("quantity");
    const newQuantity = increment
      ? Math.min(currentQuantity + 1, 5)
      : Math.max(currentQuantity - 1, 1);
    form.setValue("quantity", newQuantity);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hola, tengo algunas dudas sobre el cargador Type-C a Lightning. ¿Podrían ayudarme?`
    );
    window.open(`https://wa.me/51932567344?text=${message}`, "_blank");
  };

  const handleRegionChange = (value: string) => {
    setSelectedRegion(value);
    setSelectedProvince("");
    form.setValue("region", value);
    form.setValue("province", "");
    form.setValue("district", "");
  };

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    form.setValue("province", value);
    form.setValue("district", "");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto bg-card border border-border rounded-ios shadow-float">
        <DialogHeader className="text-center pb-4">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1 rounded-full hover:bg-muted/50 transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
          <DialogTitle className="text-2xl font-semibold text-foreground">
            Completa tu compra
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Entregas en 24–72 h según distrito. Garantía local.
          </p>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Nombre *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ariana"
                        className="h-12 rounded-ios border-input focus:border-foreground"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Apellido *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Gómez"
                        className="h-12 rounded-ios border-input focus:border-foreground"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    Dirección *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Av. Arequipa 123, depto. 402"
                      className="h-12 rounded-ios border-input focus:border-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-3">
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Región *
                    </FormLabel>
                    <Select
                      onValueChange={handleRegionChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 rounded-ios border-input focus:border-foreground">
                          <SelectValue placeholder="Selecciona tu región" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-background border border-border rounded-ios shadow-float">
                        {Object.keys(regions).map((region) => (
                          <SelectItem
                            key={region}
                            value={region}
                            className="rounded-ios"
                          >
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {availableProvinces.length > 0 && (
                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">
                        Provincia *
                      </FormLabel>
                      <Select
                        onValueChange={handleProvinceChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 rounded-ios border-input focus:border-foreground">
                            <SelectValue placeholder="Selecciona tu provincia" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-background border border-border rounded-ios shadow-float">
                          {availableProvinces.map((province) => (
                            <SelectItem
                              key={province}
                              value={province}
                              className="rounded-ios"
                            >
                              {province}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              )}

              {availableDistricts.length > 0 && (
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">
                        Distrito *
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 rounded-ios border-input focus:border-foreground">
                            <SelectValue placeholder="Selecciona tu distrito" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-background border border-border rounded-ios shadow-float">
                          {availableDistricts.map((district) => (
                            <SelectItem
                              key={district}
                              value={district}
                              className="rounded-ios"
                            >
                              {district}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <FormField
              control={form.control}
              name="reference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    Referencia
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Frente al parque / Portón negro"
                      className="min-h-[80px] rounded-ios border-input focus:border-foreground resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    Cantidad *
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(false)}
                        className="w-12 h-12 rounded-full border border-input bg-background hover:bg-muted/50 flex items-center justify-center transition-colors"
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4 text-foreground" />
                      </button>
                      <div className="flex-1 text-center">
                        <Input
                          type="number"
                          min="1"
                          max="5"
                          className="h-12 text-center rounded-ios border-input focus:border-foreground"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 1)
                          }
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(true)}
                        className="w-12 h-12 rounded-full border border-input bg-background hover:bg-muted/50 flex items-center justify-center transition-colors"
                        disabled={quantity >= 5}
                      >
                        <Plus className="w-4 h-4 text-foreground" />
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Order Summary */}
            <div className="bg-muted/30 rounded-ios p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Precio</span>
                <span className="text-sm font-medium">
                  S/ {PRICE.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-border pt-2">
                <span className="text-lg font-semibold text-foreground">
                  Total
                </span>
                <span className="text-xl font-bold text-foreground">
                  S/ {total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-2">
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 rounded-full font-medium"
                disabled={!form.formState.isValid || purchase.isPending}
              >
                {purchase.isPending ? "Procesando…" : "Pagar ahora"}
              </Button>

              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full h-12 rounded-full font-medium"
                onClick={handleWhatsApp}
                disabled={purchase.isPending}
              >
                Tengo dudas
              </Button>
            </div>

            {/* Security Note */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <Lock className="w-4 h-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground text-center">
                Pago 100% seguro. Tus datos solo se usan para coordinar la
                entrega.
              </p>
            </div>

            {!form.formState.isValid &&
              Object.keys(form.formState.errors).length > 0 && (
                <p className="text-xs text-destructive text-center">
                  Por favor completa los campos marcados con *
                </p>
              )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
