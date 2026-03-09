import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MagneticButton } from './MagneticButton';

export const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
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
                        initial={{ opacity: 0, scale: 0.8, y: 100, rotateX: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 100, rotateX: 30 }}
                        transition={{ type: 'spring', damping: 20 }}
                        className="relative w-full max-w-3xl glass-card rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-20 text-center shadow-[0_0_150px_rgba(255,20,147,0.25)] overflow-y-auto max-h-[90vh]"
                    >
                        {children}
                        <MagneticButton
                            onClick={onClose}
                            className="mt-10 md:mt-16 px-10 md:px-16 py-3 md:py-4 rounded-full bg-gradient-to-r from-pink-500 via-mystic to-primary hover:shadow-[0_0_40px_rgba(255,20,147,0.6)] transition-all font-black text-sm md:text-xl tracking-[0.2em] uppercase text-white"
                        >
                            Continue the Magic
                        </MagneticButton>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
