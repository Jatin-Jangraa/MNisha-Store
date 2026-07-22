"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function LuxuryCursor() {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const x = useSpring(mouseX, { stiffness: 350, damping: 30, mass: 0.4 });
  const y = useSpring(mouseY, { stiffness: 350, damping: 30, mass: 0.4 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const move = (event: MouseEvent) => {
      mouseX.set(event.clientX - 16);
      mouseY.set(event.clientY - 16);
      if (!visible) setVisible(true);
    };
    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      setActive(Boolean(target.closest("a, button, input, textarea, select, [data-cursor='magnetic']")));
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
      window.removeEventListener("resize", checkMobile);
    };
  }, [mouseX, mouseY, visible]);

  if (isMobile) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-8 w-8 rounded-full border border-luxury-gold/60 mix-blend-difference md:block"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: active ? 2.2 : 1
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            scale: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.25 }
          }}
          style={{ x, y }}
        />
      )}
    </AnimatePresence>
  );
}
