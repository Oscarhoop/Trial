import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

// Pre-computed stable particle data
const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: 3 + Math.random() * 5,
    delay: Math.random() * 4,
    opacity: 0.1 + Math.random() * 0.4,
}));

const EntryGate = ({ onEnter }) => {
    const [bloomed, setBloomed] = useState(false);
    const [heartbeat, setHeartbeat] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setHeartbeat(true), 1200);
        return () => clearTimeout(t);
    }, []);

    const handleClick = () => {
        setBloomed(true);
        setTimeout(onEnter, 1600);
    };

    return (
        <AnimatePresence>
            {!bloomed && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
                    onClick={handleClick}
                    exit={{ opacity: 0, transition: { duration: 0.8 } }}
                    style={{
                        background: 'radial-gradient(ellipse at center, #1a0a0a 0%, #0b0b0b 60%, #000 100%)',
                        cursor: 'pointer',
                    }}
                >
                    {/* Ambient center glow */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(100,10,20,0.35) 0%, transparent 70%)',
                        }}
                    />

                    {/* Gold rim vignette */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%)',
                        }}
                    />

                    {/* Floating particles */}
                    {PARTICLES.map((p) => (
                        <motion.div
                            key={p.id}
                            className="absolute rounded-full"
                            style={{
                                left: `${p.x}%`,
                                top: `${p.y}%`,
                                width: p.size,
                                height: p.size,
                                background: p.id % 3 === 0
                                    ? `rgba(212,175,55,${p.opacity})`
                                    : p.id % 3 === 1
                                    ? `rgba(244,63,94,${p.opacity})`
                                    : `rgba(255,255,255,${p.opacity * 0.6})`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                opacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.5],
                            }}
                            transition={{
                                duration: p.duration,
                                delay: p.delay,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                    ))}

                    {/* Main card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="relative flex flex-col items-center text-center max-w-md mx-4 select-none"
                    >
                        {/* "To: Tina" envelope label */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="mb-6 px-6 py-2 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-sm"
                        >
                            <span
                                className="text-xs tracking-[0.3em] uppercase font-light"
                                style={{ color: 'rgba(212,175,55,0.7)' }}
                            >
                                ✦ To: Tina ✦
                            </span>
                        </motion.div>

                        {/* Animated heart */}
                        <AnimatePresence>
                            {heartbeat && (
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                                    className="relative mb-8"
                                >
                                    {/* Pulsing glow rings */}
                                    {[1, 2, 3].map((ring) => (
                                        <motion.div
                                            key={ring}
                                            className="absolute inset-0 rounded-full"
                                            style={{
                                                border: `1px solid rgba(244,63,94,${0.3 / ring})`,
                                            }}
                                            animate={{
                                                scale: [1, 1 + ring * 0.4],
                                                opacity: [0.6, 0],
                                            }}
                                            transition={{
                                                duration: 2,
                                                delay: ring * 0.3,
                                                repeat: Infinity,
                                                ease: 'easeOut',
                                            }}
                                        />
                                    ))}
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.12, 1],
                                        }}
                                        transition={{
                                            duration: 1.2,
                                            repeat: Infinity,
                                            ease: [0.4, 0, 0.6, 1],
                                        }}
                                        className="relative w-20 h-20 rounded-full flex items-center justify-center"
                                        style={{
                                            background: 'linear-gradient(135deg, #be123c 0%, #9f1239 50%, #7f1d1d 100%)',
                                            boxShadow: '0 0 40px rgba(190,18,60,0.5), 0 0 80px rgba(190,18,60,0.2)',
                                        }}
                                    >
                                        <Heart
                                            size={36}
                                            className="text-white"
                                            fill="white"
                                            strokeWidth={0}
                                        />
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Main text */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.5, delay: 0.6 }}
                            className="font-serif text-2xl md:text-3xl leading-relaxed mb-2"
                            style={{ color: 'rgba(255,255,255,0.9)' }}
                        >
                            For the one who holds my heart...
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.5, delay: 1.0 }}
                            className="font-serif text-base italic mb-12"
                            style={{ color: 'rgba(212,175,55,0.55)' }}
                        >
                            A love letter, just for you.
                        </motion.p>

                        {/* Click CTA */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.8, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
                            className="flex flex-col items-center gap-2"
                        >
                            <span className="text-xs text-gray-500 tracking-[0.25em] uppercase">
                                Tap anywhere to open
                            </span>
                            <motion.div
                                animate={{ y: [0, 6, 0] }}
                                transition={{ duration: 1.4, repeat: Infinity }}
                                style={{ color: 'rgba(212,175,55,0.5)', fontSize: '1.2rem' }}
                            >
                                ↓
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}

            {/* Bloom transition overlay */}
            {bloomed && (
                <motion.div
                    className="fixed inset-0 z-[9998] pointer-events-none"
                    initial={{ clipPath: 'circle(0% at 50% 50%)' }}
                    animate={{ clipPath: 'circle(150% at 50% 50%)' }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                    style={{ background: '#4a0404' }}
                />
            )}
        </AnimatePresence>
    );
};

export default EntryGate;
