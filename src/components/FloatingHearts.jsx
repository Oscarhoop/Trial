import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const FloatingHearts = () => {
    // Pre-compute all values once so they're stable across renders
    const hearts = useMemo(() => {
        const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
        return Array.from({ length: 15 }, (_, i) => ({
            id: i,
            delay: Math.random() * 5,
            duration: 8 + Math.random() * 4,
            startX: Math.random() * 100,
            driftX: (Math.random() - 0.5) * 100,
            size: 15 + Math.random() * 15,
            travelY: -(screenHeight + 150),
        }));
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    className="absolute"
                    style={{
                        left: `${heart.startX}%`,
                        bottom: '-50px',
                    }}
                    animate={{
                        y: [0, heart.travelY],
                        x: [0, heart.driftX],
                        rotate: [0, 360],
                        opacity: [0, 0.6, 0.6, 0],
                    }}
                    transition={{
                        duration: heart.duration,
                        repeat: Infinity,
                        delay: heart.delay,
                        ease: "easeInOut",
                    }}
                >
                    <Heart
                        className="text-rose-500/30"
                        size={heart.size}
                        fill="currentColor"
                    />
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingHearts;
