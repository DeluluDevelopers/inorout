"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const socialLinks = [
    {
      name: "Instagram",
      icon: "instagram",
      url: "https://www.instagram.com/inorout_events?igsh=djgwdDFxb3VmdjAx&utm_source=qr",
    },
    {
      name: "WhatsApp",
      icon: "whatsapp",
      url: "https://www.whatsapp.com/channel/0029VamAW8X0lwgj41sJzz3e",
    },
  ];

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Lineup", href: "#lineup" },
    { name: "Schedule", href: "#schedule" },
    { name: "Tickets", href: "#tickets" },
    { name: "Location", href: "#location" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms-conditions" },
    { name: "Refund Policy", href: "/refund-policy" },
  ];

  return (
    <footer className='bg-[var(--bg-dark)] border-t border-white/10 relative overflow-hidden'>
      {/* Background Elements */}
      <div className='absolute top-0 left-0 w-96 h-96 bg-[var(--accent-pink)]/5 rounded-full blur-3xl' />
      <div className='absolute bottom-0 right-0 w-80 h-80 bg-[var(--accent-cyan)]/5 rounded-full blur-3xl' />

      <div className='container mx-auto px-6 py-16 relative z-10' ref={ref}>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12'>
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className='lg:col-span-1'
          >
            <div className='flex items-center space-x-3 mb-6'>
              <div className='w-10 h-10 bg-gradient-to-r from-[var(--accent-pink)] to-[var(--accent-cyan)] rounded-full flex items-center justify-center'>
                <span className='text-black font-bold text-lg'>F</span>
              </div>
              <span className='font-heading font-bold text-2xl text-white'>
                In or Out
              </span>
            </div>
            <p className='text-white/70 font-body leading-relaxed mb-6'>
              Creating unforgettable experiences where music, art, and community
              come together in perfect harmony. Join the In Or Out .
            </p>

            {/* Social Links */}
            <div className='flex space-x-4'>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className='w-10 h-10 bg-white/10 hover:bg-[var(--accent-pink)] rounded-lg flex items-center justify-center transition-colors group'
                  aria-label={social.name}
                >
                  {social.icon === "instagram" && (
                    <svg
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='text-white group-hover:text-black'
                    >
                      <path d='M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z' />
                    </svg>
                  )}
                  {social.icon === "whatsapp" && (
                    <svg
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='text-white group-hover:text-black'
                    >
                      <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.51 3.488' />
                    </svg>
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className='font-heading font-bold text-xl text-white mb-6'>
              Quick Links
            </h3>
            <ul className='space-y-3'>
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className='text-white/70 hover:text-[var(--accent-cyan)] font-body transition-colors'
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className='font-heading font-bold text-xl text-white mb-6'>
              Legal
            </h3>
            <ul className='space-y-3'>
              {legalLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className='text-white/70 hover:text-[var(--accent-cyan)] font-body transition-colors'
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className='border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'
        >
          <p className='text-white/60 font-body text-sm'>
            © 2024 In or Out. All rights reserved. Made with ❤️ for the music
            community.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
