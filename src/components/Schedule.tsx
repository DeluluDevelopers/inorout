"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  type: "performance" | "break" | "special";
  day: number;
}

const scheduleData: ScheduleItem[] = [
  // Day 1 - October 3rd, 2025
  {
    time: "4:00 PM",
    title: "Gates Open",
    description:
      "Welcome to Afro Vibes Festival 2025! Registration and welcome drinks",
    type: "special",
    day: 1,
  },
  {
    time: "5:00 PM",
    title: "Cultural Opening Ceremony",
    description:
      "Traditional performances celebrating African heritage and culture",
    type: "special",
    day: 1,
  },
  {
    time: "6:30 PM",
    title: "Emerging Artists Showcase",
    description: "Platform for upcoming talents to shine on the main stage",
    type: "performance",
    day: 1,
  },
  {
    time: "8:00 PM",
    title: "Afrobeat Legends",
    description:
      "Classic Afrobeat rhythms and contemporary fusion performances",
    type: "performance",
    day: 1,
  },
  {
    time: "10:00 PM",
    title: "Headliner Performance",
    description: "Main stage spectacular featuring international artists",
    type: "performance",
    day: 1,
  },
  {
    time: "12:00 AM",
    title: "Night Vibes Session",
    description: "Late night chill-out with ambient African sounds",
    type: "special",
    day: 1,
  },
  // Day 2 - October 4th, 2025
  {
    time: "3:00 PM",
    title: "Day 2 Opening",
    description:
      "Afternoon opening with acoustic sessions and artist interactions",
    type: "special",
    day: 2,
  },
  {
    time: "4:30 PM",
    title: "Cultural Fusion Workshop",
    description: "Interactive sessions blending different musical traditions",
    type: "special",
    day: 2,
  },
  {
    time: "6:00 PM",
    title: "Regional Artists Spotlight",
    description: "Celebrating local and regional talent from across India",
    type: "performance",
    day: 2,
  },
  {
    time: "8:00 PM",
    title: "International Collaboration",
    description:
      "Cross-cultural musical collaborations and fusion performances",
    type: "performance",
    day: 2,
  },
  {
    time: "10:30 PM",
    title: "Grand Finale",
    description: "Festival finale with all artists coming together",
    type: "performance",
    day: 2,
  },
  {
    time: "12:30 AM",
    title: "Closing Celebration",
    description: "Community gathering and farewell ceremony",
    type: "special",
    day: 2,
  },
];

const ScheduleItem = ({
  item,
  index,
  isLast,
}: {
  item: ScheduleItem;
  index: number;
  isLast: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "performance":
        return "var(--accent-pink)";
      case "special":
        return "var(--accent-cyan)";
      default:
        return "var(--accent-yellow)";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "performance":
        return (
          <svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
            <path d='M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm-2-7.5l5.5 3.5-5.5 3.5v-7z' />
          </svg>
        );
      case "special":
        return (
          <svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
            <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
          </svg>
        );
      default:
        return (
          <svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
            <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
          </svg>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className='relative mb-6'
    >
      {/* Timeline Line */}
      {!isLast && (
        <div className='absolute left-6 top-16 w-0.5 h-16 bg-gradient-to-b from-white/20 to-transparent' />
      )}

      <motion.div
        className='relative'
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className='glass rounded-xl p-6 cursor-pointer group hover:bg-white/5 transition-all duration-300'
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className='flex items-start space-x-6'>
            {/* Time Circle with Icon */}
            <div className='flex-shrink-0 relative'>
              <div
                className='w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg'
                style={{
                  backgroundColor: getTypeColor(item.type),
                  boxShadow: `0 0 20px ${getTypeColor(item.type)}40`,
                }}
              >
                {getTypeIcon(item.type)}
              </div>
              <div className='absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap'>
                <span className='text-xs font-mono text-white/60 bg-black/50 px-2 py-1 rounded'>
                  {item.time}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className='flex-1 min-w-0'>
              <div className='flex items-center justify-between mb-2'>
                <h3 className='font-heading font-bold text-xl md:text-2xl text-white group-hover:text-[var(--accent-cyan)] transition-colors'>
                  {item.title}
                </h3>

                {/* Type Badge */}
                <span
                  className='px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide'
                  style={{
                    backgroundColor: `${getTypeColor(item.type)}20`,
                    color: getTypeColor(item.type),
                    border: `1px solid ${getTypeColor(item.type)}40`,
                  }}
                >
                  {item.type}
                </span>
              </div>

              <p className='text-white/70 font-body text-sm md:text-base leading-relaxed mb-4'>
                {item.description}
              </p>

              {/* Expand Button */}
              <motion.button
                className='flex items-center space-x-2 text-[var(--accent-cyan)] hover:text-white transition-colors text-sm font-body'
                whileHover={{ x: 5 }}
              >
                <span>{isExpanded ? "Show Less" : "Show More"}</span>
                <motion.svg
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    d='M6 9l6 6 6-6'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </motion.svg>
              </motion.button>
            </div>
          </div>

          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className='overflow-hidden'
              >
                <div className='ml-18 mt-6 p-6 rounded-lg bg-gradient-to-r from-white/5 to-white/10 border border-white/10'>
                  <div className='grid md:grid-cols-2 gap-6'>
                    <div>
                      <h4 className='font-heading font-semibold text-white mb-3'>
                        Event Details
                      </h4>
                      <div className='space-y-2 text-sm'>
                        <div className='flex justify-between'>
                          <span className='text-white/60'>Duration:</span>
                          <span className='text-white'>90 minutes</span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-white/60'>Venue:</span>
                          <span className='text-white'>Main Stage</span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-white/60'>Capacity:</span>
                          <span className='text-white'>2,500 people</span>
                        </div>
                      </div>
                    </div>

                    {item.type === "performance" && (
                      <div>
                        <h4 className='font-heading font-semibold text-white mb-3'>
                          Quick Actions
                        </h4>
                        <div className='flex flex-col space-y-3'>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='px-4 py-2 bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)] rounded-lg hover:bg-[var(--accent-cyan)]/30 transition-colors text-sm font-body border border-[var(--accent-cyan)]/40'
                          >
                            View Artist Profile
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='px-4 py-2 bg-[var(--accent-pink)]/20 text-[var(--accent-pink)] rounded-lg hover:bg-[var(--accent-pink)]/30 transition-colors text-sm font-body border border-[var(--accent-pink)]/40'
                          >
                            Listen to Sample
                          </motion.button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Schedule = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedDay, setSelectedDay] = useState(1);

  const filteredSchedule = scheduleData.filter(
    (item) => item.day === selectedDay
  );

  return (
    <section
      id='schedule'
      className='py-20 px-6 bg-[var(--bg-mid)] relative overflow-hidden'
    >
      {/* Background Elements */}
      <div className='absolute top-0 right-20 w-80 h-80 bg-[var(--accent-cyan)]/5 rounded-full blur-3xl' />
      <div className='absolute bottom-0 left-20 w-96 h-96 bg-[var(--accent-yellow)]/5 rounded-full blur-3xl' />

      <div className='container mx-auto max-w-4xl relative z-10' ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-white'>
            Festival <span className='neon-text'>Schedule</span>
          </h2>
          <p className='font-body text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8'>
            Two days of groundbreaking celebration featuring diverse artists and
            cultural experiences
          </p>

          {/* Day Selector */}
          <div className='flex justify-center mb-12'>
            <div className='glass rounded-xl p-2 flex space-x-2'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDay(1)}
                className={`px-6 py-3 rounded-lg font-body font-semibold transition-all duration-300 ${
                  selectedDay === 1
                    ? "bg-[var(--accent-pink)] text-black"
                    : "text-white hover:bg-white/10"
                }`}
              >
                Day 1 - Oct 3rd
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDay(2)}
                className={`px-6 py-3 rounded-lg font-body font-semibold transition-all duration-300 ${
                  selectedDay === 2
                    ? "bg-[var(--accent-cyan)] text-black"
                    : "text-white hover:bg-white/10"
                }`}
              >
                Day 2 - Oct 4th
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className='space-y-4'>
          {filteredSchedule.map((item, index) => (
            <ScheduleItem
              key={`${item.day}-${item.time}-${item.title}`}
              item={item}
              index={index}
              isLast={index === filteredSchedule.length - 1}
            />
          ))}
        </div>

        {/* Timeline Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 0.8, delay: 0.5 }}
          className='mt-16 p-8 glass rounded-2xl'
        >
          <h3 className='font-heading font-bold text-2xl text-white mb-6 text-center'>
            Quick Timeline
          </h3>
          <div className='flex flex-wrap justify-center gap-4'>
            {scheduleData.map((item, index) => (
              <div
                key={`timeline-${index}`}
                className='flex flex-col items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors'
              >
                <div
                  className='w-2 h-2 rounded-full mb-2'
                  style={{
                    backgroundColor:
                      item.type === "performance"
                        ? "var(--accent-pink)"
                        : "var(--accent-cyan)",
                  }}
                />
                <span className='text-xs font-body text-white/60'>
                  {item.time}
                </span>
                <span className='text-xs font-body text-white text-center mt-1'>
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Schedule;
