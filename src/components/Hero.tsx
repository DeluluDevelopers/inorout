"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import InteractivePartyBall from "./InteractivePartyBall";

const Hero = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  // Fixed: Keep text visible during scroll - no fading
  const opacity = useTransform(scrollY, [0, 1000], [1, 1]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  return (
    <section
      id='hero'
      className='relative h-screen flex items-center justify-center overflow-hidden'
    >
      {/* Interactive Party Ball Components */}
      <InteractivePartyBall position='left' />
      <InteractivePartyBall position='right' />

      {/* Fallback Gradient Background */}
      <div className='absolute inset-0 bg-gradient-to-br from-[var(--bg-dark)] via-[var(--bg-mid)] to-black z-0' />

      {/* Animated Gradient Overlay */}
      <div className='absolute inset-0 bg-gradient-to-r from-[var(--accent-pink)]/20 via-transparent to-[var(--accent-cyan)]/20 animate-pulse z-10' />

      {/* Vignette */}
      <div className='absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/60 z-20' />

      {/* Floating Gradient Shapes */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            style={{ y: y1 }}
            className='absolute top-20 left-20 w-96 h-96 bg-[var(--accent-pink)]/30 rounded-full blur-3xl animate-float'
          />
          <motion.div
            style={{ y: y2 }}
            className='absolute bottom-20 right-20 w-80 h-80 bg-[var(--accent-cyan)]/20 rounded-full blur-3xl animate-float'
            transition={{ delay: 2 }}
          />
          <motion.div
            style={{ y: y1 }}
            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[var(--accent-yellow)]/10 rounded-full blur-3xl animate-float'
            transition={{ delay: 4 }}
          />
        </>
      )}

      {/* Main Content */}
      <motion.div
        style={{ opacity }}
        className='relative z-30 text-center px-6 max-w-6xl mx-auto'
      >
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className='font-heading font-black text-5xl md:text-7xl lg:text-8xl mb-6 leading-none'
        >
          <span className='block text-white'>IN or Out</span>
          <span className='block neon-text tracking-wider'>
            Afro Vibe Festival
          </span>
          <span className='block text-[var(--accent-yellow)] text-4xl md:text-5xl lg:text-6xl'>
            2025
          </span>
          <span className='block text-[var(--accent-cyan)] text-3xl md:text-4xl lg:text-5xl mt-2'>
            with Kjnrwhite
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className='font-body text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto tracking-wide'
        >
          A Day of Culture, Glamour, and Celebration - Building Unity Through
          Entertainment
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className='text-[var(--muted)] text-lg md:text-xl mb-12 font-body'
        >
          Bliss Resorts, Rishikesh | Day 1: 4pm till dawn | Day 2: 8am - 1am
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className='flex flex-col sm:flex-row gap-6 justify-center items-center'
        >
          <motion.a
            href='#tickets'
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(255, 59, 138, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className='px-10 py-4 bg-gradient-to-r from-[var(--accent-pink)] to-[var(--accent-yellow)] text-black font-body font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-shadow'
          >
            Buy Tickets
          </motion.a>

          <motion.a
            href='#lineup'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='px-10 py-4 bg-transparent border-2 border-white/30 text-white font-body font-semibold text-lg rounded-full backdrop-blur-sm hover:bg-white/10 transition-colors'
          >
            View Lineup
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
