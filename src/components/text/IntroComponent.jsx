import { motion } from "motion/react";
import { useState, useEffect } from "react";

export function IntroComponent({ onFinish }) {
  const [step, setStep] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timers = [setTimeout(() => setStep(1), 2500)];
    return () => timers.forEach(clearTimeout);
  }, [onFinish]);

  const handleMouseMove = (e) => {
    const btn = document.getElementById("no-btn");
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const distX = e.clientX - (rect.left + rect.width / 2);
    const distY = e.clientY - (rect.top + rect.height / 2);
    const distance = Math.sqrt(distX * distX + distY * distY);

    // nếu chuột tới gần < 120px thì chạy đi
    if (distance < 120) {
      const randX = (Math.random() - 0.5) * 300; // -150 → 150
      const randY = (Math.random() - 0.5) * 200; // -100 → 100
      setNoPos({ x: randX, y: randY });
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-r from-pink-200 to-teal-200 overflow-hidden"
    >
      {step === 0 && (
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 2 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="font-['Pacifico'] text-4xl font-bold text-pink-600 intro-text"
        >
          Ôi ai đây nhỉ ? 👀
        </motion.h1>
      )}

      {step === 1 && (
        <div className="flex flex-col items-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-['Pacifico'] text-3xl font-semibold text-teal-600 bg-white/40 px-6 py-3 rounded-2xl shadow-lg"
          >
            Có phải sinh nhật vợ yêu khummm? 🎂
          </motion.h1>

          {/* Button group */}
          <div className="flex space-x-6">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onFinish}
              className="cursor-none relative px-6 py-2 rounded-full bg-gradient-to-r from-pink-300 via-pink-400 to-pink-500 text-white font-bold shadow-lg transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 rounded-full bg-pink-400 blur-xl opacity-40 animate-pulse"></span>
              <span className="relative z-10">Cóaa !!! 💖</span>
            </motion.button>

            <motion.button
              id="no-btn"
              animate={{ x: noPos.x, y: noPos.y }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="cursor-none relative px-6 py-2 rounded-full bg-gradient-to-r from-blue-200 via-teal-300 to-green-300 text-gray-800 font-bold shadow-lg transition-all duration-300 overflow-hidden select-none"
            >
              <span className="absolute inset-0 rounded-full bg-blue-300 blur-xl opacity-40 animate-pulse"></span>
              <span className="relative z-10">Khummm 🙈</span>
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}
