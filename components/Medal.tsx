import React from 'react';
import { MEDAL_NAMES, MedalTier } from '../services/progress';

const TIER_COLOR = ['', 'text-amber-700', 'text-slate-400', 'text-amber-500', 'text-sapphire-400'];

export const Medal: React.FC<{ tier: MedalTier }> = ({ tier }) =>
  tier === 0 ? null : (
    <span title={`Médaille ${MEDAL_NAMES[tier].toLowerCase()}`}>
      <i className={`fas fa-medal ${TIER_COLOR[tier]}`} aria-hidden="true"></i>
      <span className="sr-only">Médaille {MEDAL_NAMES[tier].toLowerCase()}</span>
    </span>
  );
