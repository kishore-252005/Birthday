/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Heart,
  Stars,
  Gift,
  Music,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  MessageCircleHeart,
  Sparkles,
  Cake,
  Quote,
  Star as StarIcon,
  Camera,
  Music4,
  MapPin,
  Calendar,
  Zap,
  Crown
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const MagneticButton = ({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const springX = useSpring(x, { damping: 15, stiffness: 150 });
  const springY = useSpring(y, { damping: 15, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || isMobile) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * 0.35);
    y.set(distanceY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="magnetic-area inline-block"
    >
      <button onClick={onClick} className={cn("active:scale-95 transition-transform", className)}>
        {children}
      </button>
    </motion.div>
  );
};

const MouseTrail = () => {
  const [points, setPoints] = useState<{ x: number; y: number; id: number; color: string }[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileCheck = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsMobile(mobileCheck);
    if (mobileCheck) return;

    const handleMouseMove = (e: MouseEvent) => {
      const colors = ['#ff1493', '#7000ff', '#ffd700', '#00d2ff'];
      setPoints((prev) => [
        ...prev.slice(-15),
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
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          className="absolute"
          style={{
            left: point.x,
            top: point.y,
            width: 10 - i * 0.5,
            height: 10 - i * 0.5,
            borderRadius: '50%',
            backgroundColor: point.color,
            boxShadow: `0 0 10px ${point.color}`,
            filter: 'blur(1px)',
          }}
        />
      ))}
    </div>
  );
};

const StarryBackground = () => {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: string; duration: string }[]>([]);

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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-mesh">
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
    </div>
  );
};

const TypingText = ({ text, speed = 40, className }: { text: string; speed?: number; className?: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return <p className={cn("font-sans text-xl md:text-3xl leading-relaxed text-white/90", className)}>{displayedText}</p>;
};

const PhotoGallery = () => {
  const photos = [
    { url: 'https://picsum.photos/seed/love1/1200/800', caption: 'Your smile lights up the world! ✨' },
    { url: 'https://picsum.photos/seed/love2/1200/800', caption: 'The most amazing Thangachi ever. ❤️' },
    { url: 'https://picsum.photos/seed/love3/1200/800', caption: 'Cherishing every laugh we share! 😂' },
    { url: 'https://picsum.photos/seed/love4/1200/800', caption: 'A bond that is truly eternal. 🤝' },
    { url: 'https://picsum.photos/seed/love5/1200/800', caption: 'Always proud of who you are! 🥂' },
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

        {/* Progress Bars */}
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

const InteractiveCard = ({ children, icon: Icon, title, delay = 0 }: { children: React.ReactNode; icon: any; title: string, delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
      className="glass-card p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] relative group"
    >
      <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity rotate-12 group-hover:rotate-0 duration-500">
        <Icon className="w-20 h-20 md:w-32 md:h-32" />
      </div>
      <div className="flex items-center gap-4 md:gap-5 mb-6 md:mb-8">
        <div className="p-3 md:p-4 rounded-2xl bg-gradient-to-br from-pink-500/20 to-mystic/20">
          <Icon className="w-6 h-6 md:w-8 md:h-8 text-pink-400" />
        </div>
        <h3 className="text-xl md:text-3xl font-cute text-pink-100">{title}</h3>
      </div>
      <div className="text-white/70 italic font-sans text-base md:text-lg leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
};

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
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
              className="mt-10 md:mt-16 px-10 md:px-16 py-3 md:py-4 rounded-full bg-gradient-to-r from-pink-500 via-mystic to-primary hover:shadow-[0_0_40px_rgba(255,20,147,0.6)] transition-all font-black text-sm md:text-xl tracking-[0.2em] uppercase"
            >
              Continue the Magic
            </MagneticButton>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  const [step, setStep] = useState<'welcome' | 'reveal' | 'content'>('welcome');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [showFinalSurprise, setShowFinalSurprise] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startSurprise = () => {
    setStep('reveal');
    const colors = ['#ff1493', '#7000ff', '#00d2ff', '#ffd700'];
    confetti({
      particleCount: 250,
      spread: 120,
      origin: { y: 0.5 },
      colors,
      ticks: 400,
      gravity: 0.8
    });

    if (audioRef.current) {
      audioRef.current.play().catch(() => { });
      setIsAudioPlaying(true);
    }

    setTimeout(() => setStep('content'), 4500);
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  const triggerFireworks = () => {
    const duration = 12 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 60, spread: 360, ticks: 120, zIndex: 0 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 100 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 } });
    }, 400);

    setShowFinalSurprise(true);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-pink-500/50">
      <StarryBackground />
      <MouseTrail />

      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
      />

      {step !== 'welcome' && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed top-6 right-6 md:top-10 md:right-10 z-[150]"
        >
          <MagneticButton
            onClick={toggleAudio}
            className="p-3 md:p-5 rounded-2xl md:rounded-3xl glass hover:bg-white/20 transition-all shadow-xl"
          >
            {isAudioPlaying ? <Volume2 className="w-6 h-6 md:w-8 md:h-8 text-pink-400" /> : <VolumeX className="w-6 h-6 md:w-8 md:h-8 text-white/50" />}
          </MagneticButton>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {step === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(30px)' }}
            className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center overflow-hidden"
          >
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 10, stiffness: 80 }}
              className="mb-10 md:mb-16 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] glass animate-glow relative group cursor-pointer"
            >
              <Gift className="w-20 h-20 md:w-32 md:h-32 text-pink-500 group-hover:scale-125 transition-transform duration-700" />
              <div className="absolute -top-4 -right-4 p-3 md:p-5 rounded-2xl md:rounded-3xl glass-card rotate-12">
                <Crown className="w-6 h-6 md:w-10 md:h-10 text-accent animate-bounce" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4 md:space-y-6 px-4"
            >
              <h1 className="text-4xl md:text-[8rem] font-cute text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-white to-violet-300 animate-gradient font-black leading-tight">
                Unlock Your<br />Royal Surprise 👑
              </h1>
              <p className="text-lg md:text-2xl text-white/40 font-sans tracking-[0.2em] md:tracking-[0.3em] uppercase font-light">
                Tailored with love for my Thangachi
              </p>
            </motion.div>

            <motion.div className="mt-12 md:mt-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
              <MagneticButton
                onClick={startSurprise}
                className="group relative px-12 md:px-20 py-5 md:py-8 bg-white text-black rounded-full text-xl md:text-3xl font-black shadow-[0_0_30px_rgba(255,255,255,0.2)] md:shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-all overflow-hidden"
              >
                <span className="relative z-10">OPEN NOW</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-mystic opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </MagneticButton>
            </motion.div>
          </motion.div>
        )}

        {step === 'reveal' && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, scale: 0.3, filter: 'blur(50px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -200 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center"
          >
            <motion.div
              animate={{
                y: [0, -30, 0],
                rotateY: [0, 180, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="mb-10 md:mb-16"
            >
              <Cake className="w-32 h-32 md:w-48 md:h-48 text-pink-400 text-glow" />
            </motion.div>

            <h1 className="text-5xl md:text-[14rem] font-black font-cute text-white drop-shadow-[0_0_30px_rgba(255,20,147,1)] md:drop-shadow-[0_0_60px_rgba(255,20,147,1)] leading-none italic">
              HAPPY BIRTHDAY!
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 md:mt-12 text-2xl md:text-7xl font-script text-pink-100 drop-shadow-lg"
            >
              To the world's best Thangachi...
            </motion.p>
          </motion.div>
        )}

        {step === 'content' && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 w-full max-w-6xl mx-auto px-6 py-40 space-y-64 pb-96"
          >
            {/* Section 1: Cinematic Intro */}
            <section className="text-center space-y-12 md:space-y-20 relative">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="inline-block p-6 md:p-10 rounded-[2rem] md:rounded-[4rem] glass-card gradient-border"
              >
                <Heart className="w-12 h-12 md:w-24 md:h-24 text-pink-500 fill-pink-500 shadow-pink-500/50 drop-shadow-2xl" />
              </motion.div>

              <div className="max-w-4xl mx-auto relative perspective-1000">
                <div className="absolute -top-10 -left-6 md:-top-20 md:-left-20 opacity-10 text-pink-500 overflow-hidden"><Quote className="w-32 h-32 md:w-[200px] md:h-[200px]" /></div>
                <div className="glass-card p-8 md:p-32 rounded-[3rem] md:rounded-[5rem] shadow-[0_0_150px_rgba(255,20,147,0.1)]">
                  <TypingText
                    className="font-script text-pink-100 italic font-black text-2xl md:text-4xl"
                    text="Thangachi... you are not just a sister; you are a piece of my heart that resides in another soul. Your presence is like a warm sunlight on a winter morning. This platform is just a small reflection of the immense love and respect I have for you. May your birthday be as legendary as you are!"
                  />
                </div>
                <div className="absolute -bottom-10 -right-6 md:-bottom-20 md:-right-20 opacity-10 text-pink-500 rotate-180 overflow-hidden"><Quote className="w-32 h-32 md:w-[200px] md:h-[200px]" /></div>
              </div>
            </section>

            {/* Section 2: Cinematic Gallery */}
            <section className="space-y-12 md:space-y-20">
              <div className="text-center space-y-6 md:space-y-8">
                <span className="px-6 py-2 md:px-8 md:py-3 rounded-full glass text-pink-400 text-sm md:text-lg font-black tracking-[0.3em] md:tracking-[0.5em] uppercase border-pink-500/30">
                  Memory Lane
                </span>
                <h2 className="text-4xl md:text-[6rem] font-cute text-pink-300 drop-shadow-2xl">Eternal Moments</h2>
              </div>
              <PhotoGallery />
            </section>

            {/* Section 3: The Triad of Excellence */}
            <section className="space-y-12 md:space-y-20">
              <div className="text-center">
                <h2 className="text-4xl md:text-8xl font-cute text-violet-300">Why You Rule</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                <InteractiveCard icon={Crown} title="Royal Grace" delay={0.1}>
                  "The way you carry yourself with kindness and strength is nothing short of royalty."
                </InteractiveCard>
                <InteractiveCard icon={Zap} title="Electric Energy" delay={0.2}>
                  "Your vibe is infectious. You bring energy and life wherever you go, Thangachi!"
                </InteractiveCard>
                <InteractiveCard icon={Stars} title="Guiding Star" delay={0.3}>
                  "In my dark moments, you've always been the star that showed me the way. Thank you."
                </InteractiveCard>
              </div>
            </section>

            {/* Section 4: The Sacred Message */}
            <section className="text-center relative">
              <div className="absolute inset-0 bg-pink-500/5 blur-[80px] md:blur-[150px] rounded-full" />
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-card p-10 md:p-40 rounded-[3rem] md:rounded-[6rem] border-white/10 relative z-10"
              >
                <Music4 className="w-12 h-12 md:w-20 md:h-20 text-violet-400 mx-auto mb-10 md:mb-16 animate-pulse" />
                <h3 className="text-3xl md:text-8xl font-script mb-10 md:mb-16 text-white leading-tight">A Message from the Soul...</h3>
                <MagneticButton
                  onClick={() => setIsLetterOpen(true)}
                  className="px-8 md:px-20 py-4 md:py-8 rounded-full bg-white text-black font-black text-lg md:text-2xl flex items-center gap-4 md:gap-6 mx-auto hover:bg-pink-500 hover:text-white transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                >
                  <MessageCircleHeart className="w-6 h-6 md:w-10 md:h-10" />
                  READ MY HEART
                </MagneticButton>
              </motion.div>
            </section>

            {/* Section 5: The Grand Finale */}
            <section className="text-center pt-20 md:pt-40">
              {!showFinalSurprise ? (
                <div className="space-y-12 md:space-y-16">
                  <p className="text-xl md:text-3xl font-cute text-white/30 animate-pulse tracking-widest uppercase px-4">The Final Frontier...</p>
                  <MagneticButton
                    onClick={triggerFireworks}
                    className="group relative p-12 md:p-20 rounded-[3rem] md:rounded-[4rem] glass border-pink-500/30 hover:border-pink-500 transition-all shadow-2xl overflow-hidden"
                  >
                    <Sparkles className="w-16 h-16 md:w-24 md:h-24 text-accent group-hover:scale-150 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-mystic/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </MagneticButton>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="space-y-12 md:space-y-20 px-4"
                >
                  <h2 className="text-3xl md:text-
                  [8rem] font-black font-cute text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-white to-mystic animate-gradient drop-shadow-2xl italic leading-tight break-words">


                    Once Again Happieee Birthday Thangachi , Keep shining Always
                  </h2>
                  <div className="flex justify-center gap-8 md:gap-16 items-center">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }}>
                      <Stars className="w-8 h-8 md:w-16 md:h-16 text-accent" />
                    </motion.div>
                    <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
                      <Heart className="w-12 h-12 md:w-24 md:h-24 text-primary fill-primary drop-shadow-[0_0_20px_rgba(255,20,147,0.6)] md:drop-shadow-[0_0_40px_rgba(255,20,147,0.8)]" />
                    </motion.div>
                    <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }}>
                      <Stars className="w-8 h-8 md:w-16 md:h-16 text-accent" />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </section>

            <footer className="text-center pt-32 md:pt-64 opacity-20 font-sans text-sm md:text-xl tracking-[0.5em] md:tracking-[1em] uppercase font-black px-4">
              Eternal Siblings • 2026
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Special Letter Modal */}
      <Modal isOpen={isLetterOpen} onClose={() => setIsLetterOpen(false)}>
        <div className="space-y-12">
          <div className="flex justify-center">
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="p-8 rounded-[3rem] bg-pink-500/20 shadow-inner"
            >
              <Heart className="w-24 h-24 text-pink-500 fill-pink-500" />
            </motion.div>
          </div>
          <h2 className="text-3xl md:text-6xl font-cute text-pink-300 drop-shadow-lg leading-tight uppercase tracking-tighter px-4">My Dearest Thangachi</h2>
          <div className="space-y-6 md:space-y-10 text-left font-sans text-lg md:text-2xl text-white/90 leading-relaxed max-h-[50vh] overflow-auto px-4 md:px-10 custom-scrollbar hide-scrollbar">
            <p className="border-l-4 border-pink-500 pl-4 md:pl-8 italic">
              "Thangachi is not just a title; it is a sentiment that transcends bloodlines."
            </p>
            <p>
              On this extraordinary day, I want you to know that you are the most precious gift in my world.
              Our bond is forged in the fires of shared dreams, silent understandings, and the laughter that only we can decipher.
            </p>
            <p>
              You've taught me what it means to be resilient. Seeing you shine your light in this world makes me stand tall with pride.
              You are a queen in every sense of the word, and you deserve a kingdom of happiness.
            </p>
            <p className="text-pink-300 font-bold">
              Never forget that you have an Anna who will cross oceans for you. Your success is my success, and your joy is my ultimate goal.
            </p>
          </div>
          <div className="pt-10 md:pt-16 border-t border-white/10 px-4">
            <p className="font-script text-3xl md:text-5xl text-pink-200">Bound by choice, united by love,</p>
            <p className="font-cute text-2xl md:text-4xl text-violet-300 mt-4 md:mt-6 font-black uppercase tracking-widest">Your Eternal Anna</p>
          </div>
        </div>
      </Modal>

      {/* Epic Decoration Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -400, 0],
              x: [0, Math.random() * 200 - 100, 0],
              rotate: 360,
              scale: [1, 1.5, 1],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute"
            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
          >
            {i % 2 === 0 ? <Heart className="w-12 h-12 text-pink-500/20" /> : <Sparkles className="w-12 h-12 text-violet-500/20" />}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
