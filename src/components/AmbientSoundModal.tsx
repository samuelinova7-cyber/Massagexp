import React, { useState } from 'react';
import { Volume2, VolumeX, X, Sparkles, Waves, CloudRain, Disc, Radio } from 'lucide-react';
import { startAmbientSound, stopAmbientSound, setAmbientSoundVolume, playClickSound } from '../utils/audio';

interface AmbientSoundModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export const AmbientSoundModal: React.FC<AmbientSoundModalProps> = ({
  isOpen,
  onClose,
  isPlaying,
  setIsPlaying
}) => {
  const [activeType, setActiveType] = useState<'bowl' | 'rain' | 'waves' | 'om'>('bowl');
  const [volume, setVolume] = useState<number>(0.3);

  if (!isOpen) return null;

  const handleSelectSound = (type: 'bowl' | 'rain' | 'waves' | 'om') => {
    playClickSound();
    setActiveType(type);
    startAmbientSound(type, volume);
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    playClickSound();
    if (isPlaying) {
      stopAmbientSound();
      setIsPlaying(false);
    } else {
      startAmbientSound(activeType, volume);
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    setAmbientSoundVolume(newVol);
    if (!isPlaying) {
      startAmbientSound(activeType, newVol);
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-white/15 p-6 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-100">Som Ambiente de Spa</h3>
              <p className="text-xs text-slate-400">Sons relaxantes sintetizados em tempo real</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ambient choices */}
        <div className="grid grid-cols-2 gap-2.5 pt-2">
          {[
            { id: 'bowl', title: 'Tigela Tibetana', desc: 'Sino zen de 108Hz', icon: Disc },
            { id: 'rain', title: 'Chuva Suave', desc: 'Ruído rosa acolhedor', icon: CloudRain },
            { id: 'waves', title: 'Ondas Serenas', desc: 'Mar calmo à noite', icon: Waves },
            { id: 'om', title: 'Frequência Om', desc: '136.1Hz harmônica', icon: Radio },
          ].map(item => {
            const Icon = item.icon;
            const isSelected = activeType === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectSound(item.id as any)}
                className={`p-3.5 rounded-2xl border text-left flex flex-col gap-2 transition-all ${
                  isSelected && isPlaying
                    ? 'bg-rose-500/20 border-rose-400 text-rose-100 ring-2 ring-rose-500/30'
                    : isSelected
                    ? 'bg-white/10 border-white/20 text-slate-200'
                    : 'bg-white/5 hover:bg-white/10 border-white/5 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-5 h-5 ${isSelected && isPlaying ? 'text-rose-400 animate-pulse' : 'text-slate-400'}`} />
                  {isSelected && isPlaying && (
                    <span className="text-[10px] font-bold text-rose-300 bg-rose-500/30 px-1.5 py-0.5 rounded">
                      Tocando
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-100">{item.title}</div>
                  <div className="text-[11px] text-slate-400">{item.desc}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Volume slider */}
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5 font-medium">
              <Volume2 className="w-4 h-4 text-slate-400" />
              Volume do Ambiente
            </span>
            <span className="font-mono text-slate-400">{Math.round(volume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.05"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
          />
        </div>

        {/* Play/Stop Button */}
        <button
          type="button"
          onClick={handleTogglePlay}
          className={`w-full py-3 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
            isPlaying
              ? 'bg-slate-800 text-rose-300 border border-rose-500/30 hover:bg-slate-750'
              : 'bg-rose-500 hover:bg-rose-400 text-white shadow-lg shadow-rose-500/25'
          }`}
        >
          {isPlaying ? (
            <>
              <VolumeX className="w-4 h-4" />
              <span>Pausar Música Ambiente</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4" />
              <span>Tocar Música Ambiente</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
