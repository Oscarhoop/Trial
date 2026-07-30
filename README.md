Forever Yours

A personal love tribute site built with React. It's an interactive, animated web experience — something between a love letter and a scrapbook — made for one specific person.


Why I built this

A text message felt too small. I wanted to build something that actually felt like something, so I did. Every section is intentional — from the live relationship counter to the photo gallery to the music player. It's meant to be visited more than once.


What's inside

| Section | Description |
|---|---|
| Entry Gate | Gated intro — the site only opens when you're ready |
| Hero | Animated welcome with a typewriter effect |
| Love Letter | A personal written message |
| Love Meter | Interactive meter (it maxes out) |
| Love Counter | Live counter ticking up since day one |
| Gallery | Photo gallery of shared memories |
| Memory Timeline | Chronological journey through key moments |
| Reasons Carousel | A carousel of all the reasons why |
| Wishes Wall | A wall of heartfelt affirmations |
| Music Player | Built-in player to set the mood |
| Particle System | Ambient background effects |
| Floating Hearts | Ambient floating hearts |
| Custom Cursor | Heart cursor that follows you around |


Tech

- React 19
- Vite (rolldown-vite)
- Framer Motion
- Tailwind CSS v4
- Lucide React
- canvas-confetti


Getting started

```bash
npm install
npm run dev
```


Project structure

```
src/
  components/
    EntryGate.jsx
    Hero.jsx
    LoveLetter.jsx
    LoveMeter.jsx
    LoveCounter.jsx
    Gallery.jsx
    MemoryTimeline.jsx
    ReasonsCarousel.jsx
    WishesWall.jsx
    MusicPlayer.jsx
    FloatingHearts.jsx
    ParticleSystem.jsx
    CustomCursor.jsx
    TypewriterText.jsx
    Closing.jsx
    ErrorBoundary.jsx
  App.jsx
  main.jsx
  index.css
```


Deployment

Configured for Vercel. Push to the repo and it deploys automatically.
