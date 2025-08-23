"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.6,
    });

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const navItems = [
    { href: "#hero", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#lineup", label: "Lineup" },
    { href: "#schedule", label: "Schedule" },
    { href: "#tickets", label: "Tickets" },
    { href: "#gallery", label: "Gallery" },
    { href: "#location", label: "Location" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-textured backdrop-blur-xl border-b border-kente-gold/20 woven-texture h-16"
          : "bg-transparent h-20"
      }`}
    >
      <nav className='container mx-auto px-6 h-full flex items-center justify-between'>
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className='flex items-center space-x-3'
        >
          <div className='w-10 h-10 bg-afro-gradient rounded-full flex items-center justify-center animate-drum-beat'>
            <span className='text-bg-dark font-bold text-lg'>🎵</span>
          </div>
          <div className='font-heading font-bold text-xl'>
            <span className='text-kente-gold'>Afro</span>
            <span className='text-cream'>Vibe</span>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center space-x-8'>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`relative font-body font-medium transition-colors hover:text-kente-gold ${
                activeSection === item.href.slice(1)
                  ? "text-kente-gold"
                  : "text-cream"
              }`}
            >
              {item.label}
              {activeSection === item.href.slice(1) && (
                <motion.div
                  layoutId='activeNav'
                  className='absolute -bottom-1 left-0 right-0 h-0.5 bg-kente-gold'
                />
              )}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <motion.a
          href='#tickets'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='hidden md:flex items-center btn-tactile px-6 py-3 bg-afro-gradient text-bg-dark font-body font-semibold rounded-full hover:shadow-lg transition-shadow'
        >
          🎟️ Buy Tickets
        </motion.a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className='md:hidden p-2 text-cream'
          aria-label='Toggle mobile menu'
        >
          <motion.div
            animate={isMobileMenuOpen ? { rotate: 45 } : { rotate: 0 }}
            className='w-6 h-0.5 bg-kente-gold mb-1'
          />
          <motion.div
            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className='w-6 h-0.5 bg-kente-gold mb-1'
          />
          <motion.div
            animate={
              isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
            }
            className='w-6 h-0.5 bg-white'
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className='md:hidden glass-textured backdrop-blur-xl border-t border-kente-gold/20 woven-texture'
          >
            <div className='container mx-auto px-6 py-6'>
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className='block py-3 text-cream font-body hover:text-kente-gold transition-colors'
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href='#tickets'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className='inline-block mt-4 btn-tactile px-6 py-3 bg-afro-gradient text-bg-dark font-body font-semibold rounded-full'
              >
                🎟️ Buy Tickets
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
