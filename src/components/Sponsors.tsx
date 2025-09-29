"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const sponsors = [
  { name: "Africa India", image: "/patners/afica_india.png" },
  { name: "Afri", image: "/patners/afri.png" },
  { name: "Bliss", image: "/patners/bliss.png" },
  { name: "DJ Leslie", image: "/patners/djleslie.png" },
  { name: "Gaga", image: "/patners/gaga.png" },
  { name: "In Or Out", image: "/patners/inOrOut.png" },
  { name: "IWE", image: "/patners/iwe.png" },
  { name: "Mam Pikin", image: "/patners/mam pikin.png" },
  { name: "Reckish", image: "/patners/reckish.png" },
  { name: "Ricky", image: "/patners/ricky.png" },
  { name: "Taari", image: "/patners/taari.png" },
  { name: "Yum", image: "/patners/yum.png" },
  { name: "Stott Event", image: "/patners/stott_event.jpg" },
  { name: "Afro Entertainment", image: "/patners/afro entertainment.jpg" },
  { name: "Malaiway", image: "/patners/malaiway.jpg" },
  {
    name: "New Partner",
    image: "/patners/WhatsApp Image 2025-08-26 at 19.49.22_bfe6af05.jpg",
  },
  { name: "WHSKYKLTR", image: "/patners/whskykltr.jpg" },
  { name: "Playboy", image: "/patners/playboy.jpg" },
  { name: "global center fm", image: "/patners/global center fm.jpg" },
  { name: "goldern animation", image: "/patners/goldern animation.jpg" },
  { name: "thulo monare", image: "/patners/thulo monare.jpg" },
  { name: "wds party", image: "/patners/wda party.jpg" },
  { name: "we", image: "/patners/we.jpg" },
  { name: "southSide", image: "/patners/southSide.jpg" },
];

const Sponsors = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id='sponsors'
      className='py-20 px-6 bg-[var(--bg-mid)] relative overflow-hidden'
    >
      {/* Background Elements */}
      <div className='absolute top-0 left-20 w-80 h-80 bg-[var(--accent-pink)]/5 rounded-full blur-3xl' />
      <div className='absolute bottom-0 right-20 w-96 h-96 bg-[var(--accent-cyan)]/5 rounded-full blur-3xl' />

      <div className='container mx-auto max-w-6xl relative z-10' ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-white'>
            Our <span className='neon-text'>Partners</span>
          </h2>
          <p className='font-body text-lg md:text-xl text-white/80 max-w-3xl mx-auto'>
            Proudly supported by amazing brands and organizations that believe
            in cultural unity and diversity
          </p>
        </motion.div>

        {/* First Row - Left to Right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='relative overflow-hidden mb-8 py-4'
        >
          <div className='flex items-center'>
            <motion.div
              className='flex items-center space-x-8 whitespace-nowrap'
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {[...sponsors, ...sponsors].map((sponsor, index) => (
                <div
                  key={`row1-${sponsor.name}-${index}`}
                  className='flex-shrink-0 w-44 h-32 p-2'
                >
                  <motion.div
                    className='w-full h-full bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-2xl border border-white/30 flex items-center justify-center p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer relative overflow-hidden'
                    whileHover={{
                      scale: 1.08,
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      borderColor: "rgba(255, 255, 255, 0.5)",
                    }}
                    style={{ transformOrigin: "center" }}
                  >
                    {/* Subtle inner glow */}
                    <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                    <Image
                      src={sponsor.image}
                      alt={sponsor.name}
                      width={120}
                      height={80}
                      className='object-contain max-w-full max-h-full filter brightness-95 group-hover:brightness-110 contrast-105 group-hover:contrast-110 transition-all duration-300 relative z-10'
                    />
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Second Row - Right to Left */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='relative overflow-hidden py-4'
        >
          <div className='flex items-center'>
            <motion.div
              className='flex items-center space-x-8 whitespace-nowrap'
              animate={{
                x: ["-50%", "0%"],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {[
                ...sponsors.slice().reverse(),
                ...sponsors.slice().reverse(),
              ].map((sponsor, index) => (
                <div
                  key={`row2-${sponsor.name}-${index}`}
                  className='flex-shrink-0 w-44 h-32 p-2'
                >
                  <motion.div
                    className='w-full h-full bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-2xl border border-white/30 flex items-center justify-center p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer relative overflow-hidden'
                    whileHover={{
                      scale: 1.08,
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      borderColor: "rgba(255, 255, 255, 0.5)",
                    }}
                    style={{ transformOrigin: "center" }}
                  >
                    {/* Subtle inner glow */}
                    <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                    <Image
                      src={sponsor.image}
                      alt={sponsor.name}
                      width={120}
                      height={80}
                      className='object-contain max-w-full max-h-full filter brightness-95 group-hover:brightness-110 contrast-105 group-hover:contrast-110 transition-all duration-300 relative z-10'
                    />
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Become Partner Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className='text-center mt-16'
        >
          <div className='glass rounded-2xl p-8 max-w-2xl mx-auto'>
            <h3 className='font-heading font-bold text-2xl text-white mb-4'>
              Become Our Partner
            </h3>
            <p className='text-white/70 font-body mb-6'>
              Join us in celebrating cultural diversity and supporting emerging
              artists. Partner with Afro Vibes Festival 2025.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='px-8 py-3 bg-gradient-to-r from-[var(--accent-pink)] to-[var(--accent-cyan)] text-black font-body font-semibold rounded-full hover:shadow-xl transition-shadow'
            >
              Partner With Us
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Sponsors;
