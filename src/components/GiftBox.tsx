import React from 'react';
import { motion } from 'motion/react';
import { Gift, Stars } from 'lucide-react';

export const GiftBox = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
    return (
        <div className="relative cursor-pointer group" onClick={onClick}>
            <motion.div
                animate={isOpen ? { y: -100, rotate: 15, opacity: 0 } : { y: 0 }}
                transition={{ type: 'spring', damping: 12, stiffness: 100 }}
                className="relative z-20"
            >
                {/* Lid */}
                <motion.div
                    animate={isOpen ? { y: -50, rotate: -20 } : { y: 0 }}
                    className="absolute -top-8 left-1/2 -translate-x-1/2 w-40 h-12 bg-pink-600 rounded-t-lg shadow-xl flex justify-center items-start pt-2"
                >
                    <div className="w-8 h-8 rounded-full bg-accent border-4 border-pink-700 -mt-6" />
                </motion.div>

                {/* Box Body */}
                <div className="w-40 h-40 bg-pink-500 rounded-b-lg shadow-2xl relative overflow-hidden flex items-center justify-center">
                    {/* Ribbons */}
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-accent" />
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 bg-accent" />

                    <Gift className="w-16 h-16 text-white relative z-10" />

                    {/* Sparkle effect on hover */}
                    <motion.div
                        animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute top-4 right-4"
                    >
                        <Stars className="w-6 h-6 text-accent" />
                    </motion.div>
                </div>
            </motion.div>

            {/* What's inside (Revealed when open) */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={isOpen ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                className="absolute inset-0 z-10 flex items-center justify-center"
            >
                <div className="w-32 h-32 rounded-full bg-accent/20 blur-xl animate-pulse" />
            </motion.div>
        </div>
    );
};
