// src/components/TopBar.tsx
import { Truck } from "lucide-react";
import { motion } from "framer-motion";

interface TopBarProps {
  message?: string;
  /** Si quieres fijarla arriba de todo */
  fixed?: boolean;
}

export const TopBar = ({
  message = "Envío gratis a todo el Perú",
  fixed = true,
}: TopBarProps) => {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={[
        "w-full",
        fixed ? "fixed top-0 left-0 right-0 z-50" : "",
        "bg-primary text-primary-foreground", // puedes cambiarlo a bg-foreground si prefieres
        "border-b border-border",
        "pt-[env(safe-area-inset-top)]", // notch safe area
      ].join(" ")}
      role="region"
      aria-label="Aviso de envío gratis"
    >
      <div className="container mx-auto px-4">
        <div className="h-10 md:h-11 flex items-center justify-center gap-2">
          <Truck className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
          <p className="text-xs md:text-sm font-medium tracking-wide">
            {message}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
