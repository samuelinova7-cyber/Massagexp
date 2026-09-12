import { BodyArea } from '../types';

export const BODY_AREAS: BodyArea[] = [
  // Costas (Back)
  {
    id: 'ombros',
    name: 'Ombros e Trapézio',
    subtitle: 'Alívio instantâneo de estresse e tensão diária',
    view: 'back',
    category: 'upper',
    defaultTechniques: [
      '✊ Amassamento suave com as palmas e dedos',
      '👉 Pressão circular com polegares nos nós musculares',
      '🤲 Deslizamento descendente em direção aos braços',
      '🕊️ Toques leves e alongamento do pescoço'
    ],
    tips: 'Aplique pressão moderada a firme. Foque nas fibras do trapézio onde acumula mais tensão.',
    svgCoordinates: { cx: 100, cy: 95, r: 18 }
  },
  {
    id: 'costas_altas',
    name: 'Costas Altas & Escápulas',
    subtitle: 'Liberação entre as escápulas e coluna torácica',
    view: 'back',
    category: 'upper',
    defaultTechniques: [
      '🤲 Deslizamento longo com as mãos espalmadas de baixo para cima',
      '👉 Pressão rítmica com os polegares nas laterais da coluna',
      '✊ Amassamento suave sobre a região das escápulas',
      '🕊️ Movimentos em formato de oito (infinito)'
    ],
    tips: 'Nunca pressione diretamente sobre os ossos da coluna vertebral. Trabalhe os músculos laterais.',
    svgCoordinates: { cx: 100, cy: 135, r: 20 }
  },
  {
    id: 'lombar',
    name: 'Lombar & Meio das Costas',
    subtitle: 'Relaxamento profundo e descompressão da coluna',
    view: 'back',
    category: 'core',
    defaultTechniques: [
      '🤲 Deslizamento suave com palmas aquecidas',
      '✊ Movimentos circulares lentos nos músculos paravertebrais',
      '👉 Pressão suave com a base das mãos (eminência tênar)',
      '🕯️ Deslizamento com óleo morno até a bacia'
    ],
    tips: 'Use movimentos bem lentos e confortáveis. A região lombar responde melhor a toques amplos.',
    svgCoordinates: { cx: 100, cy: 180, r: 18 }
  },
  {
    id: 'gluteos',
    name: 'Glúteos / Quadril',
    subtitle: 'Alívio do nervo ciático e soltura pélvica',
    view: 'back',
    category: 'core',
    defaultTechniques: [
      '✊ Pressão firme com os nós dos dedos ou antebraço',
      '👉 Movimentos circulares ao redor da crista ilíaca',
      '🤲 Deslizamentos amplos e contínuos com palmas',
      '🕊️ Batidinhas rítmicas suaves (tapoteamento suave)'
    ],
    tips: 'Músculo forte que suporta pressões mais firmes e envolventes.',
    svgCoordinates: { cx: 100, cy: 225, r: 22 }
  },
  {
    id: 'coxas_costas',
    name: 'Posterior da Coxa',
    subtitle: 'Isquiotibiais e relaxamento dos membros inferiores',
    view: 'back',
    category: 'lower',
    defaultTechniques: [
      '🤲 Deslizamento ascendente do joelho até o glúteo',
      '✊ Amassamento alternado com ambas as mãos',
      '👉 Fricção suave longitudinal',
      '🕊️ Drenagem suave de retorno venoso'
    ],
    tips: 'Sempre faça os deslizamentos principais no sentido do retorno venoso (de baixo para cima).',
    svgCoordinates: { cx: 100, cy: 280, r: 20 }
  },
  {
    id: 'panturrilhas',
    name: 'Panturrilhas',
    subtitle: 'Alívio do cansaço das pernas e pés pesados',
    view: 'back',
    category: 'lower',
    defaultTechniques: [
      '🤲 Deslizamento firme subindo do tornozelo ao joelho',
      '✊ Amassamento em pinça com os dedos',
      '👉 Compressão suave com as duas palmas',
      '🕊️ Movimentos envolventes tipo bracelete'
    ],
    tips: 'Excelente para quem passa muito tempo em pé. Não aperte com força excessiva atrás do joelho.',
    svgCoordinates: { cx: 100, cy: 345, r: 16 }
  },
  {
    id: 'pes',
    name: 'Pés & Planta dos Pés',
    subtitle: 'Reflexologia, pontos energéticos e relaxamento total',
    view: 'back',
    category: 'lower',
    defaultTechniques: [
      '👉 Pressão profunda com polegares no arco do pé',
      '✊ Fricção suave com os nós dos dedos na sola',
      '🤲 Alongamento suave dos dedos e rotação do tornozelo',
      '🕊️ Carícias delicadas no dorso e calcanhar'
    ],
    tips: 'Uma massagem nos pés ativa pontos reflexos de todo o corpo e induz sonolência prazerosa.',
    svgCoordinates: { cx: 100, cy: 405, r: 16 }
  },

  // Frente (Front)
  {
    id: 'cabeca',
    name: 'Cuidados com a Cabeça & Couro Cabeludo',
    subtitle: 'Relaxamento mental e liberação de endorfinas',
    view: 'front',
    category: 'upper',
    defaultTechniques: [
      '🤲 Movimentos circulares com a ponta dos dedos pelo couro cabeludo',
      '👉 Pressão suave nas têmporas e linha da testa',
      '🕊️ Leves puxões de mechas de cabelo para oxigenação',
      '🌸 Massagem suave ao redor das orelhas'
    ],
    tips: 'Feche os olhos da pessoa, use toques firmes porém gentis no couro cabeludo.',
    svgCoordinates: { cx: 100, cy: 45, r: 18 }
  },
  {
    id: 'pescoco',
    name: 'Pescoço, Nuca & Mandíbula',
    subtitle: 'Soltura da mandíbula e relaxamento cervical',
    view: 'front',
    category: 'upper',
    defaultTechniques: [
      '🤲 Deslizamento suave com óleo dos ombros subindo ao maxilar',
      '👉 Pressão com polegares na base do crânio (occipital)',
      '🕊️ Carícias ao longo dos músculos esternocleidomastóideos',
      '🌸 Toques suaves na maçã do rosto e queixo'
    ],
    tips: 'Área sensível. Movimentos suaves e compassados trazem sensação imediata de aconchego.',
    svgCoordinates: { cx: 100, cy: 80, r: 14 }
  },
  {
    id: 'bracos',
    name: 'Braços, Antebraços e Mãos',
    subtitle: 'Soltura das mãos, dedos e pulsos cansados',
    view: 'front',
    category: 'upper',
    defaultTechniques: [
      '🤲 Deslizamento envolvente do punho ao ombro',
      '✊ Amassamento suave no bíceps e tríceps',
      '👉 Pressão com polegar na palma da mão e entre os dedos',
      '🕊️ Puxadinha suave em cada dedo alongando as articulações'
    ],
    tips: 'Nossas mãos trabalham o dia todo no celular e teclado; abrir as palmas traz grande alívio.',
    svgCoordinates: { cx: 100, cy: 165, r: 20 }
  },
  {
    id: 'abdomen',
    name: 'Abdômen & Respiração',
    subtitle: 'Harmonização digestiva e alívio do centro emocional',
    view: 'front',
    category: 'core',
    defaultTechniques: [
      '🤲 Movimentos circulares suaves no sentido horário',
      '🕊️ Respiração sincronizada com toques leves e calmantes',
      '👉 Deslizamento suave das costelas até o quadril',
      '🌸 Pressão sutil com a palma da mão aquecida'
    ],
    tips: 'Sempre faça os círculos no sentido horário para respeitar o trânsito intestinal natural.',
    svgCoordinates: { cx: 100, cy: 195, r: 20 }
  },
  {
    id: 'coxas_frente',
    name: 'Coxas (Frente) & Joelhos',
    subtitle: 'Soltura do quadríceps e circulação das pernas',
    view: 'front',
    category: 'lower',
    defaultTechniques: [
      '🤲 Deslizamento amplo subindo do joelho até a virilha',
      '✊ Amassamento suave dos quatro ventres musculares',
      '👉 Movimentos circulares ao redor da patela (joelho)',
      '🕊️ Toque de drenagem suave e contínua'
    ],
    tips: 'O quadríceps é um músculo grande; aqueça bem as mãos com óleo antes de massagear.',
    svgCoordinates: { cx: 100, cy: 285, r: 22 }
  }
];

export const SECRET_TECHNIQUES = [
  '🔥 Massagem Secreta: Toque de Pluma & Óleo Aquecido',
  '✨ Massagem Secreta: Pressão Dupla com Óleos Essenciais',
  '💫 Massagem Secreta: Deslizamento Lento Sensorial',
  '🌙 Massagem Secreta: Toques de Cetim e Aromaterapia Doce',
  '🌹 Massagem Secreta: Respiração Sincronizada e Carícias Lentas',
  '🕯️ Massagem Secreta: Fricção Suave com Velas Cosméticas'
];

export const BASE_XP_PER_AREA = 100;
export const TOTAL_AREAS = BODY_AREAS.length; // 12
export const MAX_XP = TOTAL_AREAS * BASE_XP_PER_AREA; // 1200
