import React, { useState, useEffect } from 'react';
import { Play, Sparkles, Heart, Flame, ShieldCheck, Trophy, Music, Disc, Wand2 } from 'lucide-react';
import { playStartGameSound, playClickSound, playSuccessSound, triggerHaptic } from '../utils/audio';
import confetti from 'canvas-confetti';

interface StartScreenProps {
  onStartGame: () => void;
  savedXp?: number;
  savedCompletedCount?: number;
}

const LOADING_STEPS = [
  { progress: 20, icon: '🌸', text: 'Selecionando essências aromáticas e óleos...' },
  { progress: 45, icon: '✨', text: 'Aquecendo as palmas das mãos para o toque...' },
  { progress: 70, icon: '🕯️', text: 'Ajustando iluminação aconchegante e frequências zen...' },
  { progress: 90, icon: '🗺️', text: 'Carregando mapa corporal interativo e técnicas secretas...' },
  { progress: 100, icon: '💆‍♀️', text: 'Tudo pronto! Entrando na sua sessão de Massage XP...' }
];

export const StartScreen: React.FC<StartScreenProps> = ({
  onStartGame,
  savedXp = 0,
  savedCompletedCount = 0
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Handle Start click
  const handleStartPress = () => {
    playStartGameSound();
    triggerHaptic(150);
    setIsLoading(true);
    setLoadingProgress(5);
  };

  // Loading animation simulation
  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // progressive increment
        const increment = Math.floor(Math.random() * 8) + 6;
        const next = Math.min(100, prev + increment);
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isLoading]);

  // Update step text according to progress
  useEffect(() => {
    if (!isLoading) return;

    if (loadingProgress < 25) setCurrentStepIndex(0);
    else if (loadingProgress < 50) setCurrentStepIndex(1);
    else if (loadingProgress < 75) setCurrentStepIndex(2);
    else if (loadingProgress < 95) setCurrentStepIndex(3);
    else setCurrentStepIndex(4);

    if (loadingProgress === 100) {
      playSuccessSound();
      triggerHaptic(300);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {}

      const timeout = setTimeout(() => {
        onStartGame();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [loadingProgress, isLoading, onStartGame]);

  if (isLoading) {
    const currentStep = LOADING_STEPS[currentStepIndex];

    return (
      <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-6 text-center overflow-hidden select-none">
        {/* Ambient background glow effects */}
        <div className="absolute w-96 h-96 bg-rose-500/20 rounded-full blur-[140px] pointer-events-none -top-20 -left-20 animate-pulse" />
        <div className="absolute w-96 h-96 bg-amber-500/20 rounded-full blur-[140px] pointer-events-none -bottom-20 -right-20 animate-pulse" />
        <div className="absolute w-80 h-80 bg-fuchsia-600/20 rounded-full blur-[120px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        <div className="relative z-10 w-full max-w-sm flex flex-col items-center space-y-6">
          {/* Animated Central Glowing Orb / Icon */}
          <div className="relative">
            {/* Spinning Rainbow Halo Ring */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-rose-500 via-amber-400 via-emerald-400 to-fuchsia-600 animate-spin opacity-80 blur-sm" style={{ animationDuration: '3s' }} />
            
            <div className="relative w-28 h-28 rounded-full bg-slate-900/90 border-2 border-white/40 flex items-center justify-center shadow-2xl backdrop-blur-xl">
              <span className="text-5xl transform transition-transform duration-300 animate-bounce">
                {currentStep.icon}
              </span>
            </div>
          </div>

          {/* Title & Step Text */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-amber-300 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Preparando sua Experiência</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white drop-shadow-md">
              MASSAGE XP
            </h2>

            <p className="text-sm text-slate-300 min-h-[44px] flex items-center justify-center px-4 font-medium transition-all duration-300">
              {currentStep.text}
            </p>
          </div>

          {/* Dynamic Progress Bar */}
          <div className="w-full space-y-2">
            <div className="w-full h-4 rounded-full bg-slate-900 border border-white/20 p-0.5 overflow-hidden shadow-inner relative">
              <div
                className="h-full rounded-full bg-gradient-to-r from-pink-500 via-rose-500 via-amber-400 via-emerald-400 to-cyan-400 animate-rainbow transition-all duration-150 ease-out shadow-lg"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-xs font-mono text-slate-400 px-1 font-semibold">
              <span className="flex items-center gap-1 text-slate-300">
                <Wand2 className="w-3 h-3 text-rose-400 animate-pulse" /> Carregando...
              </span>
              <span className="text-amber-300 text-sm font-black">{loadingProgress}%</span>
            </div>
          </div>

          {/* Subtle Relaxing Spa Tip */}
          <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-center gap-1.5 bg-slate-900/60 py-2 px-3 rounded-xl border border-white/5">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500/50" />
            <span>Dica: Use óleo morno e movimentos calmos e contínuos.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-lg mx-auto flex flex-col items-center justify-center py-6 px-4 space-y-6 text-center select-none animate-fadeIn">
      {/* Top Tagline Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-500/20 via-fuchsia-500/20 to-amber-500/20 border border-rose-400/40 text-rose-200 text-xs sm:text-sm font-bold shadow-lg shadow-rose-500/10 backdrop-blur-md">
        <Heart className="w-4 h-4 text-rose-400 fill-rose-500 animate-pulse" />
        <span>Ritual Romântico, Conexão & Bem-Estar</span>
      </div>

      {/* Main Logo & Hero Title */}
      <div className="space-y-3 relative">
        <div className="relative inline-block animate-float">
          <div className="text-6xl sm:text-7xl drop-shadow-2xl">
            💆‍♀️
          </div>
          <span className="absolute -top-1 -right-2 text-2xl animate-spin" style={{ animationDuration: '6s' }}>
            ✨
          </span>
          <span className="absolute -bottom-1 -left-2 text-2xl animate-pulse">
            💖
          </span>
        </div>

        <div className="space-y-1">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-amber-200 drop-shadow-lg">
            MASSAGE XP
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-sm mx-auto leading-relaxed">
            O jogo definitivo de massagem para casais e autocuidado com níveis, técnicas especiais e recompensas!
          </p>
        </div>
      </div>

      {/* ULTRA VIBRANT, COLORFUL & ANIMATED START BUTTON */}
      <div className="w-full max-w-sm pt-2 pb-2">
        <div className="relative group">
          {/* Animated Multi-Color Glow Background Aura */}
          <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-pink-600 via-purple-600 via-amber-400 via-emerald-400 to-cyan-500 opacity-80 group-hover:opacity-100 blur-xl transition duration-500 animate-pulse-glow" />

          {/* The Main Glowing START Button */}
          <button
            type="button"
            onClick={handleStartPress}
            className="relative w-full py-5 px-8 rounded-3xl bg-gradient-to-r from-rose-500 via-fuchsia-500 via-amber-500 to-emerald-400 hover:from-rose-400 hover:via-fuchsia-400 hover:to-emerald-300 text-slate-950 font-black text-xl sm:text-2xl shadow-2xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 overflow-hidden border-2 border-white/70 cursor-pointer animate-rainbow"
          >
            {/* Shimmer light reflection sweep */}
            <div className="absolute inset-0 w-1/2 h-full bg-white/40 transform -skew-x-12 animate-shimmer pointer-events-none" />

            {/* Glowing inner shadow */}
            <div className="relative z-10 flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-slate-950 text-amber-300 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>
              <span className="tracking-wider uppercase text-slate-950 drop-shadow font-extrabold">
                START GAME
              </span>
              <Sparkles className="w-6 h-6 text-slate-950 animate-spin" style={{ animationDuration: '5s' }} />
            </div>
          </button>
        </div>

        <p className="text-[11px] text-slate-400 mt-2 font-medium tracking-wide">
          ✨ Toque para iniciar a jornada sensorial e acumular XP ✨
        </p>
      </div>

      {/* Saved Session Info (if returning player) */}
      {savedXp > 0 && (
        <div className="w-full max-w-sm p-3.5 rounded-2xl bg-slate-900/80 border border-amber-500/30 flex items-center justify-between text-left backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">Sessão em Andamento</div>
              <div className="text-[11px] text-slate-400">
                {savedCompletedCount} áreas concluídas • <span className="text-amber-300 font-semibold">{savedXp} XP</span>
              </div>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-lg border border-amber-500/30">
            Continuar
          </span>
        </div>
      )}

      {/* Feature Highlights Grid */}
      <div className="w-full max-w-sm grid grid-cols-2 gap-2.5 text-left">
        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-white/10 space-y-1 backdrop-blur-sm hover:border-rose-400/40 transition-colors">
          <div className="flex items-center gap-2 text-rose-300 font-bold text-xs">
            <span className="text-base">🗺️</span>
            <span>Mapa Anatômico</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            12 áreas interativas (Costas e Frente) com visão 2D e silhueta.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-white/10 space-y-1 backdrop-blur-sm hover:border-amber-400/40 transition-colors">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
            <span className="text-base">🔥</span>
            <span>Massagem Secreta</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            Desbloqueie no nível Ouro e ganhe 2x XP com técnicas exclusivas.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-white/10 space-y-1 backdrop-blur-sm hover:border-emerald-400/40 transition-colors">
          <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
            <span className="text-base">⏱️</span>
            <span>Timer & Técnicas</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            Contador com movimentos sugeridos e dicas de relaxamento.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-white/10 space-y-1 backdrop-blur-sm hover:border-cyan-400/40 transition-colors">
          <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs">
            <span className="text-base">💎</span>
            <span>Bônus Diamante</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            Recompensa especial ao completar todas as partes do corpo.
          </p>
        </div>
      </div>

      {/* Safety & Comfort badge */}
      <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>Experiência relaxante com som ambiente de spa incluído</span>
      </div>
    </div>
  );
};
