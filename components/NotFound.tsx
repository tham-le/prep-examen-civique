import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => (
  <div className="max-w-md mx-auto text-center py-16 space-y-4">
    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Page introuvable</h1>
    <p className="text-slate-600 dark:text-slate-300">Cette page n'existe pas.</p>
    <Link to="/" className="inline-block bg-sapphire-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-sapphire-700 transition-colors">
      Retour à l'accueil
    </Link>
  </div>
);
