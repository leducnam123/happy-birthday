import { motion } from "motion/react";

export function HeartsEffect({ active }) {
  if (!active) return null;
  const hearts = Array.from({ length: 18 });
  return (
    <div className="inset-0 pointer-events-none absolute overflow-hidden">
      {hearts.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        const dur = 3 + Math.random() * 3;
        return (
          <motion.div
            key={i}
            initial={{ y: 30, opacity: 0, x: left + "%" }}
            animate={{ y: -120, opacity: 1 }}
            transition={{
              duration: dur,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ left: `${left}%` }}
            className="text-3xl"
          >
            <span className="text-pink-500">❤️</span>
          </motion.div>
        );
      })}
    </div>
  );
}
