import { motion } from 'framer-motion';
import { Heart, Zap, Infinity, Calendar, TrendingUp, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

const LoveMeter = () => {
    const [animateStats, setAnimateStats] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAnimateStats(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const stats = [
        {
            icon: Heart,
            label: 'Compatibility',
            value: 100,
            maxValue: 100,
            color: 'from-rose-500 to-pink-600',
            glowColor: 'rgba(244, 63, 94, 0.5)',
            suffix: '%',
            description: 'Perfect Match'
        },
        {
            icon: Infinity,
            label: 'Love Level',
            value: 100,
            maxValue: 100,
            color: 'from-purple-500 to-pink-500',
            glowColor: 'rgba(168, 85, 247, 0.5)',
            suffix: '∞',
            description: 'Immeasurable'
        },
        {
            icon: Zap,
            label: 'Connection Strength',
            value: 99.9,
            maxValue: 100,
            color: 'from-amber-400 to-orange-500',
            glowColor: 'rgba(251, 191, 36, 0.5)',
            suffix: '%',
            description: 'Unbreakable'
        },
        {
            icon: TrendingUp,
            label: '2026 Progress',
            value: 85,
            maxValue: 100,
            color: 'from-emerald-400 to-teal-500',
            glowColor: 'rgba(52, 211, 153, 0.5)',
            suffix: '%',
            description: 'Building Our Future'
        },
        {
            icon: Calendar,
            label: 'Days Together',
            value: calculateDaysTogether(),
            maxValue: 999,
            color: 'from-blue-400 to-cyan-500',
            glowColor: 'rgba(59, 130, 246, 0.5)',
            suffix: ' days',
            description: 'And Counting...'
        },
        {
            icon: Sparkles,
            label: 'Joy Factor',
            value: 100,
            maxValue: 100,
            color: 'from-pink-400 to-rose-500',
            glowColor: 'rgba(244, 114, 182, 0.5)',
            suffix: '%',
            description: 'Pure Happiness'
        }
    ];

    function calculateDaysTogether() {
        const startDate = new Date('2026-02-24');
        const today = new Date();
        const diffTime = Math.abs(today - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    return (
        <section className="py-20 px-4 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-5xl mx-auto"
            >
                <h2 className="text-4xl md:text-5xl font-serif text-center mb-4 text-white">
                    Our Love Statistics
                </h2>
                <p className="text-center text-gray-400 mb-16 text-lg">
                    Some things just can't be measured... but here's our best attempt
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        const percentage = stat.inverse
                            ? 100 - (stat.value / stat.maxValue * 100)
                            : (stat.value / stat.maxValue * 100);

                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                                            style={{ boxShadow: `0 0 20px ${stat.glowColor}` }}
                                        >
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">{stat.label}</h3>
                                            <p className="text-sm text-gray-400">{stat.description}</p>
                                        </div>
                                    </div>
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 200 }}
                                        className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                                    >
                                        {stat.value}{stat.suffix}
                                    </motion.span>
                                </div>

                                {/* Progress Bar */}
                                <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: animateStats ? `${percentage}%` : 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
                                        className={`h-full bg-gradient-to-r ${stat.color} relative`}
                                        style={{ boxShadow: `0 0 15px ${stat.glowColor}` }}
                                    >
                                        {/* Shimmer effect */}
                                        <motion.div
                                            animate={{
                                                x: ['-100%', '200%']
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: 'linear',
                                                delay: index * 0.2
                                            }}
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                        />
                                    </motion.div>
                                </div>

                                {/* Percentage Label */}
                                <div className="flex justify-between mt-2 text-xs text-gray-500">
                                    <span>0</span>
                                    <span>{stat.inverse ? 'Love Conquers All' : 'Maximum'}</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Fun Footer Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="mt-12 text-center"
                >
                    <div className="inline-block bg-gradient-to-r from-rose-500/20 to-purple-500/20 backdrop-blur-md border border-white/20 rounded-full px-8 py-4">
                        <p className="text-white font-serif text-lg">
                            Final Verdict: <span className="text-gold font-bold">Absolutely Perfect for Each Other</span>
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default LoveMeter;
