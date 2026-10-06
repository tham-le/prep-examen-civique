export const SITE_URL = 'https://objectif-citoyen.fr';

export interface PageSeo {
  title: string;
  description: string;
  // Short name for links, and the text shown to visitors without JavaScript
  label: string;
  heading: string;
  intro: string;
  indexed: boolean;
}

export const PAGES: Record<string, PageSeo> = {
  '/': {
    title: "Objectif Citoyen : préparer l'examen civique 2026",
    description: "Préparez gratuitement l'examen civique : près de 500 questions sur les 5 thèmes, examen blanc de 40 questions en 45 minutes, flashcards et révision.",
    label: 'Accueil',
    heading: "Préparez l'examen civique",
    intro: "Près de 500 questions sur les 5 thèmes de l'examen civique : principes et valeurs de la République, système institutionnel et politique, droits et devoirs, histoire, géographie et culture, vie dans la société française. L'examen compte 40 questions, dure 45 minutes et demande 32 bonnes réponses.",
    indexed: true,
  },
  '/quiz': {
    title: 'Quiz examen civique par thème | Objectif Citoyen',
    description: "Entraînez-vous avec des quiz de 10 questions sur les 5 thèmes de l'examen civique : valeurs de la République, institutions, droits, histoire et société.",
    label: 'Quiz',
    heading: "Quiz de l'examen civique",
    intro: "Des quiz de 10 questions corrigées au fur et à mesure, sur un thème au choix ou sur tous les thèmes. Les questions que vous ratez reviennent plus souvent.",
    indexed: true,
  },
  '/examen-blanc': {
    title: 'Examen blanc civique 2026 | Objectif Citoyen',
    description: "Simulez l'examen civique : 40 questions dont 12 mises en situation, 45 minutes et 32 bonnes réponses pour réussir. Résultat par thème et correction.",
    label: 'Examen blanc',
    heading: "Examen blanc de l'examen civique",
    intro: "Passez un examen blanc dans les mêmes conditions que l'examen : 40 questions à choix multiples, dont 28 questions de connaissance et 12 mises en situation, en 45 minutes. Il faut 32 bonnes réponses pour réussir.",
    indexed: true,
  },
  '/fiches': {
    title: 'Fiches de révision examen civique | Objectif Citoyen',
    description: "Les fiches du ministère de l'Intérieur classées par thème, avec un quiz pour chaque thème, pour réviser l'examen civique.",
    label: 'Fiches',
    heading: "Fiches pour réviser l'examen civique",
    intro: "Les fiches pédagogiques du ministère de l'Intérieur, classées par thème, avec un quiz pour vérifier ce que vous avez retenu.",
    indexed: true,
  },
  '/flashcards': {
    title: 'Flashcards examen civique | Objectif Citoyen',
    description: "Mémorisez les notions de l'examen civique avec plus de 500 flashcards classées par thème et une répétition espacée.",
    label: 'Flashcards',
    heading: "Flashcards de l'examen civique",
    intro: "Plus de 500 cartes classées par thème. Les cartes nouvelles et celles à revoir passent en premier.",
    indexed: true,
  },
  '/revision': {
    title: 'Réviser toutes les questions civiques | Objectif Citoyen',
    description: "Parcourez près de 500 questions de l'examen civique avec la réponse et l'explication, et filtrez par thème, statut ou mot clé.",
    label: 'Révision',
    heading: "Réviser les questions de l'examen civique",
    intro: "Toutes les questions avec leur réponse et leur explication. Filtrez par thème, par statut (vue, à revoir, maîtrisée) ou cherchez un mot clé.",
    indexed: true,
  },
  '/defi': {
    title: 'Défi éclair : 60 secondes | Objectif Citoyen',
    description: "Répondez à un maximum de questions de l'examen civique en 60 secondes et battez votre record.",
    label: 'Défi éclair',
    heading: 'Défi éclair',
    intro: "60 secondes pour donner un maximum de bonnes réponses sur les questions de l'examen civique.",
    indexed: true,
  },
  '/survie': {
    title: 'Mode Survie : 3 vies | Objectif Citoyen',
    description: "Enchaînez les bonnes réponses sur l'examen civique sans perdre vos 3 vies.",
    label: 'Survie',
    heading: 'Mode Survie',
    intro: "Vous avez 3 vies. Chaque erreur en coûte une. Jusqu'où irez-vous ?",
    indexed: true,
  },
  '/faq': {
    title: 'FAQ examen civique 2026 | Objectif Citoyen',
    description: "Réponses aux questions fréquentes sur l'examen civique : format, durée, seuil de réussite et thèmes de l'examen.",
    label: 'FAQ',
    heading: "Questions fréquentes sur l'examen civique",
    intro: "Le format, la durée, le seuil de réussite et les thèmes de l'examen civique.",
    indexed: true,
  },
  '/profil': {
    title: 'Mon profil | Objectif Citoyen',
    description: "Suivez votre progression, vos médailles et vos badges de révision pour l'examen civique.",
    label: 'Profil',
    heading: 'Mon profil',
    intro: 'Votre progression, vos médailles et vos badges.',
    indexed: false,
  },
};

export const NOT_FOUND: PageSeo = {
  title: 'Page introuvable | Objectif Citoyen',
  description: "Cette page n'existe pas. Retournez à l'accueil pour préparer l'examen civique.",
  label: 'Page introuvable',
  heading: 'Page introuvable',
  intro: "Cette page n'existe pas.",
  indexed: false,
};

export const isKnownPage = (pathname: string): boolean => Object.hasOwn(PAGES, pathname);

export const pageFor = (pathname: string): PageSeo => (isKnownPage(pathname) ? PAGES[pathname] : NOT_FOUND);

export const indexedRoutes = (): string[] => Object.keys(PAGES).filter(route => PAGES[route].indexed);
