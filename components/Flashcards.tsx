
import React, { useState, useEffect } from 'react';

interface Flashcard {
  id: string;
  category: string;
  front: string;
  back: string;
}

const FLASHCARDS: Flashcard[] = [
  // Symboles de la République
  { id: 'f1', category: 'Symboles', front: 'Quelle est la devise de la République française ?', back: 'Liberté, Égalité, Fraternité' },
  { id: 'f2', category: 'Symboles', front: 'Quelles sont les couleurs du drapeau français (dans l\'ordre) ?', back: 'Bleu, Blanc, Rouge' },
  { id: 'f3', category: 'Symboles', front: 'Quel est l\'hymne national français ?', back: 'La Marseillaise' },
  { id: 'f4', category: 'Symboles', front: 'Qui est Marianne ?', back: 'Le symbole de la République française, représentant la Liberté et la Raison' },
  { id: 'f5', category: 'Symboles', front: 'Quel animal est le symbole non-officiel de la France ?', back: 'Le coq gaulois' },
  { id: 'f6', category: 'Symboles', front: 'Quelle est la fête nationale française ?', back: 'Le 14 juillet (prise de la Bastille en 1789)' },

  // Dates importantes
  { id: 'd1', category: 'Dates', front: '1789', back: 'Révolution française et prise de la Bastille' },
  { id: 'd2', category: 'Dates', front: '1905', back: 'Loi de séparation des Églises et de l\'État (laïcité)' },
  { id: 'd3', category: 'Dates', front: '1944', back: 'Droit de vote des femmes en France' },
  { id: 'd4', category: 'Dates', front: '1958', back: 'Création de la Vème République' },
  { id: 'd5', category: 'Dates', front: '1992', back: 'Traité de Maastricht (Union européenne)' },
  { id: 'd6', category: 'Dates', front: '2000', back: 'Quinquennat présidentiel (5 ans au lieu de 7)' },
  { id: 'd7', category: 'Dates', front: '11 novembre', back: 'Armistice de 1918 (fin de la Première Guerre mondiale)' },
  { id: 'd8', category: 'Dates', front: '8 mai', back: 'Victoire de 1945 (fin de la Seconde Guerre mondiale)' },

  // Institutions
  { id: 'i1', category: 'Institutions', front: 'Qui est le chef de l\'État en France ?', back: 'Le Président de la République' },
  { id: 'i2', category: 'Institutions', front: 'Quelle est la durée du mandat présidentiel ?', back: '5 ans (quinquennat)' },
  { id: 'i3', category: 'Institutions', front: 'Qui dirige le gouvernement ?', back: 'Le Premier ministre' },
  { id: 'i4', category: 'Institutions', front: 'Quelles sont les deux chambres du Parlement ?', back: 'L\'Assemblée nationale et le Sénat' },
  { id: 'i5', category: 'Institutions', front: 'Comment sont élus les députés ?', back: 'Au suffrage universel direct pour 5 ans' },
  { id: 'i6', category: 'Institutions', front: 'Comment sont élus les sénateurs ?', back: 'Au suffrage universel indirect pour 6 ans' },
  { id: 'i7', category: 'Institutions', front: 'Qui vote les lois ?', back: 'Le Parlement (Assemblée nationale et Sénat)' },
  { id: 'i8', category: 'Institutions', front: 'Qui nomme le Premier ministre ?', back: 'Le Président de la République' },

  // Valeurs et principes
  { id: 'v1', category: 'Valeurs', front: 'Qu\'est-ce que la laïcité ?', back: 'La séparation de l\'État et des religions, garantissant la liberté de conscience' },
  { id: 'v2', category: 'Valeurs', front: 'Que signifie "République indivisible" ?', back: 'La loi est la même sur tout le territoire français' },
  { id: 'v3', category: 'Valeurs', front: 'Qu\'est-ce que l\'égalité devant la loi ?', back: 'Tous les citoyens ont les mêmes droits, sans distinction d\'origine, de religion ou de sexe' },
  { id: 'v4', category: 'Valeurs', front: 'Qu\'est-ce que la fraternité ?', back: 'La solidarité entre tous les citoyens' },
  { id: 'v5', category: 'Valeurs', front: 'La France est-elle une République laïque ?', back: 'Oui, c\'est inscrit dans l\'article 1 de la Constitution' },

  // Droits et devoirs
  { id: 'dd1', category: 'Droits', front: 'À partir de quel âge peut-on voter ?', back: '18 ans' },
  { id: 'dd2', category: 'Droits', front: 'Le vote est-il obligatoire en France ?', back: 'Non, c\'est un droit mais pas une obligation' },
  { id: 'dd3', category: 'Droits', front: 'Qu\'est-ce que l\'impôt ?', back: 'Une contribution obligatoire au financement des services publics' },
  { id: 'dd4', category: 'Droits', front: 'L\'école est-elle obligatoire ?', back: 'Oui, de 3 à 16 ans' },
  { id: 'dd5', category: 'Droits', front: 'Qu\'est-ce que le droit de grève ?', back: 'Le droit d\'arrêter le travail collectivement pour défendre ses intérêts professionnels' },
  { id: 'dd6', category: 'Droits', front: 'Quelle est la durée légale du travail ?', back: '35 heures par semaine' },

  // Vie quotidienne
  { id: 'vq1', category: 'Vie quotidienne', front: 'Qu\'est-ce que la carte Vitale ?', back: 'La carte d\'assurance maladie pour le remboursement des soins' },
  { id: 'vq2', category: 'Vie quotidienne', front: 'Qu\'est-ce que le PACS ?', back: 'Un contrat d\'union civile entre deux personnes' },
  { id: 'vq3', category: 'Vie quotidienne', front: 'À quel âge peut-on passer le permis de conduire ?', back: '18 ans (17 ans en conduite accompagnée)' },
  { id: 'vq4', category: 'Vie quotidienne', front: 'Qu\'est-ce que le RSA ?', back: 'Le Revenu de Solidarité Active, une aide pour les personnes sans ressources (à partir de 25 ans)' },
  { id: 'vq5', category: 'Vie quotidienne', front: 'Qu\'est-ce que le SMIC ?', back: 'Le Salaire Minimum Interprofessionnel de Croissance' },
  { id: 'vq6', category: 'Vie quotidienne', front: 'Quel numéro appeler en cas d\'urgence ?', back: '15 (SAMU), 17 (Police), 18 (Pompiers), 112 (Urgences européen)' },

  // Examen civique
  { id: 'e1', category: 'Examen', front: 'Combien de questions comporte l\'examen civique ?', back: '40 questions' },
  { id: 'e2', category: 'Examen', front: 'Combien de bonnes réponses pour réussir ?', back: '32 sur 40 (80%)' },
  { id: 'e3', category: 'Examen', front: 'Quelle est la durée de l\'examen ?', back: '45 minutes' },
  { id: 'e4', category: 'Examen', front: 'Quelles sont les 5 thématiques de l\'examen ?', back: '1. Principes et valeurs\n2. Institutions\n3. Droits et devoirs\n4. Histoire/Géographie/Culture\n5. Vie en société' },
];

const CATEGORIES = ['Tous', 'Symboles', 'Dates', 'Institutions', 'Valeurs', 'Droits', 'Vie quotidienne', 'Examen'];

export const Flashcards: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [category, setCategory] = useState('Tous');
  const [knownCards, setKnownCards] = useState<Set<string>>(new Set());
  const [showKnown, setShowKnown] = useState(true);

  const filteredCards = FLASHCARDS.filter(card => {
    const matchesCategory = category === 'Tous' || card.category === category;
    const matchesKnown = showKnown || !knownCards.has(card.id);
    return matchesCategory && matchesKnown;
  });

  const currentCard = filteredCards[currentIdx];

  const saveKnownCards = (cards: Set<string>) => {
    localStorage.setItem('objectif_citoyen_known_cards', JSON.stringify([...cards]));
  };

  const nextCard = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % filteredCards.length);
    }, 150);
  };

  const prevCard = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
    }, 150);
  };

  const markAsKnown = () => {
    if (currentCard) {
      const newKnown = new Set<string>(knownCards);
      const wasKnown = knownCards.has(currentCard.id);

      if (wasKnown) {
        newKnown.delete(currentCard.id);
      } else {
        newKnown.add(currentCard.id);
      }
      setKnownCards(newKnown);
      saveKnownCards(newKnown);

      // Auto-advance to next card when marking as known (not when unmarking)
      if (!wasKnown && filteredCards.length > 1) {
        setTimeout(() => {
          setFlipped(false);
          setTimeout(() => {
            setCurrentIdx((prev) => (prev + 1) % filteredCards.length);
          }, 150);
        }, 300);
      }
    }
  };

  const resetProgress = () => {
    if (window.confirm('Réinitialiser toutes les cartes comme "à revoir" ?')) {
      setKnownCards(new Set());
      localStorage.removeItem('objectif_citoyen_known_cards');
    }
  };

  useEffect(() => {
    setCurrentIdx(0);
    setFlipped(false);
  }, [category, showKnown]);

  useEffect(() => {
    // Load known cards from localStorage
    const saved = localStorage.getItem('objectif_citoyen_known_cards');
    if (saved) {
      setKnownCards(new Set(JSON.parse(saved) as string[]));
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextCard();
      } else if (e.key === 'ArrowLeft') {
        prevCard();
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (e.key === 'k' || e.key === 'K') {
        markAsKnown();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  if (filteredCards.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-check text-2xl"></i>
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Toutes les cartes sont maîtrisées !</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-4">Dans cette catégorie, vous avez marqué toutes les cartes comme connues.</p>
        <button
          onClick={() => setShowKnown(true)}
          className="text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Afficher toutes les cartes
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Flashcards</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Mémorisez les notions clés avec la répétition espacée
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              category === cat
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-500 dark:text-slate-400">
          {currentIdx + 1} / {filteredCards.length}
        </span>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
            <input
              type="checkbox"
              checked={!showKnown}
              onChange={() => setShowKnown(!showKnown)}
              className="rounded text-indigo-600"
            />
            <span>Masquer les cartes connues</span>
          </label>
          <span className="text-emerald-600 dark:text-emerald-400">
            <i className="fas fa-check-circle mr-1"></i>
            {knownCards.size} maîtrisées
          </span>
        </div>
      </div>

      {/* Flashcard */}
      <div
        onClick={() => setFlipped(!flipped)}
        className="cursor-pointer perspective-1000"
      >
        <div
          className={`relative w-full min-h-[280px] transition-transform duration-500 transform-style-3d ${
            flipped ? 'rotate-y-180' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center justify-center backface-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <span className="text-xs text-indigo-600 dark:text-indigo-400 mb-4 px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 rounded">
              {currentCard?.category}
            </span>
            <p className="text-lg text-center text-slate-900 dark:text-white font-medium">
              {currentCard?.front}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-6">
              <i className="fas fa-hand-pointer mr-1"></i> Cliquez pour voir la réponse
            </p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 bg-indigo-600 rounded-xl p-8 flex flex-col items-center justify-center"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <p className="text-lg text-center text-white font-medium whitespace-pre-line">
              {currentCard?.back}
            </p>
            <p className="text-xs text-indigo-200 mt-6">
              <i className="fas fa-hand-pointer mr-1"></i> Cliquez pour retourner
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevCard}
          className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        <div className="flex space-x-3">
          <button
            onClick={markAsKnown}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
              currentCard && knownCards.has(currentCard.id)
                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400'
            }`}
          >
            <i className={`fas ${currentCard && knownCards.has(currentCard.id) ? 'fa-check-circle' : 'fa-circle'} mr-2`}></i>
            {currentCard && knownCards.has(currentCard.id) ? 'Maîtrisée' : 'Je connais'}
          </button>
        </div>

        <button
          onClick={nextCard}
          className="w-12 h-12 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center justify-center"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      {/* Keyboard hint */}
      <p className="text-center text-xs text-slate-400 dark:text-slate-500">
        <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">←</kbd> <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">→</kbd> naviguer · <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">Espace</kbd> retourner · <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">K</kbd> je connais
      </p>

      {/* Reset button */}
      {knownCards.size > 0 && (
        <div className="text-center">
          <button
            onClick={resetProgress}
            className="text-xs text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400"
          >
            <i className="fas fa-redo mr-1"></i> Réinitialiser la progression
          </button>
        </div>
      )}
    </div>
  );
};
