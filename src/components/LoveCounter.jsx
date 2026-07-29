import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from './ui/Card';

// Animated digit that flips when its value changes
const FlipDigit = ({ value, unit }) => {
    return (
        <motion.div
            className="flex flex-col items-center"
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            viewport={{ once: true }}
        >
            <div className="relative h-16 md:h-24 overflow-hidden flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                    <motion.span
                        key={value}
                        className="text-4xl md:text-6xl font-bold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent"
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 30, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                        {String(value).padStart(unit === 'days' ? 1 : 2, '0')}
                    </motion.span>
                </AnimatePresence>
            </div>
            <span className="text-sm uppercase tracking-widest text-gray-400 mt-2">{unit}</span>
        </motion.div>
    );
};

const LoveCounter = ({ startDate }) => {
    const start = useMemo(
        () => startDate ? new Date(startDate) : new Date('2024-01-01T00:00:00'),
        [startDate]
    );

    const [timeElapsed, setTimeElapsed] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const tick = () => {
            const now = new Date();
            const difference = now - start;

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setTimeElapsed({ days, hours, minutes, seconds });
        };

        tick(); // Run immediately
        const timer = setInterval(tick, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-20 px-4 flex flex-col items-center justify-center relative z-10 text-white">
            <Card className="max-w-4xl w-full p-10 bg-white/5 backdrop-blur-md border-white/10 mx-auto">
                <motion.h2
                    className="text-3xl font-serif mb-10 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    Time Since We Started Forever
                </motion.h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {Object.entries(timeElapsed).map(([unit, value]) => (
                        <FlipDigit key={unit} value={value} unit={unit} />
                    ))}
                </div>
            </Card>
        </section>
    );
};

export default LoveCounter;
