import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
export const FloatingWhatsApp = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button after a delay
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/51932567344?text=Hola,%20quiero%20información%20sobre%20el%20cargador%20Type-C%20a%20Lightning",
      "_blank"
    );
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={handleWhatsApp}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-float hover:shadow-lg transition-all duration-300 hover:scale-110 animate-scale-in flex items-center justify-center group"
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp className="w-6 h-6" />

      {/* Tooltip */}
      <div className="absolute bottom-16 right-0 bg-foreground text-background px-3 py-2 rounded-ios text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        ¡Escríbenos por WhatsApp!
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground"></div>
      </div>
    </button>
  );
};
