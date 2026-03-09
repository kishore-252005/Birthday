import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const StarryBackground = () => {
    const [stars, setStars] = useState<{ id: number; top: string; left: string; size: string; duration: string }[]>([]);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 5000], [0, -200]);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        const starCount = isMobile ? 80 : 150;
        const newStars = Array.from({ length: starCount }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * (isMobile ? 1.5 : 2) + 0.5}px`,
            duration: `${Math.random() * 4 + 3}s`,
        }));
        setStars(newStars);
    }, []);

    return (
        <motion.div style={{ y: y1 }} className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-mesh">
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="star"
                    style={{
                        top: star.top,
                        left: star.left,
                        width: star.size,
                        height: star.size,
                        '--duration': star.duration,
                    } as React.CSSProperties}
                />
            ))}
        </motion.div>
    );
};
