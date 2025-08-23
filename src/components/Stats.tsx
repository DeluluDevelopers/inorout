"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";

interface StatItemProps {
  endValue: number;
  label: string;
  suffix?: string;
  delay?: number;
}

const StatItem = ({
  endValue,
  label,
  suffix = "",
  delay = 0,
}: StatItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(endValue);
      }, delay);
    }
  }, [isInView, endValue, delay, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        (ref.current as HTMLElement).textContent =
          Math.floor(latest).toLocaleString() + suffix;
      }
    });

    return () => unsubscribe();
  }, [springValue, suffix]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: delay / 1000 }}
      className='text-center'
    >
      <div className='relative'>
        <motion.div
          ref={ref}
          className='font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2 neon-text'
          style={{
            filter: "drop-shadow(0 0 20px var(--accent-pink))",
          }}
        >
          0{suffix}
        </motion.div>

        {/* Animated background glow */}
        <motion.div
          className='absolute inset-0 font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2 blur-sm opacity-50'
          animate={{
            textShadow: [
              "0 0 20px #ff3b8a",
              "0 0 30px #6af1ff",
              "0 0 20px #ffd86a",
              "0 0 25px #ff3b8a",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {endValue.toLocaleString()}
          {suffix}
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: (delay + 300) / 1000 }}
        className='font-body text-sm sm:text-base md:text-lg lg:text-xl text-white/80 font-semibold'
      >
        {label}
      </motion.p>
    </motion.div>
  );
};

const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const stats = [
    { endValue: 2025, label: "Festival Year", delay: 200 },
    { endValue: 5, label: "Expected Attendees", suffix: "K+", delay: 400 },
    { endValue: 15, label: "International Artists", suffix: "+", delay: 600 },
    { endValue: 2, label: "Days of Celebration", delay: 800 },
  ];

  return (
    <section className='py-16 sm:py-20 px-4 sm:px-6 bg-[var(--bg-dark)] relative overflow-hidden'>
      {/* Background Elements */}
      <div className='absolute top-0 left-10 w-72 h-72 bg-[var(--accent-pink)]/10 rounded-full blur-3xl' />
      <div className='absolute bottom-0 right-10 w-80 h-80 bg-[var(--accent-cyan)]/10 rounded-full blur-3xl' />
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--accent-yellow)]/5 rounded-full blur-3xl' />

      <div className='container mx-auto max-w-7xl relative z-10' ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-12 sm:mb-16'
        >
          <h2 className='font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-white'>
            Afro Vibes <span className='neon-text'>By Numbers</span>
          </h2>
          <p className='font-body text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto'>
            Experience the magnitude of our groundbreaking celebration of
            culture, unity, and entertainment
          </p>
        </motion.div>

        <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12'>
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              endValue={stat.endValue}
              label={stat.label}
              suffix={stat.suffix}
              delay={stat.delay}
            />
          ))}
        </div>

        {/* Animated floating particles */}
        {[...Array(8)].map((_, i) => {
          // Use deterministic positions based on index to avoid hydration mismatch
          const positions = [
            { left: "10%", top: "20%" },
            { left: "85%", top: "15%" },
            { left: "25%", top: "80%" },
            { left: "75%", top: "70%" },
            { left: "45%", top: "25%" },
            { left: "65%", top: "85%" },
            { left: "15%", top: "60%" },
            { left: "90%", top: "40%" },
          ];

          return (
            <motion.div
              key={`particle-${i}`}
              className='absolute w-2 h-2 rounded-full'
              style={{
                background: ["#ff3b8a", "#6af1ff", "#ffd86a"][i % 3],
                boxShadow: `0 0 10px ${
                  ["#ff3b8a", "#6af1ff", "#ffd86a"][i % 3]
                }`,
                left: positions[i].left,
                top: positions[i].top,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Stats;
