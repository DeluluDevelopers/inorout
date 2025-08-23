"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Location = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id='location'
      className='py-20 px-6 bg-[var(--bg-dark)] relative overflow-hidden'
    >
      {/* Background Elements */}
      <div className='absolute top-0 left-20 w-80 h-80 bg-[var(--accent-cyan)]/5 rounded-full blur-3xl' />
      <div className='absolute bottom-0 right-20 w-96 h-96 bg-[var(--accent-yellow)]/5 rounded-full blur-3xl' />

      <div className='container mx-auto max-w-6xl relative z-10' ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-white'>
            Event <span className='neon-text'>Location</span>
          </h2>
          <p className='font-body text-lg md:text-xl text-white/80 max-w-2xl mx-auto'>
            Join us in the spiritual and scenic beauty of Rishikesh for the Afro
            Vibes Festival 2025
          </p>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Location Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='space-y-8'
          >
            <div className='glass rounded-2xl p-8'>
              <h3 className='font-heading font-bold text-2xl text-white mb-6'>
                Rishikesh, Uttarakhand, India
              </h3>

              <div className='space-y-4'>
                <div className='flex items-start space-x-4'>
                  <div className='w-6 h-6 bg-[var(--accent-pink)] rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                    <svg
                      width='14'
                      height='14'
                      viewBox='0 0 24 24'
                      fill='white'
                    >
                      <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' />
                      <circle cx='12' cy='10' r='3' />
                    </svg>
                  </div>
                  <div>
                    <h4 className='font-body font-semibold text-white mb-1'>
                      Address
                    </h4>
                    <p className='text-white/70 font-body'>
                      Festival Grounds, Rishikesh
                      <br />
                      Uttarakhand 249137
                      <br />
                      India
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-4'>
                  <div className='w-6 h-6 bg-[var(--accent-cyan)] rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                    <svg
                      width='14'
                      height='14'
                      viewBox='0 0 24 24'
                      fill='white'
                    >
                      <circle cx='12' cy='12' r='10' />
                      <polyline points='12,6 12,12 16,14' />
                    </svg>
                  </div>
                  <div>
                    <h4 className='font-body font-semibold text-white mb-1'>
                      Event Dates
                    </h4>
                    <p className='text-white/70 font-body'>
                      October 3rd & 4th, 2025
                      <br />
                      Day 1: 4:00 PM onwards
                      <br />
                      Day 2: 3:00 PM onwards
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-4'>
                  <div className='w-6 h-6 bg-[var(--accent-yellow)] rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                    <svg
                      width='14'
                      height='14'
                      viewBox='0 0 24 24'
                      fill='black'
                    >
                      <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
                      <polyline points='9,22 9,12 15,12 15,22' />
                    </svg>
                  </div>
                  <div>
                    <h4 className='font-body font-semibold text-white mb-1'>
                      Capacity
                    </h4>
                    <p className='text-white/70 font-body'>
                      5,000+ attendees
                      <br />
                      Riverside venue
                      <br />
                      Historic monument backdrop
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Transportation Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className='glass rounded-2xl p-6'
            >
              <h4 className='font-heading font-bold text-xl text-white mb-4'>
                Getting There
              </h4>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='flex items-center space-x-3'>
                  <div className='w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center'>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='white'
                    >
                      <path d='M5 17h1.5l1.5-3h8l1.5 3H19v-7H5v7zM19 9V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2' />
                    </svg>
                  </div>
                  <span className='text-white/80 font-body text-sm'>
                    Free Parking Available
                  </span>
                </div>
                <div className='flex items-center space-x-3'>
                  <div className='w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center'>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='white'
                    >
                      <path d='M3 6h18v12H3V6zm0-2h18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z' />
                    </svg>
                  </div>
                  <span className='text-white/80 font-body text-sm'>
                    Nearest Railway: Rishikesh Station
                  </span>
                </div>
                <div className='flex items-center space-x-3'>
                  <div className='w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center'>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='white'
                    >
                      <path d='M16 4h-8a8 8 0 1 0 8 8V4z' />
                    </svg>
                  </div>
                  <span className='text-white/80 font-body text-sm'>
                    Cab & Auto Services
                  </span>
                </div>
                <div className='flex items-center space-x-3'>
                  <div className='w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center'>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='white'
                    >
                      <circle cx='12' cy='12' r='10' />
                      <path d='M16 8l-4 4-4-4' />
                    </svg>
                  </div>
                  <span className='text-white/80 font-body text-sm'>
                    Festival Shuttle Service
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Embedded Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className='relative'
          >
            <div className='glass rounded-2xl p-4 h-96 relative overflow-hidden'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462166.23842808396!2d78.18803430!3d30.08765292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39093e67cf93f111%3A0xcc78804a6f941bfe!2sRishikesh%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1692693600000!5m2!1sen!2sin'
                width='100%'
                height='100%'
                style={{ border: 0, borderRadius: "12px" }}
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                className='rounded-xl'
                title='Rishikesh, Uttarakhand - Afro Vibes Festival 2025 Venue'
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Location;
