"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const DJLineup = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      id='dj-lineup'
      className='min-h-screen py-16 md:py-20 px-4 md:px-6 bg-[var(--bg-dark)] relative overflow-hidden flex items-center'
    >
      {/* Background Elements - Consistent with other sections */}
      <div className='absolute top-0 left-0 w-72 md:w-96 h-72 md:h-96 bg-[var(--accent-pink)]/10 rounded-full blur-3xl' />
      <div className='absolute bottom-0 right-0 w-64 md:w-80 h-64 md:h-80 bg-[var(--accent-yellow)]/10 rounded-full blur-3xl' />

      <div className='container mx-auto max-w-7xl relative z-10 w-full'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-12 md:mb-16'
        >
          <h2 className='font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-white'>
            Meet Our <span className='neon-text'>Headliner</span>
          </h2>
          <p className='font-body text-lg md:text-xl text-white/80 max-w-3xl mx-auto'>
            WHSKYKLTR – Our Indian-Afro/Amapiano DJ for IN OR OUT Afro Vibe
            Festival 2025 ft RAW
          </p>
        </motion.div>

        {/* Main Content Layout */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center'>
          {/* Left Side - Main Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className='relative order-2 lg:order-1'
          >
            <div className='relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden glass'>
              <Image
                src='/indian/main_image.jpg'
                alt='IN OR OUT Afro Vibe Festival'
                fill
                className='object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent'></div>

              {/* Overlay Content */}
              <div className='absolute bottom-6 left-6 right-6'>
                <h3 className='font-heading text-2xl md:text-3xl font-bold text-white mb-2'>
                  Where <span className='neon-text'>Cultures Collide</span>
                </h3>
                <p className='text-white/90 font-body text-sm md:text-base'>
                  Experience the fusion of tradition and modernity
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - DJ Profile & Content */}
          <div className='space-y-8 order-1 lg:order-2'>
            {/* DJ Profile Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className='glass rounded-2xl p-6 md:p-8'
            >
              <div className='flex flex-col items-center text-center mb-6'>
                {/* DJ Image */}
                <div className='relative w-32 h-32 md:w-40 md:h-40 mb-6'>
                  <div className='absolute inset-0 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-pink)] rounded-full p-1'>
                    <div className='relative w-full h-full bg-[var(--bg-dark)] rounded-full overflow-hidden'>
                      <Image
                        src='/patners/whskykltr.jpg'
                        alt='DJ WHSKYKLTR'
                        fill
                        className='object-cover'
                      />
                    </div>
                  </div>
                </div>

                {/* DJ Info */}
                <div className='bg-gradient-to-r from-[var(--accent-pink)] to-[var(--accent-cyan)] text-black font-body font-bold px-4 py-2 rounded-full text-sm md:text-base inline-block mb-4'>
                  HEADLINER
                </div>
                <h3 className='font-heading text-3xl md:text-4xl font-bold text-white mb-4'>
                  WHSKYKLTR
                </h3>
              </div>

              {/* Detailed Description */}
              <div className='space-y-4 text-white/80 font-body text-sm md:text-base leading-relaxed'>
                <p>
                  WHSKYKLTR is a dynamic and multi-talented DJ with over 9 years
                  of experience, commanding the electronic music scene with
                  unmatched presence and sound. He has become a standout figure
                  known for his mastery of Commercial House, Afro House,
                  Amapiano, Tech-House, and Bollywood.
                </p>
                <p>
                  His high-energy love for Cultural Diversity performances have
                  electrified renowned clubs and events across North India,
                  earning him a reputation as one of the most versatile DJs in
                  the industry.
                </p>
                <p>
                  With his unique ability to blend global sounds with local
                  vibes, WHSKYKLTR is set to take the IN OR OUT Afro Vibe
                  Festival to another level!
                </p>
              </div>
            </motion.div>

            {/* Second Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className='relative'
            >
              <div className='relative aspect-[16/9] rounded-2xl overflow-hidden glass'>
                <Image
                  src='/indian/second_image.jpg'
                  alt='Cultural Celebration'
                  fill
                  className='object-cover'
                />
                <div className='absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40'></div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className='text-center mt-16'
        >
          <h4 className='font-heading text-2xl md:text-3xl font-bold text-white mb-4'>
            Ready for the Ultimate{" "}
            <span className='neon-text'>Cultural Fusion</span>?
          </h4>
          <p className='text-white/80 font-body text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8'>
            Join us for an extraordinary celebration where traditional culture
            meets modern party vibes. Experience the perfect fusion of heritage
            and contemporary entertainment at IN OR OUT Afro Vibe Festival.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DJLineup;
