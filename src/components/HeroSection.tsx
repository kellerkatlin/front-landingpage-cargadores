import { useMemo, useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PurchaseModal } from "@/components/PurchaseModal";
import heroProduct from "@/assets/hero-product.png";
import { motion, AnimatePresence } from "framer-motion";
import { BadgePercent, Minus, Plus, Shield, Truck, Zap } from "lucide-react";
import { track } from "@/lib/pixel";

const BASE_PRICE = 49.9;
const TIER_PRICE_2PLUS = 39.9;
const OFFERPRICE = 120;

const PRODUCT_ID = "charger_typec_lightning"; // reemplaza si corresponde

const DISCOUNT_PER_UNIT = BASE_PRICE - TIER_PRICE_2PLUS;

export const HeroSection = () => {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // ref al botón "inline" (debajo de la cantidad en el card)
  const inlineCtaRef = useRef<HTMLButtonElement | null>(null);
  const [inlineCtaInView, setInlineCtaInView] = useState(false);

  useEffect(() => {
    // ViewContent: cuando aterriza en la sección del producto
    track("ViewContent", {
      content_ids: [PRODUCT_ID],
      content_type: "product",
      value: BASE_PRICE, // valor de referencia
      currency: "PEN",
    });
  }, []);
  useEffect(() => {
    const el = inlineCtaRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setInlineCtaInView(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.4, // visible al menos 40%
        rootMargin: "0px 0px -10% 0px", // detecta un poco antes de tocar el borde inferior
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const unitPrice = useMemo(
    () => (quantity >= 2 ? TIER_PRICE_2PLUS : BASE_PRICE),
    [quantity]
  );
  const total = useMemo(() => unitPrice * quantity, [unitPrice, quantity]);
  const savingsPerUnit = useMemo(
    () => (quantity >= 2 ? BASE_PRICE - TIER_PRICE_2PLUS : 0),
    [quantity]
  );
  const totalSavings = useMemo(
    () => savingsPerUnit * quantity,
    [savingsPerUnit, quantity]
  );

  const dec = () => setQuantity((q) => Math.max(1, q - 1));
  const inc = () => setQuantity((q) => Math.min(5, q + 1));
  const handleBuyNow = () => {
    // AddToCart: tu “Comprar ahora” agrega al carrito
    track("AddToCart", {
      content_ids: [PRODUCT_ID],
      contents: [{ id: PRODUCT_ID, quantity }],
      content_type: "product",
      value: total, // importe total de lo agregado
      currency: "PEN",
      num_items: quantity,
    });
    setIsPurchaseModalOpen(true);
  };

  return (
    <section className="min-h-screen flex items-center bg-gradient-hero pt-16 pb-8">
      <div className="container mx-auto px-0 md:px-4">
        {/* Título SOLO mobile */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="lg:hidden text-center mb-6"
        >
          <h1 className="text-4xl font-bold tracking-tight text-foreground leading-tight">
            Cargador Type-C a Lightning
            <span className="block text-primary">potente y seguro</span>
          </h1>
          <p className="text-base text-muted-foreground mt-2">
            Cable + cubo de carga rápida. Envíos a todo el Perú.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Col: Imagen */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <img
              src={heroProduct}
              alt="Cargador Type-C a Lightning con cubo incluido"
              className="w-full max-w-2xl mx-auto animate-float"
            />
          </motion.div>

          {/* Col: Panel de compra */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  staggerChildren: 0.25,
                  duration: 1.1,
                  ease: "easeOut",
                },
              },
            }}
          >
            {/* Título SOLO desktop */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 1 } },
              }}
              className="hidden lg:block space-y-4 text-left"
            >
              <h1 className="text-5xl font-bold tracking-tight text-foreground leading-tight">
                Cargador Type-C a Lightning
                <span className="block text-primary">potente y seguro</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Cable + cubo de carga rápida. Envíos a todo el Perú.
              </p>
            </motion.div>

            <div className="flex flex-col-reverse md:flex-col gap-10 md:gap-0 ">
              {/* Beneficios */}
              <motion.ul
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
                }}
                className=" -mt-4 md:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm"
              >
                <li className="flex items-center justify-center lg:justify-start gap-2 bg-card rounded-ios px-3 py-2 border border-border shadow-card">
                  <Zap className="w-4 h-4 text-primary" />
                  Carga rápida
                </li>
                <li className="flex items-center justify-center lg:justify-start gap-2 bg-card rounded-ios px-3 py-2 border border-border shadow-card">
                  <Truck className="w-4 h-4 text-primary" />
                  Envío 24–72 h
                </li>
                <li className="flex items-center justify-center lg:justify-start gap-2 bg-card rounded-ios px-3 py-2 border border-border shadow-card">
                  <Shield className="w-4 h-4 text-primary" />
                  Garantía 6 meses
                </li>
              </motion.ul>

              {/* Card de compra */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
                }}
                className=" mt-4 md:mt-8 bg-card rounded-ios shadow-float border border-border p-6"
              >
                {/* Precios */}
                <div className="mb-4">
                  <div className="flex items-center justify-center lg:justify-start gap-3">
                    {quantity < 2 ? (
                      <>
                        <span className="text-2xl text-price-original line-through">
                          S/ {OFFERPRICE.toFixed(2)}
                        </span>
                        <span className="text-4xl font-bold text-price-highlight">
                          S/ {BASE_PRICE.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-sm px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                          Pack 2+: S/ {TIER_PRICE_2PLUS.toFixed(2)} c/u
                        </span>
                        <span className="text-4xl font-bold text-price-highlight">
                          S/ {unitPrice.toFixed(2)}
                        </span>
                        <span className="text-sm text-success">
                          –S/ {savingsPerUnit.toFixed(2)} c/u
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-center lg:text-left text-muted-foreground mt-2">
                    Cable Type-C a Lightning + Cubo de carga rápida
                  </p>

                  <AnimatePresence mode="wait">
                    {quantity < 2 ? (
                      // Hint cuando está en 1 unidad
                      <motion.div
                        key="pack-hint"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        onClick={() => setQuantity(2)}
                        transition={{ duration: 0.35 }}
                        className="mt-3 flex items-center cursor-pointer justify-center lg:justify-start"
                        aria-live="polite"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.03, 1] }}
                          transition={{
                            duration: 1.2,
                            repeat: 2,
                            ease: "easeInOut",
                          }}
                          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 shadow-sm"
                        >
                          <BadgePercent className="w-4 h-4 text-primary" />
                          <span className="text-xs text-foreground/90">
                            Llévate{" "}
                            <button
                              type="button"
                              className="underline underline-offset-2 decoration-dotted hover:text-primary focus:outline-none"
                              aria-label="Seleccionar dos unidades"
                            >
                              2
                            </button>{" "}
                            y paga S/ {TIER_PRICE_2PLUS.toFixed(2)} c/u
                            <span className="text-success">
                              {" "}
                              (–S/ {DISCOUNT_PER_UNIT.toFixed(2)} c/u)
                            </span>
                          </span>
                        </motion.div>
                      </motion.div>
                    ) : (
                      // Mensaje cuando ya activó pack 2+
                      <motion.div
                        key="pack-active"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.35 }}
                        className="mt-3 flex items-center justify-center lg:justify-start"
                        aria-live="polite"
                      >
                        <span className="inline-flex items-center gap-2 rounded-full bg-success/10 text-success px-3 py-1">
                          <BadgePercent className="w-4 h-4" />
                          <span className="text-xs">
                            Pack 2+ activo • Ahorro total: S/{" "}
                            {totalSavings.toFixed(2)}
                          </span>
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Selector de cantidad */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={dec}
                      className="w-11 h-11 rounded-full border border-input bg-background hover:bg-muted/50 flex items-center justify-center transition-colors disabled:opacity-50"
                      disabled={quantity <= 1}
                      aria-label="Disminuir cantidad"
                    >
                      <Minus className="w-4 h-4 text-foreground" />
                    </button>

                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={quantity}
                      onChange={(e) => {
                        const v = Number(e.target.value || 1);
                        setQuantity(Math.max(1, Math.min(5, v)));
                      }}
                      className="w-20 h-11 text-center rounded-ios border border-input focus:outline-none focus:ring-2 focus:ring-ring"
                      aria-label="Cantidad"
                    />

                    <button
                      type="button"
                      onClick={inc}
                      className="w-11 h-11 rounded-full border border-input bg-background hover:bg-muted/50 flex items-center justify-center transition-colors disabled:opacity-50"
                      disabled={quantity >= 5}
                      aria-label="Aumentar cantidad"
                    >
                      <Plus className="w-4 h-4 text-foreground" />
                    </button>
                  </div>

                  <div className="flex-1 text-center sm:text-right">
                    <div className="text-sm text-muted-foreground">Total</div>
                    <div className="text-2xl font-semibold text-foreground">
                      S/ {total.toFixed(2)}
                    </div>
                    {totalSavings > 0 && (
                      <div className="text-xs text-success">
                        Ahorro: S/ {totalSavings.toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA inline (observada por IntersectionObserver) */}
                <div className="mt-6">
                  <Button
                    ref={inlineCtaRef}
                    variant="hero"
                    size="xl"
                    onClick={handleBuyNow}
                    className="w-full md:w-auto px-10 rounded-full"
                  >
                    Comprar ahora
                  </Button>
                  <p className="text-xs text-muted-foreground mt-3 text-center lg:text-left">
                    Pago seguro • Envío en 24–72 horas
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal con cantidad seleccionada */}
      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        initialQuantity={quantity}
      />

      {/* CTA flotante (se muestra cuando el CTA inline NO está visible) */}
      <AnimatePresence>
        {!inlineCtaInView && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 right-0 bottom-0 z-50"
          >
            <div className="container mx-auto px-4 pb-[env(safe-area-inset-bottom)]">
              <div className="p-3">
                <div className="flex justify-center items-center gap-3">
                  <motion.div
                    animate={{
                      scale: [1, 1.08, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Button
                      onClick={handleBuyNow}
                      className="px-14 block md:hidden text-base text-center rounded-full"
                      size="lg"
                      variant="hero"
                    >
                      Comprar ahora
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
