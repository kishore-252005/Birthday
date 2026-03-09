import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const PhotoGallery = () => {
    const photos = [
        { url: 'https://images.unsplash.com/photo-1530103862676-fa8c913f1d81?q=80&w=1200', caption: 'Your smile lights up the world! ✨' },
        { url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1200', caption: 'The most amazing Thangachi ever. ❤️' },
        { url: 'https://images.unsplash.com/photo-1464349153735-7db51edc3944?q=80&w=1200', caption: 'Cherishing every laugh we share! 😂' },
        { url: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=1200', caption: 'A bond that is truly eternal. 🤝' },
        { url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1200', caption: 'Always proud of who you are! 🥂' },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const next = () => setCurrentIndex((prev) => (prev + 1) % photos.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);

    return (
        <div className="relative w-full max-w-5xl mx-auto group">
            <motion.div
                layout
                className="overflow-hidden rounded-[3rem] glass-card aspect-[16/10] relative shadow-[0_0_100px_rgba(255,20,147,0.15)]"
            >
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentIndex}
                        src={photos[currentIndex].url}
                        alt="Memory"
                        initial={{ opacity: 0, scale: 1.1, filter: 'brightness(0.5) blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'brightness(1) blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.9, filter: 'brightness(0.5) blur(10px)' }}
                        transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                    />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-deep via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-0 inset-x-0 p-6 md:p-12 text-center bg-gradient-to-t from-deep/90 to-transparent">
                    <motion.p
                        key={currentIndex}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-script text-xl md:text-5xl text-pink-100 text-glow px-4"
                    >
                        {photos[currentIndex].caption}
                    </motion.p>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 px-6 py-2 rounded-full glass">
                    {photos.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-500",
                                i === currentIndex ? "bg-pink-500 w-12" : "bg-white/20 w-3 hover:bg-white/40"
                            )}
                        />
                    ))}
                </div>
            </motion.div>

            <button
                onClick={prev}
                className="absolute -left-2 md:-left-16 top-1/2 -translate-y-1/2 p-3 md:p-5 rounded-full glass hover:bg-pink-500/20 transition-all z-20 group active:scale-90"
            >
                <ChevronLeft className="w-6 h-6 md:w-10 md:h-10 group-hover:-translate-x-1 transition-transform text-pink-300" />
            </button>
            <button
                onClick={next}
                className="absolute -right-2 md:-right-16 top-1/2 -translate-y-1/2 p-3 md:p-5 rounded-full glass hover:bg-pink-500/20 transition-all z-20 group active:scale-90"
            >
                <ChevronRight className="w-6 h-6 md:w-10 md:h-10 group-hover:translate-x-1 transition-transform text-pink-300" />
            </button>
        </div>
    );
};
