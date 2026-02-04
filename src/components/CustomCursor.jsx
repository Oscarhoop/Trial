import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [trails, setTrails] = useState([]);

    useEffect(() => {
        // Add custom cursor class to body
        document.body.classList.add('custom-cursor');

        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            // Add trail
            setTrails((prev) => [
                ...prev.slice(-8),
                { x: e.clientX, y: e.clientY, id: Date.now() }
            ]);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.classList.remove('custom-cursor');
        };
    }, []);

    return (
        <>
            {/* Main cursor */}
            <motion.div
                className="fixed w-4 h-4 bg-rose-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
                animate={{
                    x: mousePosition.x - 8,
                    y: mousePosition.y - 8,
                }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
            />

            {/* Trail */}
            {trails.map((trail, index) => (
                <motion.div
                    key={trail.id}
                    className="fixed w-2 h-2 bg-rose-300 rounded-full pointer-events-none z-[9998]"
                    initial={{ x: trail.x - 4, y: trail.y - 4, opacity: 0.6, scale: 1 }}
                    animate={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.6 }}
                />
            ))}
        </>
    );
};

export default CustomCursor;
