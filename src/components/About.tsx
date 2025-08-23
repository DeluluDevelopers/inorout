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
      className='py-20 px-6 bg-[var(--bg-mid)] relative overflow-hidden'
    >
      {/* Background Elements */}
      <div className='absolute top-0 right-0 w-96 h-96 bg-[var(--accent-cyan)]/5 rounded-full blur-3xl' />
      <div className='absolute bottom-0 left-0 w-80 h-80 bg-[var(--accent-pink)]/5 rounded-full blur-3xl' />

      <div className='container mx-auto max-w-4xl relative z-10' ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className='text-center'
        >
          <h2 className='font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-8 text-white'>
            Where <span className='neon-text'>Cultures Collide</span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='font-body text-lg md:text-xl text-white/80 leading-relaxed max-w-4xl mx-auto mb-12'
          >
            Step into a world where African rhythms meet Indian spirituality,
            where ancient traditions dance with modern beats. Afro Vibes
            Festival 2025 isn&apos;t just an event—it&apos;s a cultural
            revolution happening in the sacred valleys of Rishikesh. Join
            thousands of souls from across the globe as we celebrate the
            beautiful chaos of diversity through music, art, and pure human
            connection.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'
          >
            <div className='glass rounded-2xl p-8 hover:bg-white/5 transition-all duration-300 group'>
              <div className='w-12 h-12 bg-gradient-to-r from-[var(--accent-pink)] to-[var(--accent-yellow)] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform'>
                <svg width='24' height='24' viewBox='0 0 24 24' fill='black'>
                  <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                </svg>
              </div>
              <h3 className='font-heading font-bold text-2xl text-white mb-4 group-hover:text-[var(--accent-cyan)] transition-colors'>
                Unity in Rhythm
              </h3>
              <p className='font-body text-white/70 leading-relaxed'>
                Where Afrobeat pulses meet Bollywood melodies, creating a
                symphony that speaks every language of the heart. Music becomes
                our common tongue.
              </p>
            </div>
            <div className='glass rounded-2xl p-8 hover:bg-white/5 transition-all duration-300 group'>
              <div className='w-12 h-12 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-pink)] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform'>
                <svg width='24' height='24' viewBox='0 0 24 24' fill='black'>
                  <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
                </svg>
              </div>
              <h3 className='font-heading font-bold text-2xl text-white mb-4 group-hover:text-[var(--accent-pink)] transition-colors'>
                Bridge Builder Mission
              </h3>
              <p className='font-body text-white/70 leading-relaxed'>
                Breaking down barriers one beat at a time. We&apos;re not just
                hosting a festival—we&apos;re fostering a global family through
                the universal language of music.
              </p>
            </div>
            <div className='glass rounded-2xl p-8 hover:bg-white/5 transition-all duration-300 group'>
              <div className='w-12 h-12 bg-gradient-to-r from-[var(--accent-yellow)] to-[var(--accent-cyan)] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform'>
                <svg width='24' height='24' viewBox='0 0 24 24' fill='black'>
                  <path d='M9 11H7v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9h-2m1-2V6a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v3m3-1l4 4-4 4' />
                </svg>
              </div>
              <h3 className='font-heading font-bold text-2xl text-white mb-4 group-hover:text-[var(--accent-yellow)] transition-colors'>
                Legacy of Love
              </h3>
              <p className='font-body text-white/70 leading-relaxed'>
                Creating memories that transcend borders and generations. Every
                artist showcased, every connection made, every moment shared
                builds our collective story.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.8, delay: 0.6 }}
            className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-8'
          >
            <div className='text-center'>
              <div className='text-3xl md:text-4xl font-heading font-bold text-[var(--accent-pink)] mb-2'>
                8+
              </div>
              <div className='text-white/60 font-body'>Hours of Music</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl md:text-4xl font-heading font-bold text-[var(--accent-cyan)] mb-2'>
                15+
              </div>
              <div className='text-white/60 font-body'>World-Class Artists</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl md:text-4xl font-heading font-bold text-[var(--accent-yellow)] mb-2'>
                5K+
              </div>
              <div className='text-white/60 font-body'>Expected Attendees</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
