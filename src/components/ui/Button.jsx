import { motion } from 'framer-motion';

const Button = ({ children, onClick, className = "", ...props }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`px-6 py-3 rounded-full font-serif font-bold text-white transition-colors bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.1)] ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
