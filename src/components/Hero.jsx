import { useState } from 'react';
import { motion } from 'framer-motion';
import TypewriterText from './TypewriterText';

const Hero = () => {
    const [showSubtext, setShowSubtext] = useState(false);

    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-center p-4 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                className="relative"
            >
                <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                    <TypewriterText
                        text="Shazzy,"
                        speed={100}
                        delay={1000}
                        showCursor={false}
                    />
                    <br />
                    <TypewriterText
                        text="You Are My Everything."
                        speed={80}
                        delay={1800}
                        onComplete={() => setShowSubtext(true)}
                    />
                </h1>

                {showSubtext && (
                    <motion.p
                        className="text-xl md:text-2xl text-gold font-light tracking-wide"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <TypewriterText
                            text="2026 is Ours."
                            speed={100}
                            showCursor={false}
                        />
                    </motion.p>
                )}
            </motion.div>

            <motion.div
                className="absolute bottom-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 5, duration: 1 }}
            >
                {/* Animated scroll indicator */}
                <motion.div
                    className="w-1 h-12 bg-gradient-to-b from-transparent via-gold to-transparent"
                    animate={{
                        opacity: [0.3, 1, 0.3],
                        scaleY: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </motion.div>
        </section>
    );
};

export default Hero;
