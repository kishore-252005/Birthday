import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const ParallaxSection = ({ children, offset = 50 }: { children: React.ReactNode; offset?: number }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <motion.div ref={ref} style={{ y, opacity }} className="relative">
            {children}
        </motion.div>
    );
};
