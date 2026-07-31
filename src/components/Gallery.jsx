import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const photos = [
    '/Photos/photo1.jpg',
    '/Photos/photo2.jpg',
    '/Photos/photo3.jpg',
    '/Photos/photo4.jpg',
    '/Photos/photo5.jpg',
];

const captions = ['Flawless', 'Ethereal', 'Breathtaking', 'Radiant', 'Stunning'];

/* ─── Mobile swipe carousel ─────────────────────────────── */
const MobileCarousel = ({ onOpen }) => {
    const [current, setCurrent] = useState(0);
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);

    const prev = () => setCurrent((c) => (c - 1 + photos.length) % photos.length);
    const next = () => setCurrent((c) => (c + 1) % photos.length);

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchEndX.current = null;
    };
    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = () => {
        if (touchStartX.current === null || touchEndX.current === null) return;
        const diff = touchStartX.current - touchEndX.current;
        if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
        touchStartX.current = null;
        touchEndX.current = null;
    };

    return (
        <div className="relative w-full select-none">
            {/* Card */}
            <div
                className="relative w-full overflow-hidden rounded-3xl"
                style={{ height: '68vw', maxHeight: '420px' }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        className="absolute inset-0"
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -60 }}
                        transition={{ duration: 0.3 }}
                    >
                        <img
                            src={photos[current]}
                            alt={captions[current]}
                            className="w-full h-full object-cover"
                            style={{ imageOrientation: 'from-image' }}
                            loading="lazy"
                        />
                        {/* Always-visible gradient + caption */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                            <div>
                                <span className="text-white/50 text-xs tracking-widest uppercase font-sans">
                                    {current + 1} / {photos.length}
                                </span>
                                <h3 className="text-white text-3xl font-serif tracking-wide mt-1">
                                    {captions[current]}
                                </h3>
                            </div>
                            {/* Open lightbox */}
                            <button
                                onClick={() => onOpen(current)}
                                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-sm font-semibold"
                            >
                                ⤢
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Prev / Next buttons */}
            <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white z-10"
            >
                <ChevronLeft size={20} />
            </button>
            <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white z-10"
            >
                <ChevronRight size={20} />
            </button>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-4">
                {photos.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`rounded-full transition-all duration-300 ${
                            i === current
                                ? 'w-6 h-2 bg-gold'
                                : 'w-2 h-2 bg-white/30'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

/* ─── Main Gallery ───────────────────────────────────────── */
const Gallery = () => {
    const [selectedId, setSelectedId] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(2);

    const prev = (e) => {
        e?.stopPropagation();
        setSelectedId((id) => (id - 1 + photos.length) % photos.length);
    };
    const next = (e) => {
        e?.stopPropagation();
        setSelectedId((id) => (id + 1) % photos.length);
    };

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
        <section className="py-16 md:py-24 px-4 relative z-10 w-full overflow-hidden">
            <h2 className="text-3xl md:text-5xl font-serif text-center mb-10 md:mb-16 text-white tracking-wider drop-shadow-lg">
                The Beauty That Is You
            </h2>

            {/* ── Mobile: swipeable carousel ── */}
            <div className="md:hidden px-2">
                <MobileCarousel onOpen={(i) => setSelectedId(i)} />
            </div>

            {/* ── Desktop: expanding accordion ── */}
            <div className="hidden md:flex w-full max-w-7xl mx-auto h-[70vh] gap-4 px-2">
                {photos.map((src, index) => {
                    const isHovered = hoveredIndex === index;
                    return (
                        <motion.div
                            key={index}
                            className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                                isHovered ? 'w-[50%]' : 'w-[12.5%]'
                            }`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onClick={() => setSelectedId(index)}
                            layout
                        >
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
                            <div
                                className={`absolute inset-0 transition-opacity duration-700 ${
                                    isHovered
                                        ? 'bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100'
                                        : 'bg-black/40 opacity-100'
                                }`}
                            />
                            <div
                                className={`absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end h-full transition-all duration-700 ${
                                    isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                }`}
                            >
                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 border border-white/30">
                                    <span className="text-white font-serif text-xl">{index + 1}</span>
                                </div>
                                <h3 className="text-white text-4xl font-serif tracking-wide truncate">
                                    {captions[index]}
                                </h3>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* ── Lightbox (shared, both layouts) ── */}
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
                                position: 'absolute', top: 16, right: 16,
                                background: 'rgba(255,255,255,0.1)', border: 'none',
                                borderRadius: '50%', width: 44, height: 44,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', color: '#fff', zIndex: 10,
                            }}
                        >
                            <X size={22} />
                        </button>

                        {/* Prev */}
                        <button
                            onClick={prev}
                            style={{
                                position: 'absolute', left: 12,
                                background: 'rgba(255,255,255,0.1)', border: 'none',
                                borderRadius: '50%', width: 48, height: 48,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', color: '#fff', zIndex: 10,
                            }}
                        >
                            <ChevronLeft size={26} />
                        </button>

                        {/* Image */}
                        <motion.img
                            key={selectedId}
                            src={photos[selectedId]}
                            alt={`Photo ${selectedId + 1}`}
                            style={{
                                maxWidth: '90vw', maxHeight: '85vh',
                                objectFit: 'contain', borderRadius: '12px',
                                boxShadow: '0 30px 80px rgba(0,0,0,0.9)',
                                imageOrientation: 'from-image',
                            }}
                            initial={{ scale: 0.88, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.88, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Caption in lightbox */}
                        <div style={{
                            position: 'absolute', bottom: 48,
                            color: 'white', fontSize: '22px',
                            fontFamily: '"Playfair Display", serif',
                            letterSpacing: '0.05em',
                            textShadow: '0 2px 12px rgba(0,0,0,0.8)',
                        }}>
                            {captions[selectedId]}
                        </div>

                        {/* Counter */}
                        <div style={{
                            position: 'absolute', bottom: 20,
                            color: 'rgba(255,255,255,0.4)', fontSize: '12px',
                            letterSpacing: '0.1em',
                        }}>
                            {selectedId + 1} / {photos.length}
                        </div>

                        {/* Next */}
                        <button
                            onClick={next}
                            style={{
                                position: 'absolute', right: 12,
                                background: 'rgba(255,255,255,0.1)', border: 'none',
                                borderRadius: '50%', width: 48, height: 48,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', color: '#fff', zIndex: 10,
                            }}
                        >
                            <ChevronRight size={26} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
