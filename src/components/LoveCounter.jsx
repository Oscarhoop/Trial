import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from './ui/Card';

const LoveCounter = ({ startDate }) => {
    // Default to a date if none provided (e.g., Jan 1, 2024)
    const start = startDate ? new Date(startDate) : new Date('2024-01-01T00:00:00');

    const [timeElapsed, setTimeElapsed] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const difference = now - start;

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setTimeElapsed({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(timer);
    }, [start]);

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
                        <motion.div
                            key={unit}
                            className="flex flex-col items-center"
                            initial={{ scale: 0.5, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", bounce: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-4xl md:text-6xl font-bold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                                {value}
                            </span>
                            <span className="text-sm uppercase tracking-widest text-gray-400 mt-2">{unit}</span>
                        </motion.div>
                    ))}
                </div>
            </Card>
        </section>
    );
};

export default LoveCounter;
