import React from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';

export const InteractiveCard = ({ children, icon: Icon, title, delay = 0 }: { children: React.ReactNode; icon: any; title: string, delay?: number }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [15, -15]);
    const rotateY = useTransform(x, [-100, 100], [-15, 15]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.8 }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="perspective-1000"
        >
            <div className="glass-card p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] relative group preserve-3d">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity rotate-12 group-hover:rotate-0 duration-500 transform-gpu" style={{ transform: "translateZ(50px)" }}>
                    <Icon className="w-20 h-20 md:w-32 md:h-32" />
                </div>
                <div className="flex items-center gap-4 md:gap-5 mb-6 md:mb-8" style={{ transform: "translateZ(30px)" }}>
                    <div className="p-3 md:p-4 rounded-2xl bg-gradient-to-br from-pink-500/20 to-mystic/20 shadow-xl">
                        <Icon className="w-6 h-6 md:w-8 md:h-8 text-pink-400" />
                    </div>
                    <h3 className="text-xl md:text-3xl font-cute text-pink-100">{title}</h3>
                </div>
                <div className="text-white/70 italic font-sans text-base md:text-lg leading-relaxed px-2" style={{ transform: "translateZ(20px)" }}>
                    {children}
                </div>
            </div>
        </motion.div>
    );
};
