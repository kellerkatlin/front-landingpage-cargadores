import { Shield, CreditCard, RefreshCw, Truck } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const trustFeatures = [
  {
    icon: Shield,
    title: "Pago 100% seguro",
    description: "Protección completa en todas tus transacciones",
  },
  {
    icon: CreditCard,
    title: "Múltiples métodos de pago",
    description: "Yape, Plin, tarjetas Visa/Mastercard",
  },
  {
    icon: RefreshCw,
    title: "Garantía de cambio",
    description: "Si tu cargador falla, te lo cambiamos sin costo",
  },
  {
    icon: Truck,
    title: "Envío asegurado",
    description: "Tracking completo hasta tu puerta",
  },
];

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
};

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.0, ease: "easeOut" },
  },
};

export const TrustSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-1 md:px-4">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={headingVariants}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Compra con total confianza
            </h2>
            <p className="text-lg text-muted-foreground">
              Tu satisfacción es nuestra prioridad
            </p>
          </motion.div>

          {/* Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={gridVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {trustFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="w-16 h-16 bg-success/10 rounded-ios flex items-center justify-center mx-auto mb-4"
                >
                  <feature.icon className="w-8 h-8 text-success" />
                </motion.div>

                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
