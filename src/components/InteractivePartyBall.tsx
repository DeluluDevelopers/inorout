"use client";

import { useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";

interface InteractivePartyBallProps {
  position?: "left" | "right";
}

const InteractivePartyBall = ({
  position = "right",
}: InteractivePartyBallProps) => {
  const [clickCount, setClickCount] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const ballRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Hide balls when scrolling past hero section
  const ballOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Mouse tracking for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 25 });

  // Transform values for 3D rotation
  const rotateX = useTransform(springY, [-100, 100], [10, -10]);
  const rotateY = useTransform(springX, [-100, 100], [-10, 10]);

  // Handle mouse movement for 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ballRef.current) return;

    const rect = ballRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    mouseX.set(deltaX * 0.3);
    mouseY.set(deltaY * 0.3);
  };

  // Handle interaction
  const handleInteraction = () => {
    setIsClicked(true);
    setClickCount((prev) => prev + 1);

    // Reset click effect after animation
    setTimeout(() => {
      setIsClicked(false);
    }, 1500);
  };

  return (
    <motion.div
      ref={ballRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.9, scale: 1 }}
      transition={{ duration: 2, type: "spring", bounce: 0.4 }}
      className={`fixed top-20 ${
        position === "left" ? "left-20" : "right-20"
      } w-20 h-20 z-10 cursor-pointer select-none hidden md:block`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      onClick={handleInteraction}
      whileHover={{
        scale: 1.2,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.9 }}
      style={{
        opacity: ballOpacity,
        perspective: "1000px",
      }}
    >
      {/* Main Party Ball - Always Active */}
      <motion.div
        className='relative w-full h-full rounded-full overflow-hidden'
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          background:
            "conic-gradient(from 0deg, #ff3b8a, #6af1ff, #ffd86a, #ff3b8a)",
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          rotate: {
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {/* Morphing Shape Overlay */}
        <motion.div
          className='absolute inset-0 rounded-full'
          animate={{
            borderRadius: ["50%", "30% 70% 70% 30% / 30% 30% 70% 70%", "50%"],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background:
              "conic-gradient(from 0deg, #ff3b8a99, #6af1ff99, #ffd86a99, #ff3b8a99)",
            filter: "blur(1px)",
          }}
        />

        {/* Always Active Pulsing Rings */}
        <motion.div
          className='absolute inset-0 rounded-full border-2 border-white/60'
          animate={{
            scale: [0.8, 2, 3],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />

        <motion.div
          className='absolute inset-0 rounded-full border border-cyan-400/40'
          animate={{
            scale: [1, 2.5, 4],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 2.5,
            delay: 0.4,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />

        {/* Always Active Spinning Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className='absolute w-2 h-2 rounded-full'
            style={{
              background: ["#ff3b8a", "#6af1ff", "#ffd86a"][i % 3],
              boxShadow: `0 0 8px ${["#ff3b8a", "#6af1ff", "#ffd86a"][i % 3]}`,
              left: "50%",
              top: "50%",
            }}
            animate={{
              x: Math.cos((i * 60 * Math.PI) / 180) * 30,
              y: Math.sin((i * 60 * Math.PI) / 180) * 30,
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Pulsing Center Core */}
        <motion.div
          className='absolute top-1/2 left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2'
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.8, 1, 0.8],
            boxShadow: [
              "0 0 20px #ff3b8a",
              "0 0 30px #6af1ff",
              "0 0 20px #ffd86a",
              "0 0 25px #ff3b8a",
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,1), rgba(255,255,255,0.3))",
          }}
        />
      </motion.div>

      {/* Always Active Glow Effect */}
      <motion.div
        className='absolute -inset-8 rounded-full'
        animate={{
          scale: [1, 1.4, 1.2],
          opacity: [0.6, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background:
            "radial-gradient(circle, #ff3b8a80, #6af1ff60, #ffd86a40, transparent)",
          filter: "blur(15px)",
        }}
      />

      {/* Click Burst Effect */}
      {isClicked && (
        <div className='absolute inset-0 pointer-events-none'>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`${clickCount}-${i}`}
              className='absolute w-3 h-3'
              style={{
                left: "50%",
                top: "50%",
                background: ["#ff3b8a", "#6af1ff", "#ffd86a"][i % 3],
                borderRadius: i % 2 === 0 ? "50%" : "0%",
                boxShadow: `0 0 12px ${
                  ["#ff3b8a", "#6af1ff", "#ffd86a"][i % 3]
                }`,
              }}
              initial={{
                scale: 0,
                x: 0,
                y: 0,
                opacity: 1,
                rotate: 0,
              }}
              animate={{
                scale: [0, 2, 0],
                x: Math.cos((i * 30 * Math.PI) / 180) * 100,
                y: Math.sin((i * 30 * Math.PI) / 180) * 100,
                opacity: [1, 0.8, 0],
                rotate: 720,
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.05,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Always Active Energy Trails */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`trail-${i}`}
          className='absolute'
          style={{
            width: "2px",
            height: "50px",
            background: `linear-gradient(to top, transparent, ${
              ["#ff3b8a", "#6af1ff", "#ffd86a", "#9d4edd"][i]
            }, transparent)`,
            left: "50%",
            top: "50%",
            transformOrigin: "bottom center",
            transform: `translateX(-50%) translateY(-25px) rotate(${
              i * 90
            }deg)`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scaleY: [0.5, 1.2, 0.5],
            rotateZ: [0, 180, 360],
          }}
          transition={{
            duration: 2.5,
            delay: i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
};

export default InteractivePartyBall;
