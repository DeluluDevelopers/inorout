"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
  photographer?: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: "/assets/gallery1.svg",
    alt: "Flow Party 2023 - Main Stage",
    photographer: "Alex Chen",
  },
  {
    src: "/assets/gallery2.svg",
    alt: "Crowd enjoying DJ Zen performance",
    photographer: "Maria Santos",
  },
  {
    src: "/assets/gallery3.svg",
    alt: "Neon light installation",
    photographer: "David Kim",
  },
  {
    src: "/assets/gallery4.svg",
    alt: "VIP area atmosphere",
    photographer: "Sarah Johnson",
  },
  {
    src: "/assets/gallery5.svg",
    alt: "Luna Verde live performance",
    photographer: "Mike Wilson",
  },
  {
    src: "/assets/gallery6.svg",
    alt: "After party vibes",
    photographer: "Emma Davis",
  },
];

const LightboxModal = ({
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") onPrev();
    if (e.key === "ArrowRight") onNext();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6'
          onClick={onClose}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className='relative max-w-4xl w-full h-full flex items-center justify-center'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className='absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors'
              aria-label='Close lightbox'
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

            {/* Navigation Buttons */}
            <button
              onClick={onPrev}
              className='absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors'
              aria-label='Previous image'
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
            </button>

            <button
              onClick={onNext}
              className='absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors'
              aria-label='Next image'
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
            </button>

            {/* Image */}
            <div className='relative w-full h-full max-h-[80vh]'>
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                className='object-contain'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw'
              />
            </div>

            {/* Image Info */}
            <div className='absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4'>
              <h3 className='text-white font-body font-semibold mb-1'>
                {currentImage.alt}
              </h3>
              {currentImage.photographer && (
                <p className='text-white/70 font-body text-sm'>
                  Photo by {currentImage.photographer}
                </p>
              )}
              <p className='text-white/50 font-body text-xs mt-2'>
                {currentIndex + 1} of {galleryImages.length}
              </p>
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
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className='relative group cursor-pointer overflow-hidden rounded-xl'
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className='relative aspect-square'
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className='object-cover transition-transform duration-500'
          sizes='(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw'
          loading='lazy'
        />

        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end'
        >
          <div className='p-4 w-full'>
            <p className='text-white font-body font-semibold text-sm mb-1'>
              {image.alt}
            </p>
            {image.photographer && (
              <p className='text-white/70 font-body text-xs'>
                Photo by {image.photographer}
              </p>
            )}
          </div>
        </motion.div>

        {/* Zoom Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          className='absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center'
        >
          <svg width='16' height='16' viewBox='0 0 24 24' fill='white'>
            <path d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7' />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  return (
    <section
      id='gallery'
      className='py-20 px-6 bg-[var(--bg-mid)] relative overflow-hidden'
    >
      {/* Background Elements */}
      <div className='absolute top-20 right-0 w-72 h-72 bg-[var(--accent-yellow)]/10 rounded-full blur-3xl' />
      <div className='absolute bottom-20 left-0 w-96 h-96 bg-[var(--accent-pink)]/10 rounded-full blur-3xl' />

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
          <p className='font-body text-lg md:text-xl text-white/80 max-w-2xl mx-auto'>
            Relive the magic from previous Flow Party events and get excited for
            what&apos;s to come
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {galleryImages.map((image, index) => (
            <GalleryItem
              key={index}
              image={image}
              index={index}
              onClick={() => openLightbox(index)}
            />
          ))}
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className='text-center mt-12'
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='px-8 py-3 bg-white/10 border border-white/20 text-white font-body font-semibold rounded-full hover:bg-white/20 transition-colors'
          >
            View More Photos
          </motion.button>
        </motion.div>
      </div>

      {/* Lightbox */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        currentIndex={currentImageIndex}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </section>
  );
};

export default Gallery;
