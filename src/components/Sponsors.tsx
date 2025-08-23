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
  { name: "Reckish", image: "/patners/reckish.png" },
  { name: "Ricky", image: "/patners/ricky.png" },
  { name: "Taari", image: "/patners/taari.png" },
  { name: "Yum", image: "/patners/yum.png" },
];

const Sponsors = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Create separate arrays to avoid mutation issues
  const duplicatedSponsors = [...sponsors, ...sponsors];
  const reversedSponsors = [...sponsors].reverse();
  const duplicatedReversedSponsors = [...reversedSponsors, ...reversedSponsors];

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

        {/* Infinite Scrolling Sponsors */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='relative overflow-hidden'
        >
          <div className='flex items-center'>
            <motion.div
              className='flex items-center space-x-12 whitespace-nowrap'
              animate={{
                x: [0, -1584], // Adjusted for smoother animation (11 sponsors * 144px)
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
              {duplicatedSponsors.map((sponsor, index) => (
                <motion.div
                  key={`${sponsor.name}-${index}`}
                  className='flex-shrink-0 w-32 h-20 relative group'
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className='glass rounded-xl p-4 w-full h-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-all group-hover:shadow-lg'>
                    <Image
                      src={sponsor.image}
                      alt={sponsor.name}
                      width={80}
                      height={40}
                      className='object-contain filter brightness-90 group-hover:brightness-110 transition-all'
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Second Row - Reverse Direction */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='relative overflow-hidden mt-8'
        >
          <div className='flex items-center'>
            <motion.div
              className='flex items-center space-x-12 whitespace-nowrap'
              animate={{
                x: [-1584, 0], // Reverse direction with matching distance
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 35,
                  ease: "linear",
                },
              }}
            >
              {duplicatedReversedSponsors.map((sponsor, index) => (
                <motion.div
                  key={`reverse-${sponsor.name}-${index}`}
                  className='flex-shrink-0 w-32 h-20 relative group'
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className='glass rounded-xl p-4 w-full h-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-all group-hover:shadow-lg'>
                    <Image
                      src={sponsor.image}
                      alt={sponsor.name}
                      width={80}
                      height={40}
                      className='object-contain filter brightness-90 group-hover:brightness-110 transition-all'
                    />
                  </div>
                </motion.div>
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
