import { motion } from 'framer-motion';
import { MapPin, Heart } from 'lucide-react';

const LDRBridge = () => {
    // Approximate distance between Nyari and Thika (you can adjust this)
    const distance = "28 km";

    return (
        <section className="py-20 px-4 relative z-10 flex flex-col items-center">
            <motion.h2
                className="text-3xl md:text-4xl font-serif text-center mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                No Distance Can Keep Us Apart
            </motion.h2>

            <p className="text-gray-400 text-center mb-16 max-w-md">
                {distance} may separate us geographically, but our hearts beat as one
            </p>

            <div className="relative w-full max-w-3xl h-64 border-t border-white/20 flex items-center justify-between px-10 md:px-20">

                {/* Connection Line */}
                <div className="absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>
                <motion.div
                    className="absolute top-1/2 left-[10%] right-[10%] h-1 bg-gold blur-[2px]"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Heartbeat traveling between locations */}
                <motion.div
                    className="absolute top-1/2 flex items-center justify-center"
                    initial={{ left: "10%" }}
                    animate={{ left: "90%" }}
                    transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    style={{ translateY: "-50%" }}
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.6, 1, 0.6]
                        }}
                        transition={{ duration: 1, repeat: Infinity }}
                    >
                        <Heart className="w-5 h-5 text-rose-500" fill="currentColor" />
                    </motion.div>
                </motion.div>

                {/* Location 1 - Nyari */}
                <motion.div
                    className="relative flex flex-col items-center gap-2 transform -translate-y-1/2"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <div className="w-14 h-14 rounded-full bg-wine/80 border-2 border-gold flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.4)]">
                        <MapPin className="text-white w-6 h-6" />
                    </div>
                    <div className="text-center">
                        <span className="text-sm tracking-widest font-bold block">NYARI</span>
                        <span className="text-xs text-gray-400">My Heart</span>
                    </div>
                </motion.div>

                {/* Location 2 - Thika */}
                <motion.div
                    className="relative flex flex-col items-center gap-2 transform -translate-y-1/2"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <div className="w-14 h-14 rounded-full bg-wine/80 border-2 border-gold flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.4)]">
                        <MapPin className="text-white w-6 h-6" />
                    </div>
                    <div className="text-center">
                        <span className="text-sm tracking-widest font-bold block">THIKA</span>
                        <span className="text-xs text-gray-400">Your Heart</span>
                    </div>
                </motion.div>
            </div>

            <motion.p
                className="mt-8 text-center text-gray-300 italic max-w-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
            >
                "Distance means so little when someone means so much."
            </motion.p>
        </section>
    );
};

export default LDRBridge;
