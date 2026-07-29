import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Pause, Volume2, VolumeX, AlertCircle } from 'lucide-react';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadError, setLoadError] = useState(false);
    const iframeRef = useRef(null);

    const songTitle = "Yebba's Heartbreak";
    const artist = "YEBBA";
    const videoId = "9rlW2rUzyn0";

    // Pre-compute stable bar heights so they don't flicker on re-render
    const barHeights = useMemo(() =>
        Array.from({ length: 12 }, () => 8 + Math.random() * 20),
    []);

    const togglePlay = () => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        if (isPlaying) {
            iframe.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: 'pauseVideo' }),
                '*'
            );
        } else {
            iframe.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: 'playVideo' }),
                '*'
            );
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        if (isMuted) {
            iframe.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: 'unMute' }),
                '*'
            );
        } else {
            iframe.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: 'mute' }),
                '*'
            );
        }
        setIsMuted(!isMuted);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9990]">
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 2, duration: 0.6, type: 'spring', stiffness: 200 }}
            >
                {/* Expanded panel */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="mb-3 bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl p-4 w-64 shadow-[0_0_40px_rgba(212,175,55,0.15)]"
                        >
                            {/* Album art header */}
                            <div className="relative w-full h-20 rounded-xl overflow-hidden mb-3 bg-gradient-to-br from-rose-900/60 to-purple-900/60 flex items-center justify-center">
                                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 via-purple-500/10 to-gold/10" />
                                <motion.div
                                    animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                                    className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-pink-700 flex items-center justify-center shadow-[0_0_20px_rgba(244,63,94,0.5)] border-2 border-white/20"
                                >
                                    <Music size={20} className="text-white" />
                                </motion.div>
                                <div className="absolute bottom-1 right-2">
                                    <span className="text-[10px] text-white/30 tracking-widest">♪ OUR SONG ♪</span>
                                </div>
                            </div>

                            {/* Animated waveform bars */}
                            <div className="flex items-end justify-center gap-1 h-8 mb-3">
                                {barHeights.map((maxH, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-1 rounded-full bg-gradient-to-t from-rose-600 to-gold"
                                        animate={isPlaying ? {
                                            height: ['4px', `${maxH}px`, '4px'],
                                        } : { height: '4px' }}
                                        transition={{
                                            duration: 0.4 + (i % 4) * 0.1,
                                            repeat: Infinity,
                                            delay: i * 0.05,
                                            ease: 'easeInOut'
                                        }}
                                        style={{ minHeight: '4px' }}
                                    />
                                ))}
                            </div>

                            <p className="text-white font-serif text-sm truncate text-center">{songTitle}</p>
                            <p className="text-gray-400 text-xs text-center mt-1">{artist}</p>

                            {/* Error fallback */}
                            {loadError && (
                                <div className="flex items-center gap-1.5 mt-2 text-amber-400/80 text-[11px] justify-center">
                                    <AlertCircle size={11} />
                                    <span>Try disabling ad blocker for music</span>
                                </div>
                            )}

                            {/* Loading indicator */}
                            {!isLoaded && !loadError && (
                                <div className="flex items-center gap-1.5 mt-2 text-white/30 text-[11px] justify-center">
                                    <motion.div
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        Loading player...
                                    </motion.div>
                                </div>
                            )}

                            <div className="flex items-center justify-center gap-4 mt-4">
                                <button
                                    onClick={toggleMute}
                                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-gray-300 hover:text-white"
                                >
                                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                                </button>
                                <motion.button
                                    onClick={togglePlay}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    disabled={!isLoaded}
                                    className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-[0_0_20px_rgba(244,63,94,0.5)] hover:shadow-[0_0_30px_rgba(244,63,94,0.7)] transition-shadow disabled:opacity-50"
                                >
                                    {isPlaying ? <Pause size={18} className="text-white" /> : <Play size={18} className="text-white ml-0.5" />}
                                </motion.button>
                                <div className="w-8 h-8" /> {/* spacer */}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Floating button */}
                <div className="flex justify-end">
                    <motion.button
                        onClick={() => setIsExpanded(!isExpanded)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative w-14 h-14 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.2)] hover:border-gold/50 transition-colors"
                    >
                        <Music size={22} className="text-gold" />
                        {/* Pulsing ring when playing */}
                        {isPlaying && (
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-rose-500/60"
                                animate={{ scale: [1, 1.4], opacity: [0.7, 0] }}
                                transition={{ duration: 1.2, repeat: Infinity }}
                            />
                        )}
                    </motion.button>
                </div>
            </motion.div>

            {/* Hidden YouTube iframe for audio */}
            <iframe
                ref={iframeRef}
                id="background-music"
                width="0"
                height="0"
                src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&loop=1&playlist=${videoId}&controls=0`}
                title={songTitle}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                onLoad={() => setIsLoaded(true)}
                onError={() => { setIsLoaded(false); setLoadError(true); }}
                style={{ position: 'absolute', top: '-9999px', left: '-9999px', width: 0, height: 0 }}
            />
        </div>
    );
};

export default MusicPlayer;
