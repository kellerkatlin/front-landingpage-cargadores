import heroProduct from "@/assets/hero-product.png";
import lifestyleProduct from "@/assets/lifestyle-product.jpg";
import { motion, type Variants } from "framer-motion";

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

const gridContainer: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      duration: 0.3,
      ease: "easeOut",
      staggerChildren: 0.1, // aparición secuencial lenta
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.1, ease: "easeOut" },
  },
};

export const ProductGallery = () => {
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
              Calidad premium en cada detalle
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experiencia de carga superior con diseño elegante
            </p>
          </motion.div>

          {/* Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={gridContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
          >
            {/* Product Shot */}
            <motion.div variants={cardVariants}>
              <div className="bg-white rounded-ios shadow-float p-8 lg:p-12">
                <img
                  src={heroProduct}
                  alt="Cargador Type-C Lightning vista detallada"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>

            {/* Lifestyle Shot */}
            <motion.div variants={cardVariants}>
              <div className="bg-white rounded-ios shadow-float p-8 lg:p-12">
                <img
                  src={lifestyleProduct}
                  alt="Cargador en uso con iPhone"
                  className="w-full h-auto"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.0, ease: "easeOut", delay: 0.1 }}
                className="mt-6 text-center"
              >
                <p className="text-muted-foreground">
                  Perfectamente integrado en tu estilo de vida digital
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
