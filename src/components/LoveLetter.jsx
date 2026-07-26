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
                            Tina, from the moment we started this journey on September 22nd, everything changed. You became the melody in my quiet moments and the spark in my darkest days.
                        </p>
                        <p>
                            I don't just love you for who you are, but for who I am when I'm with you. You make me want to be better, to dream bigger, and to love harder. Even with the miles between Nyari and Thika, you feel closer to me than my own heartbeat.
                        </p>
                        <p>
                            You are my best friend, my confidante, and my greatest adventure. 2026 isn't just a year; it's a promise. A promise that I will spend every day proving that you are, and always will be, my everything.
                        </p>
                    </div>
                    <div className="mt-10 font-serif text-2xl italic text-gold opacity-80">
                        - Forever Yours
                    </div>
                </motion.div>
            </Card>
        </section>
    );
};

export default LoveLetter;
