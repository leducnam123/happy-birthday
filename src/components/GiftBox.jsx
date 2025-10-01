import Lottie from "lottie-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import animation from "../assets/animation.json";

export function GiftBox({ onOpen }) {
  const lottieRef = useRef(null);
  const [isOpened, setIsOpened] = useState(false);
  const [segment, setSegment] = useState([9, 44]);
  const handleClick = () => {
    if (isOpened) return;
    setIsOpened(true);
    setSegment([1, 5]); // chạy đoạn mở hộp ngược lại
    setTimeout(onOpen, 2500);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-r from-pink-200 to-teal-200 overflow-hidden">
      <div className="flex flex-col items-center">
        <p className="font-['Pacifico'] text-2xl md:text-3xl font-semibold text-pink-600">
          Anh có món quà nhỏ muốn tặng vợ 🥰
        </p>
        <div onClick={handleClick}>
          <Lottie
            lottieRef={lottieRef}
            style={{ width: 300, height: 300 }}
            animationData={animation}
            autoplay
            loop={!isOpened}
            initialSegment={segment} // bắt đầu từ frame 0
          />
        </div>

        {/* Confetti */}
        {isOpened &&
          [...Array(14)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: 0, opacity: 1, scale: 0.7, rotate: 0 }}
              animate={{
                y: -180 - Math.random() * 120,
                x: (Math.random() - 0.5) * 300,
                opacity: 0,
                scale: 1.2,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 1.6 + Math.random(),
                ease: "easeOut",
              }}
              className="absolute text-3xl pointer-events-none"
              style={{
                left: "48%",
                top: "55%",
                transform: "translate(-50%, -50%)",
                filter: "drop-shadow(0 0 8px #fff8)",
              }}
            >
              {["🎂", "💕", "🥳", "🎉", "✨", "🎈", "🎊"][i % 7]}
            </motion.div>
          ))}
      </div>
    </div>
  );
}
