import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MagneticButton } from './MagneticButton';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const Modal = ({ isOpen, onClose, children, isPaper = false }: { isOpen: boolean; onClose: () => void; children: React.ReactNode, isPaper?: boolean }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-deep/95 backdrop-blur-2xl"
                    />
                    <motion.div
                        initial={isPaper ? { rotateX: 90, opacity: 0, scale: 0.9, y: 100 } : { opacity: 0, scale: 0.8, y: 100, rotateX: 30 }}
                        animate={isPaper ? { rotateX: 0, opacity: 1, scale: 1, y: 0 } : { opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                        exit={isPaper ? { rotateX: 90, opacity: 0, scale: 0.9, y: 100 } : { opacity: 0, scale: 0.8, y: 100, rotateX: 30 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className={cn(
                            "relative w-full max-w-3xl rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-20 text-center shadow-[0_0_150px_rgba(255,20,147,0.25)] overflow-y-auto max-h-[90vh] perspective-1000 preserve-3d",
                            isPaper ? "bg-[#fdfbf7] text-[#55433c] paper-texture" : "glass-card text-white"
                        )}
                    >
                        {isPaper && (
                            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
                                {/* Paper fold lines */}
                                <div className="absolute top-1/3 left-0 w-full h-px bg-[#55433c] blur-[1px]" />
                                <div className="absolute top-2/3 left-0 w-full h-px bg-[#55433c] blur-[1px]" />
                            </div>
                        )}

                        {children}

                        <div className="flex justify-center mt-10 md:mt-16">
                            <MagneticButton
                                onClick={onClose}
                                className={cn(
                                    "px-10 md:px-16 py-3 md:py-4 rounded-full transition-all font-black text-sm md:text-xl tracking-[0.2em] uppercase",
                                    isPaper ? "bg-[#55433c] text-[#fdfbf7] hover:bg-black" : "bg-gradient-to-r from-pink-500 via-mystic to-primary hover:shadow-[0_0_40px_rgba(255,20,147,0.6)] text-white"
                                )}
                            >
                                Close Original Note
                            </MagneticButton>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
