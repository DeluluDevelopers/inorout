"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const hypemen = [
  {
    name: "Hypeman Jay",
    title: "Master of Ceremonies",
    bio: "Bringing unparalleled energy and charisma, Hypeman Jay is the voice of the party, ensuring the vibe never drops.",
    image: "/hypeman/hypeman jay.jpg",
  },
];

const Hypeman = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id='hypeman'
      ref={ref}
      className='py-20 px-6 bg-bg-dark relative overflow-hidden'
    >
      <div className='container mx-auto max-w-4xl relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-cream'>
            Meet the <span className='afro-heading'>Hypeman</span>
          </h2>
          <p className='font-body text-lg md:text-xl text-sand max-w-3xl mx-auto'>
            The driving force behind the festival&apos;s energy, keeping the crowd electrified.
          </p>
        </motion.div>

        <div className='flex justify-center'>
          {hypemen.map((hypeman, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='glass-warm rounded-2xl overflow-hidden shadow-2xl max-w-md w-full'
            >
              <div className='relative h-80'>
                <Image
                  src={hypeman.image}
                  alt={hypeman.name}
                  fill
                  className='object-cover object-top'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent' />
              </div>
              <div className='p-8 text-center'>
                <h3 className='font-heading font-bold text-3xl text-kente-gold mb-2'>
                  {hypeman.name}
                </h3>
                <p className='font-accent text-xl text-terracotta mb-4'>
                  {hypeman.title}
                </p>
                <p className='font-body text-cream/90 leading-relaxed'>
                  {hypeman.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hypeman;
