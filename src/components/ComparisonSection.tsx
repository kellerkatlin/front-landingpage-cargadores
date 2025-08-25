import { Check, X } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const comparisonData = [
  { feature: "Cubo de carga incluido", ours: true, others: false },
  { feature: "Carga rápida certificada", ours: true, others: false },
  { feature: "Garantía local en Perú", ours: true, others: false },
  { feature: "Cable Type-C a Lightning", ours: true, others: true },
  { feature: "Soporte técnico 24/7", ours: true, others: false },
];

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
};

const tableVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

export const ComparisonSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-1 md:px-4">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={headingVariants}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ¿Por qué elegir nuestro cargador?
            </h2>
            <p className="text-lg text-muted-foreground">
              Comparación transparente con otros cargadores del mercado
            </p>
          </motion.div>

          {/* Table container */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={tableVariants}
            className="bg-card rounded-ios shadow-card border border-border overflow-hidden"
          >
            <div className="grid grid-cols-3 bg-muted p-4">
              <div className="text-center flex items-center justify-center">
                <h3 className="font-medium text-muted-foreground">
                  Característica
                </h3>
              </div>
              <div className="text-center ">
                <h3 className="font-semibold text-primary">Nuestro Cargador</h3>
              </div>
              <div className="text-center">
                <h3 className="font-medium text-muted-foreground">
                  Otros Cargadores
                </h3>
              </div>
            </div>

            {comparisonData.map((item, index) => (
              <motion.div
                key={index}
                variants={rowVariants}
                className="grid grid-cols-3 p-4 border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors"
              >
                <div className="text-sm font-medium text-foreground">
                  {item.feature}
                </div>
                <div className="text-center">
                  {item.ours ? (
                    <Check className="w-5 h-5 text-success mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-destructive mx-auto" />
                  )}
                </div>
                <div className="text-center">
                  {item.others ? (
                    <Check className="w-5 h-5 text-success mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-destructive mx-auto" />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
