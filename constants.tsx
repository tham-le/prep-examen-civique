
import { Question, Lesson, Badge, FAQItem } from './types';

export const THEMES = [
  { id: 'valeurs', title: 'Principes et valeurs', icon: 'fa-balance-scale', color: 'indigo' },
  { id: 'institutions', title: 'Système institutionnel', icon: 'fa-landmark', color: 'blue' },
  { id: 'droits', title: 'Droits et devoirs', icon: 'fa-handshake-angle', color: 'emerald' },
  { id: 'culture', title: 'Histoire et Culture', icon: 'fa-monument', color: 'amber' },
  { id: 'societe', title: 'Vivre en société', icon: 'fa-house-user', color: 'rose' }
];

// ============================================================
// PRINCIPES ET VALEURS DE LA RÉPUBLIQUE (25 questions)
// ============================================================
const VALEURS_QUESTIONS: Question[] = [
  {
    id: 'v1',
    text: "Quelle est la devise de la République française ?",
    options: ["Liberté, Égalité, Fraternité", "Travail, Famille, Patrie", "Unité, Force, Justice", "Paix, Liberté, Solidarité"],
    correctAnswer: 0,
    explanation: "La devise « Liberté, Égalité, Fraternité » est inscrite dans la Constitution de 1958 et figure sur les bâtiments publics.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v2',
    text: "Le principe de laïcité garantit :",
    options: ["L'interdiction de toute religion", "La liberté de conscience et la neutralité de l'État", "L'obligation de pratiquer une religion", "La supériorité d'une religion sur les autres"],
    correctAnswer: 1,
    explanation: "La laïcité garantit la liberté de conscience : chacun peut croire ou ne pas croire, et l'État reste neutre envers toutes les religions.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v3',
    text: "Quel est l'hymne national de la France ?",
    options: ["L'Internationale", "La Marseillaise", "Le Chant du Départ", "La Parisienne"],
    correctAnswer: 1,
    explanation: "La Marseillaise, composée par Rouget de Lisle en 1792, est l'hymne national depuis 1879.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v4',
    text: "Quelles sont les couleurs du drapeau français ?",
    options: ["Rouge, Blanc, Bleu", "Bleu, Blanc, Rouge", "Bleu, Rouge, Blanc", "Blanc, Bleu, Rouge"],
    correctAnswer: 1,
    explanation: "Le drapeau tricolore bleu, blanc, rouge est l'emblème national. Le bleu et le rouge sont les couleurs de Paris, le blanc représentait la monarchie.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v5',
    text: "Que signifie « Égalité » dans la devise française ?",
    options: ["Tous les citoyens ont les mêmes droits devant la loi", "Tous les citoyens ont le même salaire", "Tous les citoyens ont le même métier", "Tous les citoyens ont la même religion"],
    correctAnswer: 0,
    explanation: "L'égalité signifie que tous les citoyens sont égaux devant la loi, sans distinction d'origine, de race ou de religion.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v6',
    text: "La République française est :",
    options: ["Une monarchie constitutionnelle", "Une république laïque, démocratique et sociale", "Une théocratie", "Une dictature éclairée"],
    correctAnswer: 1,
    explanation: "L'article 1er de la Constitution définit la France comme une République indivisible, laïque, démocratique et sociale.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v7',
    text: "Quel est le symbole féminin de la République française ?",
    options: ["Jeanne d'Arc", "Marie-Antoinette", "Marianne", "La Dame de Fer"],
    correctAnswer: 2,
    explanation: "Marianne est l'allégorie de la République française. Son buste est présent dans toutes les mairies.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v8',
    text: "La loi de séparation des Églises et de l'État date de :",
    options: ["1789", "1848", "1905", "1958"],
    correctAnswer: 2,
    explanation: "La loi du 9 décembre 1905 établit la séparation des Églises et de l'État, fondement de la laïcité française.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v9',
    text: "Que représente le coq gaulois ?",
    options: ["Un animal sacré", "Un symbole de la vigilance et du courage français", "Le logo d'une entreprise", "Un symbole religieux"],
    correctAnswer: 1,
    explanation: "Le coq gaulois est un symbole de la France, représentant la vigilance et la fierté nationale.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v10',
    text: "La fraternité dans la devise signifie :",
    options: ["L'obligation d'avoir des frères et sœurs", "La solidarité entre tous les citoyens", "Le lien familial uniquement", "L'appartenance à une confrérie"],
    correctAnswer: 1,
    explanation: "La fraternité exprime la solidarité qui doit unir tous les membres de la communauté nationale.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v11',
    text: "La liberté d'expression permet de :",
    options: ["Dire tout ce qu'on veut sans aucune limite", "Exprimer ses opinions dans le respect de la loi", "Insulter les autres librement", "Diffamer sans conséquence"],
    correctAnswer: 1,
    explanation: "La liberté d'expression est un droit fondamental, mais elle est encadrée par la loi (interdiction de la diffamation, de l'injure, de l'incitation à la haine).",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v12',
    text: "Le 14 juillet commémore :",
    options: ["La naissance de Napoléon", "La prise de la Bastille en 1789", "La fin de la Seconde Guerre mondiale", "La signature de la Constitution"],
    correctAnswer: 1,
    explanation: "Le 14 juillet 1789, la prise de la Bastille marque le début de la Révolution française. C'est la fête nationale depuis 1880.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v13',
    text: "Que garantit la République à tous les citoyens ?",
    options: ["Un emploi dans la fonction publique", "L'égalité devant la loi sans distinction d'origine", "Un logement gratuit", "Une voiture de fonction"],
    correctAnswer: 1,
    explanation: "La République assure l'égalité devant la loi de tous les citoyens sans distinction d'origine, de race ou de religion.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v14',
    text: "La laïcité interdit-elle de porter des signes religieux dans l'espace public ?",
    options: ["Oui, partout", "Non, sauf pour les agents du service public", "Oui, uniquement pour les hommes", "Oui, sauf le dimanche"],
    correctAnswer: 1,
    explanation: "La laïcité impose la neutralité aux agents publics, mais les citoyens peuvent porter des signes religieux dans l'espace public, sauf restrictions spécifiques (écoles publiques, etc.).",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v15',
    text: "Quel texte fondateur proclame que « les hommes naissent et demeurent libres et égaux en droits » ?",
    options: ["Le Code civil", "La Déclaration des droits de l'homme et du citoyen de 1789", "La Constitution de 1958", "Le Code pénal"],
    correctAnswer: 1,
    explanation: "L'article 1er de la Déclaration des droits de l'homme et du citoyen de 1789 proclame ce principe fondamental.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v16',
    text: "La France est membre fondateur de :",
    options: ["L'OTAN uniquement", "L'Union européenne", "L'ONU uniquement", "Aucune organisation internationale"],
    correctAnswer: 1,
    explanation: "La France est l'un des six pays fondateurs de la Communauté européenne en 1957, devenue l'Union européenne.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v17',
    text: "Le préambule de la Constitution de 1958 fait référence à :",
    options: ["Uniquement à la Déclaration de 1789", "À la Déclaration de 1789 et au préambule de 1946", "À aucun texte antérieur", "Uniquement au Code civil"],
    correctAnswer: 1,
    explanation: "Le préambule de 1958 proclame l'attachement aux droits de l'homme définis en 1789 et aux principes de 1946.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v18',
    text: "L'indivisibilité de la République signifie :",
    options: ["Que la France ne peut pas être divisée en régions", "Que la loi est la même sur tout le territoire", "Que le président ne peut pas démissionner", "Que les élections sont interdites"],
    correctAnswer: 1,
    explanation: "L'indivisibilité garantit l'unité du territoire et l'application uniforme de la loi sur l'ensemble du pays.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v19',
    text: "La devise « Liberté, Égalité, Fraternité » apparaît pour la première fois :",
    options: ["Sous Louis XIV", "Pendant la Révolution française", "Sous Napoléon", "En 1958"],
    correctAnswer: 1,
    explanation: "Cette devise émerge pendant la Révolution française et devient officielle sous la IIIe République.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v20',
    text: "Le faisceau de licteur représente :",
    options: ["La guerre", "L'unité et la force de la République", "La royauté", "La religion"],
    correctAnswer: 1,
    explanation: "Le faisceau de licteur, hérité de la Rome antique, symbolise l'unité et la force de la République.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v21',
    text: "Quelle valeur permet à chaque citoyen de participer aux élections ?",
    options: ["La fraternité", "L'égalité", "La liberté", "La laïcité"],
    correctAnswer: 2,
    explanation: "La liberté inclut le droit de vote, qui permet à chaque citoyen de participer librement aux élections.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v22',
    text: "La République garantit la liberté de :",
    options: ["Conscience, d'opinion et d'expression", "Porter des armes", "Ne pas payer d'impôts", "Conduire sans permis"],
    correctAnswer: 0,
    explanation: "La République garantit les libertés fondamentales : conscience, opinion, expression, réunion, association.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v23',
    text: "Le sceau de la République représente :",
    options: ["Un lion", "Marianne assise tenant un gouvernail", "Un aigle", "Une fleur de lys"],
    correctAnswer: 1,
    explanation: "Le Grand Sceau de la République représente Marianne assise, tenant un gouvernail et un faisceau.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v24',
    text: "La laïcité dans les écoles publiques implique :",
    options: ["L'enseignement obligatoire d'une religion", "La neutralité religieuse de l'enseignement", "L'interdiction d'enseigner l'histoire des religions", "L'obligation d'être athée"],
    correctAnswer: 1,
    explanation: "L'école publique est laïque : l'enseignement est neutre et ne favorise aucune religion.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v25',
    text: "La République française respecte toutes les croyances. Cela signifie :",
    options: ["Que l'État finance toutes les religions", "Que chacun est libre de croire ou de ne pas croire", "Que la religion catholique est privilégiée", "Que les athées n'ont pas de droits"],
    correctAnswer: 1,
    explanation: "La République garantit le libre exercice des cultes et la liberté de conscience pour tous.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v26',
    text: "Quel principe garantit que tous les citoyens sont traités de manière identique par la loi ?",
    options: ["La liberté", "L'égalité", "La fraternité", "La solidarité"],
    correctAnswer: 1,
    explanation: "L'égalité devant la loi signifie que tous les citoyens ont les mêmes droits et devoirs.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v27',
    text: "La devise 'Liberté, Égalité, Fraternité' date de quelle période ?",
    options: ["Le Moyen Âge", "La Renaissance", "La Révolution française", "La Cinquième République"],
    correctAnswer: 2,
    explanation: "Cette devise est née pendant la Révolution française de 1789.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v28',
    text: "Qu'est-ce que le suffrage universel ?",
    options: ["Le vote réservé aux hommes", "Le vote réservé aux propriétaires", "Le droit de vote pour tous les citoyens majeurs", "Le vote obligatoire"],
    correctAnswer: 2,
    explanation: "Le suffrage universel permet à tous les citoyens majeurs de voter sans condition de fortune ou de sexe.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v29',
    text: "Quelle est la couleur centrale du drapeau français ?",
    options: ["Bleu", "Blanc", "Rouge", "Jaune"],
    correctAnswer: 1,
    explanation: "Le drapeau tricolore est composé de trois bandes verticales : bleu, blanc et rouge.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v30',
    text: "La Marseillaise a été composée en quelle année ?",
    options: ["1789", "1792", "1848", "1870"],
    correctAnswer: 1,
    explanation: "La Marseillaise a été composée en 1792 par Rouget de Lisle à Strasbourg.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v31',
    text: "Que représente le bonnet phrygien ?",
    options: ["La royauté", "La liberté", "La guerre", "La religion"],
    correctAnswer: 1,
    explanation: "Le bonnet phrygien est un symbole de liberté hérité de l'Antiquité romaine.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v32',
    text: "Quel est le nom de l'arbre symbole planté lors des fêtes républicaines ?",
    options: ["Le chêne", "L'arbre de la liberté", "Le platane", "L'olivier"],
    correctAnswer: 1,
    explanation: "L'arbre de la liberté est planté traditionnellement pour célébrer la République.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v33',
    text: "Qui a écrit les paroles de la Marseillaise ?",
    options: ["Victor Hugo", "Rouget de Lisle", "Napoléon Bonaparte", "Jean-Jacques Rousseau"],
    correctAnswer: 1,
    explanation: "Claude Joseph Rouget de Lisle a composé la Marseillaise en 1792.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v34',
    text: "Quel animal est parfois associé à la République française ?",
    options: ["L'aigle", "Le lion", "Le coq", "L'ours"],
    correctAnswer: 2,
    explanation: "Le coq gaulois est un symbole national français depuis l'Antiquité.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v35',
    text: "La laïcité interdit-elle de pratiquer sa religion ?",
    options: ["Oui, toute pratique religieuse est interdite", "Non, elle garantit la liberté de culte", "Seulement dans les lieux publics", "Seulement pour les fonctionnaires"],
    correctAnswer: 1,
    explanation: "La laïcité garantit la liberté de conscience et le libre exercice des cultes.",
    category: "valeurs",
    type: 'multiple-choice'
  }
];

// ============================================================
// SYSTÈME INSTITUTIONNEL ET POLITIQUE (25 questions)
// ============================================================
const INSTITUTIONS_QUESTIONS: Question[] = [
  {
    id: 'i1',
    text: "Qui détient le pouvoir exécutif en France ?",
    options: ["Le Parlement", "Le Président de la République et le Gouvernement", "Le Conseil constitutionnel", "Les maires"],
    correctAnswer: 1,
    explanation: "Le pouvoir exécutif est exercé par le Président de la République et le Gouvernement dirigé par le Premier ministre.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i2',
    text: "Qui détient le pouvoir législatif en France ?",
    options: ["Le Président de la République", "Le Gouvernement", "Le Parlement (Assemblée nationale et Sénat)", "Le Conseil constitutionnel"],
    correctAnswer: 2,
    explanation: "Le Parlement, composé de l'Assemblée nationale et du Sénat, vote les lois et contrôle l'action du Gouvernement.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i3',
    text: "Quelle est la durée du mandat présidentiel ?",
    options: ["4 ans", "5 ans", "6 ans", "7 ans"],
    correctAnswer: 1,
    explanation: "Depuis le référendum de 2000, le mandat présidentiel est de 5 ans (quinquennat), auparavant 7 ans (septennat).",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i4',
    text: "Comment les députés sont-ils élus ?",
    options: ["Au suffrage universel direct", "Par les sénateurs", "Par le Président", "Par les maires"],
    correctAnswer: 0,
    explanation: "Les 577 députés sont élus au suffrage universel direct pour 5 ans.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i5',
    text: "Qui nomme le Premier ministre ?",
    options: ["L'Assemblée nationale", "Le Sénat", "Le Président de la République", "Le Conseil constitutionnel"],
    correctAnswer: 2,
    explanation: "Le Président de la République nomme le Premier ministre et, sur proposition de celui-ci, les autres membres du Gouvernement.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i6',
    text: "Quel est le rôle du Conseil constitutionnel ?",
    options: ["Voter les lois", "Vérifier la conformité des lois à la Constitution", "Diriger l'armée", "Gérer les impôts"],
    correctAnswer: 1,
    explanation: "Le Conseil constitutionnel vérifie que les lois sont conformes à la Constitution avant leur promulgation.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i7',
    text: "Combien de sénateurs siègent au Sénat ?",
    options: ["348", "577", "150", "200"],
    correctAnswer: 0,
    explanation: "Le Sénat compte 348 sénateurs élus au suffrage universel indirect pour 6 ans.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i8',
    text: "Qui peut dissoudre l'Assemblée nationale ?",
    options: ["Le Premier ministre", "Le Président de la République", "Le président du Sénat", "Le Conseil constitutionnel"],
    correctAnswer: 1,
    explanation: "Le Président de la République peut dissoudre l'Assemblée nationale après consultation du Premier ministre et des présidents des assemblées.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i9',
    text: "Qui est le chef des armées en France ?",
    options: ["Le Premier ministre", "Le ministre de la Défense", "Le Président de la République", "Le chef d'état-major"],
    correctAnswer: 2,
    explanation: "L'article 15 de la Constitution fait du Président de la République le chef des armées.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i10',
    text: "Le maire est élu par :",
    options: ["Les habitants de la commune", "Le conseil municipal", "Le préfet", "Le Président de la République"],
    correctAnswer: 1,
    explanation: "Le maire est élu par le conseil municipal parmi ses membres, après les élections municipales.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i11',
    text: "La Constitution de la Ve République date de :",
    options: ["1789", "1848", "1946", "1958"],
    correctAnswer: 3,
    explanation: "La Constitution de la Ve République a été adoptée par référendum le 28 septembre 1958.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i12',
    text: "Qui représente l'État dans chaque département ?",
    options: ["Le maire", "Le préfet", "Le député", "Le sénateur"],
    correctAnswer: 1,
    explanation: "Le préfet représente l'État dans le département et veille à l'application des lois.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i13',
    text: "Le Défenseur des droits a pour mission de :",
    options: ["Voter les lois", "Défendre les droits des citoyens face aux administrations", "Juger les criminels", "Diriger la police"],
    correctAnswer: 1,
    explanation: "Le Défenseur des droits est une autorité indépendante qui veille au respect des droits et libertés.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i14',
    text: "En France, la justice est rendue au nom :",
    options: ["Du Président de la République", "Du peuple français", "Du Premier ministre", "De l'Union européenne"],
    correctAnswer: 1,
    explanation: "La justice est rendue au nom du peuple français, garantissant son indépendance.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i15',
    text: "Quelle institution adopte le budget de l'État ?",
    options: ["Le Gouvernement", "Le Parlement", "Le Conseil d'État", "La Cour des comptes"],
    correctAnswer: 1,
    explanation: "Le Parlement vote la loi de finances qui fixe le budget de l'État.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i16',
    text: "Le Conseil d'État est :",
    options: ["Une assemblée élue", "Le conseiller juridique du Gouvernement et juge administratif suprême", "Un tribunal pénal", "Un ministère"],
    correctAnswer: 1,
    explanation: "Le Conseil d'État conseille le Gouvernement et juge en dernier ressort les litiges administratifs.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i17',
    text: "Les régions sont dirigées par :",
    options: ["Un préfet de région", "Un conseil régional et son président", "Un ministre", "Le Sénat"],
    correctAnswer: 1,
    explanation: "Les régions sont administrées par un conseil régional élu, présidé par le président de région.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i18',
    text: "Combien y a-t-il de régions en France métropolitaine ?",
    options: ["13", "18", "22", "27"],
    correctAnswer: 0,
    explanation: "Depuis 2016, la France métropolitaine compte 13 régions (18 avec les outre-mer).",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i19',
    text: "Qui promulgue les lois en France ?",
    options: ["Le Premier ministre", "Le président de l'Assemblée nationale", "Le Président de la République", "Le Garde des Sceaux"],
    correctAnswer: 2,
    explanation: "Le Président de la République promulgue les lois dans les 15 jours suivant leur adoption.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i20',
    text: "La Cour de cassation est :",
    options: ["Un tribunal de première instance", "La plus haute juridiction de l'ordre judiciaire", "Un tribunal administratif", "Une cour européenne"],
    correctAnswer: 1,
    explanation: "La Cour de cassation est la juridiction suprême de l'ordre judiciaire, elle vérifie l'application du droit.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i21',
    text: "Le référendum permet aux citoyens de :",
    options: ["Élire le Président", "Voter directement sur un projet de loi", "Choisir les ministres", "Nommer les juges"],
    correctAnswer: 1,
    explanation: "Le référendum est une consultation directe des citoyens sur un projet de loi ou une révision constitutionnelle.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i22',
    text: "L'Assemblée nationale siège :",
    options: ["Au Sénat", "Au Palais Bourbon", "À l'Élysée", "À Matignon"],
    correctAnswer: 1,
    explanation: "L'Assemblée nationale siège au Palais Bourbon, à Paris.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i23',
    text: "Le Sénat siège :",
    options: ["Au Palais Bourbon", "Au Palais du Luxembourg", "À l'Élysée", "À Versailles"],
    correctAnswer: 1,
    explanation: "Le Sénat siège au Palais du Luxembourg, à Paris.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i24',
    text: "Le Gouvernement est responsable devant :",
    options: ["Le Président uniquement", "L'Assemblée nationale", "Le Sénat", "Le Conseil constitutionnel"],
    correctAnswer: 1,
    explanation: "Le Gouvernement est responsable devant l'Assemblée nationale qui peut le renverser par une motion de censure.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i25',
    text: "Qui préside le Conseil des ministres ?",
    options: ["Le Premier ministre", "Le Président de la République", "Le président de l'Assemblée nationale", "Le Garde des Sceaux"],
    correctAnswer: 1,
    explanation: "Le Président de la République préside le Conseil des ministres qui se réunit chaque semaine.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i26',
    text: "Combien de sénateurs composent le Sénat ?",
    options: ["348", "577", "150", "250"],
    correctAnswer: 0,
    explanation: "Le Sénat compte 348 sénateurs élus au suffrage universel indirect.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i27',
    text: "Quelle est la durée du mandat d'un sénateur ?",
    options: ["5 ans", "6 ans", "7 ans", "4 ans"],
    correctAnswer: 1,
    explanation: "Les sénateurs sont élus pour un mandat de 6 ans, renouvelé par moitié tous les 3 ans.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i28',
    text: "Où siège le Sénat ?",
    options: ["À l'Élysée", "Au Palais Bourbon", "Au Palais du Luxembourg", "À Matignon"],
    correctAnswer: 2,
    explanation: "Le Sénat siège au Palais du Luxembourg à Paris.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i29',
    text: "Qui peut saisir le Conseil constitutionnel pour vérifier la constitutionnalité d'une loi ?",
    options: ["Tout citoyen directement", "Le Président, le Premier ministre ou 60 députés/sénateurs", "Uniquement le Président", "Les maires"],
    correctAnswer: 1,
    explanation: "Le Conseil constitutionnel peut être saisi par le Président, le Premier ministre, les présidents des assemblées ou 60 parlementaires.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i30',
    text: "Qu'est-ce que la QPC (Question Prioritaire de Constitutionnalité) ?",
    options: ["Un examen pour devenir juge", "Un moyen pour un citoyen de contester une loi devant le Conseil constitutionnel", "Une question posée au Parlement", "Un vote de confiance"],
    correctAnswer: 1,
    explanation: "La QPC permet à tout justiciable de contester la constitutionnalité d'une loi lors d'un procès.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i31',
    text: "Quel est le rôle du Défenseur des droits ?",
    options: ["Diriger l'armée", "Veiller au respect des droits et libertés", "Voter les lois", "Nommer les ministres"],
    correctAnswer: 1,
    explanation: "Le Défenseur des droits est une autorité indépendante qui veille au respect des droits des citoyens.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i32',
    text: "Qui nomme les membres du Conseil constitutionnel ?",
    options: ["Le peuple par référendum", "Le Président et les présidents des assemblées", "Les députés uniquement", "Le Premier ministre"],
    correctAnswer: 1,
    explanation: "Les 9 membres sont nommés par le Président de la République et les présidents de l'Assemblée et du Sénat.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i33',
    text: "Quelle juridiction juge les conflits entre l'administration et les citoyens ?",
    options: ["Le tribunal judiciaire", "Le Conseil d'État", "La Cour de cassation", "Le tribunal de commerce"],
    correctAnswer: 1,
    explanation: "Le Conseil d'État est la plus haute juridiction administrative en France.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i34',
    text: "Qu'est-ce qu'une ordonnance ?",
    options: ["Une décision de justice", "Un texte pris par le gouvernement dans le domaine de la loi", "Un discours présidentiel", "Une pétition citoyenne"],
    correctAnswer: 1,
    explanation: "Les ordonnances permettent au gouvernement de légiférer temporairement avec l'autorisation du Parlement.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i35',
    text: "Qui peut dissoudre l'Assemblée nationale ?",
    options: ["Le Premier ministre", "Le Président de la République", "Le président du Sénat", "Le Conseil constitutionnel"],
    correctAnswer: 1,
    explanation: "Le Président de la République peut dissoudre l'Assemblée nationale, provoquant de nouvelles élections.",
    category: "institutions",
    type: 'multiple-choice'
  }
];

// ============================================================
// DROITS ET DEVOIRS (25 questions)
// ============================================================
const DROITS_QUESTIONS: Question[] = [
  {
    id: 'd1',
    text: "Quel est l'âge de la majorité civile en France ?",
    options: ["16 ans", "18 ans", "21 ans", "15 ans"],
    correctAnswer: 1,
    explanation: "La majorité est fixée à 18 ans. Elle confère le droit de vote et la pleine capacité juridique.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd2',
    text: "Le vote en France est-il obligatoire ?",
    options: ["Oui, toujours", "Non, c'est un droit et non une obligation", "Oui, pour les présidentielles uniquement", "Oui, sous peine d'amende"],
    correctAnswer: 1,
    explanation: "En France, le vote est un droit mais pas une obligation légale, contrairement à certains pays.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd3',
    text: "L'école est obligatoire en France jusqu'à quel âge ?",
    options: ["14 ans", "16 ans", "18 ans", "12 ans"],
    correctAnswer: 1,
    explanation: "L'instruction est obligatoire de 3 à 16 ans. La formation est obligatoire jusqu'à 18 ans.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd4',
    text: "Payer ses impôts est :",
    options: ["Facultatif", "Un devoir du citoyen", "Réservé aux riches", "Interdit par la loi"],
    correctAnswer: 1,
    explanation: "L'article 13 de la Déclaration de 1789 établit que l'impôt est une contribution commune indispensable.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd5',
    text: "Le droit de grève en France est :",
    options: ["Interdit", "Un droit constitutionnel", "Réservé aux fonctionnaires", "Limité à une fois par an"],
    correctAnswer: 1,
    explanation: "Le droit de grève est reconnu par le préambule de la Constitution de 1946, repris en 1958.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd6',
    text: "La Journée Défense et Citoyenneté (JDC) concerne :",
    options: ["Les personnes de plus de 50 ans", "Tous les jeunes Français de 16 à 25 ans", "Uniquement les garçons", "Les étrangers uniquement"],
    correctAnswer: 1,
    explanation: "La JDC est obligatoire pour tous les jeunes Français, filles et garçons, entre 16 et 25 ans.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd7',
    text: "En France, le mariage pour tous est légal depuis :",
    options: ["2001", "2008", "2013", "2020"],
    correctAnswer: 2,
    explanation: "La loi du 17 mai 2013 a ouvert le mariage aux couples de personnes de même sexe.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd8',
    text: "La liberté d'association permet :",
    options: ["De créer des associations à but non lucratif", "De créer des entreprises uniquement", "De créer des partis politiques interdits", "De se réunir sans autorisation"],
    correctAnswer: 0,
    explanation: "La loi de 1901 garantit la liberté d'association pour tout objet licite.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd9',
    text: "Le droit au logement est-il reconnu en France ?",
    options: ["Non", "Oui, c'est un droit fondamental", "Uniquement pour les propriétaires", "Seulement à Paris"],
    correctAnswer: 1,
    explanation: "Le droit au logement est reconnu comme un droit fondamental, notamment par la loi DALO de 2007.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd10',
    text: "La discrimination à l'embauche est :",
    options: ["Légale sous conditions", "Interdite par la loi", "Autorisée pour les petites entreprises", "Tolérée"],
    correctAnswer: 1,
    explanation: "La discrimination à l'embauche est interdite et punie par la loi, sur la base de critères comme l'origine, le sexe, l'âge, etc.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd11',
    text: "Le respect de la dignité humaine est :",
    options: ["Un principe facultatif", "Un principe à valeur constitutionnelle", "Réservé aux citoyens français", "Un concept récent"],
    correctAnswer: 1,
    explanation: "Le respect de la dignité humaine est un principe constitutionnel qui s'applique à tous.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd12',
    text: "L'égalité entre hommes et femmes est :",
    options: ["Un objectif non contraignant", "Garantie par la Constitution", "Limitée au travail", "Récente et non appliquée"],
    correctAnswer: 1,
    explanation: "L'égalité entre les femmes et les hommes est garantie par la Constitution et de nombreuses lois.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd13',
    text: "Le SMIC est :",
    options: ["Le salaire maximum autorisé", "Le salaire minimum légal", "Un impôt", "Une allocation"],
    correctAnswer: 1,
    explanation: "Le SMIC (Salaire Minimum Interprofessionnel de Croissance) est le salaire horaire minimum légal.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd14',
    text: "En France, le travail des enfants de moins de 16 ans est :",
    options: ["Autorisé", "Interdit sauf exceptions strictes", "Encouragé", "Limité à 20 heures par semaine"],
    correctAnswer: 1,
    explanation: "Le travail des mineurs de moins de 16 ans est interdit, sauf exceptions (spectacles, mannequinat avec autorisation).",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd15',
    text: "Le droit d'asile permet à une personne persécutée de :",
    options: ["Obtenir automatiquement la nationalité française", "Demander protection en France", "Voter aux élections", "Travailler sans papiers"],
    correctAnswer: 1,
    explanation: "Le droit d'asile permet aux personnes persécutées de demander la protection de la France.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd16',
    text: "La sécurité sociale en France couvre :",
    options: ["Uniquement les accidents du travail", "La maladie, la maternité, la vieillesse et les accidents", "Uniquement les retraites", "Seulement les fonctionnaires"],
    correctAnswer: 1,
    explanation: "La Sécurité sociale couvre les risques maladie, maternité, invalidité, décès, accidents du travail et vieillesse.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd17',
    text: "Tout citoyen a le droit de :",
    options: ["Refuser de comparaître devant la justice", "Participer à l'élection de ses représentants", "Ne pas respecter les lois qu'il juge injustes", "Faire justice lui-même"],
    correctAnswer: 1,
    explanation: "Le droit de vote permet à chaque citoyen de participer à la vie démocratique.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd18',
    text: "Le devoir de réserve s'applique principalement :",
    options: ["À tous les citoyens", "Aux fonctionnaires", "Aux journalistes", "Aux élus uniquement"],
    correctAnswer: 1,
    explanation: "Le devoir de réserve impose aux fonctionnaires une certaine retenue dans l'expression de leurs opinions.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd19',
    text: "La présomption d'innocence signifie que :",
    options: ["Tout le monde est coupable jusqu'à preuve du contraire", "Toute personne est considérée innocente tant qu'elle n'a pas été jugée coupable", "Les juges décident seuls de la culpabilité", "Les aveux suffisent à condamner"],
    correctAnswer: 1,
    explanation: "La présomption d'innocence est un principe fondamental du droit : on est innocent jusqu'à preuve du contraire.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd20',
    text: "Le droit à l'éducation en France est :",
    options: ["Réservé aux citoyens français", "Garanti à tous les enfants présents sur le territoire", "Limité aux zones urbaines", "Facultatif pour les familles"],
    correctAnswer: 1,
    explanation: "Tous les enfants présents sur le territoire français ont droit à l'éducation, quelle que soit leur nationalité.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd21',
    text: "Le droit de propriété est :",
    options: ["Aboli en France", "Un droit fondamental protégé", "Réservé aux entreprises", "Limité aux biens immobiliers"],
    correctAnswer: 1,
    explanation: "Le droit de propriété est un droit naturel et imprescriptible, protégé par la Déclaration de 1789.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd22',
    text: "L'aide juridictionnelle permet :",
    options: ["D'éviter les procès", "Aux personnes à faibles revenus d'accéder à la justice", "De devenir avocat", "De porter plainte anonymement"],
    correctAnswer: 1,
    explanation: "L'aide juridictionnelle prend en charge les frais de justice pour les personnes aux revenus modestes.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd23',
    text: "Le congé maternité en France est :",
    options: ["Inexistant", "De 16 semaines minimum pour un premier enfant", "Réservé aux fonctionnaires", "Limité à 4 semaines"],
    correctAnswer: 1,
    explanation: "Le congé maternité est de 16 semaines minimum pour le premier et deuxième enfant, plus long pour les suivants.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd24',
    text: "La protection des données personnelles est garantie par :",
    options: ["Aucune loi en France", "La CNIL et le RGPD", "Les entreprises privées", "L'ONU uniquement"],
    correctAnswer: 1,
    explanation: "La CNIL (Commission Nationale de l'Informatique et des Libertés) et le RGPD protègent les données personnelles.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd25',
    text: "Le droit à un environnement sain est :",
    options: ["Non reconnu en France", "Inscrit dans la Charte de l'environnement de 2004", "Réservé aux zones rurales", "Un projet de loi en attente"],
    correctAnswer: 1,
    explanation: "La Charte de l'environnement de 2004, à valeur constitutionnelle, reconnaît le droit à un environnement sain.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd26',
    text: "À partir de quel âge peut-on se marier en France ?",
    options: ["16 ans", "18 ans", "21 ans", "25 ans"],
    correctAnswer: 1,
    explanation: "Le mariage est autorisé à partir de 18 ans, la majorité civile.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd27',
    text: "Le droit de grève est-il reconnu en France ?",
    options: ["Non, il est interdit", "Oui, c'est un droit constitutionnel", "Seulement dans le privé", "Seulement pour les syndicats"],
    correctAnswer: 1,
    explanation: "Le droit de grève est un droit constitutionnel reconnu depuis 1946.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd28',
    text: "Qu'est-ce que la présomption d'innocence ?",
    options: ["Être considéré coupable jusqu'à preuve du contraire", "Être considéré innocent jusqu'à condamnation définitive", "Avoir le droit de mentir", "Ne pas avoir besoin d'avocat"],
    correctAnswer: 1,
    explanation: "Toute personne est présumée innocente jusqu'à ce que sa culpabilité soit établie par un jugement définitif.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd29',
    text: "Le travail des enfants est-il autorisé en France ?",
    options: ["Oui, sans restriction", "Non, interdit avant 16 ans avec quelques exceptions", "Seulement dans l'agriculture", "Oui, à partir de 12 ans"],
    correctAnswer: 1,
    explanation: "Le travail des enfants est interdit avant 16 ans, sauf dérogations pour certaines activités encadrées.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd30',
    text: "Qu'est-ce que l'aide juridictionnelle ?",
    options: ["Une amende", "Une aide financière pour payer un avocat", "Un cours de droit", "Une assurance obligatoire"],
    correctAnswer: 1,
    explanation: "L'aide juridictionnelle permet aux personnes à faibles revenus d'accéder à la justice gratuitement.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd31',
    text: "Le vote est-il obligatoire en France ?",
    options: ["Oui, sous peine d'amende", "Non, c'est un droit mais pas une obligation", "Seulement pour les présidentielles", "Oui, pour tous les citoyens"],
    correctAnswer: 1,
    explanation: "Le vote est un droit civique mais pas une obligation légale en France.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd32',
    text: "Qui peut bénéficier de la Sécurité sociale en France ?",
    options: ["Uniquement les Français", "Toute personne travaillant ou résidant légalement en France", "Uniquement les salariés", "Les riches uniquement"],
    correctAnswer: 1,
    explanation: "La Sécurité sociale couvre toutes les personnes travaillant ou résidant légalement en France.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd33',
    text: "Le service national universel (SNU) est-il obligatoire ?",
    options: ["Oui, pour tous les jeunes", "Non, il est volontaire", "Seulement pour les garçons", "Oui, à partir de 2025"],
    correctAnswer: 1,
    explanation: "Le SNU est actuellement basé sur le volontariat pour les jeunes de 15 à 17 ans.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd35',
    text: "Qu'est-ce que le PACS ?",
    options: ["Un contrat de travail", "Un contrat d'union civile entre deux personnes", "Un permis de conduire", "Une assurance"],
    correctAnswer: 1,
    explanation: "Le PACS (Pacte Civil de Solidarité) est un contrat conclu entre deux personnes majeures pour organiser leur vie commune.",
    category: "droits",
    type: 'multiple-choice'
  }
];

// ============================================================
// HISTOIRE, GÉOGRAPHIE ET CULTURE (25 questions)
// ============================================================
const CULTURE_QUESTIONS: Question[] = [
  {
    id: 'c1',
    text: "La Révolution française a eu lieu en :",
    options: ["1689", "1789", "1889", "1989"],
    correctAnswer: 1,
    explanation: "La Révolution française a débuté en 1789 avec la prise de la Bastille le 14 juillet.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c2',
    text: "Quel fleuve traverse Paris ?",
    options: ["La Loire", "Le Rhône", "La Seine", "La Garonne"],
    correctAnswer: 2,
    explanation: "La Seine traverse Paris et divise la ville en rive droite et rive gauche.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c3',
    text: "Qui a été le premier Président de la Ve République ?",
    options: ["Georges Pompidou", "Charles de Gaulle", "François Mitterrand", "Vincent Auriol"],
    correctAnswer: 1,
    explanation: "Charles de Gaulle a été le premier Président de la Ve République, de 1959 à 1969.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c4',
    text: "Quel monument parisien a été construit pour l'Exposition universelle de 1889 ?",
    options: ["L'Arc de Triomphe", "Le Louvre", "La Tour Eiffel", "Notre-Dame"],
    correctAnswer: 2,
    explanation: "La Tour Eiffel a été construite par Gustave Eiffel pour l'Exposition universelle de 1889.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c5',
    text: "La France compte combien de pays frontaliers terrestres ?",
    options: ["5", "6", "8", "10"],
    correctAnswer: 2,
    explanation: "La France a 8 pays frontaliers : Belgique, Luxembourg, Allemagne, Suisse, Italie, Monaco, Espagne et Andorre.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c6',
    text: "La Seconde Guerre mondiale a pris fin en Europe le :",
    options: ["8 mai 1945", "11 novembre 1918", "14 juillet 1944", "6 juin 1944"],
    correctAnswer: 0,
    explanation: "Le 8 mai 1945 marque la capitulation de l'Allemagne nazie et la fin de la guerre en Europe.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c7',
    text: "Qui a écrit « Les Misérables » ?",
    options: ["Émile Zola", "Victor Hugo", "Gustave Flaubert", "Albert Camus"],
    correctAnswer: 1,
    explanation: "Victor Hugo a écrit « Les Misérables » en 1862, un roman majeur de la littérature française.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c8',
    text: "Le Mont-Blanc, point culminant de France, se trouve dans :",
    options: ["Les Pyrénées", "Les Vosges", "Les Alpes", "Le Massif central"],
    correctAnswer: 2,
    explanation: "Le Mont-Blanc (4 809 m) est situé dans les Alpes, à la frontière franco-italienne.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c9',
    text: "Le débarquement en Normandie a eu lieu le :",
    options: ["6 juin 1944", "8 mai 1945", "11 novembre 1918", "14 juillet 1944"],
    correctAnswer: 0,
    explanation: "Le 6 juin 1944, les forces alliées ont débarqué en Normandie pour libérer l'Europe du nazisme.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c10',
    text: "Quel roi a fait construire le château de Versailles ?",
    options: ["Louis XIV", "Louis XVI", "Napoléon Bonaparte", "François Ier"],
    correctAnswer: 0,
    explanation: "Louis XIV, le Roi-Soleil, a fait construire le château de Versailles au XVIIe siècle.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c11',
    text: "La France est le pays le plus visité au monde avec environ :",
    options: ["50 millions de touristes par an", "90 millions de touristes par an", "30 millions de touristes par an", "150 millions de touristes par an"],
    correctAnswer: 1,
    explanation: "La France accueille environ 90 millions de touristes par an, ce qui en fait la première destination mondiale.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c12',
    text: "L'Académie française, gardienne de la langue française, a été fondée en :",
    options: ["1515", "1635", "1789", "1905"],
    correctAnswer: 1,
    explanation: "L'Académie française a été fondée en 1635 par le cardinal de Richelieu.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c13',
    text: "La France d'outre-mer comprend notamment :",
    options: ["La Corse uniquement", "La Guadeloupe, la Martinique, la Réunion, la Guyane", "L'Alsace et la Lorraine", "Monaco et Andorre"],
    correctAnswer: 1,
    explanation: "Les DROM (Départements et Régions d'Outre-Mer) incluent la Guadeloupe, Martinique, Guyane, Réunion et Mayotte.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c14',
    text: "Le musée du Louvre abrite notamment :",
    options: ["Les Nymphéas de Monet", "La Joconde de Léonard de Vinci", "La Nuit étoilée de Van Gogh", "Le Cri de Munch"],
    correctAnswer: 1,
    explanation: "La Joconde (Mona Lisa) de Léonard de Vinci est l'œuvre la plus célèbre du musée du Louvre.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c15',
    text: "Jeanne d'Arc a joué un rôle majeur pendant :",
    options: ["La Révolution française", "La guerre de Cent Ans", "La Première Guerre mondiale", "Les guerres de Religion"],
    correctAnswer: 1,
    explanation: "Jeanne d'Arc a conduit les armées françaises pendant la guerre de Cent Ans au XVe siècle.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c16',
    text: "Le 11 novembre commémore :",
    options: ["La fin de la Seconde Guerre mondiale", "L'armistice de 1918 (fin de la Première Guerre mondiale)", "La prise de la Bastille", "La naissance de la République"],
    correctAnswer: 1,
    explanation: "Le 11 novembre 1918 marque l'armistice mettant fin à la Première Guerre mondiale.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c17',
    text: "Le français est la langue officielle de :",
    options: ["La France uniquement", "La France, la Belgique, la Suisse, le Canada et de nombreux pays africains", "L'Europe entière", "L'ONU uniquement"],
    correctAnswer: 1,
    explanation: "Le français est parlé sur les cinq continents et est langue officielle dans 29 pays.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c18',
    text: "La Corse est :",
    options: ["Un pays indépendant", "Une collectivité territoriale française", "Une région italienne", "Un département belge"],
    correctAnswer: 1,
    explanation: "La Corse est une collectivité territoriale française située en Méditerranée.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c19',
    text: "Marie Curie est célèbre pour :",
    options: ["Ses romans", "Ses découvertes sur la radioactivité (deux prix Nobel)", "Ses peintures", "Ses compositions musicales"],
    correctAnswer: 1,
    explanation: "Marie Curie a reçu deux prix Nobel (Physique en 1903, Chimie en 1911) pour ses travaux sur la radioactivité.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c20',
    text: "Le pont du Gard est un vestige de l'époque :",
    options: ["Médiévale", "Romaine", "Renaissance", "Moderne"],
    correctAnswer: 1,
    explanation: "Le pont du Gard est un aqueduc romain construit au Ier siècle après J.-C.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c21',
    text: "Napoléon Bonaparte a été :",
    options: ["Roi de France", "Empereur des Français", "Président de la République", "Premier ministre"],
    correctAnswer: 1,
    explanation: "Napoléon Bonaparte a été Empereur des Français de 1804 à 1814, puis brièvement en 1815.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c22',
    text: "Le Tour de France cycliste a été créé en :",
    options: ["1903", "1923", "1950", "1880"],
    correctAnswer: 0,
    explanation: "Le Tour de France a été créé en 1903 par le journal L'Auto.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c23',
    text: "La grotte de Lascaux, célèbre pour ses peintures préhistoriques, se trouve :",
    options: ["En Bretagne", "En Dordogne", "En Provence", "En Alsace"],
    correctAnswer: 1,
    explanation: "La grotte de Lascaux, ornée de peintures datant de 17 000 ans, se trouve en Dordogne.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c24',
    text: "Le Festival de Cannes est dédié :",
    options: ["À la musique", "Au cinéma", "Au théâtre", "À la danse"],
    correctAnswer: 1,
    explanation: "Le Festival de Cannes, créé en 1946, est l'un des plus prestigieux festivals de cinéma au monde.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c25',
    text: "La cathédrale Notre-Dame de Paris date principalement :",
    options: ["De l'époque romaine", "Du Moyen Âge (XIIe-XIVe siècles)", "Du XIXe siècle", "Du XXe siècle"],
    correctAnswer: 1,
    explanation: "Notre-Dame de Paris est une cathédrale gothique construite entre 1163 et 1345.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c26',
    text: "Quel fleuve traverse Paris ?",
    options: ["La Loire", "Le Rhône", "La Seine", "La Garonne"],
    correctAnswer: 2,
    explanation: "La Seine traverse Paris d'est en ouest et divise la ville entre rive droite et rive gauche.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c27',
    text: "Quelle est la plus longue chaîne de montagnes de France ?",
    options: ["Les Pyrénées", "Les Alpes", "Le Massif central", "Les Vosges"],
    correctAnswer: 1,
    explanation: "Les Alpes françaises s'étendent sur environ 450 km le long de la frontière avec l'Italie et la Suisse.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c28',
    text: "Napoléon Bonaparte est devenu empereur en quelle année ?",
    options: ["1789", "1799", "1804", "1815"],
    correctAnswer: 2,
    explanation: "Napoléon Bonaparte a été sacré empereur des Français le 2 décembre 1804.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c29',
    text: "Qui a peint la Joconde, exposée au Louvre ?",
    options: ["Michel-Ange", "Léonard de Vinci", "Raphaël", "Rembrandt"],
    correctAnswer: 1,
    explanation: "La Joconde a été peinte par Léonard de Vinci au début du XVIe siècle.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c30',
    text: "En quelle année la Première Guerre mondiale a-t-elle pris fin ?",
    options: ["1914", "1916", "1918", "1945"],
    correctAnswer: 2,
    explanation: "L'armistice du 11 novembre 1918 a mis fin à la Première Guerre mondiale.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c31',
    text: "Quel est le plus grand musée de France ?",
    options: ["Le musée d'Orsay", "Le Centre Pompidou", "Le Louvre", "Le musée du Quai Branly"],
    correctAnswer: 2,
    explanation: "Le musée du Louvre est le plus grand musée d'art au monde.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c32',
    text: "La Seconde Guerre mondiale s'est terminée en Europe en quelle année ?",
    options: ["1943", "1944", "1945", "1946"],
    correctAnswer: 2,
    explanation: "La capitulation de l'Allemagne nazie le 8 mai 1945 a mis fin à la guerre en Europe.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c33',
    text: "Quel écrivain français a écrit 'Les Misérables' ?",
    options: ["Émile Zola", "Victor Hugo", "Gustave Flaubert", "Alexandre Dumas"],
    correctAnswer: 1,
    explanation: "Victor Hugo a écrit Les Misérables, publié en 1862.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c34',
    text: "Combien de départements compte la France métropolitaine ?",
    options: ["96", "101", "13", "36000"],
    correctAnswer: 0,
    explanation: "La France métropolitaine compte 96 départements.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c35',
    text: "Quel roi a fait construire le château de Versailles ?",
    options: ["Louis XIII", "Louis XIV", "Louis XV", "Louis XVI"],
    correctAnswer: 1,
    explanation: "Louis XIV, le Roi-Soleil, a transformé Versailles en résidence royale au XVIIe siècle.",
    category: "culture",
    type: 'multiple-choice'
  }
];

// ============================================================
// VIVRE DANS LA SOCIÉTÉ FRANÇAISE (25 questions + scénarios)
// ============================================================
const SOCIETE_QUESTIONS: Question[] = [
  {
    id: 's1',
    text: "Le numéro d'appel d'urgence européen est :",
    options: ["15", "17", "112", "18"],
    correctAnswer: 2,
    explanation: "Le 112 est le numéro d'urgence européen, accessible dans tous les pays de l'UE.",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's2',
    text: "En France, le SAMU est joignable au :",
    options: ["15", "17", "18", "112"],
    correctAnswer: 0,
    explanation: "Le 15 est le numéro du SAMU (Service d'Aide Médicale Urgente) pour les urgences médicales.",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's3',
    text: "La police nationale et la gendarmerie sont joignables au :",
    options: ["15", "17", "18", "119"],
    correctAnswer: 1,
    explanation: "Le 17 permet de joindre la police ou la gendarmerie en cas d'urgence.",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's4',
    text: "Les pompiers sont joignables au :",
    options: ["15", "17", "18", "114"],
    correctAnswer: 2,
    explanation: "Le 18 est le numéro des pompiers pour les incendies, accidents et secours.",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's5',
    text: "Le numéro pour signaler un enfant en danger est :",
    options: ["115", "119", "114", "116"],
    correctAnswer: 1,
    explanation: "Le 119 est le numéro national de l'enfance en danger, gratuit et confidentiel.",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's6',
    text: "En France, il est interdit de fumer :",
    options: ["Partout", "Dans les lieux publics fermés et couverts", "Uniquement dans les hôpitaux", "Nulle part"],
    correctAnswer: 1,
    explanation: "La loi interdit de fumer dans tous les lieux publics fermés et couverts depuis 2007.",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's7',
    text: "Le permis de conduire en France peut être passé à partir de :",
    options: ["16 ans", "17 ans (conduite accompagnée) ou 18 ans", "21 ans", "15 ans"],
    correctAnswer: 1,
    explanation: "La conduite accompagnée est possible dès 15 ans, le permis B à partir de 17 ans.",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's8',
    text: "La carte Vitale permet :",
    options: ["De voyager en Europe", "D'accéder aux remboursements de soins de santé", "De voter", "De conduire"],
    correctAnswer: 1,
    explanation: "La carte Vitale est la carte d'assurance maladie permettant le remboursement des soins.",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's9',
    text: "Le PACS (Pacte Civil de Solidarité) est :",
    options: ["Un contrat de travail", "Une union civile entre deux personnes", "Un permis de séjour", "Un diplôme"],
    correctAnswer: 1,
    explanation: "Le PACS est un contrat entre deux personnes majeures pour organiser leur vie commune.",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's10',
    text: "Le tri sélectif des déchets est :",
    options: ["Facultatif", "Obligatoire dans la plupart des communes", "Interdit", "Réservé aux entreprises"],
    correctAnswer: 1,
    explanation: "Le tri sélectif est obligatoire et contribue à la protection de l'environnement.",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's11',
    text: "La durée légale du travail en France est de :",
    options: ["32 heures par semaine", "35 heures par semaine", "40 heures par semaine", "45 heures par semaine"],
    correctAnswer: 1,
    explanation: "La durée légale du travail est de 35 heures par semaine depuis les lois Aubry de 1998-2000.",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's12',
    text: "Le RSA (Revenu de Solidarité Active) est :",
    options: ["Un impôt", "Une aide sociale pour les personnes sans ressources suffisantes", "Une amende", "Un prêt bancaire"],
    correctAnswer: 1,
    explanation: "Le RSA assure un revenu minimum aux personnes sans ressources ou avec des revenus modestes.",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's13',
    text: "Pôle emploi est :",
    options: ["Une entreprise privée", "Le service public de l'emploi", "Un syndicat", "Une banque"],
    correctAnswer: 1,
    explanation: "France Travail (ex-Pôle emploi) accompagne les demandeurs d'emploi et les aide à retrouver un travail.",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's14',
    text: "L'assurance automobile est en France :",
    options: ["Facultative", "Obligatoire", "Réservée aux véhicules neufs", "Gratuite"],
    correctAnswer: 1,
    explanation: "L'assurance responsabilité civile automobile est obligatoire pour tout véhicule terrestre à moteur.",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's15',
    text: "Le numéro pour les violences faites aux femmes est :",
    options: ["3919", "119", "115", "114"],
    correctAnswer: 0,
    explanation: "Le 3919 est le numéro national d'écoute pour les femmes victimes de violences.",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's16',
    text: "Le permis de conduire s'obtient à partir de quel âge ?",
    options: ["16 ans", "17 ans", "18 ans", "21 ans"],
    correctAnswer: 2,
    explanation: "Le permis de conduire B peut être obtenu à partir de 18 ans (17 ans en conduite accompagnée).",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's17',
    text: "Quelle est la durée légale du travail en France ?",
    options: ["32 heures", "35 heures", "39 heures", "40 heures"],
    correctAnswer: 1,
    explanation: "La durée légale du travail en France est de 35 heures par semaine depuis 2000.",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's18',
    text: "Le SMIC est :",
    options: ["Un impôt", "Le salaire minimum légal", "Une allocation chômage", "Une taxe locale"],
    correctAnswer: 1,
    explanation: "Le SMIC (Salaire Minimum Interprofessionnel de Croissance) est le salaire horaire minimum légal.",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's19',
    text: "Les transports en commun sont gratuits pour qui ?",
    options: ["Tout le monde", "Les moins de 4 ans", "Les retraités", "Les étudiants"],
    correctAnswer: 1,
    explanation: "Les enfants de moins de 4 ans voyagent gratuitement dans les transports en commun.",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's20',
    text: "Qu'est-ce que le compte personnel de formation (CPF) ?",
    options: ["Un compte bancaire", "Un droit à la formation professionnelle", "Un diplôme", "Une assurance"],
    correctAnswer: 1,
    explanation: "Le CPF permet à chaque actif d'acquérir des droits à la formation tout au long de sa vie professionnelle.",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's21',
    text: "Le RSA (Revenu de Solidarité Active) est accessible à partir de :",
    options: ["18 ans", "21 ans", "25 ans (ou avant avec enfant)", "30 ans"],
    correctAnswer: 2,
    explanation: "Le RSA est accessible à partir de 25 ans, ou avant si l'on a des enfants à charge.",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's22',
    text: "L'Assurance maladie rembourse généralement quel pourcentage des frais médicaux ?",
    options: ["50%", "70%", "100%", "30%"],
    correctAnswer: 1,
    explanation: "L'Assurance maladie rembourse généralement 70% des frais médicaux (taux normal).",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's23',
    text: "Le tri sélectif concerne quel type de poubelle généralement jaune ?",
    options: ["Les déchets alimentaires", "Les emballages recyclables", "Le verre", "Les déchets médicaux"],
    correctAnswer: 1,
    explanation: "La poubelle jaune est destinée aux emballages recyclables (plastique, carton, métal).",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's24',
    text: "Un logement social (HLM) est attribué en fonction de :",
    options: ["L'âge uniquement", "Les revenus du foyer", "La nationalité", "Le lieu de naissance"],
    correctAnswer: 1,
    explanation: "Les logements sociaux sont attribués en fonction des revenus et de la composition du foyer.",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's25',
    text: "En France, fumer est interdit dans :",
    options: ["Les parcs uniquement", "Les lieux publics fermés", "Nulle part", "Les restaurants seulement"],
    correctAnswer: 1,
    explanation: "Il est interdit de fumer dans tous les lieux publics fermés et couverts depuis 2007.",
    category: "societe",
    type: 'multiple-choice'
  }
];

// Questions de mise en situation (scénarios)
const SCENARIO_QUESTIONS: Question[] = [
  {
    id: 'sc1',
    text: "Vous voyez une personne âgée tomber dans la rue. Que devez-vous faire en priorité ?",
    options: ["Continuer mon chemin car je suis pressé", "Porter secours et appeler les urgences (15 ou 112) si nécessaire", "Attendre que quelqu'un d'autre intervienne", "Prendre une photo pour les réseaux sociaux"],
    correctAnswer: 1,
    explanation: "En France, la non-assistance à personne en danger est punie par la loi. Porter secours est un devoir civique.",
    category: "societe",
    type: 'scenario'
  },
  {
    id: 'sc2',
    text: "Votre voisin fait beaucoup de bruit après 22h de façon répétée. Quelle est la démarche correcte ?",
    options: ["Faire encore plus de bruit pour me venger", "Appeler directement la police sans lui parler", "Essayer de discuter avec lui cordialement avant toute démarche officielle", "Déménager immédiatement"],
    correctAnswer: 2,
    explanation: "Le dialogue est la première étape du civisme. Si le problème persiste, vous pouvez contacter un conciliateur ou la police.",
    category: "societe",
    type: 'scenario'
  },
  {
    id: 'sc3',
    text: "Vous êtes témoin d'un vol dans un magasin. Que faites-vous ?",
    options: ["Je ne fais rien, ce n'est pas mon problème", "Je préviens le personnel du magasin ou les forces de l'ordre", "J'interpelle moi-même le voleur physiquement", "Je filme et je publie sur les réseaux sociaux"],
    correctAnswer: 1,
    explanation: "Prévenir les autorités ou le personnel est le comportement civique approprié. Ne pas intervenir physiquement pour éviter tout danger.",
    category: "societe",
    type: 'scenario'
  },
  {
    id: 'sc4',
    text: "Un collègue tient des propos racistes au travail. Quelle est la bonne réaction ?",
    options: ["Rire avec lui pour ne pas créer de tensions", "Signaler ces propos à la hiérarchie ou aux ressources humaines", "Ignorer complètement la situation", "Répondre par d'autres insultes"],
    correctAnswer: 1,
    explanation: "Les propos racistes sont interdits par la loi. Il faut les signaler aux responsables ou aux autorités compétentes.",
    category: "societe",
    type: 'scenario'
  },
  {
    id: 'sc5',
    text: "Vous trouvez un portefeuille avec de l'argent et des papiers d'identité dans la rue. Que faites-vous ?",
    options: ["Je garde l'argent et je jette le reste", "Je le rapporte au commissariat ou à la mairie", "Je le laisse où il est", "Je contacte la personne pour demander une récompense"],
    correctAnswer: 1,
    explanation: "La loi impose de rapporter les objets trouvés aux autorités. Garder le contenu constitue un vol.",
    category: "societe",
    type: 'scenario'
  },
  {
    id: 'sc6',
    text: "Lors d'une élection, quelqu'un vous propose de l'argent pour voter pour un candidat particulier. Que faites-vous ?",
    options: ["J'accepte car c'est de l'argent facile", "Je refuse et je signale cette tentative de corruption", "Je négocie un montant plus élevé", "J'accepte l'argent mais je vote pour qui je veux"],
    correctAnswer: 1,
    explanation: "L'achat de votes est un délit grave. Il faut refuser et signaler cette tentative de corruption électorale.",
    category: "societe",
    type: 'scenario'
  },
  {
    id: 'sc7',
    text: "Vous souhaitez manifester pour une cause qui vous tient à cœur. Comment procédez-vous légalement ?",
    options: ["Je manifeste où et quand je veux", "Je participe à une manifestation déclarée en préfecture", "Je bloque les routes sans prévenir", "Les manifestations sont interdites en France"],
    correctAnswer: 1,
    explanation: "Le droit de manifester existe mais les manifestations doivent être déclarées en préfecture au préalable.",
    category: "societe",
    type: 'scenario'
  },
  {
    id: 'sc8',
    text: "Un ami vous demande de témoigner faussement en sa faveur devant un tribunal. Que faites-vous ?",
    options: ["J'accepte par amitié", "Je refuse car le faux témoignage est un délit", "J'accepte si personne ne peut vérifier", "Je demande de l'argent en échange"],
    correctAnswer: 1,
    explanation: "Le faux témoignage est un délit puni par la loi. La justice repose sur la vérité des témoignages.",
    category: "societe",
    type: 'scenario'
  },
  {
    id: 'sc9',
    text: "Votre employeur vous demande de travailler sans vous déclarer (travail au noir). Quelle est votre réaction ?",
    options: ["J'accepte pour gagner plus", "Je refuse car le travail non déclaré est illégal et me prive de droits sociaux", "J'accepte temporairement", "C'est normal et légal"],
    correctAnswer: 1,
    explanation: "Le travail dissimulé est illégal. Il prive le salarié de protection sociale et de droits (chômage, retraite, etc.).",
    category: "societe",
    type: 'scenario'
  },
  {
    id: 'sc10',
    text: "Vous constatez une fuite d'eau importante sur la voie publique. Que faites-vous ?",
    options: ["Rien, ce n'est pas mon problème", "Je signale la fuite à la mairie ou au service des eaux", "Je tente de réparer moi-même", "Je prends des photos pour les réseaux sociaux"],
    correctAnswer: 1,
    explanation: "Signaler les problèmes sur la voie publique est un acte civique qui contribue au bien commun.",
    category: "societe",
    type: 'scenario'
  }
];

// ============================================================
// DATABASE EXPORTS
// ============================================================
export const ALL_QUESTIONS: Question[] = [
  ...VALEURS_QUESTIONS,
  ...INSTITUTIONS_QUESTIONS,
  ...DROITS_QUESTIONS,
  ...CULTURE_QUESTIONS,
  ...SOCIETE_QUESTIONS,
  ...SCENARIO_QUESTIONS
];

export const OFFICIAL_DB: Record<string, Question[]> = {
  valeurs: VALEURS_QUESTIONS,
  institutions: INSTITUTIONS_QUESTIONS,
  droits: DROITS_QUESTIONS,
  culture: CULTURE_QUESTIONS,
  societe: [...SOCIETE_QUESTIONS, ...SCENARIO_QUESTIONS],
  CSP: ALL_QUESTIONS.filter(q => !q.difficulty || q.difficulty <= 2),
  CR: ALL_QUESTIONS
};

// ============================================================
// GAMIFICATION: BADGES
// ============================================================
export const BADGES: Badge[] = [
  { id: 'first_quiz', name: 'Premier Pas', description: 'Compléter votre premier quiz', icon: 'fa-shoe-prints', color: 'blue' },
  { id: 'perfect_quiz', name: 'Sans Faute', description: 'Obtenir 100% à un quiz', icon: 'fa-bullseye', color: 'emerald' },
  { id: 'streak_3', name: 'Régulier', description: 'Se connecter 3 jours consécutifs', icon: 'fa-fire', color: 'orange' },
  { id: 'streak_7', name: 'Assidu', description: 'Se connecter 7 jours consécutifs', icon: 'fa-fire-flame-curved', color: 'red' },
  { id: 'streak_30', name: 'Dévoué', description: 'Se connecter 30 jours consécutifs', icon: 'fa-meteor', color: 'purple' },
  { id: 'all_themes', name: 'Explorateur', description: 'Compléter un quiz dans chaque thème', icon: 'fa-compass', color: 'teal' },
  { id: 'exam_passed', name: 'Admis', description: 'Réussir un examen blanc (32/40)', icon: 'fa-award', color: 'amber' },
  { id: 'exam_master', name: 'Expert', description: 'Réussir 3 examens blancs', icon: 'fa-crown', color: 'yellow' },
  { id: 'quiz_10', name: 'Entraîné', description: 'Compléter 10 quiz', icon: 'fa-dumbbell', color: 'slate' },
  { id: 'quiz_50', name: 'Champion', description: 'Compléter 50 quiz', icon: 'fa-trophy', color: 'indigo' },
  { id: 'score_80', name: 'Performant', description: 'Obtenir 80% de moyenne globale', icon: 'fa-chart-line', color: 'green' },
  { id: 'fast_exam', name: 'Rapide', description: 'Terminer un examen en moins de 20 minutes', icon: 'fa-bolt', color: 'cyan' }
];

// ============================================================
// LEVELS SYSTEM
// ============================================================
export const LEVELS = [
  { level: 1, name: 'Citoyen Débutant', minXP: 0, icon: 'fa-seedling' },
  { level: 2, name: 'Citoyen Apprenti', minXP: 100, icon: 'fa-leaf' },
  { level: 3, name: 'Citoyen Curieux', minXP: 250, icon: 'fa-book-open' },
  { level: 4, name: 'Citoyen Informé', minXP: 500, icon: 'fa-lightbulb' },
  { level: 5, name: 'Citoyen Confirmé', minXP: 1000, icon: 'fa-star' },
  { level: 6, name: 'Citoyen Expert', minXP: 2000, icon: 'fa-gem' },
  { level: 7, name: 'Citoyen Émérite', minXP: 3500, icon: 'fa-medal' },
  { level: 8, name: 'Ambassadeur', minXP: 5000, icon: 'fa-crown' }
];

// ============================================================
// FAQ DATA
// ============================================================
export const FAQ_DATA: FAQItem[] = [
  {
    question: "Qui doit passer l'examen civique ?",
    answer: "À partir du 1er janvier 2026, l'examen civique sera exigé pour les personnes sollicitant une carte de séjour pluriannuelle (CSP) ou une carte de résident (CR).",
    category: "Éligibilité"
  },
  {
    question: "Combien de questions comporte l'examen ?",
    answer: "L'examen comporte 40 questions au format QCM (Questions à Choix Multiples), avec 1 seule bonne réponse parmi 4 propositions.",
    category: "Format"
  },
  {
    question: "Quelle est la durée de l'examen ?",
    answer: "L'examen dure 45 minutes maximum et se passe sur tablette ou ordinateur.",
    category: "Format"
  },
  {
    question: "Quel score faut-il obtenir pour réussir ?",
    answer: "Il faut obtenir au minimum 32 bonnes réponses sur 40, soit 80% de réussite.",
    category: "Réussite"
  },
  {
    question: "Quels sont les types de questions ?",
    answer: "Il y a 28 questions de connaissance et 12 mises en situation, portant sur les 5 thématiques de la formation civique.",
    category: "Format"
  },
  {
    question: "Quelles sont les 5 thématiques de l'examen ?",
    answer: "1) Principes et valeurs de la République, 2) Système institutionnel et politique, 3) Droits et devoirs, 4) Histoire, géographie et culture, 5) Vivre dans la société française.",
    category: "Contenu"
  },
  {
    question: "Quelle est la différence entre le niveau CSP et CR ?",
    answer: "Le niveau CR (Carte de Résident) comporte des questions de difficulté supérieure par rapport au niveau CSP (Carte de Séjour Pluriannuelle).",
    category: "Niveaux"
  },
  {
    question: "Où puis-je trouver les informations officielles ?",
    answer: "Les informations officielles sont disponibles sur le site du Ministère de l'Intérieur : formation-civique.interieur.gouv.fr",
    category: "Ressources"
  },
  {
    question: "En quelle langue se déroule l'examen ?",
    answer: "L'examen se déroule entièrement en français.",
    category: "Format"
  },
  {
    question: "Peut-on repasser l'examen en cas d'échec ?",
    answer: "Oui, il est possible de repasser l'examen. Les modalités de nouvelles tentatives seront précisées par les organismes officiels.",
    category: "Réussite"
  }
];

// ============================================================
// LESSONS
// ============================================================
export const LESSONS: Lesson[] = [
  {
    id: 'l1',
    title: 'Les Symboles de la République',
    category: 'Valeurs',
    icon: 'fa-flag',
    content: [
      "Le drapeau tricolore (bleu, blanc, rouge) est l'emblème national depuis la Révolution.",
      "La Marseillaise, composée en 1792, est l'hymne national officiel depuis 1879.",
      "La devise « Liberté, Égalité, Fraternité » figure sur les bâtiments publics.",
      "Marianne représente la République et incarne ses valeurs.",
      "Le 14 juillet, fête nationale, commémore la prise de la Bastille de 1789."
    ],
    quiz: VALEURS_QUESTIONS.slice(0, 5)
  },
  {
    id: 'l2',
    title: 'Le Fonctionnement des Institutions',
    category: 'Institutions',
    icon: 'fa-landmark',
    content: [
      "Le Président de la République est élu pour 5 ans au suffrage universel direct.",
      "Le Parlement (Assemblée nationale + Sénat) vote les lois.",
      "Le Premier ministre dirige le Gouvernement, nommé par le Président.",
      "Le Conseil constitutionnel vérifie la conformité des lois à la Constitution.",
      "La justice est rendue au nom du peuple français."
    ],
    quiz: INSTITUTIONS_QUESTIONS.slice(0, 5)
  },
  {
    id: 'l3',
    title: 'Droits et Devoirs du Citoyen',
    category: 'Droits',
    icon: 'fa-balance-scale',
    content: [
      "La majorité civile est fixée à 18 ans (droit de vote, capacité juridique).",
      "L'école est obligatoire de 3 à 16 ans.",
      "Payer ses impôts est un devoir inscrit dans la Déclaration de 1789.",
      "Tout citoyen bénéficie de l'égalité devant la loi.",
      "Le droit de grève est un droit constitutionnel."
    ],
    quiz: DROITS_QUESTIONS.slice(0, 5)
  },
  {
    id: 'l4',
    title: 'Histoire et Culture de France',
    category: 'Culture',
    icon: 'fa-book',
    content: [
      "La Révolution française de 1789 a mis fin à la monarchie absolue.",
      "La Déclaration des Droits de l'Homme et du Citoyen date du 26 août 1789.",
      "La France compte 13 régions métropolitaines et 5 régions d'outre-mer.",
      "Le patrimoine culturel français est inscrit au patrimoine mondial de l'UNESCO.",
      "La langue française est la langue officielle de la République."
    ],
    quiz: CULTURE_QUESTIONS.slice(0, 5)
  },
  {
    id: 'l5',
    title: 'Vivre en Société',
    category: 'Société',
    icon: 'fa-users',
    content: [
      "La laïcité garantit la liberté de conscience et la neutralité de l'État.",
      "L'égalité femmes-hommes est un principe constitutionnel.",
      "Le système de santé français repose sur la Sécurité sociale depuis 1945.",
      "L'accès aux services publics est un droit pour tous les résidents.",
      "Le respect des règles de vie commune est essentiel au vivre-ensemble."
    ],
    quiz: SOCIETE_QUESTIONS.slice(0, 5)
  }
];

// Default stats for new users
export const DEFAULT_USER_STATS = {
  xp: 0,
  level: 1,
  streak: 0,
  lastLoginDate: '',
  totalQuizzes: 0,
  totalCorrect: 0,
  totalQuestions: 0,
  perfectScores: 0,
  examsPassed: 0,
  badges: [] as string[],
  weakQuestions: [] as string[],
  strongQuestions: [] as string[],
  themeProgress: {} as Record<string, { correct: number; total: number }>
};
