import { useState } from 'react';
import { motion } from 'framer-motion';
import EntryGate from './components/EntryGate';
import Hero from './components/Hero';
import LoveLetter from './components/LoveLetter';
import LoveMeter from './components/LoveMeter';
import Gallery from './components/Gallery';
import LoveCounter from './components/LoveCounter';
import MemoryTimeline from './components/MemoryTimeline';
import ReasonsCarousel from './components/ReasonsCarousel';
import ForeverValentine from './components/ForeverValentine';
import WishesWall from './components/WishesWall';
import FloatingHearts from './components/FloatingHearts';
import ParticleSystem from './components/ParticleSystem';
import CustomCursor from './components/CustomCursor';
import Closing from './components/Closing';
import MusicPlayer from './components/MusicPlayer';

function App() {
  const [entered, setEntered] = useState(false);

  // Stagger animation for sections
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Starry Background with parallax */}
      <div className="stars"></div>

      {/* Enhanced Particle System */}
      <ParticleSystem />

      {/* Floating Hearts */}
      <FloatingHearts />

      {/* Custom Cursor */}
      <CustomCursor />

      {!entered ? (
        <EntryGate onEnter={() => setEntered(true)} />
      ) : (
        <motion.main
          className="relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={sectionVariants}>
            <Hero />
          </motion.div>

          <motion.div variants={sectionVariants}>
            <LoveLetter />
          </motion.div>

          <motion.div variants={sectionVariants}>
            <LoveMeter />
          </motion.div>

          <motion.div variants={sectionVariants}>
            <LoveCounter startDate="2026-02-24" />
          </motion.div>

          <motion.div variants={sectionVariants}>
            <Gallery />
          </motion.div>

          <motion.div variants={sectionVariants}>
            <MemoryTimeline />
          </motion.div>

          <motion.div variants={sectionVariants}>
            <WishesWall />
          </motion.div>

          <motion.div variants={sectionVariants}>
            <ForeverValentine />
          </motion.div>

          <motion.div variants={sectionVariants}>
            <ReasonsCarousel />
          </motion.div>

          <motion.div variants={sectionVariants}>
            <Closing />
          </motion.div>

          <motion.div variants={sectionVariants}>
            <MusicPlayer />
          </motion.div>
        </motion.main>
      )}
    </div>
  );
}

export default App;
