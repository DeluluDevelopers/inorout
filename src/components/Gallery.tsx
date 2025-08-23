"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
  photographer?: string;
  category: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: "/events/1.jpg",
    alt: "IN or OUT Concert - Main Stage Performance",
    photographer: "Event Photography",
    category: "Performances",
  },
  {
    src: "/events/2.webp",
    alt: "Kjnrwhite Live Performance",
    photographer: "Concert Visuals",
    category: "Artists",
  },
  {
    src: "/events/3.jpg",
    alt: "Crowd Energy and Atmosphere",
    photographer: "Event Moments",
    category: "Crowd",
  },
  {
    src: "/events/4.jpg",
    alt: "Stage Lighting and Visual Effects",
    photographer: "Stage Design",
    category: "Visuals",
  },
  {
    src: "/events/5.jpg",
    alt: "Concert Venue and Setup",
    photographer: "Venue Photography",
    category: "Venue",
  },
  {
    src: "/events/6.jpg",
    alt: "Artist Performance Highlights",
    photographer: "Live Shots",
    category: "Performances",
  },
];

const categories = [
  "All",
  "Performances",
  "Crowd",
  "Visuals",
  "VIP",
  "After Party",
];

const PremiumLightbox = ({
  isOpen,
  onClose,
  currentIndex,
  onNext,
  onPrev,
}: {
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
}) => {
  const currentImage = galleryImages[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4'
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className='relative max-w-6xl w-full h-full flex flex-col items-center justify-center'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className='absolute top-0 left-0 right-0 flex justify-between items-center p-6 bg-gradient-to-b from-black/50 to-transparent'>
              <div className='text-white'>
                <h3 className='font-heading text-xl'>{currentImage.alt}</h3>
                <p className='text-white/60 font-body text-sm'>
                  Photo by {currentImage.photographer}
                </p>
              </div>
              <button
                onClick={onClose}
                className='w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors border border-white/20'
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

            {/* Main Image */}
            <div className='relative flex-1 flex items-center justify-center max-h-[80vh]'>
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                width={800}
                height={600}
                className='max-w-full max-h-full object-contain rounded-xl shadow-2xl'
              />
            </div>

            {/* Navigation */}
            <div className='absolute inset-y-0 left-4 flex items-center'>
              <motion.button
                onClick={onPrev}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className='w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors border border-white/20'
              >
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M15 18l-6-6 6-6'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </motion.button>
            </div>

            <div className='absolute inset-y-0 right-4 flex items-center'>
              <motion.button
                onClick={onNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className='w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors border border-white/20'
              >
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M9 18l6-6-6-6'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </motion.button>
            </div>

            {/* Bottom indicators */}
            <div className='absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2'>
              {galleryImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex
                      ? "bg-[var(--accent-cyan)]"
                      : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const GalleryItem = ({
  image,
  index,
  onClick,
}: {
  image: GalleryImage;
  index: number;
  onClick: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className='relative group cursor-pointer'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className='relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10'>
        <div className='aspect-square relative'>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className='object-cover transition-transform duration-700 group-hover:scale-110'
          />

          {/* Gradient overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

          {/* Hover content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className='absolute inset-0 flex flex-col justify-end p-6'
          >
            <div className='space-y-2'>
              <span className='inline-block px-3 py-1 bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)] text-xs font-semibold rounded-full border border-[var(--accent-cyan)]/30'>
                {image.category}
              </span>
              <h3 className='font-heading font-bold text-white text-lg leading-tight'>
                {image.alt}
              </h3>
              <p className='text-white/70 font-body text-sm'>
                Photo by {image.photographer}
              </p>
            </div>

            {/* View icon */}
            <motion.div
              className='absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'
              whileHover={{ scale: 1.1 }}
            >
              <svg width='20' height='20' viewBox='0 0 24 24' fill='white'>
                <path d='M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z' />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    const globalIndex = galleryImages.findIndex(
      (img) => img === filteredImages[index]
    );
    setLightboxIndex(globalIndex);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        lightboxIndex === 0 ? galleryImages.length - 1 : lightboxIndex - 1
      );
    }
  };

  return (
    <section
      id='gallery'
      className='py-20 px-6 bg-gradient-to-br from-[var(--bg-dark)] to-[var(--bg-mid)] relative overflow-hidden'
    >
      {/* Background elements */}
      <div className='absolute top-20 right-0 w-96 h-96 bg-[var(--accent-pink)]/5 rounded-full blur-3xl' />
      <div className='absolute bottom-20 left-0 w-80 h-80 bg-[var(--accent-cyan)]/5 rounded-full blur-3xl' />

      <div className='container mx-auto max-w-7xl relative z-10' ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-white'>
            Event <span className='neon-text'>Gallery</span>
          </h2>
          <p className='font-body text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12'>
            Relive the magic from previous Flow Party events and get excited for
            what&apos;s to come
          </p>

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='flex flex-wrap justify-center gap-3 mb-12'
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-body font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-[var(--accent-pink)] to-[var(--accent-cyan)] text-black"
                    : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Gallery grid */}
        <motion.div
          layout
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
        >
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <GalleryItem
                key={`${selectedCategory}-${image.src}`}
                image={image}
                index={index}
                onClick={() => openLightbox(index)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <PremiumLightbox
        isOpen={lightboxIndex !== null}
        onClose={closeLightbox}
        currentIndex={lightboxIndex || 0}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </section>
  );
};

export default Gallery;
