/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Heart,
  Stars,
  Gift,
  Volume2,
  VolumeX,
  MessageCircleHeart,
  Sparkles,
  Cake,
  Quote,
  Music4,
  Crown,
  Zap
} from 'lucide-react';

// Components
import { MagneticButton } from './components/MagneticButton';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { MouseTrail } from './components/MouseTrail';
import { StarryBackground } from './components/StarryBackground';
import { TypingText } from './components/TypingText';
import { PhotoGallery } from './components/PhotoGallery';
import { InteractiveCard } from './components/InteractiveCard';
import { Modal } from './components/Modal';
import { ParallaxSection } from './components/ParallaxSection';
import { Balloons } from './components/Balloons';
import { CountdownTimer } from './components/CountdownTimer';

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
    <div className="min-h-screen relative overflow-x-hidden selection:bg-pink-500/50 noise-overlay bg-deep">
      <ScrollProgress />
      <StarryBackground />
      <MouseTrail />
      <CustomCursor />

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
            {isAudioPlaying ? (
              <Volume2 className="w-6 h-6 md:w-8 md:h-8 text-pink-400" />
            ) : (
              <VolumeX className="w-6 h-6 md:w-8 md:h-8 text-white/50" />
            )}
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
            <Balloons />
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
            <ParallaxSection offset={100}>
              <section className="text-center space-y-12 md:space-y-20 relative">
                <motion.div
                  animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="inline-block p-6 md:p-10 rounded-[2rem] md:rounded-[4rem] glass-card gradient-border shadow-[0_0_50px_rgba(255,20,147,0.3)]"
                >
                  <Heart className="w-12 h-12 md:w-24 md:h-24 text-pink-500 fill-pink-500 shadow-pink-500/50 drop-shadow-2xl" />
                </motion.div>

                <div className="max-w-4xl mx-auto relative perspective-2000 preserve-3d">
                  <div className="absolute -top-10 -left-6 md:-top-20 md:-left-20 opacity-10 text-pink-500 overflow-hidden">
                    <Quote className="w-32 h-32 md:w-[200px] md:h-[200px]" />
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
                    className="glass-card p-8 md:p-20 rounded-[3rem] md:rounded-[5rem] shadow-[0_0_150px_rgba(255,20,147,0.1)] border-white/20"
                  >
                    <TypingText
                      className="font-script text-pink-100 italic font-black text-2xl md:text-5xl leading-tight"
                      text="Thangachi... you are not just a sister; you are a piece of my heart that resides in another soul. Your presence is like a warm sunlight on a winter morning. This platform is just a small reflection of the immense love and respect I have for you. May your birthday be as legendary as you are!"
                    />
                  </motion.div>
                  <div className="absolute -bottom-10 -right-6 md:-bottom-20 md:-right-20 opacity-10 text-pink-500 rotate-180 overflow-hidden">
                    <Quote className="w-32 h-32 md:w-[200px] md:h-[200px]" />
                  </div>
                </div>

                <div className="mt-20">
                  <CountdownTimer />
                </div>
              </section>
            </ParallaxSection>

            {/* Section 2: Cinematic Gallery */}
            <ParallaxSection offset={60}>
              <section className="space-y-12 md:space-y-20">
                <div className="text-center space-y-6 md:space-y-8">
                  <motion.span
                    initial={{ letterSpacing: "0em" }}
                    whileInView={{ letterSpacing: "0.5em" }}
                    className="px-6 py-2 md:px-8 md:py-3 rounded-full glass text-pink-400 text-sm md:text-lg font-black tracking-[0.3em] md:tracking-[0.5em] uppercase border-pink-500/30 inline-block"
                  >
                    Memory Lane
                  </motion.span>
                  <h2 className="text-5xl md:text-[8rem] font-cute text-pink-300 drop-shadow-2xl">Eternal Moments</h2>
                </div>
                <PhotoGallery />
              </section>
            </ParallaxSection>

            {/* Section 3: The Triad of Excellence */}
            <ParallaxSection offset={40}>
              <section className="space-y-12 md:space-y-20">
                <div className="text-center">
                  <h2 className="text-5xl md:text-[10rem] font-cute text-violet-300">Why You Rule</h2>
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
            </ParallaxSection>

            {/* Section 4: The Sacred Message */}
            <section className="text-center relative">
              <div className="absolute inset-0 bg-pink-500/5 blur-[80px] md:blur-[150px] rounded-full" />
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-card p-10 md:p-20 md:p-40 rounded-[3rem] md:rounded-[6rem] border-white/10 relative z-10"
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
                  <h2 className="text-3xl md:text-[8rem] font-black font-cute text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-white to-mystic animate-gradient drop-shadow-2xl italic leading-tight break-words">
                    Once Again Happieee Birthday Thangachi, Keep shining Always
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
          <h2 className="text-3xl md:text-6xl font-cute text-pink-300 drop-shadow-lg leading-tight uppercase tracking-tighter px-4">
            My Dearest Thangachi
          </h2>
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
            <p className="font-cute text-2xl md:text-4xl text-violet-300 mt-4 md:mt-6 font-black uppercase tracking-widest">
              Your Eternal Anna
            </p>
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
            {i % 2 === 0 ? (
              <Heart className="w-12 h-12 text-pink-500/20" />
            ) : (
              <Sparkles className="w-12 h-12 text-violet-500/20" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
