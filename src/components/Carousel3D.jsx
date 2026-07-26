import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera } from 'lucide-react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const Carousel3D = ({ images = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);
    const [autoPlay, setAutoPlay] = useState(true);

    // Default placeholder images if none provided
    const defaultImages = [
        { id: 1, url: '/api/placeholder/400/500', caption: 'Our First Adventure' },
        { id: 2, url: '/api/placeholder/400/500', caption: 'Golden Moments' },
        { id: 3, url: '/api/placeholder/400/500', caption: 'Sunset Dreams' },
        { id: 4, url: '/api/placeholder/400/500', caption: 'Endless Laughter' },
        { id: 5, url: '/api/placeholder/400/500', caption: 'Forever Together' }
    ];

    const displayImages = images.length > 0 ? images : defaultImages;

    useEffect(() => {
        if (!autoPlay) return;

        const interval = setInterval(() => {
            next();
        }, 4000);

        return () => clearInterval(interval);
    }, [currentIndex, autoPlay]);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % displayImages.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
    };

    const getItemStyle = (index) => {
        const diff = index - currentIndex;
        const total = displayImages.length;

        // Normalize difference to handle wrapping
        let normalizedDiff = diff;
        if (Math.abs(diff) > total / 2) {
            normalizedDiff = diff > 0 ? diff - total : diff + total;
        }

        const absPos = Math.abs(normalizedDiff);

        return {
            position: 'absolute',
            left: '50%',
            top: '50%',
            zIndex: 10 - absPos,
            opacity: absPos > 2 ? 0 : 1 - (absPos * 0.3),
            scale: 1 - (absPos * 0.15),
            x: normalizedDiff * 200,
            y: 0,
            rotateY: normalizedDiff * -25,
            transition: {
                duration: 0.5,
                ease: 'easeInOut'
            }
        };
    };

    return (
        <section className="py-20 px-4 relative z-10">
            <motion.h2
                className="text-4xl md:text-5xl font-serif text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                Captured Moments
            </motion.h2>

            <div
                className="relative w-full max-w-6xl mx-auto h-[500px]"
                onMouseEnter={() => setAutoPlay(false)}
                onMouseLeave={() => setAutoPlay(true)}
            >
                {/* 3D Carousel Container */}
                <div className="relative w-full h-full" style={{ perspective: '1500px' }}>
                    {displayImages.map((image, index) => (
                        <motion.div
                            key={image.id}
                            className="cursor-pointer"
                            style={{
                                transformStyle: 'preserve-3d',
                            }}
                            initial={false}
                            animate={getItemStyle(index)}
                            onClick={() => index === currentIndex && setSelectedImage(image)}
                        >
                            <div className="w-80 h-96 bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border-2 border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:border-gold/50 transition-all duration-300">
                                <div className="w-full h-full bg-gradient-to-br from-wine/40 to-midnight/60 flex items-center justify-center relative group">
                                    {/* Placeholder for actual image */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent" />
                                    <Camera className="w-16 h-16 text-white/50 z-10" />

                                    {/* Caption overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-midnight/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <p className="text-white font-serif text-lg text-center">
                                            {image.caption}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={prev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-gold/20 backdrop-blur-md border border-gold/50 flex items-center justify-center hover:bg-gold/40 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                >
                    <ChevronLeft className="w-6 h-6 text-gold" />
                </button>

                <button
                    onClick={next}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-gold/20 backdrop-blur-md border border-gold/50 flex items-center justify-center hover:bg-gold/40 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                >
                    <ChevronRight className="w-6 h-6 text-gold" />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {displayImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'w-8 bg-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]'
                                    : 'bg-white/30 hover:bg-white/50'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Fullscreen Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.8, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0.8, rotate: 10 }}
                            className="relative max-w-4xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border-2 border-gold/50 p-4">
                                <div className="aspect-[4/5] bg-gradient-to-br from-wine/40 to-midnight/60 rounded-2xl flex items-center justify-center">
                                    <Camera className="w-32 h-32 text-white/20" />
                                </div>
                                <p className="text-center text-2xl font-serif mt-4 text-white">
                                    {selectedImage.caption}
                                </p>
                            </div>

                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gold flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.5)]"
                            >
                                <X className="w-6 h-6 text-midnight" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Carousel3D;
