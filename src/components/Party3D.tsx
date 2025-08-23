"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Party3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring animations for smooth movement
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate rotation based on mouse position
      const rotateX = (e.clientY - centerY) * 0.1;
      const rotateY = (e.clientX - centerX) * 0.1;
      
      mouseX.set(rotateY);
      mouseY.set(-rotateX);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 2000);
  };

  return (
    <div className="fixed top-8 right-8 z-[9999] pointer-events-none">
      <motion.div
        ref={containerRef}
        className="relative w-32 h-32 md:w-40 md:h-40 cursor-pointer pointer-events-auto"
        style={{
          rotateX: springY,
          rotateY: springX,
          transformStyle: "preserve-3d",
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleClick}
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Main 3D Cube */}
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{
            rotateX: isClicked ? 360 : 0,
            rotateY: isClicked ? 360 : 0,
          }}
          transition={{
            duration: 2,
            ease: "easeOut",
          }}
        >
          {/* Cube faces */}
          {[
            { transform: "translateZ(4rem)", bg: "from-pink-500 to-purple-600" },
            { transform: "rotateY(90deg) translateZ(4rem)", bg: "from-cyan-500 to-blue-600" },
            { transform: "rotateY(-90deg) translateZ(4rem)", bg: "from-yellow-500 to-orange-600" },
            { transform: "rotateX(90deg) translateZ(4rem)", bg: "from-green-500 to-teal-600" },
            { transform: "rotateX(-90deg) translateZ(4rem)", bg: "from-red-500 to-pink-600" },
            { transform: "rotateY(180deg) translateZ(4rem)", bg: "from-indigo-500 to-purple-600" },
          ].map((face, index) => (
            <motion.div
              key={index}
              className={`absolute inset-0 w-full h-full bg-gradient-to-br ${face.bg} rounded-lg shadow-2xl border border-white/20`}
              style={{
                transform: face.transform,
                backfaceVisibility: "hidden",
              }}
              animate={{
                opacity: isHovered ? 0.9 : 0.7,
              }}
            >
              {/* Face content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-white text-2xl md:text-3xl font-bold"
                  animate={{
                    scale: isHovered ? 1.2 : 1,
                    rotate: isClicked ? 180 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {index === 0 && "🎉"}
                  {index === 1 && "🎵"}
                  {index === 2 && "💃"}
                  {index === 3 && "🕺"}
                  {index === 4 && "🎪"}
                  {index === 5 && "✨"}
                </motion.div>
              </div>
              
              {/* Sparkles */}
              {isHovered && (
                <div className="absolute inset-0">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white rounded-full"
                      style={{
                        left: `${20 + i * 12}%`,
                        top: `${20 + (i % 3) * 20}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Glowing ring effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, #ff3b8a, #00d4ff, #ffd700, #ff3b8a)",
            transform: "translateZ(-1rem)",
          }}
          animate={{
            rotate: isHovered ? 360 : 0,
            scale: isHovered ? 1.3 : 1.2,
            opacity: isHovered ? 0.6 : 0.3,
          }}
          transition={{
            rotate: {
              duration: 3,
              repeat: isHovered ? Infinity : 0,
              ease: "linear",
            },
            scale: { duration: 0.3 },
            opacity: { duration: 0.3 },
          }}
        />

        {/* Pulsing particles */}
        {isClicked && (
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: `hsl(${i * 30}, 100%, 60%)`,
                  left: "50%",
                  top: "50%",
                }}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos((i * 30) * Math.PI / 180) * 100,
                  y: Math.sin((i * 30) * Math.PI / 180) * 100,
                }}
                transition={{
                  duration: 2,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        )}

        {/* Click hint */}
        {!isClicked && (
          <motion.div
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm font-medium whitespace-nowrap"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            Click for party! 🎉
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Party3D;
