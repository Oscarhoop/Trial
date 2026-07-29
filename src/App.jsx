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
import WishesWall from './components/WishesWall';
import FloatingHearts from './components/FloatingHearts';
import ParticleSystem from './components/ParticleSystem';
import CustomCursor from './components/CustomCursor';
import Closing from './components/Closing';
import MusicPlayer from './components/MusicPlayer';
import ErrorBoundary from './components/ErrorBoundary';


function App() {
  const [entered, setEntered] = useState(false);

  return (
    <ErrorBoundary>
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Hero />
          <LoveLetter />
          <LoveMeter />
          <LoveCounter startDate="2026-02-24" />
          <Gallery />
          <MemoryTimeline />
          <WishesWall />
          <ReasonsCarousel />
          <Closing />
          <MusicPlayer />
        </motion.main>
      )}
    </div>
    </ErrorBoundary>
  );
}

export default App;
