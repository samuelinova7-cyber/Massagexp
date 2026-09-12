import React, { useState } from 'react';
import { Check, ChevronRight, User, LayoutGrid, Sparkles } from 'lucide-react';
import { BodyArea, BodyView } from '../types';

interface BodyInteractiveMapProps {
  areas: BodyArea[];
  currentView: BodyView;
  onViewChange: (view: BodyView) => void;
  completedAreas: Set<string>;
  selectedAreaId: string | null;
  onSelectArea: (area: BodyArea) => void;
  isSecretActive: boolean;
}

export const BodyInteractiveMap: React.FC<BodyInteractiveMapProps> = ({
  areas,
  currentView,
  onViewChange,
  completedAreas,
  selectedAreaId,
  onSelectArea,
  isSecretActive
}) => {
  const [displayMode, setDisplayMode] = useState<'grid' | 'silhouette'>('grid');

  const filteredAreas = areas.filter(a => a.view === currentView);
  const completedCountInView = filteredAreas.filter(a => completedAreas.has(a.id)).length;

  return (
    <div className="w-full space-y-3">
      {/* Front / Back Selector & Silhouette/Grid mode switch */}
      <div className="flex items-center justify-between gap-2">
        {/* View Toggle (Costas / Frente) */}
        <div className="flex-1 grid grid-cols-2 p-1 bg-slate-900/90 rounded-2xl border border-white/10 shadow-inner">
          <button
            type="button"
            onClick={() => onViewChange('back')}
            className={`py-2 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all ${
              currentView === 'back'
                ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md shadow-rose-500/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <span>🔄 Costas</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/25">
              {areas.filter(a => a.view === 'back' && completedAreas.has(a.id)).length}/{areas.filter(a => a.view === 'back').length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onViewChange('front')}
            className={`py-2 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all ${
              currentView === 'front'
                ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md shadow-rose-500/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <span>🔄 Frente</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/25">
              {areas.filter(a => a.view === 'front' && completedAreas.has(a.id)).length}/{areas.filter(a => a.view === 'front').length}
            </span>
          </button>
        </div>

        {/* Display mode toggle */}
        <div className="flex p-1 bg-slate-900/90 rounded-2xl border border-white/10 shrink-0">
          <button
            type="button"
            onClick={() => setDisplayMode('grid')}
            className={`p-2 rounded-xl text-xs transition-all ${
              displayMode === 'grid'
                ? 'bg-white/15 text-slate-100 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Visualização em Lista/Grade"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setDisplayMode('silhouette')}
            className={`p-2 rounded-xl text-xs transition-all ${
              displayMode === 'silhouette'
                ? 'bg-white/15 text-slate-100 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Visualização Anatômica Interativa"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mode 1: Interactive Silhouette View */}
      {displayMode === 'silhouette' && (
        <div className="relative w-full rounded-2xl bg-slate-900/70 border border-white/10 p-4 flex flex-col items-center justify-center min-h-[360px] overflow-hidden backdrop-blur-md shadow-inner">
          <div className="text-xs text-slate-400 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Toque nos pontos brilhantes no corpo para iniciar:</span>
          </div>

          <div className="relative w-full max-w-[280px] h-[340px] flex items-center justify-center">
            {/* Stylized Human Figure SVG */}
            <svg viewBox="0 0 200 440" className="w-full h-full drop-shadow-md select-none">
              <defs>
                <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#334155" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#1e293b" stopOpacity="0.9" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Body Outline Silhouette */}
              {currentView === 'back' ? (
                <g fill="url(#bodyGradient)" stroke="#475569" strokeWidth="1.5">
                  {/* Head */}
                  <ellipse cx="100" cy="45" rx="20" ry="24" />
                  {/* Neck */}
                  <path d="M 92 68 L 108 68 L 112 85 L 88 85 Z" />
                  {/* Shoulders & Torso */}
                  <path d="M 88 85 C 65 90, 50 110, 48 140 C 46 170, 52 200, 68 220 L 75 240 C 80 250, 120 250, 125 240 L 132 220 C 148 200, 154 170, 152 140 C 150 110, 135 90, 112 85 Z" />
                  {/* Arms */}
                  <path d="M 48 115 C 38 135, 32 170, 30 205 C 28 225, 34 235, 38 235 C 43 235, 48 215, 52 195 C 56 170, 58 140, 60 125 Z" />
                  <path d="M 152 115 C 162 135, 168 170, 170 205 C 172 225, 166 235, 162 235 C 157 235, 152 215, 148 195 C 144 170, 142 140, 140 125 Z" />
                  {/* Legs */}
                  <path d="M 75 245 C 72 280, 70 330, 74 370 C 76 390, 72 415, 68 425 C 76 425, 84 415, 86 385 C 88 345, 92 290, 94 250 Z" />
                  <path d="M 125 245 C 128 280, 130 330, 126 370 C 124 390, 128 415, 132 425 C 124 425, 116 415, 114 385 C 112 345, 108 290, 106 250 Z" />
                </g>
              ) : (
                <g fill="url(#bodyGradient)" stroke="#475569" strokeWidth="1.5">
                  {/* Head & Face */}
                  <ellipse cx="100" cy="45" rx="20" ry="24" />
                  {/* Neck */}
                  <path d="M 92 68 L 108 68 L 114 85 L 86 85 Z" />
                  {/* Front Torso & Chest */}
                  <path d="M 86 85 C 65 92, 52 115, 50 145 C 48 175, 54 205, 70 225 L 76 245 C 80 252, 120 252, 124 245 L 130 225 C 146 205, 152 175, 150 145 C 148 115, 135 92, 114 85 Z" />
                  {/* Arms */}
                  <path d="M 50 115 C 38 135, 30 170, 28 205 C 26 225, 32 235, 36 235 C 42 235, 46 215, 50 195 C 54 170, 56 140, 58 125 Z" />
                  <path d="M 150 115 C 162 135, 170 170, 172 205 C 174 225, 168 235, 164 235 C 158 235, 154 215, 150 195 C 146 170, 144 140, 142 125 Z" />
                  {/* Legs */}
                  <path d="M 76 248 C 72 280, 70 330, 74 370 C 76 390, 70 415, 68 425 C 78 425, 86 415, 88 385 C 90 345, 94 290, 96 252 Z" />
                  <path d="M 124 248 C 128 280, 130 330, 126 370 C 124 390, 130 415, 132 425 C 122 425, 114 415, 112 385 C 110 345, 106 290, 104 252 Z" />
                </g>
              )}

              {/* Hotspot Interactive Nodes */}
              {filteredAreas.map(area => {
                const isDone = completedAreas.has(area.id);
                const isSelected = selectedAreaId === area.id;
                const { cx, cy, r } = area.svgCoordinates;

                return (
                  <g
                    key={area.id}
                    className="cursor-pointer transition-transform duration-200"
                    onClick={() => onSelectArea(area)}
                  >
                    {/* Pulsing ring for pending areas */}
                    {!isDone && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={r + 6}
                        fill="none"
                        stroke={isSelected ? '#fbbf24' : '#f43f5e'}
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                        className="animate-spin"
                        style={{ transformOrigin: `${cx}px ${cy}px`, animationDuration: '8s' }}
                      />
                    )}

                    {/* Main Target Circle */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={r}
                      fill={
                        isDone
                          ? '#10b981'
                          : isSelected
                          ? '#f59e0b'
                          : 'rgba(244, 63, 94, 0.75)'
                      }
                      fillOpacity={isDone ? '0.85' : '0.85'}
                      stroke="#ffffff"
                      strokeWidth={isSelected ? '2.5' : '1.5'}
                      filter="url(#glow)"
                    />

                    {/* Checkmark or icon in SVG */}
                    {isDone ? (
                      <text
                        x={cx}
                        y={cy + 4}
                        fill="#ffffff"
                        fontSize="12"
                        fontWeight="bold"
                        textAnchor="middle"
                        pointerEvents="none"
                      >
                        ✓
                      </text>
                    ) : (
                      <circle cx={cx} cy={cy} r={3} fill="#ffffff" pointerEvents="none" />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="w-full text-center mt-2">
            <span className="text-[11px] text-slate-400 bg-slate-950/60 px-3 py-1 rounded-full border border-white/5">
              🟢 Concluído | 🔴 Toque para Iniciar | 🟡 Selecionado
            </span>
          </div>
        </div>
      )}

      {/* Mode 2: Quick Grid Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {filteredAreas.map(area => {
          const isDone = completedAreas.has(area.id);
          const isSelected = selectedAreaId === area.id;
          const xpGain = isSecretActive ? 200 : 100;

          return (
            <button
              key={area.id}
              type="button"
              onClick={() => onSelectArea(area)}
              className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all duration-200 active:scale-[0.98] ${
                isDone
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-100 shadow-sm'
                  : isSelected
                  ? 'bg-amber-500/20 border-amber-400 text-amber-100 ring-2 ring-amber-400/30'
                  : 'bg-slate-900/80 hover:bg-slate-800/90 border-white/10 text-slate-100 hover:border-rose-400/40 shadow-sm'
              }`}
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm sm:text-base truncate">{area.name}</span>
                  {isDone && (
                    <span className="shrink-0 text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-md border border-emerald-500/30">
                      Feito
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 line-clamp-1">
                  {area.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-xs font-mono font-semibold px-2 py-1 rounded-lg border ${
                  isDone
                    ? 'bg-emerald-900/60 border-emerald-700/60 text-emerald-300'
                    : isSecretActive
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 animate-pulse'
                    : 'bg-white/5 border-white/10 text-slate-300'
                }`}>
                  +{xpGain} XP
                </span>

                <div className={`w-7 h-7 rounded-xl flex items-center justify-center border ${
                  isDone
                    ? 'bg-emerald-500 border-emerald-400 text-white shadow-sm shadow-emerald-600/40'
                    : 'bg-white/10 border-white/10 text-slate-300'
                }`}>
                  {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : <ChevronRight className="w-4 h-4" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
