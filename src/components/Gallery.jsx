import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const photos = [
    '/Photos/photo1.jpg',
    '/Photos/photo2.jpg',
    '/Photos/photo3.jpg',
    '/Photos/photo4.jpg',
    '/Photos/photo5.jpg',
];

const Gallery = () => {
    const [selectedId, setSelectedId] = useState(null);

    const prev = (e) => {
        e.stopPropagation();
        setSelectedId((id) => (id - 1 + photos.length) % photos.length);
    };

    const next = (e) => {
        e.stopPropagation();
        setSelectedId((id) => (id + 1) % photos.length);
    };

    return (
        <section className="py-20 px-4 relative z-10">
            <h2 className="text-3xl font-serif text-center mb-12 text-white">The Beauty That Is You</h2>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '16px',
                    maxWidth: '1200px',
                    margin: '0 auto',
                }}
            >
                {photos.map((src, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.08, duration: 0.5 }}
                        className="relative group cursor-pointer overflow-hidden rounded-xl border border-white/10"
                        style={{ aspectRatio: '3 / 4', background: '#1a1a2e' }}
                        onClick={() => setSelectedId(index)}
                    >
                        <img
                            src={src}
                            alt={`Photo ${index + 1}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center top',
                                display: 'block',
                                transition: 'transform 0.6s ease',
                            }}
                            className="group-hover:scale-105"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedId !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
                        onClick={() => setSelectedId(null)}
                    >
                        {/* Close */}
                        <button
                            className="absolute top-4 right-4 text-white hover:text-rose-400 transition-colors z-10"
                            onClick={() => setSelectedId(null)}
                        >
                            <X className="w-8 h-8" />
                        </button>

                        {/* Prev */}
                        <button
                            className="absolute left-4 text-white hover:text-rose-400 transition-colors z-10"
                            onClick={prev}
                        >
                            <ChevronLeft className="w-10 h-10" />
                        </button>

                        {/* Image */}
                        <motion.img
                            key={selectedId}
                            src={photos[selectedId]}
                            alt={`Photo ${selectedId + 1}`}
                            style={{
                                maxWidth: '90vw',
                                maxHeight: '90vh',
                                objectFit: 'contain',
                                borderRadius: '12px',
                                boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
                            }}
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Next */}
                        <button
                            className="absolute right-4 text-white hover:text-rose-400 transition-colors z-10"
                            onClick={next}
                        >
                            <ChevronRight className="w-10 h-10" />
                        </button>

                        {/* Counter */}
                        <div className="absolute bottom-4 text-white/60 text-sm">
                            {selectedId + 1} / {photos.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
