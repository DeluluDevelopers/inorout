"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function RefundPolicy() {
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
            Refund Policy
          </h1>

          <div className='glass rounded-2xl p-8 text-white/80 font-body leading-relaxed space-y-6'>
            <p className='text-[var(--accent-cyan)] font-semibold'>
              Effective Date: August 23, 2025
            </p>

            <section>
              <h2 className='text-2xl font-bold text-white mb-4'>
                1. General Refund Policy
              </h2>
              <p>
                All ticket sales for the IN or Out Afro Vibe Festival 2025 are
                final. Refunds will only be provided in specific circumstances
                as outlined in this policy.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-4'>
                2. Event Cancellation
              </h2>
              <p>
                If the event is cancelled by IN OR OUT Events due to
                circumstances beyond our control (including but not limited to
                weather, natural disasters, or government restrictions), full
                refunds will be processed within 14-30 business days.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-4'>
                3. Event Postponement
              </h2>
              <p>
                In case of event postponement, tickets will remain valid for the
                rescheduled date. If you cannot attend the new date, you may
                request a refund within 7 days of the postponement announcement.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-4'>
                4. Lineup Changes
              </h2>
              <p>
                Minor changes to the event lineup, schedule, or venue layout do
                not qualify for refunds. Significant lineup changes (headliner
                cancellations) may be eligible for partial refunds at the
                discretion of event management.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-4'>
                5. Medical Emergencies
              </h2>
              <p>
                Refunds for medical emergencies will be considered on a
                case-by-case basis and require appropriate medical
                documentation. Requests must be submitted at least 48 hours
                before the event start time.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-4'>
                6. Processing Fees
              </h2>
              <p>
                All refunds are subject to applicable processing fees. Credit
                card processing fees and service charges are non-refundable even
                in cases where the ticket price is refunded.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-4'>
                7. Refund Process
              </h2>
              <p>
                Approved refunds will be processed to the original method of
                payment within 14-30 business days. You will receive a
                confirmation email once the refund has been processed.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-4'>
                8. No-Show Policy
              </h2>
              <p>
                Failure to attend the event does not qualify for a refund.
                Please ensure you can attend before purchasing tickets.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-4'>
                9. Contact for Refund Requests
              </h2>
              <p>
                To request a refund or for questions about this policy, please
                contact us at:
              </p>
              <div className='mt-4 space-y-2'>
                <p>📧 Email: kjnrwhite@gmail.com</p>
                <p>📞 Phone: +91 8798914926, +91 7042581204</p>
                <p className='text-[var(--accent-yellow)]'>
                  Please include your order number and reason for refund
                  request.
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
