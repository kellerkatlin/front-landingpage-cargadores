import { MessageCircle, Mail, MapPin } from "lucide-react";
import { motion, type Variants } from "framer-motion";

export const Footer = () => {
  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/51932567344?text=Hola,%20tengo%20una%20consulta%20sobre%20el%20cargador",
      "_blank"
    );
  };

  const headingVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.1, ease: "easeOut" },
    },
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: "easeOut" },
    },
  };

  return (
    <footer className="bg-footer border-t border-border">
      <div className="container mx-auto px-1 md:px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* CTA Heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={headingVariants}
            className="mb-8"
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">
              ¿Tienes alguna pregunta?
            </h3>
            <p className="text-footer-foreground mb-6">
              Estamos aquí para ayudarte. Contacta con nosotros por WhatsApp.
            </p>

            <motion.button
              onClick={handleWhatsApp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-ios font-medium transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Escríbenos por WhatsApp
            </motion.button>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
          >
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center gap-2"
            >
              <MessageCircle className="w-6 h-6 text-footer-foreground" />
              <div className="text-sm">
                <div className="font-medium text-foreground">WhatsApp</div>
                <div className="text-footer-foreground">+51 932 567 344</div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center gap-2"
            >
              <Mail className="w-6 h-6 text-footer-foreground" />
              <div className="text-sm">
                <div className="font-medium text-foreground">Email</div>
                <div className="text-footer-foreground">
                  ventas@pyt-store.com
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center gap-2"
            >
              <MapPin className="w-6 h-6 text-footer-foreground" />
              <div className="text-sm">
                <div className="font-medium text-foreground">Ubicación</div>
                <div className="text-footer-foreground">Lima, Perú</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom Note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.0, delay: 0.3 }}
            className="border-t border-border pt-8"
          >
            <p className="text-sm text-footer-foreground">
              © 2025 Cargador Premium Perú. Todos los derechos reservados.
            </p>
            <p className="text-xs text-footer-foreground mt-2">
              Producto con garantía local • Envíos seguros a todo el país
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
