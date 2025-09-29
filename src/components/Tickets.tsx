"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";

interface TicketTier {
  name: string;
  price: string;
  features: string[];
  highlighted?: boolean;
  available: boolean;
  tier: "REGULAR" | "COUPLES" | "VIP" | "VVIP";
}

const ticketTiers: TicketTier[] = [
  {
    name: "Regular",
    price: "₹1,500",
    tier: "REGULAR",
    features: [
      "General admission access",
      "Transportation to the InOrOut Paradise.",
      "Event merchandise discount",
    ],
    available: true,
  },
  {
    name: "Couples",
    price: "₹2,499",
    tier: "COUPLES",
    features: [
      "General admission access",
      "Transportation to the InOrOut Paradise.",
      "Event merchandise discount",
    ],
    available: true,
  },
  {
    name: "VIP",
    price: "₹5,999",
    tier: "VIP",
    features: [
      "VIP viewing area access",
      "Transportation to the InOrOut Paradise.",
      "Express entry & dedicated entrance",
      "1 Day Unlimited food and drinks (6pm to 2am)",
      "Meet & greet opportunities",
      "Event merchandise discount",
      "Red Carpet",
    ],
    highlighted: true,
    available: true,
  },
  {
    name: "VVIP",
    price: "₹9,999",
    tier: "VVIP",
    features: [
      "Ultra premium experience",
      "Transportation to the InOrOut Paradise.",
      "2 Days Unlimited food and Drinks (6pm to 2am)",
      "Backstage access & artist interactions",
      "Official Festival Photography",
      "Exclusive after-party access if Any.",
    ],
    available: true,
  },
];

const TicketCard = ({
  ticket,
  index,
}: {
  ticket: TicketTier;
  index: number;
}) => {
  const router = useRouter();

  const handlePurchase = () => {
    // Navigate to ticket page with tier parameter
    router.push(`/ticket?tier=${ticket.tier}`);
  };

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
            <p className='text-white/60 font-body'>
              {ticket.tier === "COUPLES" ? "per couple" : "per person"}
            </p>
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
            onClick={handlePurchase}
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

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto'>
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
