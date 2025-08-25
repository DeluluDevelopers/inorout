"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

interface TicketTier {
  name: string;
  price: string;
  features: string[];
  highlighted?: boolean;
  available: boolean;
}

const ticketTiers: TicketTier[] = [
  {
    name: "General",
    price: "TBA",
    features: [
      "General admission access",
      "Access to main stage area",
      "Complimentary welcome drink",
      "Event merchandise discount",
    ],
    available: true,
  },
  {
    name: "VIP",
    price: "TBA",
    features: [
      "VIP viewing area access",
      "Express entry & dedicated entrance",
      "Premium bar access",
      "Meet & greet opportunities",
      "Exclusive VIP lounge",
      "Complimentary food & drinks",
    ],
    highlighted: true,
    available: true,
  },
  {
    name: "Ultra",
    price: "TBA",
    features: [
      "Ultra premium experience",
      "Backstage access & artist interactions",
      "Private hospitality suite",
      "Premium catering & unlimited drinks",
      "Exclusive after-party access",
      "Personal concierge service",
      "Official event photography",
    ],
    available: true,
  },
];

const TicketModal = ({
  isOpen,
  onClose,
  ticketName,
}: {
  isOpen: boolean;
  onClose: () => void;
  ticketName: string;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    quantity: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock ticket processing
    alert(
      `Thank you! Your ${ticketName} ticket(s) have been reserved. Check your email for confirmation.`
    );
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6'
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className='glass rounded-2xl p-8 max-w-md w-full'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex justify-between items-center mb-6'>
              <h3 className='font-heading font-bold text-2xl text-white'>
                Purchase {ticketName} Ticket
              </h3>
              <button
                onClick={onClose}
                className='text-white/60 hover:text-white transition-colors'
              >
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M18 6L6 18M6 6l12 12'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block text-white/80 font-body text-sm mb-2'>
                  Full Name
                </label>
                <input
                  type='text'
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className='w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[var(--accent-cyan)]'
                  placeholder='Enter your full name'
                />
              </div>

              <div>
                <label className='block text-white/80 font-body text-sm mb-2'>
                  Email Address
                </label>
                <input
                  type='email'
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className='w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[var(--accent-cyan)]'
                  placeholder='Enter your email'
                />
              </div>

              <div>
                <label className='block text-white/80 font-body text-sm mb-2'>
                  Quantity
                </label>
                <select
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      quantity: parseInt(e.target.value),
                    })
                  }
                  className='w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[var(--accent-cyan)]'
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option
                      key={num}
                      value={num}
                      className='bg-[var(--bg-dark)]'
                    >
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <div className='pt-4'>
                <button
                  type='submit'
                  className='w-full py-3 bg-gradient-to-r from-[var(--accent-pink)] to-[var(--accent-yellow)] text-black font-body font-bold rounded-lg hover:shadow-lg transition-shadow'
                >
                  Reserve Tickets
                </button>
                <p className='text-white/60 text-xs mt-2 text-center'>
                  Mock purchase - no actual payment will be processed
                </p>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const TicketCard = ({
  ticket,
  index,
}: {
  ticket: TicketTier;
  index: number;
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        className={`relative ${
          ticket.highlighted ? "transform scale-105" : ""
        }`}
      >
        {ticket.highlighted && (
          <motion.div
            animate={{ rotate: [0, 1, -1, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className='absolute -inset-1 bg-gradient-to-r from-[var(--accent-pink)] to-[var(--accent-cyan)] rounded-2xl blur-sm opacity-30'
          />
        )}

        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          className={`relative glass rounded-2xl p-8 h-full ${
            ticket.highlighted
              ? "border-2 border-[var(--accent-cyan)]/50 bg-[var(--accent-cyan)]/5"
              : ""
          }`}
        >
          {ticket.highlighted && (
            <div className='absolute top-4 right-4 bg-gradient-to-r from-[var(--accent-pink)] to-[var(--accent-cyan)] text-black text-xs font-bold px-3 py-1 rounded-full'>
              POPULAR
            </div>
          )}

          <div className='text-center mb-8'>
            <h3 className='font-heading font-bold text-2xl md:text-3xl text-white mb-4'>
              {ticket.name}
            </h3>
            <div className='text-4xl md:text-5xl font-heading font-black mb-2'>
              <span className='neon-text'>{ticket.price}</span>
            </div>
            <p className='text-white/60 font-body'>per person</p>
          </div>

          <ul className='space-y-4 mb-8 flex-1'>
            {ticket.features.map((feature, featureIndex) => (
              <motion.li
                key={featureIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 + featureIndex * 0.1 }}
                className='flex items-start space-x-3'
              >
                <div className='w-5 h-5 rounded-full bg-[var(--accent-cyan)] flex items-center justify-center flex-shrink-0 mt-0.5'>
                  <svg width='12' height='12' viewBox='0 0 12 12' fill='none'>
                    <path
                      d='M3 6l2 2 4-4'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
                <span className='text-white/80 font-body text-sm'>
                  {feature}
                </span>
              </motion.li>
            ))}
          </ul>

          <motion.button
            onClick={() => setModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!ticket.available}
            className={`w-full py-4 rounded-xl font-body font-bold text-lg transition-all ${
              ticket.available
                ? ticket.highlighted
                  ? "bg-gradient-to-r from-[var(--accent-pink)] to-[var(--accent-cyan)] text-black hover:shadow-lg"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                : "bg-gray-500/50 text-gray-400 cursor-not-allowed"
            }`}
          >
            {ticket.available ? "Purchase Ticket" : "Sold Out"}
          </motion.button>
        </motion.div>
      </motion.div>

      <TicketModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        ticketName={ticket.name}
      />
    </>
  );
};

const Tickets = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id='tickets'
      className='py-20 px-6 bg-[var(--bg-dark)] relative overflow-hidden'
    >
      {/* Background Elements */}
      <div className='absolute top-0 left-0 w-96 h-96 bg-[var(--accent-pink)]/10 rounded-full blur-3xl' />
      <div className='absolute bottom-0 right-0 w-80 h-80 bg-[var(--accent-yellow)]/10 rounded-full blur-3xl' />

      <div className='container mx-auto max-w-7xl relative z-10' ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-white'>
            Get Your <span className='neon-text'>Tickets</span>
          </h2>
          <p className='font-body text-lg md:text-xl text-white/80 max-w-2xl mx-auto'>
            Choose your experience level and join us for an unforgettable night
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          {ticketTiers.map((ticket, index) => (
            <TicketCard key={ticket.name} ticket={ticket} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className='text-center mt-12'
        >
          <p className='text-white/60 font-body text-sm'>
            All tickets include event entry, welcome drink, and access to main
            stage area.
            <br />
            Limited availability - secure your spot today!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Tickets;
