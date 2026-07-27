import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles, Heart, Home, Plane, Camera, Coffee, Music, Sunrise, Moon } from 'lucide-react';

const WishesWall = () => {
    const [selectedWish, setSelectedWish] = useState(null);

    const wishes = [
        {
            id: 1,
            icon: Heart,
            title: 'Our Anniversary',
            wish: 'Celebrating every year together, each one deeper and more beautiful than the last',
            color: 'from-rose-400 to-pink-500',
            position: { top: '15%', left: '20%' },
            size: 'large'
        },
        {
            id: 2,
            icon: Home,
            title: 'Our Home',
            wish: 'Build a cozy space together, where every corner tells our story',
            color: 'from-amber-400 to-orange-500',
            position: { top: '25%', left: '70%' },
            size: 'medium'
        },
        {
            id: 3,
            icon: Plane,
            title: 'Adventures Together',
            wish: 'Explore the world hand in hand, creating memories in every place',
            color: 'from-blue-400 to-cyan-500',
            position: { top: '45%', left: '15%' },
            size: 'medium'
        },
        {
            id: 4,
            icon: Camera,
            title: 'More Memories Together',
            wish: 'Endless photos of us — laughing, loving, living every beautiful moment side by side',
            color: 'from-purple-400 to-pink-500',
            position: { top: '60%', left: '65%' },
            size: 'large'
        },
        {
            id: 5,
            icon: Coffee,
            title: 'Morning Coffee',
            wish: 'Wake up next to you and share quiet morning moments together',
            color: 'from-yellow-400 to-amber-500',
            position: { top: '70%', left: '30%' },
            size: 'small'
        },
        {
            id: 6,
            icon: Music,
            title: 'Our Song',
            wish: 'Dance with you to our favorite songs, no matter where we are',
            color: 'from-green-400 to-emerald-500',
            position: { top: '35%', left: '45%' },
            size: 'medium'
        },
        {
            id: 7,
            icon: Sunrise,
            title: 'Watch Sunrises',
            wish: 'See every new day begin with you by my side',
            color: 'from-orange-400 to-red-500',
            position: { top: '50%', left: '80%' },
            size: 'small'
        },
        {
            id: 8,
            icon: Moon,
            title: 'Starlit Nights',
            wish: 'Stargaze together and dream about all our tomorrows',
            color: 'from-indigo-400 to-purple-500',
            position: { top: '80%', left: '50%' },
            size: 'medium'
        },
        {
            id: 9,
            icon: Sparkles,
            title: 'Forever',
            wish: 'Build a lifetime of love, laughter, and unforgettable moments',
            color: 'from-pink-400 to-rose-500',
            position: { top: '10%', left: '50%' },
            size: 'large'
        }
    ];

    const getSizeClasses = (size) => {
        switch (size) {
            case 'small': return 'w-12 h-12';
            case 'large': return 'w-20 h-20';
            default: return 'w-16 h-16';
        }
    };

    return (
        <section className="py-20 px-4 relative z-10 min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-8"
                >
                    <h2 className="text-4xl md:text-5xl font-serif mb-4 text-white">
                        Our Wishes Wall
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Every star holds a dream we'll make come true together
                    </p>
                </motion.div>

                {/* Constellation of wishes */}
                <div className="relative w-full h-[600px] md:h-[700px]">
                    {/* Connecting lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#d4af37" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#d4af37" stopOpacity="0.8" />
                            </linearGradient>
                        </defs>
                        {wishes.map((wish, index) => {
                            if (index < wishes.length - 1) {
                                // Parse percentage strings like "20%" → 20
                                const x1 = parseFloat(wish.position.left);
                                const y1 = parseFloat(wish.position.top);
                                const x2 = parseFloat(wishes[index + 1].position.left);
                                const y2 = parseFloat(wishes[index + 1].position.top);
                                return (
                                    <motion.line
                                        key={`line-${wish.id}`}
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, delay: index * 0.1 }}
                                        x1={x1}
                                        y1={y1}
                                        x2={x2}
                                        y2={y2}
                                        stroke="url(#lineGradient)"
                                        strokeWidth="0.3"
                                    />
                                );
                            }
                            return null;
                        })}
                    </svg>

                    {/* Wish stars */}
                    {wishes.map((wish, index) => {
                        const Icon = wish.icon;
                        const sizeClass = getSizeClasses(wish.size);

                        return (
                            <motion.div
                                key={wish.id}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.15,
                                    type: 'spring',
                                    stiffness: 200
                                }}
                                className="absolute cursor-pointer"
                                style={wish.position}
                                onClick={() => setSelectedWish(wish)}
                                onMouseEnter={() => setSelectedWish(wish)}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    className={`${sizeClass} rounded-full bg-gradient-to-br ${wish.color} flex items-center justify-center relative group`}
                                    style={{
                                        boxShadow: `0 0 30px rgba(212, 175, 55, 0.4)`,
                                    }}
                                >
                                    <Icon className="w-1/2 h-1/2 text-white" />

                                    {/* Pulsing glow */}
                                    <motion.div
                                        className={`absolute inset-0 rounded-full bg-gradient-to-br ${wish.color} opacity-50 blur-md`}
                                        animate={{
                                            scale: [1, 1.3, 1],
                                            opacity: [0.5, 0.8, 0.5]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: index * 0.2
                                        }}
                                    />

                                    {/* Star particles */}
                                    <motion.div
                                        className="absolute inset-0"
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                    >
                                        {[...Array(3)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="absolute w-1 h-1 bg-gold rounded-full"
                                                animate={{
                                                    x: [0, (i - 1) * 20],
                                                    y: [0, -20 - i * 10],
                                                    opacity: [1, 0]
                                                }}
                                                transition={{
                                                    duration: 1,
                                                    repeat: Infinity,
                                                    delay: i * 0.3
                                                }}
                                                style={{
                                                    left: '50%',
                                                    top: '50%'
                                                }}
                                            />
                                        ))}
                                    </motion.div>
                                </motion.div>

                                {/* Tooltip on hover (desktop) */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileHover={{ opacity: 1, y: 0 }}
                                    className="hidden md:block absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap"
                                >
                                    <div className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg text-sm text-gold font-semibold">
                                        {wish.title}
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Selected wish display */}
                <AnimatePresence mode="wait">
                    {selectedWish && (
                        <motion.div
                            key={selectedWish.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="mt-8 text-center"
                        >
                            <div className={`inline-block bg-gradient-to-br ${selectedWish.color} bg-opacity-20 backdrop-blur-xl border border-white/20 rounded-3xl px-8 py-6 max-w-2xl`}>
                                <h3 className="text-2xl font-serif text-white mb-3">
                                    {selectedWish.title}
                                </h3>
                                <p className="text-gray-200 text-lg leading-relaxed">
                                    {selectedWish.wish}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Call to action */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.5 }}
                    className="text-center mt-12"
                >
                    <p className="text-gray-400 italic">
                        Hover over each star to reveal our dreams for the future
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default WishesWall;
