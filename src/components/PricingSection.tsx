import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PurchaseModal } from "@/components/PurchaseModal";
import { Star, ShieldCheck } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const featuresContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const featureItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

export const PricingSection = () => {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  const handlePurchase = () => setIsPurchaseModalOpen(true);

  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="container mx-auto px-0 md:px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={headingVariants}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Oferta especial de lanzamiento
            </h2>
            <p className="text-lg text-muted-foreground">
              Precio exclusivo por tiempo limitado
            </p>
          </motion.div>

          {/* Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={cardVariants}
            className="bg-card rounded-ios shadow-float border border-border p-8 md:p-12"
          >
            {/* Price Display */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, ease: "easeOut" }}
              className="text-center mb-8"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-2xl text-price-original line-through">
                  S/ 89.90
                </span>
                <span className="text-5xl md:text-6xl font-bold text-price-highlight">
                  S/ 49.90
                </span>
              </div>
              <p className="text-muted-foreground">
                Cable Type-C a Lightning + Cubo de carga rápida
              </p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={featuresContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left"
            >
              {[
                "Carga rápida certificada",
                "Compatible todos los iPhone",
                "Garantía 3 meses",
                "Envío gratis",
              ].map((text, i) => (
                <motion.div
                  key={i}
                  variants={featureItem}
                  className="flex items-start gap-3"
                >
                  <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground">{text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stock warning */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="bg-destructive/10 border border-destructive/20 rounded-ios p-4 mb-8"
            >
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex items-center justify-center gap-2 text-destructive"
              >
                <ShieldCheck className="w-5 h-5" />
                <span className="font-medium">
                  Stock limitado - Solo quedan 47 unidades
                </span>
              </motion.div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.0, ease: "easeOut", delay: 0.1 }}
            >
              <Button
                variant="hero"
                size="xl"
                onClick={handlePurchase}
                className="w-full md:w-auto px-12"
              >
                Lo quiero - Comprar ahora
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                Pago seguro • Envío en 12-36 horas
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
      />
    </section>
  );
};
