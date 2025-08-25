import { Zap, Package, Smartphone, Shield, Truck } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const benefits = [
  {
    icon: Zap,
    title: "Carga rápida y segura",
    description:
      "Potencia optimizada para tu iPhone con protección contra sobrecarga",
  },
  {
    icon: Package,
    title: "Dos en uno: cable + cubo",
    description: "Todo lo que necesitas en un solo paquete premium",
  },
  {
    icon: Smartphone,
    title: "Compatible con iPhone",
    description: "Funciona perfectamente con todos los modelos recientes",
  },
  {
    icon: Shield,
    title: "Garantía local en Perú",
    description: "Respaldo completo y soporte técnico nacional",
  },
  {
    icon: Truck,
    title: "Delivery en todo el país",
    description: "Envío seguro y rápido a cualquier ciudad del Perú",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1, // separa cada card
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

export const BenefitsSection = () => {
  return (
    <section className="py-20 bg-background">
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
              Diseñado para la perfección
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cada aspecto pensado para brindarte la mejor experiencia de carga
            </p>
          </motion.div>

          {/* Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="bg-card-ios border border-border rounded-ios p-6 shadow-ios hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-ios flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-card-ios-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
