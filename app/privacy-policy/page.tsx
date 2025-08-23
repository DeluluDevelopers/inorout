"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>

          <div className='glass rounded-2xl p-8 text-white/80 font-body leading-relaxed space-y-6'>
            <p className='text-[var(--accent-cyan)] font-semibold'>
              Effective Date: August 23, 2025
            </p>

            <section>
              <h2 className='text-2xl font-bold text-white mb-4'>
                1. Information We Collect
              </h2>
              <p>
                We collect information you provide directly to us, such as when
                you create an account, purchase tickets, or contact us. This may
                include your name, email address, phone number, and payment
                information.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-4'>
                2. How We Use Your Information
              </h2>
              <p>
                We use the information we collect to provide, maintain, and
                improve our services, process transactions, send you technical
                notices and support messages, and communicate with you about
                products, services, and events.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-4'>
                3. Information Sharing
              </h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal
                information to third parties without your consent, except as
                described in this policy or as required by law.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-4'>
                4. Data Security
              </h2>
              <p>
                We implement appropriate security measures to protect your
                personal information against unauthorized access, alteration,
                disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-4'>5. Cookies</h2>
              <p>
                We use cookies and similar technologies to enhance your
                experience on our website, analyze usage patterns, and deliver
                targeted content.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-4'>
                6. Your Rights
              </h2>
              <p>
                You have the right to access, update, or delete your personal
                information. You may also opt out of certain communications from
                us.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-4'>
                7. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at:
              </p>
              <div className='mt-4 space-y-2'>
                <p>📧 Email: info@inorout.world</p>
                <p>📞 Phone: +91 8798914926, +91 7042581204</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
