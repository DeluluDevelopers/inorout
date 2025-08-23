"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const ThankYou = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id='thankyou'
      className='py-20 px-6 bg-[var(--bg-mid)] relative overflow-hidden'
    >
      {/* Background Elements */}
      <div className='absolute top-0 left-20 w-80 h-80 bg-[var(--accent-pink)]/5 rounded-full blur-3xl' />
      <div className='absolute bottom-0 right-20 w-96 h-96 bg-[var(--accent-cyan)]/5 rounded-full blur-3xl' />

      <div className='container mx-auto max-w-6xl relative z-10' ref={ref}>
        {/* Thank You Message Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className='glass rounded-2xl p-8'
        >
          <div className='text-center mb-8'>
            <h3 className='font-heading font-bold text-3xl md:text-4xl text-white mb-4'>
              An ideal world we Dream of !!!
            </h3>
            <h4 className='font-heading font-bold text-2xl text-[var(--accent-cyan)] mb-2'>
              Thank You
            </h4>
            <p className='text-[var(--accent-pink)] font-body font-semibold text-lg mb-4'>
              IN or Out Afro vibe festival 2025 with Kjnrwhite
            </p>
            <div className='flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4 mb-6'>
              <span className='text-white/80 font-body'>📞 +91 8798914926</span>
              <span className='text-white/80 font-body'>📞 +91 7042581204</span>
              <span className='text-[var(--accent-cyan)] font-body'>
                ✉️ info@inorout.world
              </span>
            </div>
          </div>

          <div className='max-w-4xl mx-auto text-white/80 font-body leading-relaxed space-y-6'>
            <p className='text-center md:text-left'>
              On behalf of the IN OR OUT Events family, I extend my deepest
              gratitude for your unwavering support and participation in this
              groundbreaking celebration of Indian and African unity. Your
              presence and enthusiasm are at the heart of our mission to foster
              peace, love, and harmony through entertainment and cultural
              exchange. Together, we are creating lasting connections and
              shaping a brighter future of unity and understanding, we see the
              love and support towards this movement of unity between India and
              Africa. Your energy keeps us inspired to build bridges through
              culture, entertainment, and shared experiences.
            </p>
            <p className='text-center md:text-left'>
              My personal journey has been shaped by education, research, and a
              passion for innovation Just as renewable energy seeks to connect,
              sustain, and power communities, our vision at IN OR OUT is to
              create platforms that unite diverse cultures, power creativity,
              and sustain bonds across borders. It is my honor to walk this
              journey with you, building not only events but also a movement of
              cultural and social transformation.
            </p>

            {/* Dr. Stephen Torto Profile Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className='flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8 mt-8 pt-8 border-t border-white/20'
            >
              <div className='flex-shrink-0'>
                <div className='w-32 h-32 md:w-40 md:h-40 relative rounded-full overflow-hidden border-4 border-gradient-to-r from-[var(--accent-pink)] to-[var(--accent-cyan)] p-1'>
                  <div className='w-full h-full rounded-full overflow-hidden'>
                    <Image
                      src='/assets/topPic.png'
                      alt='Dr. Stephen Torto - Co-Founder & Executive Director, IN OR OUT Events'
                      width={160}
                      height={160}
                      className='object-cover w-full h-full'
                    />
                  </div>
                </div>
              </div>
              <div className='text-center md:text-left'>
                <p className='font-semibold text-white text-xl mb-2'>
                  Dr. Stephen Torto
                </p>
                <p className='text-[var(--accent-yellow)] font-semibold mb-4'>
                  Co-Founder & Executive Director, IN OR OUT Events
                </p>
                <p className='text-[var(--accent-cyan)] font-semibold text-lg'>
                  Thank you for being an integral part of this journey!
                </p>
              </div>
            </motion.div>

            {/* About kjnrwhite Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className='mt-12 pt-8 border-t border-white/20'
            >
              <div className='grid md:grid-cols-2 gap-8 items-center'>
                {/* About kjnrwhite */}
                <div>
                  <h3 className='font-heading font-bold text-2xl md:text-3xl text-kente-gold mb-6'>
                    About kjnrwhite
                  </h3>
                  <div className='space-y-4 text-cream/90'>
                    <p>
                      <strong>Nwa-Mazi Kanu Chukwuma Greg</strong> popularly
                      known as kjnrwhite is an Entertainer, Event Planner,
                      Nollywood Actor, and A Student of Sharda University,
                      Greater Noida, India. A Native of Ndi-Akunwanta Uno
                      Arondizuogu Imo state Nigeria.
                    </p>
                    <p>
                      kjnrwhite has the passion to create an Environment that
                      foster Harmony, Unity and Love, he has been actively
                      involved in the Entertainment industry since 2016.
                    </p>
                  </div>
                </div>

                {/* Central Image */}
                <div className='flex justify-center'>
                  <div className='relative w-64 h-80 rounded-2xl overflow-hidden border-4 border-kente-gold shadow-2xl'>
                    <Image
                      src='/assets/kjnrwhite.png'
                      alt='kjnrwhite - Nwa-Mazi Kanu Chukwuma Greg'
                      fill
                      className='object-cover'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent' />
                  </div>
                </div>
              </div>

              {/* Past Achievements */}
              <div className='mt-12'>
                <h3 className='font-heading font-bold text-2xl md:text-3xl text-kente-gold mb-6'>
                  Past Achievements
                </h3>
                <div className='space-y-4 text-cream/90'>
                  <p>
                    Successfully organized multiple events, including: A Trip to
                    Party 6; vibrant event celebrating youth and music. Wet
                    Before Winter: A well-received cultural and entertainment
                    experience. Known for his ability to bring together diverse
                    audiences and deliver memorable experiences.
                  </p>
                  <p>
                    <strong>Commitment to Excellence:</strong> With a proven
                    track record, KJNRWHITE is dedicated to ensuring that the
                    &ldquo;IN or OUT Afro vibe festival 2025&rdquo; will be a
                    world-class event, fostering cultural exchange and unity
                    between Indian nationals and Africans.
                  </p>
                </div>
              </div>

              {/* Thank you for coming banner */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{ duration: 0.8, delay: 0.8 }}
                className='mt-12 text-center'
              >
                <div className='relative'>
                  <h2 className='font-heading font-bold text-4xl md:text-6xl text-transparent bg-gradient-to-r from-kente-gold via-terracotta to-kente-red bg-clip-text animate-fire-flicker'>
                    Thank you for coming
                  </h2>
                  <div className='absolute inset-0 bg-gradient-to-r from-kente-gold/20 via-terracotta/20 to-kente-red/20 blur-xl -z-10 animate-pulse' />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ThankYou;
