import { CheckCircle } from "lucide-react";
import { motion, type Variants } from "framer-motion";

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

/* ====== Animations ====== */
const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const listContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const listItem: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const specContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};

const specRow: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export const FeaturesSection = () => {
  return (
    <section className="relative py-20 bg-muted/30 overflow-hidden">
      {/* sutil fondo con gradiente */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_0%,hsl(var(--primary)/0.08),transparent_60%)]"
      />
      <div className="container mx-auto px-1 md:px-4">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={headingVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Características principales
            </h2>
            <p className="text-lg text-muted-foreground">
              Todo lo que necesitas saber sobre tu nuevo cargador
            </p>
          </motion.div>

          {/* Specs Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={cardVariants}
            className="bg-card rounded-ios shadow-card border border-border p-6 mb-10 transition-transform duration-300 hover:-translate-y-1"
          >
            <motion.div
              variants={specContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {specs.map((item, i) => (
                <motion.div
                  key={i}
                  variants={specRow}
                  className="flex justify-between border-b border-border/40 pb-2"
                >
                  <span className="text-sm text-muted-foreground font-medium">
                    {item.label}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Compatibility */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Fast charge */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className="bg-card rounded-ios shadow-card border border-border p-6 hover:-translate-y-1 transition-transform duration-300"
            >
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                Dispositivos con carga rápida (20W PD 3.0)
              </h3>
              <motion.ul variants={listContainer} className="space-y-2 text-sm">
                {devicesFast.map((d, i) => (
                  <motion.li
                    key={i}
                    variants={listItem}
                    className="flex items-center gap-2"
                  >
                    <motion.span
                      initial={{ scale: 0.7, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="inline-flex"
                    >
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </motion.span>
                    <span>{d}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Standard charge */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className="bg-card rounded-ios shadow-card border border-border p-6 hover:-translate-y-1 transition-transform duration-300"
            >
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                Dispositivos con carga estándar
              </h3>
              <motion.ul variants={listContainer} className="space-y-2 text-sm">
                {devicesStandard.map((d, i) => (
                  <motion.li
                    key={i}
                    variants={listItem}
                    className="flex items-center gap-2"
                  >
                    <motion.span
                      initial={{ scale: 0.7, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="inline-flex"
                    >
                      <CheckCircle className="w-4 h-4 text-muted-foreground" />
                    </motion.span>
                    <span>{d}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>

          {/* Package */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={cardVariants}
            className="mt-12 bg-card rounded-ios shadow-card border border-border p-6 hover:-translate-y-1 transition-transform duration-300"
          >
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              El paquete incluye
            </h3>
            <motion.ul
              variants={listContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                "1x Cargador de pared USB-C PD 20W",
                "1x Cable USB-C a Lightning (1m)",
              ].map((txt, i) => (
                <motion.li
                  key={i}
                  variants={listItem}
                  className="flex items-center gap-2 text-sm"
                >
                  <motion.span
                    initial={{ scale: 0.7, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="inline-flex"
                  >
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </motion.span>
                  {txt}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
