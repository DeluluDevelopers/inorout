"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id='about'
      className='py-16 md:py-20 px-4 md:px-6 bg-gradient-to-br from-[var(--bg-mid)] via-[var(--bg-dark)] to-[var(--bg-mid)] relative overflow-hidden'
    >
      {/* Enhanced Background Elements */}
      <div className='absolute top-0 right-0 w-72 md:w-96 h-72 md:h-96 bg-[var(--accent-cyan)]/10 rounded-full blur-3xl animate-pulse' />
      <div className='absolute bottom-0 left-0 w-64 md:w-80 h-64 md:h-80 bg-[var(--accent-pink)]/10 rounded-full blur-3xl animate-pulse delay-1000' />
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 md:w-[500px] h-96 md:h-[500px] bg-[var(--accent-yellow)]/5 rounded-full blur-3xl' />

      <div className='container mx-auto max-w-7xl relative z-10' ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className='text-center'
        >
          <h2 className='font-heading font-bold text-3xl md:text-5xl lg:text-7xl mb-6 md:mb-8 text-white leading-tight'>
            Where{" "}
            <span className='neon-text bg-gradient-to-r from-[var(--accent-cyan)] via-[var(--accent-pink)] to-[var(--accent-yellow)] bg-clip-text text-transparent'>
              Cultures Collide
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='font-body text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-5xl mx-auto mb-12 md:mb-16 px-4'
          >
            Step into a world where African rhythms meet Indian spirituality,
            where ancient traditions dance with modern beats. In Or Out World
            isn&apos;t just an event—it&apos;s a cultural revolution happening
            in the heart of celebration. Join thousands of souls from across the
            globe as we celebrate the beautiful chaos of diversity through
            music, art, and pure human connection.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16 px-4'
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className='glass rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-all duration-300 group border border-white/10'
            >
              <div className='w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-[var(--accent-pink)] to-[var(--accent-yellow)] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform mx-auto md:mx-0'>
                <svg width='24' height='24' viewBox='0 0 24 24' fill='black'>
                  <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                </svg>
              </div>
              <h3 className='font-heading font-bold text-xl md:text-2xl text-white mb-4 group-hover:text-[var(--accent-cyan)] transition-colors text-center md:text-left'>
                Unity in Rhythm
              </h3>
              <p className='font-body text-white/80 leading-relaxed text-sm md:text-base text-center md:text-left'>
                Where global beats meet local hearts, creating a symphony that
                speaks every language of the soul. Music becomes our common
                tongue.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className='glass rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-all duration-300 group border border-white/10'
            >
              <div className='w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-pink)] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform mx-auto md:mx-0'>
                <svg width='24' height='24' viewBox='0 0 24 24' fill='black'>
                  <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
                </svg>
              </div>
              <h3 className='font-heading font-bold text-xl md:text-2xl text-white mb-4 group-hover:text-[var(--accent-pink)] transition-colors text-center md:text-left'>
                Bridge Builder Mission
              </h3>
              <p className='font-body text-white/80 leading-relaxed text-sm md:text-base text-center md:text-left'>
                Breaking down barriers one beat at a time. We&apos;re not just
                hosting a festival—we&apos;re fostering a global family through
                the universal language of music.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className='glass rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-all duration-300 group border border-white/10'
            >
              <div className='w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-[var(--accent-yellow)] to-[var(--accent-cyan)] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform mx-auto md:mx-0'>
                <svg width='24' height='24' viewBox='0 0 24 24' fill='black'>
                  <path d='M9 11H7v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9h-2m1-2V6a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v3m3-1l4 4-4 4' />
                </svg>
              </div>
              <h3 className='font-heading font-bold text-xl md:text-2xl text-white mb-4 group-hover:text-[var(--accent-yellow)] transition-colors text-center md:text-left'>
                Legacy of Love
              </h3>
              <p className='font-body text-white/80 leading-relaxed text-sm md:text-base text-center md:text-left'>
                Creating memories that transcend borders and generations. Every
                artist showcased, every connection made, every moment shared
                builds our collective story.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.8, delay: 0.6 }}
            className='mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4'
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className='text-center p-6 glass rounded-xl hover:bg-white/10 transition-all'
            >
              <div className='text-3xl md:text-5xl font-heading font-bold text-[var(--accent-pink)] mb-2'>
                8+
              </div>
              <div className='text-white/80 font-body text-sm md:text-base'>
                Hours of Music
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className='text-center p-6 glass rounded-xl hover:bg-white/10 transition-all'
            >
              <div className='text-3xl md:text-5xl font-heading font-bold text-[var(--accent-cyan)] mb-2'>
                15+
              </div>
              <div className='text-white/80 font-body text-sm md:text-base'>
                World-Class Artists
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className='text-center p-6 glass rounded-xl hover:bg-white/10 transition-all'
            >
              <div className='text-3xl md:text-5xl font-heading font-bold text-[var(--accent-yellow)] mb-2'>
                5K+
              </div>
              <div className='text-white/80 font-body text-sm md:text-base'>
                Expected Attendees
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
