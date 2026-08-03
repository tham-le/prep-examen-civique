import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageMeta {
  title: string;
  description: string;
}

const SITE_URL = 'https://objectif-citoyen.fr';

const PAGE_META: Record<string, PageMeta> = {
  '/': {
    title: "Objectif Citoyen - Réussir l'Examen Civique 2026",
    description: "Préparez gratuitement le nouvel examen civique 2026 avec notre simulateur officiel, nos quiz thématiques et nos fiches de révision interactives. 293 questions, 5 thèmes officiels.",
  },
  '/quiz': {
    title: "Quiz Examen Civique 2026 par Thème | Objectif Citoyen",
    description: "Entraînez-vous sur les 5 thèmes officiels de l'examen civique : République, institutions, droits et devoirs, histoire et société française.",
  },
  '/fiches': {
    title: "Fiches de Révision - Examen Civique 2026 | Objectif Citoyen",
    description: "Fiches de cours claires et synthétiques sur les 5 thématiques officielles de l'examen civique français.",
  },
  '/flashcards': {
    title: "Flashcards - Mémorisez l'Examen Civique 2026 | Objectif Citoyen",
    description: "Mémorisez les notions clés de l'examen civique avec des flashcards interactives classées par thème.",
  },
  '/revision': {
    title: "Mode Révision - Toutes les Questions | Objectif Citoyen",
    description: "Parcourez l'intégralité des 293 questions officielles de l'examen civique pour une révision complète.",
  },
  '/examen-blanc': {
    title: "Examen Blanc Civique 2026 - Simulation Officielle | Objectif Citoyen",
    description: "Passez un examen blanc en conditions réelles : 40 questions, 45 minutes, barème officiel de 32/40 pour réussir.",
  },
  '/faq': {
    title: "FAQ - Questions Fréquentes sur l'Examen Civique 2026 | Objectif Citoyen",
    description: "Toutes les réponses à vos questions sur le nouvel examen civique obligatoire pour la naturalisation française.",
  },
  '/profil': {
    title: "Mon Profil - Progression et Badges | Objectif Citoyen",
    description: "Suivez votre progression, vos badges et vos statistiques de révision pour l'examen civique 2026.",
  },
};

export const usePageMeta = () => {
  const location = useLocation();

  useEffect(() => {
    const meta = PAGE_META[location.pathname] ?? PAGE_META['/'];

    document.title = meta.title;

    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', meta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', meta.description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', meta.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', meta.description);

    const canonicalUrl = `${SITE_URL}${location.pathname === '/' ? '/' : location.pathname}`;
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);
  }, [location.pathname]);
};
