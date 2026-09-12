import React from 'react';
import { Sparkles, Trophy, RotateCcw, Music, Flame, Home } from 'lucide-react';
import { MAX_XP } from '../data/bodyAreas';
import { RankTier } from '../types';

interface HeaderStatusProps {
  xp: number;
  completedCount: number;
  totalAreas: number;
  rank: RankTier;
  isSecretActive: boolean;
  onOpenAmbient: () => void;
  onResetSession: () => void;
  onGoHome?: () => void;
  isAmbientPlaying: boolean;
}

export const HeaderStatus: React.FC<HeaderStatusProps> = ({
  xp,
  completedCount,
  totalAreas,
  rank,
  isSecretActive,
  onOpenAmbient,
  onResetSession,
  onGoHome,
  isAmbientPlaying
}) => {
  const xpPercent = Math.min((xp / MAX_XP) * 100, 100);

  const getRankData = () => {
    switch (rank) {
      case 'diamond':
        return {
          title: '💎 Diamante',
          color: 'from-cyan-400 via-sky-300 to-indigo-300 text-cyan-200 border-cyan-400/40 bg-cyan-950/40',
          barColor: 'from-cyan-400 via-teal-300 to-emerald-400'
        };
      case 'gold':
        return {
          title: '🥇 Ouro',
          color: 'from-amber-300 via-yellow-400 to-orange-400 text-amber-200 border-amber-400/40 bg-amber-950/40',
          barColor: 'from-amber-400 via-yellow-400 to-orange-400'
        };
      case 'silver':
        return {
          title: '🥈 Prata',
          color: 'from-slate-200 via-slate-300 to-zinc-400 text-slate-100 border-slate-400/40 bg-slate-900/50',
          barColor: 'from-slate-300 via-indigo-300 to-violet-400'
        };
      case 'bronze':
      default:
        return {
          title: '🥉 Bronze',
          color: 'from-amber-700 via-amber-600 to-amber-800 text-amber-100 border-amber-700/40 bg-stone-900/50',
          barColor: 'from-rose-500 via-orange-400 to-amber-400'
        };
    }
  };

  const rankInfo = getRankData();

  return (
    <header className="relative w-full rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 p-4 shadow-xl overflow-hidden">
      {/* Decorative ambient background blur */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between gap-3 mb-3">
        {/* Rank Badge */}
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold border shadow-inner flex items-center gap-1.5 ${rankInfo.color}`}>
            <Trophy className="w-4 h-4" />
            <span>{rankInfo.title}</span>
          </div>
          {isSecretActive && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              2x XP
            </span>
          )}
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1.5">
          {onGoHome && (
            <button
              type="button"
              onClick={onGoHome}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all text-xs flex items-center gap-1"
              title="Tela Inicial / Start"
            >
              <Home className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Início</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenAmbient}
            className={`p-2 rounded-xl border transition-all text-xs flex items-center gap-1.5 ${
              isAmbientPlaying
                ? 'bg-rose-500/20 border-rose-400/40 text-rose-300 shadow-sm shadow-rose-500/20 animate-pulse'
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
            }`}
            title="Sons Relaxantes de Spa"
          >
            <Music className="w-4 h-4" />
            <span className="hidden sm:inline">{isAmbientPlaying ? 'Som Ativo' : 'Som Spa'}</span>
          </button>

          <button
            type="button"
            onClick={onResetSession}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-slate-200 transition-all"
            title="Reiniciar Sessão"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress & Numbers */}
      <div className="space-y-2">
        <div className="flex justify-between items-baseline text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Progresso da Sessão</span>
            <span className="text-slate-400 text-xs">({completedCount}/{totalAreas} áreas)</span>
          </div>
          <div className="font-mono font-bold text-amber-300">
            {xp} <span className="text-slate-400 font-normal">/ {MAX_XP} XP</span>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="w-full h-3.5 rounded-full bg-slate-950/80 p-0.5 border border-white/10 overflow-hidden relative shadow-inner">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${rankInfo.barColor} transition-all duration-500 ease-out shadow-sm`}
            style={{ width: `${Math.max(xpPercent, 2)}%` }}
          />
        </div>

        {/* Level thresholds indicators */}
        <div className="flex justify-between text-[10px] text-slate-400 px-0.5 font-medium">
          <span>🥉 0 XP</span>
          <span className={xp >= 400 ? 'text-slate-200 font-semibold' : ''}>🥈 400 XP</span>
          <span className={xp >= 800 ? 'text-amber-300 font-bold' : ''}>🥇 800 XP (Segredo)</span>
          <span className={xp >= 1200 ? 'text-cyan-300 font-bold' : ''}>💎 1200 XP</span>
        </div>
      </div>
    </header>
  );
};
