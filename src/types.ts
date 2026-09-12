export type BodyView = 'back' | 'front';

export type RankTier = 'bronze' | 'silver' | 'gold' | 'diamond';

export interface BodyArea {
  id: string;
  name: string;
  subtitle: string;
  view: BodyView;
  category: 'upper' | 'core' | 'lower';
  defaultTechniques: string[];
  tips: string;
  svgCoordinates: {
    cx: number;
    cy: number;
    r: number;
    path?: string;
  };
}

export interface SessionStats {
  totalXp: number;
  completedAreas: string[];
  totalSecondsMassaged: number;
  secretMassageEnabled: boolean;
  history: {
    areaId: string;
    areaName: string;
    technique: string;
    earnedXp: number;
    durationSeconds: number;
    timestamp: number;
    isSecret: boolean;
  }[];
}
