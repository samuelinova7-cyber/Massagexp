import React from 'react';
import { Sparkles, Flame, Lock } from 'lucide-react';

interface SecretMassageCardProps {
  isUnlocked: boolean;
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
  xpNeeded: number;
}

export const SecretMassageCard: React.FC<SecretMassageCardProps> = ({
  isUnlocked,
  isEnabled,
  onToggle,
  xpNeeded
}) => {
  if (!isUnlocked) {
    return (
      <div className="w-full p-3.5 rounded-2xl bg-slate-900/40 border border-white/5 flex items-center justify-between text-xs text-slate-400 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-slate-800/80 text-amber-400/60 border border-white/5">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-slate-300 flex items-center gap-1.5">
              <span>✨ Massagem Secreta (Bloqueada)</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Desbloqueie no nível <span className="text-amber-400 font-semibold">🥇 Ouro (800 XP)</span> para ganhar 2x XP e técnicas sensoriais.
            </p>
          </div>
        </div>
        <div className="text-[11px] font-mono text-amber-400/80 bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/20 whitespace-nowrap">
          Faltam {Math.max(0, xpNeeded)} XP
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full rounded-2xl p-4 transition-all duration-300 border shadow-lg overflow-hidden ${
      isEnabled
        ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 border-amber-300/80 shadow-amber-500/25 ring-2 ring-amber-400/40'
        : 'bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-600/15 text-slate-100 border-amber-500/30'
    }`}>
      {/* Background flare */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-28 h-28 bg-white/20 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between gap-3 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${isEnabled ? 'bg-slate-950 text-amber-300' : 'bg-amber-400/20 text-amber-300'}`}>
              <Flame className="w-4 h-4" />
            </div>
            <h3 className={`font-bold text-sm sm:text-base flex items-center gap-1.5 ${isEnabled ? 'text-slate-950' : 'text-amber-200'}`}>
              Massagem Secreta Desbloqueada!
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
            </h3>
          </div>
          <p className={`text-xs ${isEnabled ? 'text-slate-900 font-medium' : 'text-slate-300'}`}>
            Ative para aplicar técnicas sensoriais exclusivas e ganhar <strong className={isEnabled ? 'text-black underline decoration-amber-900' : 'text-amber-300 font-bold'}>XP Dobrado (200 XP)</strong> por área!
          </p>
        </div>

        {/* Custom iOS-like toggle switch */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <button
            type="button"
            role="switch"
            aria-checked={isEnabled}
            onClick={() => onToggle(!isEnabled)}
            className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              isEnabled ? 'bg-emerald-500 shadow-md shadow-emerald-700/40' : 'bg-slate-700'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                isEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-[10px] font-bold tracking-wider uppercase ${isEnabled ? 'text-slate-900' : 'text-slate-400'}`}>
            {isEnabled ? 'Ativado' : 'Desativado'}
          </span>
        </div>
      </div>
    </div>
  );
};
