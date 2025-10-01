import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadFull } from "tsparticles";

export function BackgroundComponent() {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadFull(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container) => {
    console.log(container);
  };
  
  const options = useMemo(
    () => ({
      fpsLimit: 120,
      particles: {
        number: { value: 22 },
        size: { value: { min: 6, max: 18 } },
        move: { enable: true, direction: "top", speed: 0.9, outModes: "out" },
        shape: { type: "circle" },
        opacity: { value: 0.7 },
        color: { value: ["#ffd1e6", "#bfffe0"] },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <div className="z-0 animate-gradient from-pink-200 via-pink-100 to-teal-200 bg-gradient-to-r">
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
      {/* sparkles */}
      <div className="pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="sparkle"
            style={{
              left: `${10 + i * 11}%`,
              top: `${10 + (i % 3) * 20}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
