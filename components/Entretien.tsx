import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserStats } from '../types';
import { reviewItem, isMastered, countDue, selectSessionItems } from '../services/spacedRepetition';

export interface EntretienQuestion {
  id: string;
  theme: string;
  question: string;
  // Key points to say; for a personal theme, hints to build your own answer
  points: string[];
}

export const ENTRETIEN_THEMES = ['Parcours', 'Motivation', 'Intégration', 'Valeurs', 'Histoire', 'Institutions', 'Culture'];

export const ENTRETIEN_QUESTIONS: EntretienQuestion[] = [
  // Parcours
  { id: 'p1', theme: 'Parcours', question: 'Pouvez-vous vous présenter ?', points: [
    "Nom, âge, nationalité d'origine, situation familiale",
    'Depuis quand vous vivez en France et avec quel titre de séjour',
    'Votre travail ou vos études',
    "Deux ou trois phrases, pas plus : l'agent posera des questions ensuite",
  ] },
  { id: 'p2', theme: 'Parcours', question: 'Depuis quand vivez-vous en France et pourquoi êtes-vous venu ?', points: [
    "L'année d'arrivée et le motif : études, travail, famille, asile",
    'Les titres de séjour que vous avez eus depuis',
    "Restez cohérent avec le dossier : l'agent l'a sous les yeux",
  ] },
  { id: 'p3', theme: 'Parcours', question: 'Quelle est votre situation familiale ?', points: [
    'Marié, pacsé, célibataire ; enfants et leur âge',
    "Où vit votre famille, en France ou à l'étranger",
    'Si votre conjoint est français ou en demande, dites-le',
  ] },
  { id: 'p4', theme: 'Parcours', question: 'Que faites-vous comme travail ?', points: [
    'Votre métier, votre employeur, le type de contrat (CDI, CDD, indépendant)',
    'Depuis quand, et ce qui vous plaît dans ce travail',
    'Sans emploi : ce que vous faites pour en trouver, formation, bénévolat',
  ] },
  { id: 'p5', theme: 'Parcours', question: 'Quel est votre parcours scolaire et professionnel ?', points: [
    'Vos diplômes, dans votre pays et en France',
    'Les formations suivies en France',
    "Les étapes clés, de l'arrivée à aujourd'hui",
  ] },
  { id: 'p6', theme: 'Parcours', question: 'Où habitez-vous ? Depuis combien de temps ?', points: [
    'Ville, quartier, type de logement (locataire, propriétaire, hébergé)',
    'Les commerces, services et transports que vous utilisez',
    'Les déménagements, en accord avec les justificatifs du dossier',
  ] },
  { id: 'p7', theme: 'Parcours', question: "Avez-vous de la famille dans votre pays d'origine ? Y retournez-vous souvent ?", points: [
    'Soyez franc : garder des liens avec sa famille est normal',
    'Dites où est votre vie, votre travail, votre foyer : en France',
    "Les séjours à l'étranger doivent concorder avec les tampons du passeport",
  ] },
  { id: 'p8', theme: 'Parcours', question: 'Avez-vous déjà eu des problèmes avec la justice ou des dettes ?', points: [
    "Répondez honnêtement : l'agent a l'extrait de casier et le dossier fiscal",
    'Une amende payée ou un retard régularisé se dit simplement',
    'Cacher un fait connu du dossier compte plus que le fait lui-même',
  ] },
  { id: 'p9', theme: 'Parcours', question: 'Payez-vous vos impôts en France ?', points: [
    'Depuis quand vous déclarez vos revenus, et quels impôts vous payez (revenu, taxe foncière)',
    "Les derniers avis d'imposition sont dans le dossier : restez cohérent avec eux",
    'Un retard ou un échéancier se dit simplement',
  ] },
  { id: 'p10', theme: 'Parcours', question: "Envoyez-vous de l'argent dans votre pays d'origine ?", points: [
    'Soyez honnête : aider sa famille est normal',
    'Dites que votre centre de vie et vos revenus sont en France',
    'Les virements réguliers apparaissent sur les relevés du dossier',
  ] },

  // Motivation
  { id: 'm1', theme: 'Motivation', question: 'Pourquoi voulez-vous devenir français ?', points: [
    "C'est souvent la première question : partez de votre vie réelle, ce qui vous attache à la France (travail, famille, amis, projets)",
    'Dites ce que vous voulez faire comme citoyen : voter, vous engager, participer',
    'Une raison pratique seule (passeport, voyages) ne suffit pas ; gardez-la pour la fin ou laissez-la',
  ] },
  { id: 'm2', theme: 'Motivation', question: 'Que signifie pour vous être français ?', points: [
    "Cherchez ce que cela veut dire pour vous, pas une définition : appartenir, participer, partager des valeurs",
    'Reliez-le à votre vie : un moment où vous vous êtes senti chez vous en France',
    'Une ou deux valeurs qui comptent pour vous, avec un exemple',
  ] },
  { id: 'm3', theme: 'Motivation', question: "Qu'est-ce que la nationalité française va changer pour vous ?", points: [
    "Pensez aux droits nouveaux (vote, éligibilité, emplois publics) et aux devoirs nouveaux (juré d'assises, défense)",
    'Et au quotidien : plus de titre de séjour à renouveler, la stabilité pour votre famille',
    'Choisissez ce qui compte vraiment pour vous, pas la liste entière',
  ] },
  { id: 'm4', theme: 'Motivation', question: 'Quels sont vos projets en France ?', points: [
    'Projets professionnels, familiaux, de logement',
    'Ce qui montre que vous comptez rester : enfants scolarisés, achat, formation',
    "Court et concret : deux projets valent mieux qu'une liste",
  ] },
  { id: 'm5', theme: 'Motivation', question: "Allez-vous garder votre nationalité d'origine ?", points: [
    "La France accepte la double nationalité ; renseignez-vous sur ce que votre pays d'origine permet",
    "Si vous la gardez, expliquez que cela ne retire rien à votre engagement envers la France",
    'Si vous devez y renoncer, montrez que vous le savez et que vous l\'acceptez',
  ] },
  { id: 'm6', theme: 'Motivation', question: "Si la France entrait en conflit avec votre pays d'origine, que feriez-vous ?", points: [
    "La question teste votre loyauté : réfléchissez à ce que signifie être citoyen français, avec ses devoirs",
    'Répondez court et net, sans scénario ni politique',
    "Ne laissez pas de doute sur le respect des lois françaises",
  ] },
  { id: 'm7', theme: 'Motivation', question: 'Avez-vous déjà fait une demande de naturalisation ? Pourquoi maintenant ?', points: [
    'Si oui : quand, et ce qui a changé depuis (emploi stable, niveau de français, durée de séjour)',
    "Si non : pourquoi c'est le bon moment, par exemple cinq ans de résidence, un emploi stable",
    'Restez factuel',
  ] },
  { id: 'm8', theme: 'Motivation', question: "Qu'avez-vous en France que vous n'aviez pas dans votre pays ?", points: [
    "Comparez sans dénigrer votre pays d'origine : ce que la France vous a apporté concrètement",
    'Pistes : les libertés, les services publics (école, santé), la stabilité, des chances professionnelles',
    "Un exemple vécu vaut mieux qu'une liste",
  ] },

  // Intégration
  { id: 'i1', theme: 'Intégration', question: 'Comment avez-vous appris le français ? Quel est votre niveau ?', points: [
    'Cours (OFII, association, université), travail, famille, télé et livres',
    'Votre diplôme ou test de français (TCF, DELF) et son niveau',
    "Vous parlez français au travail, avec les voisins, à l'école des enfants",
  ] },
  { id: 'i2', theme: 'Intégration', question: 'Quelle langue parlez-vous à la maison ? Et au travail ?', points: [
    'Dites la vérité ; une famille peut parler deux langues',
    'Le français est présent : avec les enfants, les devoirs, les démarches',
    'Au travail : le français, plus les langues que votre poste demande',
  ] },
  { id: 'i3', theme: 'Intégration', question: 'Avez-vous des amis français ? Que faites-vous avec eux ?', points: [
    "Collègues, voisins, parents d'élèves, membres d'un club",
    'Des exemples concrets : repas, sorties, sport, fêtes',
    'Pas de liste de noms : deux exemples vivants suffisent',
  ] },
  { id: 'i4', theme: 'Intégration', question: "Faites-vous partie d'une association, d'un club, d'un syndicat ?", points: [
    'Sport, association de parents, bénévolat, association de quartier, syndicat',
    "Depuis quand, ce que vous y faites, où est le siège ; être seulement donateur ne suffit pas",
    'Sans association : ce que vous faites dans votre quartier, votre entreprise',
  ] },
  { id: 'i5', theme: 'Intégration', question: "Suivez-vous l'actualité française ? Par quels médias ?", points: [
    "Journaux, radio, télé, sites d'information : citez-en deux",
    'Une loi ou un sujet récent qui vous a marqué, en une phrase',
    "Sachez le nom du Président, du Premier ministre, du ministre de l'Intérieur, de votre maire et de votre préfet : vérifiez-les la semaine de l'entretien",
  ] },
  { id: 'i6', theme: 'Intégration', question: 'Avez-vous déjà voté dans votre pays ? Voterez-vous en France ?', points: [
    'Si vous avez voté dans votre pays, dites-le ; sinon, dites pourquoi',
    'Montrez que vous connaissez les élections françaises : municipales, législatives, présidentielle, européennes',
    "Pour qui vous votez n'est pas demandé : le vote est secret",
  ] },
  { id: 'i7', theme: 'Intégration', question: 'Quelles fêtes célébrez-vous en France ?', points: [
    'Fêtes nationales : 14 juillet, 8 mai, 11 novembre',
    'Fêtes civiles et familiales : Nouvel An, fête du Travail (1er mai), Noël',
    "Vos fêtes d'origine aussi, si vous les fêtez : les deux se cumulent",
  ] },
  { id: 'i8', theme: 'Intégration', question: 'Que faites-vous pendant votre temps libre ?', points: [
    'Sport, lecture, cuisine, sorties, visites de la région',
    'Un lieu ou une activité en France que vous aimez',
    'Court et vrai',
  ] },
  { id: 'i9', theme: 'Intégration', question: 'Quels plats, livres, films ou chansons français connaissez-vous ?', points: [
    'Un plat régional ou de votre ville',
    'Un auteur : Victor Hugo, Albert Camus, Simone de Beauvoir, Antoine de Saint-Exupéry',
    'Un film ou une chanson que vous avez vraiment vu ou entendu',
  ] },
  { id: 'i10', theme: 'Intégration', question: 'Comment se passe la scolarité de vos enfants ?', points: [
    "École, classe, nom de l'établissement",
    "Vos liens avec l'école : réunions, parents d'élèves",
    "L'école est obligatoire de 3 à 16 ans ; elle est gratuite et laïque",
  ] },
  { id: 'i11', theme: 'Intégration', question: 'Avez-vous eu des difficultés à vous intégrer en France ?', points: [
    "Honnête et positif : la langue, l'administration, le climat, l'éloignement",
    'Ce que vous avez fait pour les dépasser',
    "Ce qui vous plaît ici aujourd'hui",
  ] },
  { id: 'i12', theme: 'Intégration', question: 'Quelles sont les nationalités des personnes de votre entourage ?', points: [
    "L'agent mesure votre intégration : citez des amis et collègues français, et d'autres origines",
    "Un entourage seulement de votre pays d'origine est un signal faible ; dites ce qui vous relie aux autres",
    'Restez vrai : des exemples de lieux de rencontre (travail, école, club, voisinage)',
  ] },
  { id: 'i13', theme: 'Intégration', question: 'Quelles villes ou régions de France avez-vous visitées ?', points: [
    "Trois ou quatre lieux, avec un souvenir pour chacun",
    "Votre propre région d'abord : un monument, un paysage, une spécialité",
    "Pas encore voyagé : dites où vous aimeriez aller et pourquoi",
  ] },

  // Valeurs
  { id: 'v1', theme: 'Valeurs', question: 'Quelle est la devise de la République ? Que signifie-t-elle ?', points: [
    'Liberté, Égalité, Fraternité',
    "Liberté : faire tout ce qui ne nuit pas à autrui ; Égalité : les mêmes droits et la même loi pour tous ; Fraternité : la solidarité entre les citoyens",
    "Inscrite dans l'article 2 de la Constitution",
  ] },
  { id: 'v2', theme: 'Valeurs', question: "Qu'est-ce que la laïcité ?", points: [
    "Trois principes : liberté de conscience, séparation des Églises et de l'État (loi de 1905), égalité de tous devant la loi quelle que soit la religion",
    "Chacun est libre de croire ou de ne pas croire, et de pratiquer sa religion dans le respect de l'ordre public",
    "L'État ne reconnaît ni ne finance aucun culte ; les agents publics sont neutres",
    "Le ministère de l'Intérieur est chargé des relations avec les cultes",
  ] },
  { id: 'v3', theme: 'Valeurs', question: "Que pensez-vous de l'égalité entre les femmes et les hommes ?", points: [
    'Un principe de la République : mêmes droits en famille, au travail, en politique',
    'Exemples : droit de vote des femmes en 1944, parité en politique, égalité salariale',
    'Dites clairement que vous y adhérez, dans votre vie familiale comme au travail',
  ] },
  { id: 'v4', theme: 'Valeurs', question: "Qu'est-ce que la liberté d'expression ? A-t-elle des limites ?", points: [
    "Le droit de dire et d'écrire ses opinions, y compris de critiquer le gouvernement ou une religion",
    "Garantie par la Déclaration des droits de l'homme et du citoyen de 1789",
    "Limites fixées par la loi : injure, diffamation, incitation à la haine ou à la violence",
  ] },
  { id: 'v5', theme: 'Valeurs', question: 'Que pensez-vous de la liberté de religion en France ?', points: [
    'Chacun peut croire, ne pas croire, changer de religion',
    "La pratique est libre dans le respect de la loi et de l'ordre public",
    "Personne ne peut imposer sa religion aux autres, ni dans la famille ni dans l'espace public",
  ] },
  { id: 'v6', theme: 'Valeurs', question: "Quels sont les droits et les devoirs d'un citoyen français ?", points: [
    'Droits : voter et être élu, libertés (expression, réunion, religion), protection de la loi, accès aux emplois publics',
    "Devoirs : respecter la loi, payer ses impôts, être juré d'assises, participer à la défense (recensement à 16 ans, JDC)",
    'Les droits et les devoirs sont les mêmes pour tous',
  ] },
  { id: 'v7', theme: 'Valeurs', question: 'Que signifie « la République est indivisible » ?', points: [
    "Une seule loi pour tout le territoire, métropole et outre-mer",
    "Un seul peuple : pas de droits différents selon l'origine ou la religion",
    "Article 1 de la Constitution : la France est une République indivisible, laïque, démocratique et sociale",
  ] },
  { id: 'v8', theme: 'Valeurs', question: 'Que pensez-vous de la polygamie ? Du mariage forcé ?', points: [
    'Interdits en France : le mariage demande le consentement libre des deux époux',
    'Le mariage unit deux personnes, de sexe différent ou de même sexe depuis 2013',
    'La réponse attendue est nette : vous respectez la loi française',
  ] },
  { id: 'v9', theme: 'Valeurs', question: "Un homme et une femme peuvent-ils se serrer la main au travail, être soignés par un médecin de l'autre sexe ?", points: [
    "Oui : l'égalité et la mixité sont la règle au travail, à l'école, à l'hôpital",
    "Refuser un médecin ou un collègue à cause de son sexe va contre l'égalité",
    "L'agent cherche votre adhésion réelle, pas une formule",
  ] },
  { id: 'v10', theme: 'Valeurs', question: "Que feriez-vous si votre enfant voulait épouser une personne d'une autre religion ou de même sexe ?", points: [
    "La liberté de choix de l'enfant adulte prime : c'est son droit",
    'Le mariage pour tous est la loi depuis 2013',
    'Une réponse de respect, courte, suffit',
  ] },
  { id: 'v11', theme: 'Valeurs', question: "Qu'est-ce que la fraternité, concrètement ?", points: [
    'La solidarité : Sécurité sociale, aide aux personnes en difficulté, services publics',
    "Le respect de l'autre, de ses opinions, de ses origines",
    "Des exemples : bénévolat, entraide entre voisins, impôts qui financent l'école et l'hôpital",
  ] },
  { id: 'v12', theme: 'Valeurs', question: 'Que pensez-vous de la peine de mort ?', points: [
    'Abolie en France en 1981 (Robert Badinter) ; interdite par la Constitution depuis 2007',
    "Dites que vous respectez ce choix : la France s'oppose à la peine de mort partout",
    'Pas de débat à ouvrir',
  ] },
  { id: 'v13', theme: 'Valeurs', question: "Qu'est-ce que la démocratie ? Y adhérez-vous ?", points: [
    "Le pouvoir appartient au peuple, qui l'exerce par ses représentants élus et par le référendum",
    'Suffrage universel : chaque citoyen de 18 ans a une voix',
    'Séparation des pouvoirs : exécutif, législatif, judiciaire',
    'Oui, vous y adhérez : dites pourquoi en une phrase, par exemple le droit de choisir et de changer ses dirigeants',
  ] },
  { id: 'v14', theme: 'Valeurs', question: 'Si vous pouviez ajouter une quatrième valeur à la devise, laquelle ?', points: [
    "Réponse fréquente : la laïcité, déjà un principe de l'article 1 de la Constitution",
    'Ou la solidarité, le respect, la tolérance',
    "Justifiez en une phrase ; il n'y a pas de mauvaise réponse",
  ] },
  { id: 'v15', theme: 'Valeurs', question: 'A-t-on le droit de porter des signes religieux dans les lieux publics ?', points: [
    'Oui dans la rue et les lieux ouverts au public : la liberté de religion est garantie',
    'Interdits aux élèves des écoles, collèges et lycées publics (loi de 2004) et aux agents publics en service',
    "Le visage ne peut pas être dissimulé dans l'espace public (loi de 2010)",
  ] },

  // Histoire
  { id: 'c1', theme: 'Histoire', question: 'Pourquoi le 14 juillet est-il la fête nationale ?', points: [
    'Prise de la Bastille le 14 juillet 1789, début de la Révolution',
    "Fête de la Fédération, 14 juillet 1790, l'unité de la nation",
    "Fête nationale depuis 1880 : défilé militaire, bals, feux d'artifice",
  ] },
  { id: 'c6', theme: 'Histoire', question: "Quelles sont les grandes dates de l'histoire de France ?", points: [
    "1789 : Révolution, Déclaration des droits de l'homme ; 1848 : abolition de l'esclavage et suffrage universel masculin",
    '1905 : laïcité ; 1944 : vote des femmes ; 1958 : Ve République',
    '1981 : abolition de la peine de mort ; 2013 : mariage pour tous',
  ] },
  { id: 'c7', theme: 'Histoire', question: 'Qui était Charles de Gaulle ?', points: [
    "Général, chef de la France libre après l'appel du 18 juin 1940",
    'Fondateur de la Ve République en 1958, premier Président élu au suffrage universel direct (1965)',
    'Mort en 1970',
  ] },
  { id: 'c8', theme: 'Histoire', question: "Citez des personnages importants de l'histoire de France.", points: [
    "Vercingétorix, Clovis, Charlemagne, Jeanne d'Arc, Louis XIV, Napoléon",
    'Victor Hugo, Louis Pasteur, Marie Curie, Jean Jaurès',
    'Jean Moulin, Charles de Gaulle, Simone Veil, Robert Badinter',
  ] },
  { id: 'c9', theme: 'Histoire', question: "Qu'est-ce que la Résistance ?", points: [
    "Les Français qui ont combattu l'occupation allemande et le régime de Vichy entre 1940 et 1944",
    'Jean Moulin a unifié la Résistance dans le CNR en 1943 ; arrêté et torturé, il meurt la même année ; de Gaulle dirigeait depuis Londres',
    'Le programme du Conseil national de la Résistance a fondé la Sécurité sociale',
  ] },
  { id: 'c15', theme: 'Histoire', question: 'Que se passe-t-il le 8 mai et le 11 novembre ?', points: [
    "8 mai 1945 : capitulation de l'Allemagne, fin de la Seconde Guerre mondiale en Europe",
    '11 novembre 1918 : armistice, fin de la Première Guerre mondiale',
    'Cérémonies aux monuments aux morts dans chaque commune',
  ] },
  { id: 'c32', theme: 'Histoire', question: "Quel événement de l'histoire de France vous a marqué ?", points: [
    "Choisissez-en un et dites pourquoi : la Révolution de 1789, l'abolition de l'esclavage, la Libération, le vote des femmes",
    'Un lien avec votre parcours ou vos valeurs',
    'Une date et un fait précis',
  ] },
  { id: 'c33', theme: 'Histoire', question: "Que s'est-il passé en 1789 ?", points: [
    "Prise de la Bastille, prison d'État, le 14 juillet ; Déclaration des droits de l'homme et du citoyen le 26 août",
    "Fin de la monarchie absolue, née d'une crise financière et de la disette",
    'Louis XVI, roi, est guillotiné en 1793 ; la Ire République est proclamée en 1792',
  ] },
  { id: 'c34', theme: 'Histoire', question: "Quelles sont les grandes périodes de l'histoire de France ?", points: [
    "Antiquité : la Gaule romaine ; Moyen Âge : Clovis, Charlemagne, les cathédrales gothiques, la guerre de Cent Ans",
    'Temps modernes : Renaissance, Louis XIV, les Lumières ; 1789 : Révolution',
    'XIXe siècle : Napoléon, la République ; XXe siècle : deux guerres mondiales, Ve République, construction européenne',
  ] },
  { id: 'c35', theme: 'Histoire', question: 'Dans quelle République sommes-nous ? Depuis quand ?', points: [
    "La Ve République : Constitution de 1958, voulue par de Gaulle pendant la crise de la guerre d'Algérie",
    'Un Président fort, élu au suffrage universel direct depuis 1962',
    'Ire République en 1792, IIe en 1848, IIIe en 1870, IVe en 1946',
  ] },
  { id: 'c36', theme: 'Histoire', question: 'Quelles sont les dates des deux guerres mondiales ?', points: [
    '1914 à 1918 : les soldats sont les poilus ; Verdun en 1916 ; armistice le 11 novembre 1918',
    '1939 à 1945 : défaite de 1940, Occupation, Vichy, Résistance, Libération en 1944, victoire le 8 mai 1945',
    'Alliés de la France : Royaume-Uni, États-Unis, Russie puis URSS',
  ] },
  { id: 'c37', theme: 'Histoire', question: 'Citez des rois et des reines de France.', points: [
    'Clovis (baptême vers 496), Charlemagne (empereur en 800), Saint Louis, François Ier, Henri IV, Louis XIV (Versailles), Louis XVI',
    "Reines : Anne de Bretagne, Catherine de Médicis, Anne d'Autriche, Marie-Antoinette",
    'La monarchie tombe en 1792, revient de 1814 à 1848 ; le dernier roi est Louis-Philippe',
  ] },
  { id: 'c38', theme: 'Histoire', question: 'Citez les présidents de la Ve République dans l\'ordre.', points: [
    "De Gaulle, Pompidou, Giscard d'Estaing, Mitterrand, Chirac, Sarkozy, Hollande, Macron",
    'Le septennat devient un quinquennat en 2000, par référendum',
    "Vérifiez le nom du Président en fonction et de son prédécesseur la semaine de l'entretien",
  ] },
  { id: 'c39', theme: 'Histoire', question: 'Qui était Napoléon ?', points: [
    'Général de la Révolution devenu empereur (1804 à 1815)',
    "Code civil (1804), préfets, lycées, Légion d'honneur, Banque de France",
    "Arc de triomphe commandé en 1806 ; défaite à Waterloo en 1815",
  ] },
  { id: 'c40', theme: 'Histoire', question: "Qu'est-ce que la guerre de Cent Ans ?", points: [
    "De 1337 à 1453, entre les rois de France et d'Angleterre",
    "Jeanne d'Arc délivre Orléans en 1429 ; brûlée à Rouen en 1431",
    'Elle finit par la victoire française',
  ] },
  { id: 'c41', theme: 'Histoire', question: "Que savez-vous de l'empire colonial français ?", points: [
    "Algérie, Maroc, Tunisie, Sénégal, Mali, Côte d'Ivoire, Madagascar, Indochine",
    "Décolonisation après 1945 ; indépendance de l'Algérie en 1962 après une guerre",
    "Les outre-mer d'aujourd'hui sont restés français",
  ] },
  { id: 'c42', theme: 'Histoire', question: "Quand l'esclavage a-t-il été aboli ?", points: [
    'Une première fois en 1794, rétabli par Napoléon en 1802',
    'Définitivement le 27 avril 1848, par Victor Schœlcher',
    'Commémoré chaque 10 mai',
  ] },
  { id: 'c43', theme: 'Histoire', question: "Qu'est-ce que le siècle des Lumières ?", points: [
    "Le XVIIIe siècle : la raison contre l'ignorance et l'arbitraire",
    "Voltaire (Traité sur la tolérance), Rousseau (Du contrat social), Montesquieu (séparation des pouvoirs), Diderot (l'Encyclopédie)",
    "Leurs idées inspirent la Révolution et la Déclaration des droits de l'homme",
  ] },

  // Institutions
  { id: 'c3', theme: 'Institutions', question: 'Qui dirige la France ? Comment est-il élu ?', points: [
    'Le Président de la République, élu pour 5 ans au suffrage universel direct par les citoyens majeurs, en deux tours',
    "Il nomme le Premier ministre, qui lui propose les ministres ; le gouvernement dirige l'administration",
    'Chef des armées, garant de la Constitution ; deux mandats consécutifs au maximum',
  ] },
  { id: 'c4', theme: 'Institutions', question: "Qu'est-ce que le Parlement ?", points: [
    "L'Assemblée nationale : 577 députés élus pour 5 ans au suffrage direct, un par circonscription, en deux tours",
    'Le Sénat : 348 sénateurs élus pour 6 ans au suffrage indirect par des grands électeurs (élus locaux)',
    'Le Parlement vote les lois et contrôle le gouvernement',
  ] },
  { id: 'c5', theme: 'Institutions', question: 'Que fait le maire ?', points: [
    'Élu par le conseil municipal, lui-même élu pour 6 ans',
    'Il gère la commune : état civil, écoles, urbanisme, police municipale',
    "Il représente aussi l'État : mariages, listes électorales",
    "L'Hôtel de ville, ou mairie, est le siège de la commune",
  ] },
  { id: 'c10', theme: 'Institutions', question: "Que savez-vous de l'Union européenne ?", points: [
    'La France est membre fondateur : traité de Rome en 1957, avec cinq autres pays',
    "27 États membres ; l'euro est la monnaie de la France depuis 2002",
    'Le Parlement européen siège à Strasbourg ; la libre circulation des personnes',
  ] },
  { id: 'c12', theme: 'Institutions', question: "Qu'est-ce que la Sécurité sociale ?", points: [
    'Créée en 1945 : maladie, famille, retraite, accidents du travail',
    'Financée par les cotisations et la CSG ; la carte Vitale',
    'Un exemple de fraternité : chacun contribue selon ses moyens et reçoit selon ses besoins',
  ] },
  { id: 'c13', theme: 'Institutions', question: 'Comment fonctionne la justice en France ?', points: [
    'Indépendante du gouvernement ; la même loi pour tous',
    "Tribunal judiciaire, cour d'appel, Cour de cassation ; la cour d'assises juge les crimes avec des jurés citoyens",
    "Présomption d'innocence, droit à un avocat",
  ] },
  { id: 'c14', theme: 'Institutions', question: 'Quelles sont les principales élections en France ?', points: [
    'Présidentielle (5 ans), législatives (5 ans), municipales (6 ans)',
    'Départementales et régionales (6 ans), sénatoriales (indirectes), européennes (5 ans)',
    'Vote à 18 ans, inscription sur les listes électorales de la commune',
  ] },
  { id: 'c20', theme: 'Institutions', question: 'Quelles sont les collectivités territoriales ?', points: [
    'Les communes, environ 35 000, dirigées par le maire',
    "Les départements, 101 dont 5 d'outre-mer, avec le conseil départemental ; exemples : Paris (75), Nord (59), Gironde (33)",
    "Les régions, 18 dont 5 d'outre-mer, avec le conseil régional",
    'Sachez votre commune, votre département et son numéro, votre région',
  ] },
  { id: 'c44', theme: 'Institutions', question: 'Quels sont les trois pouvoirs ?', points: [
    'Exécutif : le Président et le gouvernement appliquent les lois',
    'Législatif : le Parlement vote les lois',
    'Judiciaire : les juges, indépendants, appliquent la loi ; séparation voulue par Montesquieu',
  ] },
  { id: 'c45', theme: 'Institutions', question: 'Où siègent les institutions ?', points: [
    "Le Président à l'Élysée, le Premier ministre à Matignon",
    "L'Assemblée nationale au palais Bourbon, le Sénat au palais du Luxembourg",
    'Le Conseil constitutionnel au Palais-Royal ; la préfecture au chef-lieu du département',
  ] },
  { id: 'c46', theme: 'Institutions', question: 'Qui dirige la France si le Président meurt ou démissionne ?', points: [
    "Le président du Sénat assure l'intérim",
    'Une élection présidentielle a lieu dans les 20 à 35 jours',
    "C'est arrivé en 1969 et en 1974, avec Alain Poher",
  ] },
  { id: 'c47', theme: 'Institutions', question: "Qu'est-ce que la cohabitation ?", points: [
    "Le Président et la majorité de l'Assemblée sont de bords opposés ; le Premier ministre vient de cette majorité",
    'Trois cas : 1986 à 1988 et 1993 à 1995 sous Mitterrand, 1997 à 2002 avec Chirac et Jospin',
    'Le Président garde la défense et la diplomatie ; le gouvernement mène la politique intérieure',
  ] },
  { id: 'c48', theme: 'Institutions', question: "Quels sont les quatre premiers personnages de l'État ?", points: [
    'Le Président de la République, puis le Premier ministre',
    "Le président du Sénat, puis le président de l'Assemblée nationale",
    "C'est l'ordre protocolaire ; vérifiez les noms avant l'entretien",
  ] },
  { id: 'c49', theme: 'Institutions', question: 'Comment fonctionnent les élections municipales ?', points: [
    'Tous les 6 ans ; les habitants élisent le conseil municipal au scrutin de liste à deux tours',
    'Le conseil municipal élit ensuite le maire',
    "Les citoyens de l'Union européenne qui vivent en France peuvent y voter",
  ] },
  { id: 'c50', theme: 'Institutions', question: 'Citez des femmes qui ont marqué la vie politique française.', points: [
    "Simone Veil : loi sur l'IVG en 1975, première présidente du Parlement européen élu",
    'Édith Cresson, première femme Première ministre (1991) ; Élisabeth Borne (2022)',
    'Olympe de Gouges, 1791 : Déclaration des droits de la femme et de la citoyenne',
  ] },
  { id: 'c51', theme: 'Institutions', question: 'Qui décide de vous accorder la nationalité française ?', points: [
    "La naturalisation est accordée par décret, signé par le Premier ministre sur proposition du ministre de l'Intérieur",
    "La préfecture instruit le dossier et mène l'entretien",
    "Après le décret : cérémonie d'accueil dans la citoyenneté française",
  ] },

  // Culture
  { id: 'c2', theme: 'Culture', question: 'Quels sont les symboles de la République ?', points: [
    'Le drapeau bleu, blanc, rouge ; La Marseillaise ; Marianne',
    'La devise Liberté, Égalité, Fraternité ; le 14 juillet',
    'Aussi : le coq gaulois (populaire), le faisceau de licteur, le sceau de la République ; la fleur de lys est le symbole de la royauté',
  ] },
  { id: 'c11', theme: 'Culture', question: 'Quels sont les grands fleuves et les régions de France ?', points: [
    'La Loire, la Seine, le Rhône, la Garonne, le Rhin',
    "18 régions : 13 en métropole et 5 d'outre-mer (Guadeloupe, Martinique, Guyane, La Réunion, Mayotte)",
    '101 départements ; votre région, votre département et votre préfecture',
  ] },
  { id: 'c16', theme: 'Culture', question: 'Que savez-vous de votre ville ou de votre région ?', points: [
    "Le maire, le nombre d'habitants approximatif, la préfecture",
    'Un monument, une spécialité, une activité économique',
    'Un lieu que vous aimez et pourquoi',
  ] },
  { id: 'c17', theme: 'Culture', question: 'Citez des écrivains, artistes, scientifiques et sportifs français.', points: [
    'Littérature et philosophie : Hugo, Balzac, Zola, Camus, Voltaire, Rousseau, Sartre, Simone de Beauvoir',
    'Arts et sciences : Monet, Cézanne, Édith Piaf, Johnny Hallyday, Brigitte Bardot, Pasteur, Marie Curie',
    'Sport : Zidane, Yannick Noah, Teddy Riner, Marie-José Pérec',
  ] },
  { id: 'c18', theme: 'Culture', question: 'Qui est Marianne ?', points: [
    'La figure de la République : une femme au bonnet phrygien, symbole de liberté',
    'Son buste est dans chaque mairie ; elle figure sur les timbres et le logo de la République',
    'Peinte par Delacroix dans La Liberté guidant le peuple (1830)',
  ] },
  { id: 'c19', theme: 'Culture', question: "Quel est l'hymne national ? D'où vient-il ?", points: [
    "La Marseillaise, écrite par Rouget de Lisle à Strasbourg en 1792, chant de guerre de l'armée du Rhin",
    'Chantée par les volontaires de Marseille, hymne national en 1795, puis définitivement en 1879',
    'Chantée le 14 juillet, aux cérémonies et avant les matchs',
  ] },
  { id: 'c21', theme: 'Culture', question: 'Quelles sont les grandes villes de France ?', points: [
    'Paris, Marseille, Lyon, Toulouse, Nice, Nantes, Montpellier, Strasbourg, Bordeaux, Lille',
    'Paris est la capitale ; Strasbourg accueille le Parlement européen',
    'Situez-les : nord, sud, est, ouest',
  ] },
  { id: 'c22', theme: 'Culture', question: 'Que signifient les couleurs du drapeau ?', points: [
    'Le drapeau tricolore, bleu, blanc, rouge, est né en 1789',
    'Le blanc est la couleur du roi ; le bleu et le rouge sont les couleurs de Paris',
    "C'est l'emblème national, fixé par l'article 2 de la Constitution",
  ] },
  { id: 'c23', theme: 'Culture', question: 'Quels sont les jours fériés en France ?', points: [
    '11 jours : 1er janvier, lundi de Pâques, 1er mai (fête du Travail), 8 mai, Ascension, lundi de Pentecôte, 14 juillet, 15 août, 1er novembre, 11 novembre, 25 décembre',
    'Trois sont des commémorations nationales : 14 juillet, 8 mai, 11 novembre',
    "Plusieurs sont d'origine chrétienne, héritage de l'histoire ; la laïcité ne les supprime pas",
  ] },
  { id: 'c24', theme: 'Culture', question: 'Citez des monuments historiques.', points: [
    "La tour Eiffel, construite pour l'Exposition universelle de 1889 ; le Louvre ; l'Arc de triomphe ; Notre-Dame de Paris",
    'Le château de Versailles (Louis XIV), les châteaux de la Loire, le Mont-Saint-Michel',
    'Un monument de votre région',
  ] },
  { id: 'c25', theme: 'Culture', question: 'Quelles sont les montagnes de France ? Le point culminant ?', points: [
    'Alpes, Pyrénées, Massif central, Jura, Vosges',
    'Le mont Blanc, dans les Alpes, environ 4 800 m',
    'La Corse est une île montagneuse',
  ] },
  { id: 'c26', theme: 'Culture', question: 'Quels sont les pays frontaliers de la France ?', points: [
    'Belgique, Luxembourg, Allemagne, Suisse, Italie, Monaco, Espagne, Andorre',
    'Outre-mer : le Brésil et le Suriname bordent la Guyane',
    'Le Royaume-Uni est relié par le tunnel sous la Manche',
  ] },
  { id: 'c27', theme: 'Culture', question: 'Citez une personne célèbre devenue française.', points: [
    'Marie Curie, née en Pologne, deux prix Nobel',
    'Joséphine Baker (résistante, au Panthéon), Romain Gary (écrivain), Émile Zola (naturalisé à 21 ans)',
    'Un exemple montre que la France se construit aussi avec ceux qui la rejoignent',
  ] },
  { id: 'c28', theme: 'Culture', question: 'Citez des écrivains français et leurs livres.', points: [
    'Victor Hugo, Les Misérables ; Émile Zola, Germinal ; Alexandre Dumas, Les Trois Mousquetaires',
    "Baudelaire, Les Fleurs du mal ; Camus, L'Étranger ; Saint-Exupéry, Le Petit Prince",
    'Un livre que vous avez lu, même en partie',
  ] },
  { id: 'c29', theme: 'Culture', question: "À quel âge l'école est-elle obligatoire ?", points: [
    "De 3 à 16 ans (3 ans depuis 2019), puis formation obligatoire jusqu'à 18 ans",
    "Gratuite et laïque dans le public : lois Jules Ferry de 1881 et 1882",
    'Maternelle, élémentaire, collège, lycée',
  ] },
  { id: 'c30', theme: 'Culture', question: 'Citez un grand événement sportif français.', points: [
    'Le Tour de France (cyclisme, depuis 1903), Roland-Garros (tennis), les 24 Heures du Mans',
    'Les Jeux olympiques de Paris en 2024',
    "Le football : l'équipe de France, championne du monde en 1998 et 2018",
  ] },
  { id: 'c31', theme: 'Culture', question: 'Citez des plats typiques français.', points: [
    'Bœuf bourguignon, coq au vin, blanquette de veau, pot-au-feu',
    'Par région : choucroute, cassoulet, bouillabaisse, tartiflette, crêpes, quiche lorraine',
    "Fromages et vins ; la baguette est au patrimoine de l'UNESCO depuis 2022",
  ] },
];

// These themes ask about you: there is no right answer, only hints
const PERSONAL_THEMES = ['Parcours', 'Motivation', 'Intégration'];
const isPersonal = (q: EntretienQuestion) => PERSONAL_THEMES.includes(q.theme);
const bulletsTitle = (q: EntretienQuestion) => (isPersonal(q) ? 'Pistes pour construire votre réponse' : 'Points clés');

const SESSION_SIZE = 10;

const CHIP = (active: boolean) =>
  `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
    active ? 'bg-sapphire-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
  }`;
const PRIMARY = 'bg-sapphire-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-sapphire-700 transition-colors';
const SECONDARY = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-5 py-2.5 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors';
const CARD = 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl';

interface EntretienProps {
  userStats: UserStats;
  onStatsUpdate: (stats: UserStats) => void;
}

export const Entretien: React.FC<EntretienProps> = ({ userStats, onStatsUpdate }) => {
  const [theme, setTheme] = useState('Tous');
  const [session, setSession] = useState<EntretienQuestion[] | null>(null);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [known, setKnown] = useState(0);

  const mastery = userStats.entretienMastery ?? {};
  const notes = userStats.entretienNotes ?? {};
  const pool = theme === 'Tous' ? ENTRETIEN_QUESTIONS : ENTRETIEN_QUESTIONS.filter(q => q.theme === theme);
  const allIds = ENTRETIEN_QUESTIONS.map(q => q.id);
  const dueCount = countDue(mastery, allIds);
  const masteredCount = allIds.filter(id => isMastered(mastery, id)).length;
  const writtenCount = allIds.filter(id => notes[id]?.trim()).length;

  const saveNote = (id: string, text: string) => {
    if ((notes[id] ?? '') === text) return;
    onStatsUpdate({ ...userStats, entretienNotes: { ...notes, [id]: text } });
  };

  const start = () => {
    setSession(selectSessionItems(pool, mastery, SESSION_SIZE));
    setIndex(0);
    setRevealed(false);
    setKnown(0);
  };

  const rate = (id: string, correct: boolean) => {
    onStatsUpdate({ ...userStats, entretienMastery: reviewItem(mastery, id, correct) });
    if (correct) setKnown(k => k + 1);
    setRevealed(false);
    setIndex(i => i + 1);
  };

  if (session) {
    const current = session[index];
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <span>Simulation orale</span>
          <span className="tabular-nums">{Math.min(index + 1, session.length)} / {session.length}</span>
        </div>
        {current ? (
          <div className={`${CARD} p-8 space-y-6`}>
            <span className="inline-block text-xs text-sapphire-600 dark:text-sapphire-400 px-2 py-1 bg-sapphire-50 dark:bg-sapphire-900/30 rounded">{current.theme}</span>
            <p className="text-xl font-medium text-slate-900 dark:text-white">{current.question}</p>
            {revealed ? (
              <div className="space-y-4">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{bulletsTitle(current)}</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
                  {current.points.map(p => <li key={p}>{p}</li>)}
                </ul>
                <div className="text-sm">
                  <p className="font-semibold text-slate-900 dark:text-white mb-1">Votre réponse</p>
                  <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line">
                    {notes[current.id]?.trim() || 'Pas encore écrite. Écrivez-la dans la liste des questions.'}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => rate(current.id, false)} className={SECONDARY}>{isPersonal(current) ? 'À retravailler' : 'À revoir'}</button>
                  <button onClick={() => rate(current.id, true)} className={PRIMARY}>{isPersonal(current) ? 'Réponse prête' : 'Je savais'}</button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">Répondez à voix haute, comme devant l'agent, puis comparez.</p>
                <button onClick={() => setRevealed(true)} className={PRIMARY}>{isPersonal(current) ? 'Voir les pistes' : 'Voir les points clés'}</button>
              </div>
            )}
          </div>
        ) : (
          <div className={`${CARD} p-8 text-center space-y-4`}>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{known} / {session.length} réponses sues</p>
            <p className="text-slate-500 dark:text-slate-400">Les questions à revoir reviendront en premier à la prochaine simulation.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={start} className={PRIMARY}>Recommencer</button>
              <button onClick={() => setSession(null)} className={SECONDARY}>Retour aux questions</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Entretien de naturalisation</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Après l'examen civique, la préfecture vous reçoit pour un entretien. L'agent évalue votre parcours, votre adhésion aux valeurs de la République et votre connaissance de la France. Il n'existe pas de liste officielle de questions : celles-ci reprennent ce qui revient le plus souvent.
        </p>
        <p className="text-slate-600 dark:text-slate-300">
          Les questions sur vous (parcours, motivation, intégration) n'ont pas de bonne réponse : des pistes vous aident à construire la vôtre. Écrivez vos réponses sous chaque question : elles restent sur votre appareil. Pour les dates et les institutions, les <Link to="/flashcards" className="text-sapphire-600 dark:text-sapphire-400 hover:underline">flashcards</Link> et les <Link to="/fiches" className="text-sapphire-600 dark:text-sapphire-400 hover:underline">fiches</Link> restent le meilleur entraînement.
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 tabular-nums">
          {writtenCount} / {allIds.length} réponses écrites · {masteredCount} maîtrisées{dueCount > 0 ? ` · ${dueCount} à revoir` : ''}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {['Tous', ...ENTRETIEN_THEMES].map(t => (
          <button key={t} onClick={() => setTheme(t)} className={CHIP(theme === t)}>{t}</button>
        ))}
      </div>

      <button onClick={start} className={PRIMARY}>
        <i className="fas fa-comments mr-2"></i>Simulation orale : {Math.min(SESSION_SIZE, pool.length)} questions
      </button>

      <div className="space-y-3">
        {pool.map(q => (
          <details key={q.id} className={`${CARD} group`}>
            <summary className="cursor-pointer list-none p-5 flex items-center justify-between gap-4">
              <span className="font-medium text-slate-900 dark:text-white">{q.question}</span>
              <span className="flex items-center gap-2 shrink-0 text-xs text-slate-500 dark:text-slate-400">
                {notes[q.id]?.trim() && <i className="fas fa-pen" title="Réponse écrite"></i>}
                {isMastered(mastery, q.id) && <i className="fas fa-check-circle text-emerald-600 dark:text-emerald-400" title="Maîtrisée"></i>}
                <i className="fas fa-chevron-down group-open:rotate-180 transition-transform"></i>
              </span>
            </summary>
            <div className="px-5 pb-5 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{bulletsTitle(q)}</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
                {q.points.map(p => <li key={p}>{p}</li>)}
              </ul>
              <label className="block text-sm">
                <span className="font-semibold text-slate-900 dark:text-white">Votre réponse</span>
                <textarea
                  defaultValue={notes[q.id] ?? ''}
                  onBlur={e => saveNote(q.id, e.target.value)}
                  rows={3}
                  placeholder="Écrivez ce que vous direz, avec vos mots."
                  className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 p-3 text-slate-900 dark:text-white"
                />
              </label>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};
