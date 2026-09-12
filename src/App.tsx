/**
 * Massage XP - Gamified Couples & Self-Care Massage Companion
 */

import React, { useState, useEffect } from 'react';
import { BODY_AREAS, TOTAL_AREAS, MAX_XP } from './data/bodyAreas';
import { BodyArea, BodyView, RankTier } from './types';
import { HeaderStatus } from './components/HeaderStatus';
import { SecretMassageCard } from './components/SecretMassageCard';
import { BodyInteractiveMap } from './components/BodyInteractiveMap';
import { ActiveSessionCard } from './components/ActiveSessionCard';
import { DiamondBonusBanner } from './components/DiamondBonusBanner';
import { AmbientSoundModal } from './components/AmbientSoundModal';
import { StartScreen } from './components/StartScreen';
import { playClickSound, playSuccessSound, playLevelUpSound, triggerHaptic } from './utils/audio';
import { Heart, Sparkles, ShieldCheck, Flame } from 'lucide-react';

const STORAGE_KEY = 'massage_xp_session_v1';

export default function App() {
  const [gameState, setGameState] = useState<'start' | 'playing'>('start');
  const [currentView, setCurrentView] = useState<BodyView>('back');
  const [completedAreas, setCompletedAreas] = useState<Set<string>>(new Set());
  const [xp, setXp] = useState<number>(0);
  const [selectedArea, setSelectedArea] = useState<BodyArea | null>(null);
  const [isSecretActive, setIsSecretActive] = useState<boolean>(false);
  const [goldUnlocked, setGoldUnlocked] = useState<boolean>(false);
  const [isAmbientModalOpen, setIsAmbientModalOpen] = useState<boolean>(false);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  // Load persisted session on initial mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.completedAreas)) {
          setCompletedAreas(new Set(parsed.completedAreas));
        }
        if (typeof parsed.xp === 'number') {
          setXp(parsed.xp);
        }
        if (typeof parsed.isSecretActive === 'boolean') {
          setIsSecretActive(parsed.isSecretActive);
        }
        if (parsed.xp >= MAX_XP * 0.66) {
          setGoldUnlocked(true);
        }
      }
    } catch {}
  }, []);

  // Save session state to localStorage
  useEffect(() => {
    try {
      const payload = {
        completedAreas: Array.from(completedAreas),
        xp,
        isSecretActive
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {}
  }, [completedAreas, xp, isSecretActive]);

  // Determine current rank
  const calculateRank = (): RankTier => {
    if (completedAreas.size === TOTAL_AREAS || xp >= MAX_XP) return 'diamond';
    if (xp >= MAX_XP * 0.66) return 'gold';
    if (xp >= MAX_XP * 0.33) return 'silver';
    return 'bronze';
  };

  const rank = calculateRank();
  const isGoldOrHigher = xp >= MAX_XP * 0.66 || goldUnlocked;
  const isDiamond = rank === 'diamond';

  // Area Selection
  const handleSelectArea = (area: BodyArea) => {
    playClickSound();
    setSelectedArea(area);
  };

  // Complete an area
  const handleFinishArea = (
    areaId: string,
    durationSeconds: number,
    technique: string,
    usedSecret: boolean
  ) => {
    const isNew = !completedAreas.has(areaId);
    const addedXp = usedSecret ? 200 : 100;
    const newXp = xp + (isNew ? addedXp : 0);

    const updatedCompleted = new Set(completedAreas);
    updatedCompleted.add(areaId);

    setCompletedAreas(updatedCompleted);
    setXp(newXp);
    setSelectedArea(null);

    playSuccessSound();
    triggerHaptic(200);

    // Check level-up to Gold for the first time
    if (newXp >= MAX_XP * 0.66 && !goldUnlocked) {
      setGoldUnlocked(true);
      setTimeout(() => {
        playLevelUpSound();
        triggerHaptic(350);
      }, 500);
    }
  };

  // Reset Session
  const handleResetSession = () => {
    playClickSound();
    setCompletedAreas(new Set());
    setXp(0);
    setSelectedArea(null);
    setIsSecretActive(false);
    setGoldUnlocked(false);
    setShowResetConfirm(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start p-3 sm:p-6 relative overflow-x-hidden font-sans selection:bg-rose-500/30">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-rose-600/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-32 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 -left-32 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[110px]" />
      </div>

      {gameState === 'start' ? (
        <StartScreen
          onStartGame={() => setGameState('playing')}
          savedXp={xp}
          savedCompletedCount={completedAreas.size}
        />
      ) : (
        <main className="relative z-10 w-full max-w-lg flex flex-col gap-4 animate-fadeIn">
          {/* App Title & Tagline */}
          <div className="text-center pt-2 pb-1 space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-rose-300 text-xs font-bold tracking-wide">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
              <span>Ritual de Massagem & Conexão</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center justify-center gap-2">
              <span>Massage XP</span>
              <span className="text-2xl">💆‍♀️</span>
            </h1>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Toque nas partes do corpo, siga os movimentos sugeridos e acumule XP relaxando.
            </p>
          </div>

          {/* Diamond Level Completed Banner */}
          {isDiamond && (
            <DiamondBonusBanner onReset={() => setShowResetConfirm(true)} />
          )}

          {/* Status Header with XP and Ranks */}
          <HeaderStatus
            xp={xp}
            completedCount={completedAreas.size}
            totalAreas={TOTAL_AREAS}
            rank={rank}
            isSecretActive={isSecretActive}
            onOpenAmbient={() => setIsAmbientModalOpen(true)}
            onResetSession={() => setShowResetConfirm(true)}
            onGoHome={() => {
              playClickSound();
              setGameState('start');
            }}
            isAmbientPlaying={isAmbientPlaying}
          />

          {/* Secret Massage Card (Unlocked at Gold) */}
          <SecretMassageCard
            isUnlocked={isGoldOrHigher}
            isEnabled={isSecretActive}
            onToggle={(enabled) => {
              playClickSound();
              setIsSecretActive(enabled);
            }}
            xpNeeded={Math.round(MAX_XP * 0.66) - xp}
          />

          {/* Active Session Card (When an area is selected) */}
          {selectedArea ? (
            <ActiveSessionCard
              area={selectedArea}
              isSecretActive={isSecretActive}
              isAlreadyCompleted={completedAreas.has(selectedArea.id)}
              onFinish={handleFinishArea}
              onCancel={() => {
                playClickSound();
                setSelectedArea(null);
              }}
            />
          ) : (
            /* Interactive Body Map (Silhouette + Grid buttons) */
            <BodyInteractiveMap
              areas={BODY_AREAS}
              currentView={currentView}
              onViewChange={(view) => {
                playClickSound();
                setCurrentView(view);
              }}
              completedAreas={completedAreas}
              selectedAreaId={selectedArea ? (selectedArea as BodyArea).id : null}
              onSelectArea={handleSelectArea}
              isSecretActive={isSecretActive}
            />
          )}

          {/* Tips Footer */}
          <footer className="pt-4 pb-8 text-center text-xs text-slate-500 space-y-2">
            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Toques suaves e seguros
              </span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Óleos aromáticos
              </span>
              <span className="flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-rose-400" /> Respiração calma
              </span>
            </div>
            <p className="text-[10px] text-slate-600">
              Massage XP • Criado para proporcionar momentos de conexão, calma e bem-estar mútuo.
            </p>
          </footer>
        </main>
      )}

      {/* Ambient Soundscape Modal */}
      <AmbientSoundModal
        isOpen={isAmbientModalOpen}
        onClose={() => setIsAmbientModalOpen(false)}
        isPlaying={isAmbientPlaying}
        setIsPlaying={setIsAmbientPlaying}
      />

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-white/15 p-6 shadow-2xl space-y-4 text-center">
            <h3 className="font-black text-lg text-slate-100">Reiniciar Sessão de Massagem?</h3>
            <p className="text-xs text-slate-300">
              Isso zerará o progresso de XP e as áreas concluídas para você começar um novo ritual do zero.
            </p>
            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 font-bold text-xs"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleResetSession}
                className="flex-1 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs shadow-md shadow-rose-500/30"
              >
                Sim, Reiniciar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
