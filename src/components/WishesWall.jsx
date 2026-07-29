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
            wish: 'Build a cozy space together just ours. A home where every corner tells our story',
            color: 'from-amber-400 to-orange-500',
            position: { top: '25%', left: '70%' },
            size: 'medium'
        },
        {
            id: 3,
            icon: Plane,
            title: 'Adventures Together',
            wish: 'Explore the world hand in hand, creating memories in every corner of the earth',
            color: 'from-blue-400 to-cyan-500',
            position: { top: '45%', left: '15%' },
            size: 'medium'
        },
        {
            id: 4,
            icon: Camera,
            title: 'More Memories Together',
            wish: 'Endless photos of us laughing, loving, and living every beautiful moment side by side',
            color: 'from-purple-400 to-pink-500',
            position: { top: '60%', left: '65%' },
            size: 'large'
        },
        {
            id: 5,
            icon: Coffee,
            title: 'Morning Coffee',
            wish: 'Wake up next to you every day and share quiet mornings together just us',
            color: 'from-yellow-400 to-amber-500',
            position: { top: '70%', left: '30%' },
            size: 'small'
        },
        {
            id: 6,
            icon: Music,
            title: 'Our Song',
            wish: 'Dance with you to our favorite songs, no matter where we are or how silly we look',
            color: 'from-green-400 to-emerald-500',
            position: { top: '35%', left: '45%' },
            size: 'medium'
        },
        {
            id: 7,
            icon: Sunrise,
            title: 'Watch Sunrises',
            wish: 'See every new day begin with you by my side each morning, a fresh start together',
            color: 'from-orange-400 to-red-500',
            position: { top: '50%', left: '80%' },
            size: 'small'
        },
        {
            id: 8,
            icon: Moon,
            title: 'Starlit Nights',
            wish: 'Stargaze together and dream out loud about all our beautiful tomorrows',
            color: 'from-indigo-400 to-purple-500',
            position: { top: '80%', left: '50%' },
            size: 'medium'
        },
        {
            id: 9,
            icon: Sparkles,
            title: 'Forever',
            wish: 'Build a lifetime of love, laughter, and unforgettable moments just you and me',
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

    const WishCard = ({ wish, index }) => {
        const Icon = wish.icon;
        return (
            <motion.div
                key={wish.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onClick={() => setSelectedWish(selectedWish?.id === wish.id ? null : wish)}
                className="cursor-pointer group"
            >
                <div
                    className={`relative rounded-2xl border border-white/10 p-4 flex items-start gap-3 transition-all duration-300 hover:border-white/25 hover:bg-white/10 ${
                        selectedWish?.id === wish.id ? 'bg-white/10 border-white/25' : 'bg-white/5'
                    }`}
                    style={{
                        backdropFilter: 'blur(10px)',
                        boxShadow: selectedWish?.id === wish.id
                            ? '0 0 25px rgba(212,175,55,0.15)'
                            : '0 0 10px rgba(0,0,0,0.3)',
                    }}
                >
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${wish.color} flex items-center justify-center`}
                        style={{ boxShadow: '0 0 15px rgba(212,175,55,0.25)' }}
                    >
                        <Icon className="w-5 h-5 text-white" />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                        <p className={`text-xs font-semibold tracking-widest uppercase mb-1 bg-gradient-to-r ${wish.color} bg-clip-text text-transparent`}>
                            {wish.title}
                        </p>
                        <AnimatePresence>
                            {selectedWish?.id === wish.id && (
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="text-white/80 text-sm leading-relaxed font-serif italic overflow-hidden"
                                >
                                    {wish.wish}
                                </motion.p>
                            )}
                        </AnimatePresence>
                        {selectedWish?.id !== wish.id && (
                            <p className="text-white/30 text-xs truncate">{wish.wish}</p>
                        )}
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <section className="py-20 px-4 relative z-10 min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-serif mb-4 text-white">
                        Our Wishes Wall
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Every star holds a dream we'll make come true together
                    </p>
                </motion.div>

                {/* ── Mobile: card grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:hidden">
                    {wishes.map((wish, index) => (
                        <WishCard key={wish.id} wish={wish} index={index} />
                    ))}
                </div>

                {/* ── Desktop: constellation ── */}
                <div className="relative w-full h-[700px] hidden md:block">
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
                                onClick={() => setSelectedWish(selectedWish?.id === wish.id ? null : wish)}
                                onMouseEnter={() => setSelectedWish(wish)}
                                onMouseLeave={() => setSelectedWish(null)}
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

                                {/* Title tooltip */}
                                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
                                    <div className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg text-sm text-gold font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        {wish.title}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}

                    {/* Selected wish — centered overlay */}
                    <AnimatePresence mode="wait">
                        {selectedWish && (
                            <motion.div
                                key={selectedWish.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                            >
                                <div className="bg-black/60 backdrop-blur-xl border border-white/20 rounded-3xl px-8 py-6 max-w-sm text-center shadow-[0_0_60px_rgba(212,175,55,0.15)]">
                                    <p className={`text-xs font-semibold tracking-widest uppercase mb-2 bg-gradient-to-r ${selectedWish.color} bg-clip-text text-transparent`}>
                                        {selectedWish.title}
                                    </p>
                                    <p className="text-white text-lg leading-relaxed font-serif italic">
                                        {selectedWish.wish}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default WishesWall;
