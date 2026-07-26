import { motion } from 'framer-motion';
import Card from './ui/Card';

const LoveLetter = () => {
    return (
        <section className="py-20 px-4 relative z-10 flex justify-center">
            <Card className="max-w-3xl w-full p-10 md:p-14 bg-white/5 backdrop-blur-md border-white/10 mx-4 shadow-[0_0_40px_rgba(255,255,255,0.05)]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-serif mb-8 text-white/90">My Heart's Truth</h2>
                    <div className="space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed font-light tracking-wide font-serif">
                        <p>
                            Babe, from our days in high school to right now, you have been my constant. You are my long-time friend, my lover, and my person. We've had our ups and downs, even spent years apart, but the universe always finds a way to bring us back together at the end of it all.
                        </p>
                        <p>
                            I don't just love you for who you are, but for who I am when I'm with you. We've proven that no matter how much time passes or what life throws at us, you will always be closer to me than my own heartbeat.
                        </p>
                        <p>
                            You are my best friend and my lover. This isn't just about today; it's a promise baby. A promise that we will always choose each other every single time. Happy Girlfriend's Day, my love.
                        </p>
                    </div>
                    <div className="mt-10 font-serif text-2xl italic text-gold opacity-80">
                        -I love you princess
                       
                    </div>
                </motion.div>
            </Card>
        </section>
    );
};

export default LoveLetter;
