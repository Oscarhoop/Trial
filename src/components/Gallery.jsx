import { useState, useEffect } from 'react';
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
    const [hoveredIndex, setHoveredIndex] = useState(2); // Default to middle expanded

    const prev = (e) => {
        e.stopPropagation();
        setSelectedId((id) => (id - 1 + photos.length) % photos.length);
    };

    const next = (e) => {
        e?.stopPropagation();
        setSelectedId((id) => (id + 1) % photos.length);
    };

    // Keyboard navigation for lightbox
    useEffect(() => {
        if (selectedId === null) return;
        const handleKey = (e) => {
            if (e.key === 'Escape') setSelectedId(null);
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [selectedId]);

    return (
        <section className="py-24 px-4 relative z-10 w-full overflow-hidden">
            <h2 className="text-3xl md:text-5xl font-serif text-center mb-16 text-white tracking-wider drop-shadow-lg">
                The Beauty That Is You
            </h2>

            {/* Expanding Cards Layout */}
            <div className="flex w-full max-w-7xl mx-auto h-[60vh] md:h-[70vh] gap-2 md:gap-4 px-2">
                {photos.map((src, index) => {
                    const isHovered = hoveredIndex === index;
                    
                    return (
                        <motion.div
                            key={index}
                            className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                                isHovered ? 'w-[60%] md:w-[50%]' : 'w-[10%] md:w-[12.5%]'
                            }`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onClick={() => setSelectedId(index)}
                            layout
                        >
                            {/* The Image */}
                            <img
                                src={src}
                                alt={`Memory ${index + 1}`}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
                                style={{ 
                                    imageOrientation: 'from-image',
                                    transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                                }}
                                loading="lazy"
                            />
                            
                            {/* Dark Gradient Overlay */}
                            <div 
                                className={`absolute inset-0 transition-opacity duration-700 ${
                                    isHovered 
                                        ? 'bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100' 
                                        : 'bg-black/40 opacity-100'
                                }`} 
                            />

                            {/* Info inside the expanded card */}
                            <div 
                                className={`absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col justify-end h-full transition-all duration-700 ${
                                    isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                }`}
                            >
                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 border border-white/30">
                                    <span className="text-white font-serif text-xl">{index + 1}</span>
                                </div>
                                <h3 className="text-white text-2xl md:text-4xl font-serif tracking-wide truncate">
                                    {['Flawless', 'Ethereal', 'Breathtaking', 'Radiant', 'Stunning'][index]}
                                </h3>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedId !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(0,0,0,0.96)',
                            padding: '16px',
                            backdropFilter: 'blur(12px)',
                        }}
                        onClick={() => setSelectedId(null)}
                    >
                        {/* Close */}
                        <button
                            onClick={() => setSelectedId(null)}
                            style={{
                                position: 'absolute',
                                top: 16,
                                right: 16,
                                background: 'rgba(255,255,255,0.1)',
                                border: 'none',
                                borderRadius: '50%',
                                width: 44,
                                height: 44,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: '#fff',
                                zIndex: 10,
                                transition: 'background 0.2s',
                            }}
                        >
                            <X size={22} />
                        </button>

                        {/* Prev */}
                        <button
                            onClick={prev}
                            style={{
                                position: 'absolute',
                                left: 16,
                                background: 'rgba(255,255,255,0.1)',
                                border: 'none',
                                borderRadius: '50%',
                                width: 48,
                                height: 48,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: '#fff',
                                zIndex: 10,
                            }}
                        >
                            <ChevronLeft size={26} />
                        </button>

                        {/* Full-res image */}
                        <motion.img
                            key={selectedId}
                            src={photos[selectedId]}
                            alt={`Photo ${selectedId + 1}`}
                            style={{
                                maxWidth: '88vw',
                                maxHeight: '88vh',
                                objectFit: 'contain',
                                borderRadius: '12px',
                                boxShadow: '0 30px 80px rgba(0,0,0,0.9)',
                                imageOrientation: 'from-image',
                            }}
                            initial={{ scale: 0.88, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.88, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Next */}
                        <button
                            onClick={next}
                            style={{
                                position: 'absolute',
                                right: 16,
                                background: 'rgba(255,255,255,0.1)',
                                border: 'none',
                                borderRadius: '50%',
                                width: 48,
                                height: 48,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: '#fff',
                                zIndex: 10,
                            }}
                        >
                            <ChevronRight size={26} />
                        </button>

                        {/* Counter */}
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 20,
                                color: 'rgba(255,255,255,0.5)',
                                fontSize: '13px',
                                letterSpacing: '0.1em',
                            }}
                        >
                            {selectedId + 1} / {photos.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


        </section>
    );
};

export default Gallery;
