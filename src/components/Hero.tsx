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
      className='relative h-screen flex items-center justify-center overflow-hidden earth-texture'
    >
      {/* Interactive Party Ball Components */}
      <InteractivePartyBall position='left' />
      <InteractivePartyBall position='right' />

      {/* Afro-inspired Background Layers */}
      <div className='absolute inset-0 bg-gradient-to-br from-[var(--bg-dark)] via-[var(--bg-mid)] to-[var(--clay)] z-0' />

      {/* Kente Pattern Overlay */}
      <div className='absolute inset-0 kente-pattern opacity-20 z-5' />

      {/* Warm Gradient Overlay */}
      <div className='absolute inset-0 bg-gradient-to-r from-[var(--terracotta)]/30 via-transparent to-[var(--kente-gold)]/20 animate-fire-flicker z-10' />

      {/* Vignette with earthy tones */}
      <div className='absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[var(--bg-dark)]/80 z-20' />

      {/* Floating Cultural Elements */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            style={{ y: y1 }}
            className='absolute top-20 left-20 w-96 h-96 bg-[var(--terracotta)]/40 rounded-full blur-3xl animate-grass-sway'
          />
          <motion.div
            style={{ y: y2 }}
            className='absolute bottom-20 right-20 w-80 h-80 bg-[var(--kente-gold)]/30 rounded-full blur-3xl animate-drum-beat'
            transition={{ delay: 2 }}
          />
          {/* African-inspired accent shapes */}
          <motion.div
            style={{ y: y1 }}
            className='absolute top-1/3 right-1/4 w-64 h-64 bg-[var(--sage)]/25 rounded-full blur-2xl animate-rhythm'
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
          <span className='block text-cream'>IN or Out</span>
          <span className='block afro-heading tracking-wider animate-rhythm'>
            Afro Vibe Festival
          </span>
          <span className='block text-kente-gold text-4xl md:text-5xl lg:text-6xl animate-fire-flicker'>
            2025
          </span>
          <span className='block text-sage text-3xl md:text-4xl lg:text-5xl mt-2'>
            with Kjnrwhite
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className='font-body text-xl md:text-2xl text-cream/90 mb-8 max-w-2xl mx-auto tracking-wide'
        >
          A Day of Culture, Glamour, and Celebration - Building Unity Through
          Entertainment
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className='text-sand text-lg md:text-xl mb-12 font-body'
        >
          Bliss Resorts, Rishikesh | Day 1: 4pm till dawn | Day 2: 8am till dawn
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
              boxShadow: "0 20px 40px rgba(255, 215, 0, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className='btn-tactile px-10 py-4 bg-afro-gradient text-bg-dark font-body font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-shadow'
          >
            🎟️ Buy Tickets
          </motion.a>

          <motion.a
            href='#lineup'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='px-10 py-4 glass-warm border-2 border-kente-gold/50 text-cream font-body font-semibold text-lg rounded-full backdrop-blur-sm hover:bg-kente-gold/10 transition-colors'
          >
            🎵 View Lineup
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
