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
                    className="text-3xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-rose-400 leading-relaxed"
                    animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{ backgroundSize: '200% 200%' }}
                >
                    You'll Forever Be Mine
                </motion.p>
                <motion.p
                    className="text-3xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-rose-400 mt-4 leading-relaxed"
                    animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 0.2
                    }}
                    style={{ backgroundSize: '200% 200%' }}
                >
                    And I'll Forever Be Yours
                </motion.p>

                <motion.div
                    className="mt-8 text-6xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0]
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
