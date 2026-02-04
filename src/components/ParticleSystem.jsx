import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ParticleSystem = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Particle classes
        class Star {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2;
                this.speedX = 0;
                this.speedY = Math.random() * 0.1;
                this.brightness = Math.random();
                this.twinkleSpeed = Math.random() * 0.02;
            }

            update() {
                this.y += this.speedY;
                this.brightness += this.twinkleSpeed;

                if (this.brightness > 1 || this.brightness < 0) {
                    this.twinkleSpeed *= -1;
                }

                if (this.y > canvas.height) {
                    this.y = 0;
                    this.x = Math.random() * canvas.width;
                }
            }

            draw() {
                ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();

                // Add glow effect
                ctx.shadowBlur = 10;
                ctx.shadowColor = `rgba(212, 175, 55, ${this.brightness * 0.5})`;
            }
        }

        class RosePetal {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = -20;
                this.size = Math.random() * 8 + 4;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 + 1;
                this.rotation = Math.random() * 360;
                this.rotationSpeed = Math.random() * 4 - 2;
                this.opacity = Math.random() * 0.6 + 0.2;
                this.swing = Math.random() * Math.PI * 2;
            }

            update() {
                this.y += this.speedY;
                this.x += Math.sin(this.swing) * 0.5;
                this.swing += 0.05;
                this.rotation += this.rotationSpeed;

                if (this.y > canvas.height + 20) {
                    this.y = -20;
                    this.x = Math.random() * canvas.width;
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate((this.rotation * Math.PI) / 180);
                ctx.globalAlpha = this.opacity;

                // Draw petal shape
                ctx.fillStyle = '#ff4d6d';
                ctx.beginPath();
                ctx.ellipse(0, 0, this.size, this.size * 1.5, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();
            }
        }

        class Sparkle {
            constructor(x, y) {
                this.x = x || Math.random() * canvas.width;
                this.y = y || Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.life = 60;
                this.maxLife = 60;
                this.speedX = (Math.random() - 0.5) * 2;
                this.speedY = (Math.random() - 0.5) * 2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.life--;
            }

            draw() {
                const opacity = this.life / this.maxLife;
                ctx.fillStyle = `rgba(212, 175, 55, ${opacity})`;
                ctx.shadowBlur = 15;
                ctx.shadowColor = `rgba(212, 175, 55, ${opacity})`;

                // Draw star shape
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.beginPath();
                for (let i = 0; i < 5; i++) {
                    ctx.lineTo(0, -this.size);
                    ctx.rotate((Math.PI * 2) / 10);
                    ctx.lineTo(0, -this.size / 2);
                    ctx.rotate((Math.PI * 2) / 10);
                }
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            }
        }

        // Initialize particles
        const stars = Array.from({ length: 100 }, () => new Star());
        const petals = Array.from({ length: 15 }, () => new RosePetal());
        const sparkles = [];

        // Mouse tracking for sparkles
        let mouseX = 0;
        let mouseY = 0;
        let lastSparkleTime = 0;

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            const now = Date.now();
            if (now - lastSparkleTime > 50) {
                sparkles.push(new Sparkle(mouseX, mouseY));
                lastSparkleTime = now;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.shadowBlur = 0;

            // Update and draw stars
            stars.forEach(star => {
                star.update();
                star.draw();
            });

            // Update and draw petals
            petals.forEach(petal => {
                petal.update();
                petal.draw();
            });

            // Update and draw sparkles
            for (let i = sparkles.length - 1; i >= 0; i--) {
                sparkles[i].update();
                sparkles[i].draw();

                if (sparkles[i].life <= 0) {
                    sparkles.splice(i, 1);
                }
            }

            requestAnimationFrame(animate);
        };

        animate();

        // Handle resize
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
            style={{ mixBlendMode: 'screen' }}
        />
    );
};

export default ParticleSystem;
