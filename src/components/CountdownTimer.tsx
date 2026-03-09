import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export const CountdownTimer = () => {
    // Simple "Since you started ruling our world" counter or "Until the party ends"
    const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const birthday = new Date(); // Today is her birthday!
        birthday.setHours(0, 0, 0, 0);

        const interval = setInterval(() => {
            const now = new Date();
            const diff = now.getTime() - birthday.getTime();

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTime({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex gap-4 md:gap-8 justify-center items-center font-sans">
            {Object.entries(time).map(([label, value]) => (
                <div key={label} className="text-center group">
                    <motion.div
                        whileHover={{ scale: 1.1, y: -5 }}
                        className="glass-card w-16 h-16 md:w-24 md:h-24 flex items-center justify-center rounded-2xl md:rounded-3xl mb-2"
                    >
                        <span className="text-xl md:text-3xl font-black text-pink-400">{String(Math.abs(value)).padStart(2, '0')}</span>
                    </motion.div>
                    <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/40 font-bold">{label}</span>
                </div>
            ))}
        </div>
    );
};
