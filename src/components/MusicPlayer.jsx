import { useEffect } from 'react';

const MusicPlayer = () => {
    useEffect(() => {
        // Ensure iframe loads
        const iframe = document.getElementById('background-music');
        if (iframe) {
            console.log('Music player loaded');
        }
    }, []);

    return (
        <div className="hidden">
            <iframe
                id="background-music"
                width="0"
                height="0"
                src="https://www.youtube.com/embed/9rlW2rUzyn0?autoplay=1&mute=0&loop=1&playlist=9rlW2rUzyn0&controls=0&showinfo=0&modestbranding=1"
                title="Yebba's Heartbreak"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}
            />
        </div>
    );
};

export default MusicPlayer;
