"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const JoinCommunity = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 1.5 }}
      className='fixed bottom-8 right-8 z-30'
    >
      <motion.a
        href='#community'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className='group relative flex items-center gap-3 bg-gradient-to-r from-[var(--accent-pink)]/90 to-[var(--accent-cyan)]/90 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 text-white font-medium cursor-pointer overflow-hidden'
      >
        {/* Animated Background */}
        <motion.div
          className='absolute inset-0 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-pink)]'
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "0%" : "-100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />

        {/* Content */}
        <div className='relative z-10 flex items-center gap-3'>
          {/* Icon */}
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.5 }}
            className='w-5 h-5 flex items-center justify-center'
          >
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9ZM19 21H5V3H13V9H19V21Z'
                fill='currentColor'
              />
            </svg>
          </motion.div>

          {/* Text */}
          <span className='font-body font-semibold text-sm tracking-wide'>
            Join Community
          </span>

          {/* Arrow */}
          <motion.div
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.2 }}
            className='w-4 h-4'
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M8.5 5L15.5 12L8.5 19'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </motion.div>
        </div>

        {/* Glow Effect */}
        <motion.div
          className='absolute -inset-1 bg-gradient-to-r from-[var(--accent-pink)]/30 to-[var(--accent-cyan)]/30 rounded-full blur-lg'
          animate={{
            opacity: isHovered ? 0.8 : 0.4,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.a>
    </motion.div>
  );
};

export default JoinCommunity;
