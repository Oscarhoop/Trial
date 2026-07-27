import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import Card from './ui/Card';

const reasons = [
    "Your smile lights up my darkest days.",
    "You make 2026 feel like it's already ours.",
    "You are my best friend and my soulmate.",
    "The way you laugh at my bad jokes.",
    "Your kindness makes the world softer.",
    "I love how we can talk for hours about nothing.",
    "You are the calm in every storm.",
    "The way you care so deeply about everything.",
];

const ReasonsCarousel = () => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const intervalRef = useRef(null);

    const startInterval = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setDirection(1);
            setIndex((prev) => (prev + 1) % reasons.length);
        }, 4000);
    };

    useEffect(() => {
        startInterval();
        return () => clearInterval(intervalRef.current);
    }, []);

    const goTo = (newIndex) => {
        setDirection(newIndex > index ? 1 : -1);
        setIndex(newIndex);
        startInterval(); // reset timer on manual nav
    };

    const goPrev = () => goTo((index - 1 + reasons.length) % reasons.length);
    const goNext = () => goTo((index + 1) % reasons.length);

    const variants = {
        enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60, scale: 0.95 }),
        center: { opacity: 1, x: 0, scale: 1 },
        exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60, scale: 0.95 }),
    };

    return (
        <section className="py-20 px-4 relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">Why I Love You</h2>

            <div className="relative max-w-lg mx-auto">
                {/* Prev button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={goPrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors"
                >
                    <ChevronLeft size={18} />
                </motion.button>

                {/* Card */}
                <div className="h-52 flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={index}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            className="w-full"
                        >
                            <Card className="p-8 text-center bg-white/10 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                                <Heart className="w-8 h-8 text-rose-500 mx-auto mb-4 animate-pulse" fill="currentColor" />
                                <p className="text-xl md:text-2xl font-serif italic text-white/90">
                                    "{reasons[index]}"
                                </p>
                            </Card>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Next button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={goNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors"
                >
                    <ChevronRight size={18} />
                </motion.button>

                {/* Dot indicators */}
                <div className="flex items-center justify-center gap-2 mt-6">
                    {reasons.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className={`rounded-full transition-all duration-300 ${
                                i === index
                                    ? 'w-5 h-2 bg-rose-500'
                                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReasonsCarousel;
