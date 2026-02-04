import { motion } from 'framer-motion';

const ScrollReveal = ({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.8,
    className = ''
}) => {
    const variants = {
        up: {
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 }
        },
        down: {
            hidden: { opacity: 0, y: -75 },
            visible: { opacity: 1, y: 0 }
        },
        left: {
            hidden: { opacity: 0, x: -75 },
            visible: { opacity: 1, x: 0 }
        },
        right: {
            hidden: { opacity: 0, x: 75 },
            visible: { opacity: 1, x: 0 }
        },
        fade: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
        },
        scale: {
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 }
        }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
            variants={variants[direction]}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
