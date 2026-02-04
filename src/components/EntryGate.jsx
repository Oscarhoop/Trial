import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EntryGate = ({ onEnter }) => {
    const [bloomed, setBloomed] = useState(false);

    const handleClick = () => {
        setBloomed(true);
        setTimeout(onEnter, 1500); // Wait for bloom to finish before unmounting/transitioning
    };

    return (
        <AnimatePresence>
            {!bloomed && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
                    onClick={handleClick}
                    exit={{ opacity: 0, transition: { duration: 1 } }}
                >
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                        className="text-white font-serif text-2xl tracking-widest"
                        style={{ color: '#ffffff' }}
                    >
                        For the one who holds my heart...
                    </motion.p>

                    {/* Pulsing click indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.7, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        className="absolute bottom-20 text-sm text-gray-400 tracking-widest"
                    >
                        Click anywhere
                    </motion.div>
                </motion.div>
            )}
            {bloomed && (
                <motion.div
                    className="fixed inset-0 z-40 bg-wine pointer-events-none"
                    initial={{ clipPath: "circle(0% at 50% 50%)" }}
                    animate={{ clipPath: "circle(150% at 50% 50%)" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
            )}
        </AnimatePresence>
    );
};

export default EntryGate;
