import { CheckCircle } from "lucide-react";

const specs = [
  { label: "Modelo", value: "20W" },
  { label: "Tipo de conector", value: "USB-C a Lightning" },
  { label: "Color", value: "Blanco" },
  { label: "Tipo de cargador", value: "De pared" },
  { label: "Velocidad de carga", value: "Rápida (Power Delivery 3.0)" },
  { label: "Compatibilidad", value: "iPhone, iPad, Samsung y más" },
  { label: "Voltaje de entrada", value: "100-240V ~ 50/60Hz" },
  { label: "Voltaje de salida", value: "5V/3A, 9V/2A, 9V/2.22A, 12V/1.5A" },
  { label: "Incluye cable", value: "Sí (1m,8, USB-C a Lightning)" },
  { label: "Puertos de carga", value: "1" },
  { label: "Protección contra sobrecarga", value: "Sí" },
  { label: "Inalámbrico", value: "No" },
];

const devicesFast = [
  "iPhone 14 / 14 Pro / 14 Pro Max / 14 Mini",
  "iPhone 13 / 13 Pro / 13 Pro Max / 13 Mini",
  "iPhone 12 / 12 Pro / 12 Pro Max / 12 Mini",
  "iPhone SE 2020",
  "iPhone 11 / 11 Pro / 11 Pro Max",
  "iPhone X, XR, XS, XS Max",
  "iPhone 8 / 8 Plus",
  "iPad Pro 10.5 / 11 / posteriores",
  "iPad Mini 5 y posteriores",
];

const devicesStandard = [
  "iPhone 7 / 7 Plus",
  "iPhone 6 / 6 Plus / 6S / 6S Plus",
  "iPhone 5 / 5C / 5S / SE",
  "iPad Air, iPad Mini, iPad Pro (modelos previos)",
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto  px-1  md:px-4">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Características principales
            </h2>
            <p className="text-lg text-muted-foreground">
              Todo lo que necesitas saber sobre tu nuevo cargador
            </p>
          </div>

          {/* Specs Grid */}
          <div className="bg-card rounded-ios shadow-card border border-border p-6 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specs.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between border-b border-border/40 pb-2"
                >
                  <span className="text-sm text-muted-foreground font-medium">
                    {item.label}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Compatibility */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Fast charge */}
            <div className="bg-card rounded-ios shadow-card border border-border p-6">
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                Dispositivos con carga rápida (20W PD 3.0)
              </h3>
              <ul className="space-y-2 text-sm">
                {devicesFast.map((d, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Standard charge */}
            <div className="bg-card rounded-ios shadow-card border border-border p-6">
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                Dispositivos con carga estándar
              </h3>
              <ul className="space-y-2 text-sm">
                {devicesStandard.map((d, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-muted-foreground" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Package */}
          <div className="mt-12 bg-card rounded-ios shadow-card border border-border p-6">
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              El paquete incluye
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                1x Cargador de pared USB-C PD 20W
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                1x Cable USB-C a Lightning (1m)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
