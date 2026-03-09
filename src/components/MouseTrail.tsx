import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export const MouseTrail = () => {
    const [points, setPoints] = useState<{ x: number; y: number; id: number; color: string }[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mobileCheck = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        setIsMobile(mobileCheck);
        if (mobileCheck) return;

        const handleMouseMove = (e: MouseEvent) => {
            const colors = ['#ff1493', '#7000ff', '#ffd700', '#00d2ff'];
            setPoints((prev) => [
                ...prev.slice(-20),
                { x: e.clientX, y: e.clientY, id: Date.now(), color: colors[Math.floor(Math.random() * colors.length)] }
            ]);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    if (isMobile) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[100]">
            {points.map((point, i) => (
                <motion.div
                    key={point.id}
                    initial={{ opacity: 0.8, scale: 1 }}
                    animate={{ opacity: 0, scale: 0 }}
                    className="absolute"
                    style={{
                        left: point.x,
                        top: point.y,
                        width: 12 - i * 0.5,
                        height: 12 - i * 0.5,
                        borderRadius: '50%',
                        backgroundColor: point.color,
                        boxShadow: `0 0 15px ${point.color}`,
                        filter: 'blur(1px)',
                    }}
                />
            ))}
        </div>
    );
};
