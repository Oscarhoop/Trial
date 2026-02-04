import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const FloatingHearts = () => {
    const hearts = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 4,
        x: Math.random() * 100,
        size: 15 + Math.random() * 15,
    }));

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    className="absolute"
                    style={{
                        left: `${heart.x}%`,
                        bottom: '-50px',
                    }}
                    animate={{
                        y: [0, -window.innerHeight - 100],
                        x: [0, (Math.random() - 0.5) * 100],
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
