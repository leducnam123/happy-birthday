import React, { useEffect, useState } from "react";
import { BackgroundComponent } from "./components/background/BackgroundComponent";
import { IntroComponent } from "./components/text/IntroComponent";
import { PointerComponent } from "./components/pointer/PointerComponent";
import { GiftBox } from "./components/GiftBox";
import { BirthdayCard } from "./components/BirthdayCard";
import CakeWithCandles from "./components/CakeWithCandles";
import { HeartsEffect } from "./components/HeartsEffect";
import confetti from "canvas-confetti";

export default function App() {
  const [phase, setPhase] = useState("intro"); // intro | gift | card
  const [hearts, setHearts] = useState(false);
  // const [music] = useState(() => new Audio(musicFile));
  const [showCakeFinished, setShowCakeFinished] = useState(false);

  // play music on user interaction (GiftBox triggers playMusic)
  // const playMusic = () => {
  //   // volume small
  //   music.volume = 0.4;
  //   music.currentTime = 0;
  //   music.play().catch(() => {
  //     // autoplay blocked — fallback silent
  //   });
  // };

  // when card shows, launch fireworks a bit later
  useEffect(() => {
    if (phase === "card") {
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 120,
          origin: { y: 0.6 },
        });
      }, 900);
    }
  }, [phase]);

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-pink-200 to-teal-200">
      <BackgroundComponent />
      <PointerComponent />
      {phase === "intro" && (
        <IntroComponent onFinish={() => setPhase("gift")} />
      )}
      {phase === "gift" && <GiftBox onOpen={() => setPhase("card")} />}
      {phase === "card" && <BirthdayCard onFinish={() => setPhase("cake")} />}
      {phase === "cake" && (
        <CakeWithCandles onFinish={() => setPhase("final")} />
      )}
      <HeartsEffect active={hearts} />
    </div>
  );
}
