import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
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
                        text="Tina,"
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
                className="absolute bottom-10 flex flex-col items-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 5, duration: 1 }}
            >
                <span className="text-xs text-white/30 tracking-widest uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <ChevronDown className="w-6 h-6 text-gold/60" />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
