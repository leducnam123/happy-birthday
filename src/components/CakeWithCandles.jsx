import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function CakeWithCandles({ onFinished }) {
  const cakeRef = useRef(null);
  const [candles, setCandles] = useState([]);
  const [candleCount, setCandleCount] = useState(0);
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    let audioContext, analyser, microphone, interval;

    const updateCandleCount = (candlesList) => {
      const activeCandles = candlesList.filter((candle) => !candle.out).length;
      setCandleCount(activeCandles);
    };

    const blowOutCandles = () => {
      if (!analyser) return;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      let sum = 0;
      for (let i = 0; i < bufferLength; i++) sum += dataArray[i];
      let average = sum / bufferLength;

      if (average > 40) {
        setCandles((prev) => {
          const updated = prev.map((candle) => {
            if (!candle.out && Math.random() > 0.5) {
              return { ...candle, out: true };
            }
            return candle;
          });
          updateCandleCount(updated);
          return updated;
        });
      }
    };

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          audioContext = new window.AudioContext();
          analyser = audioContext.createAnalyser();
          microphone = audioContext.createMediaStreamSource(stream);
          microphone.connect(analyser);
          analyser.fftSize = 256;
          interval = setInterval(blowOutCandles, 200);
        })
        .catch((err) => {
          console.error("Unable to access microphone:", err);
        });
    }

    return () => {
      if (interval) clearInterval(interval);
      if (audioContext) audioContext.close();
    };
  }, []);

  const handleAddCandle = (e) => {
    const rect = cakeRef.current.getBoundingClientRect();
    const left = e.clientX - rect.left;
    const top = e.clientY - rect.top;

    setCandles((prev) => {
      const newCandles = [...prev, { left, top, out: false }];
      setCandleCount(newCandles.length);
      return newCandles;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen ">
      {/* thiệp nổi lên */}
      <AnimatePresence>
        {!celebrate && (
          <motion.div
            key="cake"
            className=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              class="cake"
              ref={cakeRef}
              onClick={handleAddCandle}
              className="cake relative cursor-pointer"
            >
              <div class="plate"></div>
              <div class="layer layer-bottom"></div>
              <div class="layer layer-middle"></div>
              <div class="layer layer-top"></div>
              <div class="icing"></div>
              <div class="drip drip1"></div>
              <div class="drip drip2"></div>
              <div class="drip drip3"></div>
              {/* Render candles */}
              {candles.map((c, i) => (
                <div
                  key={i}
                  className={`absolute candle ${c.out ? "out" : ""}`}
                  style={{ left: c.left, top: c.top }}
                >
                  {!c.out && <div className="flame"></div>}
                </div>
              ))}
            </div>
          </motion.div>
        )}
        {celebrate && (
          <motion.div
            key="celebration"
            className="absolute inset-0 flex flex-col items-center justify-center bg-black text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.img
              src="/your-gf-image.jpg"
              alt="Her"
              className="w-48 h-48 object-cover rounded-full shadow-lg border-4 border-pink-300"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, delay: 0.5, type: "spring" }}
            />
            <motion.h1
              className="mt-6 text-4xl font-bold text-pink-400"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              🎉 Happy Birthday 🎂
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
