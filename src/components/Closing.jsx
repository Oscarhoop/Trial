import { motion } from 'framer-motion';

const Closing = () => {
    return (
        <section className="py-20 px-4 relative z-10 flex justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="text-center max-w-2xl"
            >
                <motion.p
                    className="text-3xl md:text-5xl font-serif leading-relaxed text-white"
                    animate={{ filter: ['hue-rotate(0deg)', 'hue-rotate(30deg)', 'hue-rotate(0deg)'] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ color: '#f472b6' }}
                >
                    You'll Forever Be Mine
                </motion.p>

                <motion.p
                    className="text-3xl md:text-5xl font-serif mt-4 leading-relaxed"
                    animate={{ filter: ['hue-rotate(0deg)', 'hue-rotate(-30deg)', 'hue-rotate(0deg)'] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    style={{ color: '#fb7185' }}
                >
                    And I'll Forever Be Yours
                </motion.p>

                <motion.div
                    className="mt-8 text-6xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0],
                        filter: [
                            'drop-shadow(0 0 8px rgba(244,63,94,0.5))',
                            'drop-shadow(0 0 24px rgba(244,63,94,0.9))',
                            'drop-shadow(0 0 8px rgba(244,63,94,0.5))',
                        ]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1
                    }}
                >
                    ❤️
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Closing;
