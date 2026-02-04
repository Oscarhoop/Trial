import { motion } from 'framer-motion';

const Card = ({ children, className = "", ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
