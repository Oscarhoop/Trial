import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const photos = [
    "/Photos/IMG-20250524-WA0020.jpg",
    "/Photos/IMG-20250524-WA0023.jpg",
    "/Photos/IMG-20250524-WA0027.jpg",
    "/Photos/IMG-20250614-WA0007.jpg",
    "/Photos/IMG-20250614-WA0008.jpg",
    "/Photos/IMG-20250614-WA0013.jpg",
    "/Photos/WhatsApp Image 2026-01-26 at 9.18.43 AM.jpeg"
];

const Gallery = () => {
    const [selectedId, setSelectedId] = useState(null);

    return (
        <section className="py-20 px-4 relative z-10">
            <h2 className="text-3xl font-serif text-center mb-12 text-white">The Beauty That Is You</h2>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 mx-auto max-w-6xl">
                {photos.map((src, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                        onClick={() => setSelectedId(index)}
                    >
                        <motion.img
                            src={src}
                            alt="Memory"
                            className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
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
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
                        onClick={() => setSelectedId(null)}
                    >
                        <motion.button
                            className="absolute top-4 right-4 text-white hover:text-rose-500 transition-colors"
                            onClick={() => setSelectedId(null)}
                        >
                            <X className="w-8 h-8" />
                        </motion.button>

                        <motion.img
                            layoutId={selectedId}
                            src={photos[selectedId]}
                            alt="Full screen memory"
                            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
