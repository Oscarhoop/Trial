import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles, Heart, Home, Plane, Coffee, Music, Sunrise, Moon } from 'lucide-react';

const wishes = [
    {
        id: 1,
        icon: Heart,
        title: 'Always Feel Chosen',
        wish: 'I wish you always know that I choose you. Not by habit. Not by chance. By heart. Every single day.',
        color: 'from-rose-500 to-pink-600',
        glow: 'rgba(244,63,94,0.35)',
        span: 'col-span-2 md:col-span-2 row-span-1',
        featured: true,
    },
    {
        id: 2,
        icon: Home,
        title: 'Feel at Home',
        wish: 'I wish you always feel safe with me. Like wherever we are together is exactly where you belong.',
        color: 'from-amber-400 to-orange-500',
        glow: 'rgba(251,146,60,0.35)',
        span: 'col-span-1 row-span-2',
        featured: false,
    },
    {
        id: 3,
        icon: Sunrise,
        title: 'Peaceful Mornings',
        wish: 'I wish you mornings that are soft and slow. Full of warmth and the quiet kind of happiness.',
        color: 'from-orange-400 to-red-500',
        glow: 'rgba(249,115,22,0.35)',
        span: 'col-span-1 row-span-1',
        featured: false,
    },
    {
        id: 4,
        icon: Star,
        title: 'Know Your Worth',
        wish: 'I wish you always see yourself the way I see you. Rare, radiant, and completely irreplaceable.',
        color: 'from-purple-500 to-pink-500',
        glow: 'rgba(168,85,247,0.35)',
        span: 'col-span-1 row-span-1',
        featured: false,
    },
    {
        id: 5,
        icon: Sparkles,
        title: 'Every Dream Come True',
        wish: "I wish every dream you've ever quietly kept to yourself finds its way to you. You deserve all of them.",
        color: 'from-pink-400 to-rose-500',
        glow: 'rgba(244,114,182,0.35)',
        span: 'col-span-2 md:col-span-2 row-span-1',
        featured: true,
    },
    {
        id: 6,
        icon: Music,
        title: 'Laughter Always',
        wish: 'I wish you laughter that fills the room. The uncontrollable kind that makes your eyes water.',
        color: 'from-green-400 to-emerald-500',
        glow: 'rgba(52,211,153,0.35)',
        span: 'col-span-1 row-span-1',
        featured: false,
    },
    {
        id: 7,
        icon: Coffee,
        title: 'Be Truly Seen',
        wish: 'I wish you always feel understood. The full, real, unfiltered you. Never having to shrink for anyone.',
        color: 'from-yellow-400 to-amber-500',
        glow: 'rgba(251,191,36,0.35)',
        span: 'col-span-1 row-span-1',
        featured: false,
    },
    {
        id: 8,
        icon: Plane,
        title: 'Adventures Ahead',
        wish: "I wish you moments that take your breath away. Places, experiences, and feelings you'll never forget.",
        color: 'from-blue-400 to-cyan-500',
        glow: 'rgba(34,211,238,0.35)',
        span: 'col-span-1 row-span-1',
        featured: false,
    },
    {
        id: 9,
        icon: Moon,
        title: 'Peace That Stays',
        wish: 'I wish you an inner peace that never leaves. A stillness that no storm can touch.',
        color: 'from-indigo-400 to-purple-500',
        glow: 'rgba(99,102,241,0.35)',
        span: 'col-span-1 row-span-1',
        featured: false,
    },
];

const WishCard = ({ wish, onClick }) => {
    const Icon = wish.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={() => onClick(wish)}
            className={`${wish.span} relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer group`}
            style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(14px)',
                boxShadow: `0 0 0 1px rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.4)`,
                minHeight: wish.featured ? '140px' : '130px',
            }}
        >
            {/* Gradient accent top bar */}
            <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${wish.color} opacity-80`} />

            {/* Soft glow blob */}
            <div
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-35 transition-opacity duration-500"
                style={{ background: wish.glow }}
            />

            {/* Content */}
            <div className={`relative z-10 p-4 md:p-5 h-full flex flex-col ${wish.featured ? 'justify-between' : 'gap-3'}`}>
                {/* Top row: icon + title */}
                <div className="flex items-start gap-3">
                    <div
                        className={`flex-shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br ${wish.color} flex items-center justify-center`}
                        style={{ boxShadow: `0 0 18px ${wish.glow}` }}
                    >
                        <Icon className="w-5 h-5 text-white" />
                    </div>
                    <p className={`text-[11px] md:text-xs font-bold tracking-widest uppercase pt-1 bg-gradient-to-r ${wish.color} bg-clip-text text-transparent leading-tight`}>
                        {wish.title}
                    </p>
                </div>

                {/* Wish text */}
                <p className={`text-white/60 text-xs md:text-sm leading-relaxed font-serif italic ${wish.featured ? 'line-clamp-3' : 'line-clamp-2'}`}>
                    {wish.wish}
                </p>

                {/* Tap hint */}
                <p className="text-white/20 text-[10px] tracking-widest uppercase mt-auto hidden group-hover:block transition-all">
                    tap to read ↗
                </p>
            </div>
        </motion.div>
    );
};

const WishesWall = () => {
    const [selected, setSelected] = useState(null);

    return (
        <section className="py-16 px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-4xl md:text-5xl font-serif mb-3 text-white">
                        My Wishes for You
                    </h2>
                    <p className="text-gray-400 text-base md:text-lg">
                        Everything I wish you could feel, have, and know forever.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-auto gap-3 md:gap-4">
                    {wishes.map((wish) => (
                        <WishCard key={wish.id} wish={wish} onClick={setSelected} />
                    ))}
                </div>

                {/* Star count footer */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="text-center text-white/20 text-xs tracking-widest uppercase mt-8"
                >
                    {wishes.length} wishes · infinite love
                </motion.p>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelected(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-5"
                        style={{ background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(16px)' }}
                    >
                        <motion.div
                            initial={{ scale: 0.88, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.88, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-sm w-full rounded-3xl overflow-hidden"
                            style={{
                                background: 'rgba(15,15,20,0.95)',
                                border: '1px solid rgba(255,255,255,0.15)',
                                boxShadow: `0 0 60px ${selected.glow}, 0 40px 80px rgba(0,0,0,0.7)`,
                            }}
                        >
                            {/* Gradient top bar */}
                            <div className={`h-1 w-full bg-gradient-to-r ${selected.color}`} />

                            {/* Glow blob */}
                            <div
                                className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
                                style={{ background: selected.glow }}
                            />

                            <div className="relative z-10 p-7 flex flex-col items-center text-center gap-5">
                                {/* Icon */}
                                <div
                                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selected.color} flex items-center justify-center`}
                                    style={{ boxShadow: `0 0 30px ${selected.glow}` }}
                                >
                                    {(() => { const Icon = selected.icon; return <Icon className="w-8 h-8 text-white" />; })()}
                                </div>

                                {/* Title */}
                                <p className={`text-xs font-bold tracking-widest uppercase bg-gradient-to-r ${selected.color} bg-clip-text text-transparent`}>
                                    {selected.title}
                                </p>

                                {/* Wish */}
                                <p className="text-white text-lg leading-relaxed font-serif italic">
                                    "{selected.wish}"
                                </p>

                                {/* Close */}
                                <button
                                    onClick={() => setSelected(null)}
                                    className="mt-1 px-7 py-3 rounded-full font-semibold text-sm transition-all duration-200"
                                    style={{
                                        background: `linear-gradient(135deg, ${selected.glow.replace('0.35', '0.6')}, transparent)`,
                                        border: '1px solid rgba(255,255,255,0.15)',
                                        color: '#fff',
                                    }}
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

export default WishesWall;
