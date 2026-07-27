import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Card from './ui/Card';
import Button from './ui/Button';
import { Heart, Sparkles } from 'lucide-react';

const ForeverValentine = () => {
    const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
    const [yesClicked, setYesClicked] = useState(false);
    const [noAttempts, setNoAttempts] = useState(0);

    const handleNoHover = () => {
        const newX = (Math.random() - 0.5) * 300;
        const newY = (Math.random() - 0.5) * 200;
        setNoPosition({ x: newX, y: newY });
        setNoAttempts(prev => prev + 1);
    };

    const handleYesClick = () => {
        setYesClicked(true);

        // Confetti explosion
        const duration = 3 * 1000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff6b9d', '#c44569', '#f8b500']
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff6b9d', '#c44569', '#f8b500']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    };

    return (
        <section className="py-20 px-4 relative z-10 flex justify-center">
            <Card className="max-w-2xl w-full p-10 md:p-14 text-center mx-4">
                <AnimatePresence mode="wait">
                    {!yesClicked ? (
                        <motion.div
                            key="question"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-serif mb-6 text-white flex items-center justify-center gap-3">
                                <Sparkles className="w-8 h-8 text-rose-400" />
                                Are You The Most Amazing Girlfriend Ever?
                                <Sparkles className="w-8 h-8 text-rose-400" />
                            </h2>
                            <p className="text-gray-300 mb-8 text-lg">
                                There's only one right answer to this...
                            </p>

                            {noAttempts > 3 && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-rose-400 mb-4 italic"
                                >
                                    The "No" button knows you're lying...
                                </motion.p>
                            )}

                            <div className="flex gap-6 justify-center items-center relative h-24">
                                <Button
                                    onClick={handleYesClick}
                                    className="bg-rose-600 hover:bg-rose-700 border-rose-500 text-xl px-8 py-4 flex items-center gap-2"
                                >
                                    Yes! <Heart className="w-5 h-5 fill-current" />
                                </Button>

                                <motion.div
                                    animate={{ x: noPosition.x, y: noPosition.y }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Button
                                        onMouseEnter={handleNoHover}
                                        onClick={handleNoHover}
                                        className="bg-gray-600 hover:bg-gray-700 border-gray-500 text-xl px-8 py-4 cursor-pointer"
                                    >
                                        No
                                    </Button>
                                </motion.div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="answer"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-6"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 10, 0] }}
                                transition={{ duration: 0.5, repeat: 2 }}
                                className="flex justify-center mb-6"
                            >
                                <Heart className="w-24 h-24 text-rose-500 fill-rose-500" />
                            </motion.div>
                            <h2 className="text-4xl md:text-5xl font-serif text-white">
                                Of course you are.
                            </h2>
                            <p className="text-xl text-gray-300 font-serif italic">
                                There was never any doubt, baby. ❤️
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>
        </section>
    );
};

export default ForeverValentine;
