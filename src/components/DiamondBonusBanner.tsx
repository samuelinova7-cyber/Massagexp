import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Gift, Heart, RotateCcw, Award } from 'lucide-react';
import { playClickSound, playLevelUpSound, triggerHaptic } from '../utils/audio';

interface DiamondBonusBannerProps {
  onReset: () => void;
}

const REWARDS = [
  '🎁 10 minutos de carinho extra à sua escolha! 🥰',
  '☕ Café na cama & beijinhos sem pressa',
  '🌸 Massagem facial & escalda-pés relaxante',
  '🕯️ Ritual de aromaterapia completo com música suave',
  '💌 Vale-Massagem VIP para a próxima noite'
];

export const DiamondBonusBanner: React.FC<DiamondBonusBannerProps> = ({ onReset }) => {
  const [selectedReward, setSelectedReward] = useState<string>(REWARDS[0]);

  useEffect(() => {
    playLevelUpSound();
    triggerHaptic(400);

    // Launch celebratory confetti burst
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 350);
    } catch {}
  }, []);

  return (
    <div className="relative w-full rounded-3xl bg-gradient-to-br from-fuchsia-600 via-rose-500 to-amber-500 text-white p-6 shadow-2xl shadow-rose-500/40 border border-white/30 overflow-hidden animate-pulse">
      {/* Sparkles background overlay */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-black uppercase tracking-widest text-white shadow-inner">
          <Award className="w-4 h-4 text-cyan-200" />
          <span>Nível Supremo Conquistado!</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-md">
          💎 Nível Diamante Alcançado!
        </h2>

        <p className="text-xs sm:text-sm text-rose-100 max-w-sm mx-auto font-medium">
          Parabéns! Você completou todas as áreas corporais com dedicação e carinho absoluto.
        </p>

        {/* Selected Reward Box */}
        <div className="p-4 rounded-2xl bg-black/30 backdrop-blur-md border border-white/20 text-left space-y-2">
          <div className="flex items-center justify-between text-xs text-amber-200 font-bold">
            <div className="flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-amber-300" />
              <span>Bônus Especial Liberado:</span>
            </div>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </div>

          <p className="text-base sm:text-lg font-black text-white leading-snug">
            {selectedReward}
          </p>

          <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
            {REWARDS.map((r, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  playClickSound();
                  setSelectedReward(r);
                }}
                className={`text-[11px] px-2.5 py-1 rounded-lg transition-all font-medium ${
                  selectedReward === r
                    ? 'bg-white text-rose-950 font-bold shadow-sm'
                    : 'bg-white/10 hover:bg-white/20 text-white/90 border border-white/10'
                }`}
              >
                Opção {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-2 justify-center">
          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white text-rose-950 hover:bg-rose-50 font-black text-sm shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Iniciar Nova Sessão</span>
          </button>
        </div>
      </div>
    </div>
  );
};
