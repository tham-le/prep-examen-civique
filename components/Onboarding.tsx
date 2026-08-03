
import React, { useState } from 'react';

interface OnboardingProps {
  onComplete: () => void;
}

interface Step {
  icon: string;
  iconBg: string;
  title: string;
  description: string;
  features?: { icon: string; text: string }[];
}

const STEPS: Step[] = [
  {
    icon: 'fa-flag',
    iconBg: 'bg-blue-700',
    title: 'Bienvenue sur Objectif Citoyen',
    description: 'Préparez l\'examen civique 2026 pour la naturalisation française. 310 questions officielles, 100% gratuit, 100% hors-ligne.',
    features: [
      { icon: 'fa-check', text: 'Basé sur les 5 thématiques officielles' },
      { icon: 'fa-check', text: 'Aucune inscription requise' },
      { icon: 'fa-check', text: 'Vos données restent sur votre appareil' },
    ]
  },
  {
    icon: 'fa-graduation-cap',
    iconBg: 'bg-sapphire-600',
    title: '4 Modes d\'Apprentissage',
    description: 'Choisissez la méthode qui vous convient le mieux.',
    features: [
      { icon: 'fa-clone', text: 'Flashcards - Mémorisez les notions clés' },
      { icon: 'fa-list-check', text: 'Révision - Parcourez toutes les questions' },
      { icon: 'fa-brain', text: 'Quiz - Testez vos connaissances (10 questions)' },
      { icon: 'fa-file-alt', text: 'Examen Blanc - Conditions réelles (40 questions, 45 min)' },
    ]
  },
  {
    icon: 'fa-trophy',
    iconBg: 'bg-amber-500',
    title: 'Gagnez des Récompenses',
    description: 'Restez motivé avec notre système de gamification.',
    features: [
      { icon: 'fa-star', text: 'Gagnez de l\'XP à chaque bonne réponse' },
      { icon: 'fa-arrow-up', text: 'Montez de niveau (12 niveaux à débloquer)' },
      { icon: 'fa-medal', text: 'Collectionnez 12 badges uniques' },
      { icon: 'fa-fire', text: 'Maintenez votre série de jours consécutifs' },
    ]
  },
  {
    icon: 'fa-bullseye',
    iconBg: 'bg-emerald-600',
    title: 'L\'Examen Officiel',
    description: 'Ce que vous devez savoir sur l\'examen civique 2026.',
    features: [
      { icon: 'fa-question-circle', text: '40 questions à choix multiples' },
      { icon: 'fa-clock', text: '45 minutes pour répondre' },
      { icon: 'fa-check-double', text: '32 bonnes réponses pour réussir (80%)' },
      { icon: 'fa-laptop', text: 'Examen sur tablette tactile' },
    ]
  },
  {
    icon: 'fa-rocket',
    iconBg: 'bg-purple-600',
    title: 'Prêt à Commencer ?',
    description: 'Vous êtes prêt à débuter votre préparation. Bonne chance !',
    features: [
      { icon: 'fa-lightbulb', text: 'Conseil : Commencez par les Flashcards pour découvrir les notions' },
      { icon: 'fa-lightbulb', text: 'Conseil : Faites un Quiz quotidien pour maintenir votre série' },
      { icon: 'fa-lightbulb', text: 'Conseil : Révisez vos points faibles régulièrement' },
    ]
  }
];

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const step = STEPS[currentStep];
  const isLastStep = currentStep === STEPS.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    setIsExiting(true);
    setTimeout(() => {
      localStorage.setItem('objectif_citoyen_onboarding_complete', 'true');
      onComplete();
    }, 300);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm" />

      {/* Modal */}
      <div className={`relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden transition-transform duration-300 ${isExiting ? 'scale-95' : 'scale-100'}`}>
        {/* Progress bar */}
        <div className="h-1 bg-slate-100 dark:bg-slate-700">
          <div
            className="h-full bg-sapphire-600 transition-all duration-500"
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        {/* Skip button */}
        {!isLastStep && (
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            Passer <i className="fas fa-forward ml-1"></i>
          </button>
        )}

        {/* Content */}
        <div className="p-8 text-center">
          {/* Icon */}
          <div className={`w-20 h-20 ${step.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
            <i className={`fas ${step.icon} text-3xl text-white`}></i>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            {step.title}
          </h2>

          {/* Description */}
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            {step.description}
          </p>

          {/* Features */}
          {step.features && (
            <div className="space-y-3 text-left bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 mb-6">
              {step.features.map((feature, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-sapphire-100 dark:bg-sapphire-900/50 text-sapphire-600 dark:text-sapphire-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className={`fas ${feature.icon} text-xs`}></i>
                  </div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">{feature.text}</span>
                </div>
              ))}
            </div>
          )}

          {/* Step indicators */}
          <div className="flex justify-center space-x-2 mb-6">
            {STEPS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentStep
                    ? 'w-6 bg-sapphire-600'
                    : idx < currentStep
                      ? 'bg-sapphire-300 dark:bg-sapphire-700'
                      : 'bg-slate-200 dark:bg-slate-600'
                }`}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex space-x-3">
            {!isFirstStep && (
              <button
                onClick={handlePrev}
                className="flex-1 px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                <i className="fas fa-arrow-left mr-2"></i>Précédent
              </button>
            )}
            <button
              onClick={handleNext}
              className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                isLastStep
                  ? 'bg-sapphire-600 text-white hover:bg-sapphire-700 shadow-lg shadow-sapphire-500/25'
                  : 'bg-sapphire-600 text-white hover:bg-sapphire-700'
              }`}
            >
              {isLastStep ? (
                <>Commencer <i className="fas fa-rocket ml-2"></i></>
              ) : (
                <>Suivant <i className="fas fa-arrow-right ml-2"></i></>
              )}
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-sapphire-500/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
      </div>
    </div>
  );
};
