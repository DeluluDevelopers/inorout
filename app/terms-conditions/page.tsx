"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function TermsConditions() {
  return (
    <main className='bg-[var(--bg-dark)] min-h-screen py-20 px-6'>
      <div className='container mx-auto max-w-4xl'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link
            href='/'
            className='inline-flex items-center text-[var(--accent-cyan)] hover:text-white mb-8 font-body transition-colors'
          >
            ← Back to Home
          </Link>

          <h1 className='font-heading font-bold text-4xl md:text-5xl text-white mb-8'>
            Terms & Conditions
          </h1>

          <div className='glass rounded-2xl p-8 text-white/80 font-body leading-relaxed space-y-6'>
            <p className='text-[var(--accent-cyan)] font-semibold'>
              Effective Date: August 23, 2025
            </p>

            <section>
              <h2 className='text-2xl font-bold text-white mb-4'>
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using our services, you accept and agree to be
                bound by the terms and provision of this agreement. If you do
                not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-4'>
                2. Event Access
              </h2>
              <p>
                Valid tickets are required for entry to the IN or Out Afro Vibe
                Festival 2025. Tickets are non-transferable and must be
                presented along with valid identification. Entry may be refused
                without valid documentation.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-4'>
                3. Code of Conduct
              </h2>
              <p>
                All attendees must conduct themselves in a respectful manner.
                Harassment, discrimination, violence, or disruptive behavior
                will not be tolerated and may result in immediate removal from
                the event without refund.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-4'>
                4. Prohibited Items
              </h2>
              <p>
                Weapons, illegal substances, outside food and beverages,
                professional recording equipment, and other items deemed
                inappropriate by event management are prohibited. Security
                screening will be conducted at entry points.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-4'>
                5. Liability
              </h2>
              <p>
                IN OR OUT Events and its affiliates shall not be liable for any
                personal injury, loss, or damage to property. Attendees
                participate at their own risk and are responsible for their
                personal belongings.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-4'>
                6. Event Changes
              </h2>
              <p>
                We reserve the right to make changes to the event schedule,
                lineup, or venue as necessary. In case of event cancellation due
                to circumstances beyond our control, refunds will be processed
                according to our refund policy.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-4'>
                7. Media Release
              </h2>
              <p>
                By attending the event, you consent to being photographed,
                filmed, or recorded for promotional purposes without
                compensation.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-4'>
                8. Contact Information
              </h2>
              <p>
                For questions regarding these terms and conditions, please
                contact us at:
              </p>
              <div className='mt-4 space-y-2'>
                <p>📧 Email: kjnrwhite@gmail.com</p>
                <p>📞 Phone: +91 8798914926, +91 7042581204</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
