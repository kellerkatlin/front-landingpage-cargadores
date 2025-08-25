import { Star } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const testimonials = [
  {
    name: "Carlos Mendoza",
    avatar: "CM",
    rating: 5,
    review:
      "Llegó en 2 días, carga rapidísimo mi iPhone 13. Muy satisfecho con la compra.",
    verified: true,
  },
  {
    name: "María González",
    avatar: "MG",
    rating: 5,
    review:
      "Finalmente un cargador que incluye el cubo. Calidad premium, se nota la diferencia.",
    verified: true,
  },
  {
    name: "José Ramírez",
    avatar: "JR",
    rating: 5,
    review:
      "Excelente producto. Mi iPhone 12 Pro carga súper rápido. Lo recomiendo 100%.",
    verified: true,
  },
];

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.0, ease: "easeOut" },
  },
};

export const TestimonialsSection = () => {
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
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-lg text-muted-foreground">
              Más de 1,500 clientes satisfechos en todo el Perú
            </p>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="bg-card-ios border border-border rounded-ios p-6 shadow-ios hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>

                {/* Review */}
                <p className="text-card-ios-foreground mb-6 leading-relaxed">
                  "{testimonial.review}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-medium text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-card-ios-foreground">
                      {testimonial.name}
                    </div>
                    {testimonial.verified && (
                      <div className="text-xs text-success">
                        ✓ Compra verificada
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
