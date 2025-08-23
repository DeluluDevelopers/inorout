"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const EyeFollower = () => {
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const faceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (leftEyeRef.current && rightEyeRef.current && faceRef.current) {
        const faceRect = faceRef.current.getBoundingClientRect();
        const faceCenterX = faceRect.left + faceRect.width / 2;
        const faceCenterY = faceRect.top + faceRect.height / 2;

        // Calculate angle from face center to mouse
        const angle = Math.atan2(
          e.clientY - faceCenterY,
          e.clientX - faceCenterX
        );

        // Calculate pupil positions (limit movement within eye bounds)
        const maxMovement = 8;
        const leftPupilX = Math.cos(angle) * maxMovement;
        const leftPupilY = Math.sin(angle) * maxMovement;
        const rightPupilX = Math.cos(angle) * maxMovement;
        const rightPupilY = Math.sin(angle) * maxMovement;

        // Apply transforms
        leftEyeRef.current.style.transform = `translate(${leftPupilX}px, ${leftPupilY}px)`;
        rightEyeRef.current.style.transform = `translate(${rightPupilX}px, ${rightPupilY}px)`;

        // Add slight 3D rotation to the face based on mouse position
        const rotateY = ((e.clientX - faceCenterX) / window.innerWidth) * 20;
        const rotateX = -((e.clientY - faceCenterY) / window.innerHeight) * 20;

        faceRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 2 }}
      className='fixed top-20 left-20 z-40 pointer-events-none'
    >
      <div
        ref={faceRef}
        className='relative w-32 h-32 transition-transform duration-100 ease-out'
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Face outline with neon glow */}
        <div className='absolute inset-0 rounded-full bg-gradient-to-br from-[var(--accent-pink)]/30 to-[var(--accent-cyan)]/30 backdrop-blur-md border-2 border-white/20 shadow-lg'>
          {/* Neon glow effect */}
          <div className='absolute inset-0 rounded-full bg-gradient-to-br from-[var(--accent-pink)]/20 to-[var(--accent-cyan)]/20 blur-xl animate-pulse' />
        </div>

        {/* Eyes container */}
        <div className='absolute inset-0 flex items-center justify-center space-x-4'>
          {/* Left Eye */}
          <div className='relative w-6 h-6 bg-white/90 rounded-full overflow-hidden shadow-inner'>
            <div
              ref={leftEyeRef}
              className='absolute top-1/2 left-1/2 w-3 h-3 bg-gradient-to-br from-[var(--accent-pink)] to-[var(--accent-cyan)] rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out'
            >
              {/* Pupil highlight */}
              <div className='absolute top-1 left-1 w-1 h-1 bg-white rounded-full' />
            </div>
          </div>

          {/* Right Eye */}
          <div className='relative w-6 h-6 bg-white/90 rounded-full overflow-hidden shadow-inner'>
            <div
              ref={rightEyeRef}
              className='absolute top-1/2 left-1/2 w-3 h-3 bg-gradient-to-br from-[var(--accent-pink)] to-[var(--accent-cyan)] rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out'
            >
              {/* Pupil highlight */}
              <div className='absolute top-1 left-1 w-1 h-1 bg-white rounded-full' />
            </div>
          </div>
        </div>

        {/* Mouth */}
        <div className='absolute bottom-6 left-1/2 transform -translate-x-1/2'>
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className='w-4 h-2 bg-gradient-to-r from-[var(--accent-pink)] to-[var(--accent-cyan)] rounded-full opacity-80'
          />
        </div>

        {/* Particles around face */}
        <div className='absolute -inset-4'>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className='absolute w-1 h-1 bg-white rounded-full'
              style={{
                top: `${20 + Math.sin((i * 60 * Math.PI) / 180) * 40}%`,
                left: `${20 + Math.cos((i * 60 * Math.PI) / 180) * 40}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default EyeFollower;
