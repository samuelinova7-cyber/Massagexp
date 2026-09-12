import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Plus, CheckCircle2, Sparkles, Shuffle, Info, Flame, X } from 'lucide-react';
import { BodyArea } from '../types';
import { SECRET_TECHNIQUES } from '../data/bodyAreas';
import { playClickSound, playSuccessSound, playTimerFinishChime, triggerHaptic } from '../utils/audio';

interface ActiveSessionCardProps {
  area: BodyArea;
  isSecretActive: boolean;
  isAlreadyCompleted: boolean;
  onFinish: (areaId: string, durationSeconds: number, technique: string, isSecret: boolean) => void;
  onCancel: () => void;
}

export const ActiveSessionCard: React.FC<ActiveSessionCardProps> = ({
  area,
  isSecretActive,
  isAlreadyCompleted,
  onFinish,
  onCancel
}) => {
  const [targetDuration, setTargetDuration] = useState<number>(120); // default 2 minutes (120s)
  const [timeLeft, setTimeLeft] = useState<number>(120);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [selectedTechnique, setSelectedTechnique] = useState<string>('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize or randomize suggested technique
  useEffect(() => {
    shuffleTechnique();
    setTimeLeft(targetDuration);
    setIsRunning(true);
  }, [area.id, isSecretActive]);

  const shuffleTechnique = () => {
    const list = isSecretActive ? SECRET_TECHNIQUES : area.defaultTechniques;
    const randomTech = list[Math.floor(Math.random() * list.length)];
    setSelectedTechnique(randomTech);
  };

  // Timer interval effect
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            playTimerFinishChime();
            triggerHaptic(200);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft]);

  const handleSetPreset = (seconds: number) => {
    playClickSound();
    setTargetDuration(seconds);
    setTimeLeft(seconds);
    setIsRunning(true);
  };

  const handleTogglePlay = () => {
    playClickSound();
    setIsRunning(!isRunning);
  };

  const handleResetTimer = () => {
    playClickSound();
    setTimeLeft(targetDuration);
    setIsRunning(false);
  };

  const handleAdd30s = () => {
    playClickSound();
    setTimeLeft(prev => prev + 30);
    setTargetDuration(prev => Math.max(prev, timeLeft + 30));
  };

  const handleComplete = () => {
    const elapsedSeconds = Math.max(0, targetDuration - timeLeft);
    onFinish(area.id, elapsedSeconds, selectedTechnique, isSecretActive);
  };

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');
  const progressRatio = targetDuration > 0 ? (timeLeft / targetDuration) : 0;
  const xpReward = isSecretActive ? 200 : 100;

  return (
    <div className="relative w-full rounded-3xl bg-slate-900/90 border border-white/15 p-5 shadow-2xl backdrop-blur-2xl overflow-hidden animate-fadeIn">
      {/* Glow highlight */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400" />
      <div className="absolute -right-12 -top-12 w-36 h-36 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Area title */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold tracking-wider uppercase text-rose-400 bg-rose-500/15 px-2.5 py-0.5 rounded-full border border-rose-500/20">
              {area.view === 'back' ? 'Costas' : 'Frente'} • Sessão Ativa
            </span>
            {isSecretActive && (
              <span className="text-[11px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-400" /> 2x XP Secreto
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 mt-1">
            {area.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            {area.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-slate-200 transition-colors"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Suggested Technique Box */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-4 space-y-2 relative group">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Técnica & Movimento Sugerido:</span>
          </div>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              shuffleTechnique();
            }}
            className="text-[11px] font-medium text-amber-300 hover:text-amber-200 flex items-center gap-1 bg-amber-400/10 hover:bg-amber-400/20 px-2 py-1 rounded-lg transition-colors border border-amber-400/20"
          >
            <Shuffle className="w-3 h-3" />
            <span>Trocar Técnica</span>
          </button>
        </div>

        <p className="text-sm sm:text-base font-bold text-slate-100 leading-snug">
          {selectedTechnique}
        </p>

        {/* Tip */}
        <div className="pt-2 border-t border-white/5 flex items-start gap-2 text-xs text-slate-400">
          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <span>{area.tips}</span>
        </div>
      </div>

      {/* Timer Display & Circular Ring */}
      <div className="flex flex-col items-center justify-center my-3">
        {/* Preset Selector */}
        <div className="flex items-center gap-2 mb-3">
          {[
            { label: '1 min', sec: 60 },
            { label: '2 min', sec: 120 },
            { label: '3 min', sec: 180 },
            { label: '5 min', sec: 300 }
          ].map(p => (
            <button
              key={p.sec}
              type="button"
              onClick={() => handleSetPreset(p.sec)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                targetDuration === p.sec
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Big Digital Clock */}
        <div className="relative flex items-center justify-center my-2">
          {/* Circular progress SVG */}
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="44"
                stroke="currentColor"
                strokeWidth="4"
                className="text-slate-800"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                stroke="currentColor"
                strokeWidth="5"
                strokeDasharray={276.46}
                strokeDashoffset={276.46 * (1 - progressRatio)}
                strokeLinecap="round"
                className={`transition-all duration-500 ease-linear ${
                  timeLeft <= 10
                    ? 'text-rose-500'
                    : isSecretActive
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }`}
                fill="transparent"
              />
            </svg>

            {/* Time readout in center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-mono text-4xl sm:text-5xl font-black text-amber-300 tracking-tight drop-shadow-md">
                {minutes}:{seconds}
              </span>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                {isRunning ? (timeLeft === 0 ? 'Concluído' : 'Relaxando...') : 'Pausado'}
              </span>
            </div>
          </div>
        </div>

        {/* Timer Control Buttons */}
        <div className="flex items-center gap-3 my-2">
          <button
            type="button"
            onClick={handleResetTimer}
            className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-all active:scale-95"
            title="Reiniciar Timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleTogglePlay}
            className={`px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95 text-sm ${
              isRunning
                ? 'bg-slate-800 text-amber-300 border border-amber-400/40 hover:bg-slate-700'
                : 'bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 hover:opacity-95 shadow-amber-500/20'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>{timeLeft === 0 ? 'Recomeçar' : 'Continuar'}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleAdd30s}
            className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-all active:scale-95 flex items-center gap-1 text-xs font-bold"
            title="Adicionar 30 segundos"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>30s</span>
          </button>
        </div>
      </div>

      {/* Main Finish Action Button */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={handleComplete}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-base sm:text-lg shadow-xl shadow-emerald-500/30 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 group cursor-pointer"
        >
          <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>
            Concluir Massagem (+{xpReward} XP) ✨
          </span>
        </button>
      </div>
    </div>
  );
};
