import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Heart, Star, Sparkles, BookOpen, Clock, HeartHandshake, Infinity } from 'lucide-react';

const MemoryTimeline = () => {
    const [selectedMemory, setSelectedMemory] = useState(null);

    const memories = [
        {
            id: 1,
            date: 'High School',
            title: 'Where It All Began',
            description: 'Long before we knew what the future held, we became friends. The foundation of our love was laid in those early days.',
            icon: Heart,
            color: 'from-rose-500 to-pink-500',
            cardIcon: BookOpen
        },
        {
            id: 2,
            date: 'Through The Years',
            title: 'Ups, Downs & Breaks',
            description: 'We had our highs and lows, and even spent years apart. But true love has a funny way of always bringing us back together at the end of it all.',
            icon: Sparkles,
            color: 'from-purple-500 to-indigo-500',
            cardIcon: Clock
        },
        {
            id: 3,
            date: 'February 24, 2026',
            title: 'Our New Chapter',
            description: 'The day we realized that no matter what, we belong together. We stopped running and started our forever.',
            icon: Star,
            color: 'from-amber-500 to-orange-500',
            cardIcon: HeartHandshake
        },
        {
            id: 4,
            date: 'Present & Beyond',
            title: 'Together, Always',
            description: 'Through every twist and turn, you are my constant. Happy Girlfriend\'s Day to the love of my life.',
            icon: Calendar,
            color: 'from-emerald-500 to-teal-500',
            cardIcon: Infinity
        }
    ];

    return (
        <section className="py-20 px-4 relative z-10">
            <motion.h2
                className="text-4xl md:text-5xl font-serif text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                Our Story, Page by Page
            </motion.h2>

            <div className="max-w-5xl mx-auto relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold to-transparent hidden md:block" />

                {memories.map((memory, index) => {
                    const Icon = memory.icon;
                    const isLeft = index % 2 === 0;

                    return (
                        <motion.div
                            key={memory.id}
                            className={`relative mb-16 md:mb-24 flex flex-col md:flex-row items-center ${isLeft ? 'md:flex-row-reverse' : ''
                                }`}
                            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            {/* Content Card */}
                            <motion.div
                                className={`w-full md:w-5/12 ${isLeft ? 'md:text-right' : 'md:text-left'}`}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => setSelectedMemory(memory)}
                            >
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 cursor-pointer hover:bg-white/10 transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`p-3 rounded-xl bg-gradient-to-br ${memory.color} bg-opacity-20 flex-shrink-0`}>
                                            <memory.cardIcon className="w-8 h-8 text-gold" />
                                        </div>
                                        <div className={isLeft ? 'text-right flex-1' : 'text-left flex-1'}>
                                            <p className="text-sm text-gold font-semibold tracking-wider">
                                                {memory.date}
                                            </p>
                                            <h3 className="text-xl md:text-2xl font-serif text-white">
                                                {memory.title}
                                            </h3>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 leading-relaxed">
                                        {memory.description}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Center Icon */}
                            <motion.div
                                className="my-4 md:my-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2"
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                transition={{ type: 'spring', stiffness: 260 }}
                            >
                                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${memory.color} flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)]`}>
                                    <Icon className="w-8 h-8 text-white" />
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Expanded Memory Modal */}
            <AnimatePresence>
                {selectedMemory && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedMemory(null)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gradient-to-br from-wine/80 to-midnight/80 backdrop-blur-xl border-2 border-gold/50 rounded-3xl p-8 max-w-lg w-full relative overflow-hidden"
                        >
                            {/* Confetti effect */}
                            <div className="absolute inset-0 pointer-events-none">
                                {[...Array(20)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-2 h-2 bg-gold rounded-full"
                                        initial={{
                                            x: '50%',
                                            y: '50%',
                                            opacity: 1
                                        }}
                                        animate={{
                                            x: `${Math.random() * 100}%`,
                                            y: `${Math.random() * 100}%`,
                                            opacity: 0
                                        }}
                                        transition={{ duration: 1.5, delay: i * 0.05 }}
                                    />
                                ))}
                            </div>

                            <div className="text-center relative z-10 flex flex-col items-center">
                                <div className={`p-4 rounded-2xl bg-gradient-to-br ${selectedMemory.color} bg-opacity-20 inline-flex mb-6`}>
                                    <selectedMemory.cardIcon className="w-12 h-12 text-gold" />
                                </div>
                                <p className="text-gold font-semibold mb-2">{selectedMemory.date}</p>
                                <h3 className="text-3xl font-serif mb-4 text-white">{selectedMemory.title}</h3>
                                <p className="text-gray-200 text-lg leading-relaxed mb-6">
                                    {selectedMemory.description}
                                </p>
                                <button
                                    onClick={() => setSelectedMemory(null)}
                                    className="px-6 py-3 bg-gold text-midnight font-semibold rounded-full hover:bg-gold/80 transition-all shadow-[0_0_20px_rgba(212,175,55,0.5)]"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default MemoryTimeline;
