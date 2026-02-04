import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypewriterText = ({
    text,
    speed = 50,
    delay = 0,
    className = '',
    onComplete = () => { },
    showCursor = true
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [started, setStarted] = useState(delay === 0);

    useEffect(() => {
        if (delay > 0) {
            const delayTimeout = setTimeout(() => {
                setStarted(true);
            }, delay);
            return () => clearTimeout(delayTimeout);
        }
    }, [delay]);

    useEffect(() => {
        if (!started) return;

        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        } else if (currentIndex === text.length && !isComplete) {
            setIsComplete(true);
            onComplete();
        }
    }, [currentIndex, text, speed, isComplete, onComplete, started]);

    return (
        <span className={className}>
            {displayedText}
            {showCursor && !isComplete && started && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                    className="inline-block ml-1"
                >
                    |
                </motion.span>
            )}
        </span>
    );
};

export default TypewriterText;
