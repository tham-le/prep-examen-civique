
import React, { useState, useEffect } from 'react';
import { FAQ_DATA } from '../constants';

const FAQ_SCHEMA_ID = 'faq-page-schema';

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_DATA.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = FAQ_SCHEMA_ID;
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.getElementById(FAQ_SCHEMA_ID)?.remove();
    };
  }, []);

  const categories = ['all', ...new Set(FAQ_DATA.map(item => item.category))];

  const filteredFAQ = activeCategory === 'all'
    ? FAQ_DATA
    : FAQ_DATA.filter(item => item.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-sapphire-100 dark:bg-sapphire-900/50 text-sapphire-600 dark:text-sapphire-400 rounded-3xl flex items-center justify-center mx-auto">
          <i className="fas fa-circle-question text-3xl"></i>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Questions Fréquentes</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Tout ce que vous devez savoir sur l'examen civique 2026
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeCategory === cat
                ? 'bg-sapphire-600 text-white shadow-lg'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat === 'all' ? 'Toutes' : cat}
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFAQ.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-sapphire-50 dark:bg-sapphire-900/50 text-sapphire-600 dark:text-sapphire-400 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-question"></i>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">{item.question}</span>
              </div>
              <i className={`fas fa-chevron-down text-slate-400 dark:text-slate-500 transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : ''
              }`}></i>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                <div className="pl-14">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{item.answer}</p>
                  <span className="inline-block mt-3 px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs font-bold rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Official Resources */}
      <div className="bg-sapphire-50 dark:bg-sapphire-900/30 p-8 rounded-3xl border border-sapphire-100 dark:border-sapphire-800">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-sapphire-600 text-white rounded-2xl flex items-center justify-center flex-shrink-0">
            <i className="fas fa-external-link-alt"></i>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-xl text-slate-900 dark:text-white">Ressources Officielles</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Pour des informations officielles et à jour, consultez le site du Ministère de l'Intérieur.
            </p>
            <a
              href="https://formation-civique.interieur.gouv.fr/examen-civique/informations-g%C3%A9n%C3%A9rales-sur-lexamen-civique/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-sapphire-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-sapphire-700 transition"
            >
              <span>Accéder au site officiel</span>
              <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm text-center">
          <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-list-check text-xl"></i>
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-2">40 Questions</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">Format QCM avec 4 choix de réponse</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm text-center">
          <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-clock text-xl"></i>
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-2">45 Minutes</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">Durée maximale de l'examen</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm text-center">
          <div className="w-14 h-14 bg-sapphire-100 dark:bg-sapphire-900/50 text-sapphire-600 dark:text-sapphire-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-check-double text-xl"></i>
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-2">32/40 Requis</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">Seuil de réussite (80%)</p>
        </div>
      </div>
    </div>
  );
};
