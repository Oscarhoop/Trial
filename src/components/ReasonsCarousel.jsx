import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import Card from './ui/Card';

const reasons = [
    "Your smile lights up my darkest days.",
    "You make 2026 feel like it's already here.",
    "You are my best friend and my soulmate.",
    "The way you laugh at my bad jokes.",
    "Your kindness makes the world softer.",
    "I love how we can talk for hours about nothing."
];

const ReasonsCarousel = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % reasons.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-20 px-4 relative z-10">
            <h2 className="text-3xl font-serif text-center mb-12">Why I Love You</h2>

            <div className="h-64 flex items-center justify-center relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="absolute w-full max-w-lg"
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
        </section>
    );
};

export default ReasonsCarousel;
