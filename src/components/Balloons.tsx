import React from 'react';
import { motion } from 'motion/react';

export const Balloons = () => {
    const colors = ['#ff1493', '#7000ff', '#ffd700', '#00d2ff', '#ff69b4'];

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {Array.from({ length: 15 }).map((_, i) => {
                const size = Math.random() * 40 + 40;
                const color = colors[Math.floor(Math.random() * colors.length)];
                const duration = Math.random() * 5 + 5;
                const delay = Math.random() * 2;
                const left = Math.random() * 100;

                return (
                    <motion.div
                        key={i}
                        initial={{ y: '110vh', x: `${left}vw`, rotate: 0 }}
                        animate={{
                            y: '-20vh',
                            x: `${left + (Math.random() * 20 - 10)}vw`,
                            rotate: Math.random() * 45 - 22.5
                        }}
                        transition={{
                            duration,
                            delay,
                            ease: "linear",
                        }}
                        className="absolute"
                    >
                        <div
                            style={{
                                width: size,
                                height: size * 1.3,
                                backgroundColor: color,
                                borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
                                boxShadow: `inset -5px -5px 10px rgba(0,0,0,0.2), 0 0 20px ${color}44`
                            }}
                            className="relative"
                        >
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-8 bg-white/20" />
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};
