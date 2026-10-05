
import { Question, Lesson, Badge, FAQItem, FicheCategory, SRSMap } from './types';

export const THEMES = [
  { id: 'valeurs', title: 'Principes et valeurs', icon: 'fa-balance-scale' },
  { id: 'institutions', title: 'Système institutionnel', icon: 'fa-landmark' },
  { id: 'droits', title: 'Droits et devoirs', icon: 'fa-handshake-angle' },
  { id: 'culture', title: 'Histoire et Culture', icon: 'fa-monument' },
  { id: 'societe', title: 'Vivre en société', icon: 'fa-house-user' }
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
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'v5',
    text: "Que signifie « Égalité » dans la devise française ?",
    options: ["Tous les citoyens ont les mêmes droits devant la loi", "Tous les citoyens ont le même salaire", "Tous les citoyens ont le même métier", "Tous les citoyens ont la même religion"],
    correctAnswer: 0,
    explanation: "L'égalité signifie que tous les citoyens sont égaux devant la loi, sans distinction d'origine, de race ou de religion.",
    category: "valeurs",
    level: 'csp',
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
    options: ["S'exprimer sans aucune restriction légale", "Exprimer ses opinions dans le respect de la loi", "Critiquer le gouvernement anonymement", "Publier des informations sans vérification"],
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
    options: ["Conscience, d'opinion et d'expression", "Circulation sans contrôle aux frontières", "Propriété sans limites", "Commerce sans réglementation"],
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
  },
  {
    id: 'v36',
    text: "À l'école publique, qui peut porter des signes religieux très visibles ?",
    options: ["Les élèves", "Les enseignants", "Personne", "Tout le monde"],
    correctAnswer: 2,
    explanation: "La loi de 2004 interdit le port de signes religieux ostensibles dans les écoles publiques.",
    category: "valeurs",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'v37',
    text: "Selon le principe de laïcité, que signifie la neutralité de l'État ?",
    options: ["L'État favorise une religion", "L'État ne reconnaît ni ne finance aucune religion", "L'État interdit toutes les religions", "L'État oblige les citoyens à être athées"],
    correctAnswer: 1,
    explanation: "L'État est neutre : il ne reconnaît, ne subventionne ni ne salarie aucun culte.",
    category: "valeurs",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'v38',
    text: "Que garantit la liberté d'expression ?",
    options: ["Le droit de tout dire sans limite", "Le droit d'exprimer ses opinions dans le respect de la loi", "Le droit de s'exprimer uniquement par écrit", "Le droit de parole dans les lieux publics uniquement"],
    correctAnswer: 1,
    explanation: "La liberté d'expression permet d'exprimer ses opinions, mais elle est limitée par la loi (diffamation, incitation à la haine).",
    category: "valeurs",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'v39',
    text: "La répudiation de sa femme est :",
    options: ["Autorisée en France", "Interdite en France", "Autorisée sous conditions", "Une pratique courante"],
    correctAnswer: 1,
    explanation: "La répudiation est interdite en France. Seul le divorce prononcé par un juge est reconnu.",
    category: "valeurs",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'v40',
    text: "Peut-on brûler publiquement un drapeau français ?",
    options: ["Oui, c'est un droit", "Non, c'est une infraction", "Oui, lors des manifestations", "Cela dépend des circonstances"],
    correctAnswer: 1,
    explanation: "Outrager publiquement le drapeau français est une infraction punie par la loi.",
    category: "valeurs",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'v41',
    text: "Que fait l'État pour lutter contre les discriminations ?",
    options: ["Rien", "Il a créé le Défenseur des droits et des lois anti-discrimination", "Il encourage les discriminations", "Il laisse les citoyens se débrouiller"],
    correctAnswer: 1,
    explanation: "L'État a mis en place le Défenseur des droits et de nombreuses lois contre les discriminations.",
    category: "valeurs",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'v42',
    text: "Les impôts permettent de financer les dépenses publiques. Quelle proposition est correcte ?",
    options: ["Seuls les riches paient des impôts", "Tout le monde contribue selon ses moyens", "Les impôts sont facultatifs", "Seuls les Français paient des impôts"],
    correctAnswer: 1,
    explanation: "L'impôt est une contribution obligatoire de tous selon leurs moyens pour financer les services publics.",
    category: "valeurs",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'v43',
    text: "Qu'est-ce que la liberté d'association ?",
    options: ["Le droit de créer une entreprise", "Le droit de créer ou rejoindre des associations", "Le droit de manifester", "Le droit de voter"],
    correctAnswer: 1,
    explanation: "La liberté d'association permet à toute personne de créer ou adhérer à une association.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v44',
    text: "Sur quel document peut-on voir Marianne ?",
    options: ["Le permis de conduire", "Les timbres-poste", "Le passeport uniquement", "Les billets de train"],
    correctAnswer: 1,
    explanation: "Marianne figure sur les timbres-poste, dans les mairies et sur de nombreux documents officiels.",
    category: "valeurs",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'v45',
    text: "Un employeur refuse d'embaucher des femmes dans son entreprise. Que dit la loi ?",
    options: ["C'est son droit", "C'est une discrimination illégale", "C'est autorisé dans certains secteurs", "La loi ne dit rien"],
    correctAnswer: 1,
    explanation: "La discrimination à l'embauche fondée sur le sexe est interdite par la loi.",
    category: "valeurs",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'v46',
    text: "Quel est l'arbre symbole de la République française ?",
    options: ["Le chêne", "L'olivier", "Le sapin", "Le platane"],
    correctAnswer: 0,
    explanation: "Le chêne représente la force et la pérennité de la République. Les arbres de la liberté plantés depuis 1789 sont souvent des chênes.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v47',
    text: "Le faisceau de licteur est un symbole représentant :",
    options: ["La guerre", "L'unité et la force du peuple", "La monarchie", "La religion"],
    correctAnswer: 1,
    explanation: "Le faisceau de licteur symbolise l'union fait la force : des baguettes liées ensemble sont plus difficiles à briser qu'une seule.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v48',
    text: "Quel jour est la Journée de la laïcité ?",
    options: ["Le 14 juillet", "Le 9 décembre", "Le 1er mai", "Le 11 novembre"],
    correctAnswer: 1,
    explanation: "Le 9 décembre commémore la loi de 1905 sur la séparation des Églises et de l'État.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v49',
    text: "Que signifie le principe d'indivisibilité de la République ?",
    options: ["La France ne peut pas être divisée en régions", "La loi s'applique de la même façon sur tout le territoire", "Les citoyens ne peuvent pas quitter le pays", "Le Président ne peut pas démissionner"],
    correctAnswer: 1,
    explanation: "L'indivisibilité signifie que la souveraineté est unique et que la loi s'applique uniformément sur tout le territoire français.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v50',
    text: "La France métropolitaine comprend :",
    options: ["La France continentale uniquement", "La France continentale et la Corse", "Tous les territoires français", "L'Europe entière"],
    correctAnswer: 1,
    explanation: "La France métropolitaine comprend le territoire continental européen et l'île de Corse.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v51',
    text: "Qu'est-ce que le préambule de la Constitution de 1946 garantit ?",
    options: ["Le droit de propriété uniquement", "Des droits économiques et sociaux", "Le droit de vote des femmes uniquement", "La liberté religieuse uniquement"],
    correctAnswer: 1,
    explanation: "Le préambule de 1946 proclame des droits économiques et sociaux : droit au travail, à la protection sociale, à l'éducation, etc.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v52',
    text: "La solidarité nationale s'exprime notamment par :",
    options: ["Le bénévolat obligatoire", "Le système de protection sociale", "Les dons aux associations uniquement", "Le service militaire"],
    correctAnswer: 1,
    explanation: "La solidarité nationale s'exprime par le système de Sécurité sociale, les aides sociales et la redistribution des richesses.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v53',
    text: "La République garantit la liberté de la presse. Cela signifie :",
    options: ["Les journaux sont gratuits", "Les médias peuvent publier des informations sans censure préalable", "Seul l'État peut publier des journaux", "Les journalistes n'ont aucune responsabilité"],
    correctAnswer: 1,
    explanation: "La liberté de la presse permet aux médias de publier sans autorisation préalable, dans le respect de la loi (pas de diffamation, etc.).",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v54',
    text: "Quel est le principe fondamental qui garantit le droit de vote ?",
    options: ["Le suffrage universel", "Le suffrage censitaire", "Le suffrage indirect", "Le tirage au sort"],
    correctAnswer: 0,
    explanation: "Le suffrage universel garantit que tous les citoyens majeurs peuvent voter, sans condition de fortune ou d'éducation.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v55',
    text: "La Charte de l'environnement de 2004 a été intégrée à :",
    options: ["Le Code civil", "La Constitution", "Le Code pénal", "Le Code du travail"],
    correctAnswer: 1,
    explanation: "La Charte de l'environnement a été adossée à la Constitution en 2005, donnant valeur constitutionnelle à la protection de l'environnement.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v56',
    text: "Parmi les propositions suivantes, laquelle constitue une participation citoyenne ?",
    options: ["Voter aux élections", "Faire ses courses", "Prendre les transports en commun", "Regarder un match de football"],
    correctAnswer: 0,
    explanation: "Voter, être candidat, adhérer à une association ou être juré sont des formes de participation citoyenne à la vie du pays.",
    category: "valeurs",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'v57',
    text: "À quoi sert un titre de séjour ?",
    options: ["À voter aux élections", "À prouver qu'une personne étrangère a le droit de séjourner en France", "À obtenir la nationalité française automatiquement", "À voyager gratuitement en train"],
    correctAnswer: 1,
    explanation: "Le titre de séjour est le document qui autorise une personne étrangère à résider en France.",
    category: "valeurs",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'v58',
    text: "La liberté de circulation permet à toute personne de :",
    options: ["Entrer dans une propriété privée sans autorisation", "Voyager gratuitement dans les transports", "Se déplacer librement sur le territoire national", "Conduire sans permis"],
    correctAnswer: 2,
    explanation: "La liberté d'aller et venir est un droit fondamental. Elle s'exerce dans le respect de la loi et de la propriété privée.",
    category: "valeurs",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'v59',
    text: "Sur quel site internet peut-on retrouver le symbole de la République française ?",
    options: ["facebook.com", "amazon.fr", "wikipedia.org", "service-public.gouv.fr"],
    correctAnswer: 3,
    explanation: "Les sites officiels de l'État (adresse en .gouv.fr) affichent le bloc-marque « République française » avec Marianne et la devise.",
    category: "valeurs",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'v60',
    text: "Complétez ces paroles de la Marseillaise : \"Aux armes […] ! Formez vos bataillons\"",
    options: ["citoyens", "soldats", "Français", "enfants"],
    correctAnswer: 0,
    explanation: "Le refrain de la Marseillaise dit : « Aux armes, citoyens ! Formez vos bataillons ».",
    category: "valeurs",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'v61',
    text: "Complétez les paroles de la Marseillaise : \"Allons enfants de la patrie […]\"",
    options: ["La liberté est arrivée", "Le jour de gloire est arrivé", "Le temps de paix est venu", "Le roi est parti"],
    correctAnswer: 1,
    explanation: "Le premier couplet de la Marseillaise commence par : « Allons enfants de la patrie, le jour de gloire est arrivé ! ».",
    category: "valeurs",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'v62',
    text: "En application de la liberté individuelle, quelle proposition est correcte ? Une personne peut :",
    options: ["Faire tout ce qu'elle veut sans aucune limite", "Être détenue sans raison", "Choisir librement son mode de vie dans le respect de la loi", "Être obligée de pratiquer une religion"],
    correctAnswer: 2,
    explanation: "La liberté individuelle protège chacun contre l'arbitraire. Elle s'arrête là où commencent les droits des autres et où la loi l'interdit.",
    category: "valeurs",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'v63',
    text: "Concernant la pratique de la religion, quelle proposition est correcte ?",
    options: ["La religion catholique est obligatoire", "Il est interdit de pratiquer une religion en France", "Il faut déclarer sa religion à la mairie", "Chacun est libre de pratiquer la religion de son choix ou de n'en pratiquer aucune"],
    correctAnswer: 3,
    explanation: "La liberté de conscience et de culte est garantie, dans le respect de l'ordre public. Personne n'a à déclarer sa religion.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v64',
    text: "En tant que parent, peut-on refuser que son enfant participe aux cours de sport à l'école car ils sont mixtes ?",
    options: ["Non, la mixité est la règle à l'école et les cours de sport sont obligatoires", "Oui, pour des raisons religieuses", "Oui, si le parent écrit une lettre", "Oui, mais seulement pour les filles"],
    correctAnswer: 0,
    explanation: "L'école est mixte et l'éducation physique fait partie du programme. Seul un motif médical peut dispenser un élève.",
    category: "valeurs",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'v65',
    text: "Qu'est-ce que la liberté ?",
    options: ["Faire tout ce que l'on veut sans limite", "Pouvoir faire tout ce qui ne nuit pas à autrui", "Obéir sans discuter", "Ne pas payer d'impôts"],
    correctAnswer: 1,
    explanation: "Selon la Déclaration de 1789, la liberté consiste à pouvoir faire tout ce qui ne nuit pas à autrui.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v66',
    text: "Quelle est la place de la langue française dans la République ?",
    options: ["Le français et l'anglais sont tous deux officiels", "Il n'y a pas de langue officielle", "Le français est la langue de la République (article 2 de la Constitution)", "Le français est une langue régionale"],
    correctAnswer: 2,
    explanation: "L'article 2 de la Constitution dit : « La langue de la République est le français ».",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v67',
    text: "Quels sont des symboles officiels de la République française ?",
    options: ["La fleur de lys et le drapeau blanc", "L'aigle impérial et la Marche impériale", "La tour Eiffel et la baguette", "Le drapeau tricolore, la Marseillaise et Marianne"],
    correctAnswer: 3,
    explanation: "Le drapeau tricolore, l'hymne national, la devise et Marianne sont des symboles de la République.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v68',
    text: "A-t-on le droit d'insulter publiquement quelqu'un parce qu'il est différent (handicap, apparence physique, sexe…) ?",
    options: ["Non, l'injure publique à caractère discriminatoire est punie par la loi", "Oui, la liberté d'expression n'a aucune limite", "Oui, si la personne est étrangère", "Oui, si on est plusieurs"],
    correctAnswer: 0,
    explanation: "La liberté d'expression a des limites : l'injure, la diffamation et la haine envers une personne à cause de ce qu'elle est sont punies.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v69',
    text: "Une personne a-t-elle le droit de ne pas croire en une religion ?",
    options: ["Non, il faut avoir une religion", "Oui, la liberté de conscience permet de croire ou de ne pas croire", "Non, sauf à l'école", "Oui, mais seulement après 18 ans"],
    correctAnswer: 1,
    explanation: "La laïcité garantit la liberté de croire, de ne pas croire et de changer de conviction.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v70',
    text: "Que peut faire un usager du service public dans une mairie ?",
    options: ["Exiger d'être reçu par un agent de sa religion", "Refuser de montrer son visage", "Être traité de la même façon que les autres usagers, quelles que soient ses origines ou ses convictions", "Demander que le service soit adapté à sa religion"],
    correctAnswer: 2,
    explanation: "Le service public repose sur l'égalité, la neutralité et la continuité. Chaque usager a droit à un traitement égal, et les agents publics traitent chaque demande de la même façon. En retour, l'usager ne peut pas choisir son agent, exiger d'être servi en premier, ni demander un traitement d'exception pour un motif religieux. Il doit respecter les règles de la mairie et faire preuve de civisme envers le personnel.",
    category: "valeurs",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'v71',
    text: "Qui doit respecter le principe de neutralité religieuse dans une préfecture ?",
    options: ["Les usagers qui viennent faire une démarche", "Uniquement le préfet", "Personne", "Les agents du service public"],
    correctAnswer: 3,
    explanation: "Tous les agents publics doivent rester neutres et ne pas montrer leurs convictions religieuses dans l'exercice de leurs fonctions.",
    category: "valeurs",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'v72',
    text: "A-t-on le droit de changer de religion ?",
    options: ["Oui, c'est une liberté garantie", "Non, on garde la religion de sa famille", "Oui, mais seulement avec l'accord de l'État", "Non, sauf avant 18 ans"],
    correctAnswer: 0,
    explanation: "La liberté de conscience inclut le droit de changer de religion ou de la quitter.",
    category: "valeurs",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'v73',
    text: "Qu'est-ce qui est interdit par la Charte de la laïcité à l'école ?",
    options: ["Croire en une religion", "Le port de signes ou de tenues par lesquels les élèves montrent ostensiblement une appartenance religieuse", "Parler de religion à la maison", "Prier en dehors de l'école"],
    correctAnswer: 1,
    explanation: "Dans les écoles, collèges et lycées publics, les élèves ne peuvent pas porter de signes ou de tenues qui manifestent ostensiblement une appartenance religieuse.",
    category: "valeurs",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'v74',
    text: "Que dit l'article 1er de la Constitution française ?",
    options: ["La France est une monarchie parlementaire", "La France est une République fédérale", "La France est une République indivisible, laïque, démocratique et sociale", "La France est un empire démocratique"],
    correctAnswer: 2,
    explanation: "L'article 1er ajoute que la France assure l'égalité devant la loi de tous les citoyens et respecte toutes les croyances.",
    category: "valeurs",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'v75',
    text: "Où peut-on voir la devise de la République ?",
    options: ["Sur les panneaux routiers", "Sur les billets de banque uniquement", "Sur les maillots de l'équipe de France", "Sur les frontons des mairies et des écoles"],
    correctAnswer: 3,
    explanation: "« Liberté, Égalité, Fraternité » est inscrite sur les bâtiments publics comme les mairies et les écoles.",
    category: "valeurs",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'v76',
    text: "Quel est l'un des rôles des associations ?",
    options: ["Réunir des personnes autour d'un but commun, sans chercher à partager des bénéfices", "Voter les lois", "Rendre la justice", "Collecter les impôts"],
    correctAnswer: 0,
    explanation: "Une association réunit des personnes pour un projet commun (sport, culture, entraide) dans un but non lucratif.",
    category: "valeurs",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'v77',
    text: "Quel symbole de la République française est tricolore ?",
    options: ["La Marseillaise", "Le drapeau", "La devise", "Le Code civil"],
    correctAnswer: 1,
    explanation: "Le drapeau bleu, blanc, rouge est l'emblème national.",
    category: "valeurs",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'v78',
    text: "Qu'est-ce qui est traditionnellement organisé sur les Champs-Élysées le 14 juillet pour célébrer la fête nationale ?",
    options: ["Un marathon", "Un marché de Noël", "Un défilé militaire", "Un carnaval"],
    correctAnswer: 2,
    explanation: "Chaque 14 juillet, un défilé militaire descend les Champs-Élysées à Paris devant le président de la République.",
    category: "valeurs",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'v79',
    text: "Qui est Marianne ?",
    options: ["Une reine de France", "Une chanteuse célèbre", "La première femme députée", "La figure féminine qui représente la République et ses valeurs"],
    correctAnswer: 3,
    explanation: "Marianne est la personnification de la République. Son buste est dans les mairies.",
    category: "valeurs",
    type: 'multiple-choice'
  },
  {
    id: 'v80',
    text: "Un enfant peut-il refuser d'aller à l'école pour une raison religieuse ?",
    options: ["Non, l'instruction est obligatoire et l'école est laïque", "Oui, si ses parents l'écrivent", "Oui, si la religion est minoritaire", "Oui, un jour par semaine"],
    correctAnswer: 0,
    explanation: "L'instruction est obligatoire pour tous les enfants. Une raison religieuse ne permet pas de refuser l'école.",
    category: "valeurs",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'v81',
    text: "Certains métiers peuvent-ils être réservés aux hommes ?",
    options: ["Oui, les métiers physiques", "Non, la loi interdit en principe de réserver un métier à un sexe", "Oui, dans l'armée uniquement", "Oui, si l'employeur le décide"],
    correctAnswer: 1,
    explanation: "L'égalité entre les femmes et les hommes interdit la discrimination à l'embauche. Les exceptions sont très limitées.",
    category: "valeurs",
    level: 'csp',
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
    level: 'csp',
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
    level: 'cr',
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
    id: 'i36',
    text: "Quel État a quitté l'Union européenne en 2020 ?",
    options: ["La Grèce", "Le Royaume-Uni", "La Pologne", "La Suisse"],
    correctAnswer: 1,
    explanation: "Le Royaume-Uni a quitté l'Union européenne le 31 janvier 2020 (Brexit).",
    category: "institutions",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'i37',
    text: "En quelle année le traité de Maastricht a-t-il été signé ?",
    options: ["1957", "1992", "2000", "2007"],
    correctAnswer: 1,
    explanation: "Le traité de Maastricht, fondateur de l'Union européenne, a été signé en 1992.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i38',
    text: "Quelle est la devise de l'Union européenne ?",
    options: ["Liberté, Égalité, Fraternité", "Unie dans la diversité", "Paix et Prospérité", "Force et Honneur"],
    correctAnswer: 1,
    explanation: "La devise de l'Union européenne est « Unie dans la diversité ».",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i39',
    text: "Quel est l'hymne de l'Union européenne ?",
    options: ["La Marseillaise", "L'Ode à la Joie", "God Save the King", "L'Internationale"],
    correctAnswer: 1,
    explanation: "L'hymne européen est l'Ode à la Joie de Beethoven.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i40',
    text: "De quelle couleur est le drapeau européen ?",
    options: ["Rouge et blanc", "Bleu avec des étoiles jaunes", "Vert et blanc", "Noir, rouge et jaune"],
    correctAnswer: 1,
    explanation: "Le drapeau européen est bleu avec un cercle de 12 étoiles jaunes.",
    category: "institutions",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'i41',
    text: "Où est le siège du Parlement européen ?",
    options: ["Paris", "Bruxelles", "Strasbourg", "Luxembourg"],
    correctAnswer: 2,
    explanation: "Le siège officiel du Parlement européen est à Strasbourg, en France.",
    category: "institutions",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'i42',
    text: "Où est le siège de la Commission européenne ?",
    options: ["Paris", "Bruxelles", "Strasbourg", "Berlin"],
    correctAnswer: 1,
    explanation: "La Commission européenne siège à Bruxelles, en Belgique.",
    category: "institutions",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'i43',
    text: "Combien de communes existe-t-il environ en France ?",
    options: ["1 000", "10 000", "35 000", "100 000"],
    correctAnswer: 2,
    explanation: "La France compte environ 35 000 communes, ce qui en fait le pays européen avec le plus de communes.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i44',
    text: "Quel est le rôle principal du département ?",
    options: ["Voter les lois", "L'action sociale et la gestion des routes", "Diriger l'armée", "Gérer les universités"],
    correctAnswer: 1,
    explanation: "Le département gère principalement l'action sociale (RSA, aide à l'enfance) et les routes départementales.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i45',
    text: "Quel est le rôle principal des communes ?",
    options: ["Voter les lois nationales", "Gérer les écoles primaires et l'urbanisme", "Diriger la police nationale", "Collecter l'impôt sur le revenu"],
    correctAnswer: 1,
    explanation: "Les communes gèrent les écoles primaires, l'urbanisme, l'état civil et les services de proximité.",
    category: "institutions",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'i46',
    text: "Qu'est-ce que l'Hôtel de Matignon ?",
    options: ["La résidence du Président", "La résidence du Premier ministre", "Le siège du Parlement", "Un musée"],
    correctAnswer: 1,
    explanation: "L'Hôtel de Matignon est la résidence officielle et le lieu de travail du Premier ministre.",
    category: "institutions",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'i48',
    text: "Depuis quand l'euro est-il la monnaie unique en France ?",
    options: ["1992", "1999", "2002", "2010"],
    correctAnswer: 2,
    explanation: "Les pièces et billets en euros sont utilisés en France depuis le 1er janvier 2002.",
    category: "institutions",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'i49',
    text: "Quel traité concerne la construction de l'Union européenne ?",
    options: ["Le traité de Versailles", "Le traité de Rome", "Le traité de Paris 1815", "Le traité de Westphalie"],
    correctAnswer: 1,
    explanation: "Le traité de Rome (1957) a créé la Communauté économique européenne, ancêtre de l'UE.",
    category: "institutions",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'i50',
    text: "Quel est le rôle du Premier ministre ?",
    options: ["Chef de l'État", "Diriger l'action du gouvernement", "Présider le Parlement", "Commander l'armée"],
    correctAnswer: 1,
    explanation: "Le Premier ministre dirige l'action du gouvernement et assure l'exécution des lois.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i51',
    text: "Quel est le rôle du président de la République ?",
    options: ["Voter les lois", "Garantir le respect de la Constitution et l'indépendance nationale", "Diriger les débats au Parlement", "Gérer les communes"],
    correctAnswer: 1,
    explanation: "Le président veille au respect de la Constitution, garantit l'indépendance nationale et l'intégrité du territoire.",
    category: "institutions",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'i52',
    text: "Qu'est-ce que la motion de censure ?",
    options: ["Une loi sur la presse", "Un moyen pour l'Assemblée nationale de renverser le gouvernement", "Un discours du Président", "Une sanction contre un député"],
    correctAnswer: 1,
    explanation: "La motion de censure permet à l'Assemblée nationale de mettre en cause la responsabilité du gouvernement et de le renverser.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i54',
    text: "Qu'est-ce que la navette parlementaire ?",
    options: ["Un transport pour les députés", "L'aller-retour d'un texte entre l'Assemblée et le Sénat", "Une commission d'enquête", "Un vote électronique"],
    correctAnswer: 1,
    explanation: "La navette parlementaire désigne les allers-retours d'un projet de loi entre les deux chambres jusqu'à l'adoption d'un texte identique.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i56',
    text: "Qu'est-ce que la décentralisation ?",
    options: ["La concentration des pouvoirs à Paris", "Le transfert de compétences de l'État vers les collectivités locales", "La suppression des régions", "Le contrôle de l'État sur les communes"],
    correctAnswer: 1,
    explanation: "La décentralisation est le transfert de compétences de l'État vers les collectivités territoriales (communes, départements, régions).",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i57',
    text: "Quel tribunal juge les crimes les plus graves ?",
    options: ["Le tribunal correctionnel", "La cour d'assises", "Le tribunal de commerce", "Le conseil de prud'hommes"],
    correctAnswer: 1,
    explanation: "La cour d'assises juge les crimes (meurtres, viols, etc.). Elle est composée de magistrats professionnels et de jurés populaires.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i58',
    text: "Qu'est-ce que le Défenseur des droits ?",
    options: ["Un avocat gratuit", "Une autorité indépendante protégeant les droits des citoyens", "Un juge spécialisé", "Un ministre"],
    correctAnswer: 1,
    explanation: "Le Défenseur des droits est une autorité constitutionnelle indépendante chargée de défendre les droits des citoyens face aux administrations.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i59',
    text: "Combien de régions compte la France métropolitaine ?",
    options: ["22", "13", "18", "10"],
    correctAnswer: 1,
    explanation: "Depuis 2016, la France métropolitaine compte 13 régions, auxquelles s'ajoutent 5 régions d'outre-mer.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i60',
    text: "Qui nomme les ministres ?",
    options: ["Le Parlement", "Le président de la République sur proposition du Premier ministre", "Les citoyens par référendum", "Le Conseil constitutionnel"],
    correctAnswer: 1,
    explanation: "Les ministres sont nommés par le président de la République sur proposition du Premier ministre.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i61',
    text: "Combien de mandats consécutifs un Président de la République peut-il exercer au maximum ?",
    options: ["Un seul", "Deux", "Trois", "Il n'y a pas de limite"],
    correctAnswer: 1,
    explanation: "Depuis la révision constitutionnelle de 2008, le Président de la République ne peut exercer plus de deux mandats consécutifs.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i62',
    text: "Que permet l'article 49.3 de la Constitution au Gouvernement ?",
    options: ["De dissoudre l'Assemblée nationale", "De faire adopter un texte de loi sans vote, sauf motion de censure des députés", "D'organiser un référendum", "De nommer directement les préfets"],
    correctAnswer: 1,
    explanation: "L'article 49 alinéa 3 permet au Gouvernement d'engager sa responsabilité pour faire adopter un texte sans vote ; les députés peuvent alors renverser le Gouvernement par une motion de censure.",
    category: "institutions",
    type: 'multiple-choice'
  },
  // The next two answers are current officeholders, not fixed civic facts.
  // They will go stale whenever the president or prime minister changes and
  // need to be updated then (verified true as of 2026).
  {
    id: 'i63',
    text: "Qui est l'actuel président de la République française (en 2026) ?",
    options: ["Nicolas Sarkozy", "François Hollande", "Emmanuel Macron", "Jacques Chirac"],
    correctAnswer: 2,
    explanation: "Emmanuel Macron est Président de la République depuis 2017, réélu en 2022 pour un second mandat.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i64',
    text: "Qui est l'actuel Premier ministre (en 2026) ?",
    options: ["Michel Barnier", "François Bayrou", "Gabriel Attal", "Sébastien Lecornu"],
    correctAnswer: 3,
    explanation: "Sébastien Lecornu est Premier ministre depuis septembre 2025.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i65',
    text: "Qu'est-ce que l'État de droit ?",
    options: ["Un État où le président décide seul", "Un État où la loi s'applique à tous, y compris à ceux qui gouvernent", "Un État sans tribunaux", "Un État où la loi ne s'applique qu'aux citoyens"],
    correctAnswer: 1,
    explanation: "Dans un État de droit, tout le monde est soumis à la loi, y compris l'État lui-même. Les juges contrôlent le respect des règles.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i66',
    text: "Que garantit l'État de droit ?",
    options: ["Le pouvoir absolu du gouvernement", "La suppression des tribunaux", "La protection des droits et des libertés de chacun face à l'État et aux autres", "L'égalité des salaires"],
    correctAnswer: 2,
    explanation: "L'État de droit limite le pouvoir par la loi et protège les droits et libertés de chacun.",
    category: "institutions",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'i67',
    text: "Le président de la République a commis un crime. Quelle proposition est correcte ?",
    options: ["Il ne peut jamais être jugé", "Il est jugé uniquement par ses ministres", "Il est jugé uniquement par le maire de Paris", "Il n'est pas au-dessus de la loi, mais il bénéficie d'une inviolabilité pendant son mandat (sauf destitution)"],
    correctAnswer: 3,
    explanation: "Le président n'a pas d'impunité totale. L'article 67 de la Constitution le protège pendant son mandat : il ne peut pas être arrêté, entendu ni poursuivi par les juridictions ordinaires, et les enquêtes sont suspendues. Elles peuvent reprendre un mois après la fin de ses fonctions, quand il redevient un justiciable ordinaire. Pendant le mandat, seul le Parlement réuni en Haute Cour peut le destituer, en cas de manquement à ses devoirs manifestement incompatible avec son mandat (article 68).",
    category: "institutions",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'i68',
    text: "La loi est l'expression de :",
    options: ["La volonté générale", "La volonté du président", "L'opinion des juges", "La volonté du gouvernement seul"],
    correctAnswer: 0,
    explanation: "L'article 6 de la Déclaration de 1789 dit que la loi est l'expression de la volonté générale.",
    category: "institutions",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'i69',
    text: "Quelle est la durée du mandat du conseil municipal et du maire ?",
    options: ["4 ans", "6 ans", "5 ans", "7 ans"],
    correctAnswer: 1,
    explanation: "Les conseillers municipaux sont élus pour 6 ans. Le maire est élu par le conseil municipal pour la même durée.",
    category: "institutions",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'i70',
    text: "Une personne peut-elle voter à la place d'une autre ?",
    options: ["Non, c'est interdit dans tous les cas", "Oui, il suffit de présenter sa carte d'identité", "Oui, uniquement par procuration, établie à l'avance", "Oui, mais seulement pour les élections municipales"],
    correctAnswer: 2,
    explanation: "Le vote est personnel, mais un électeur absent peut donner une procuration. Celui qui la donne est le mandant, celui qui vote à sa place est le mandataire. Le mandataire doit être inscrit sur les listes électorales, mais pas forcément dans la même commune. Il ne peut recevoir qu'une seule procuration établie en France. Le jour du vote, il va au bureau de vote du mandant avec sa propre pièce d'identité, sans la carte électorale du mandant. La demande se fait sur maprocuration.gouv.fr, puis l'identité est confirmée avec une application ou dans un commissariat ou une gendarmerie.",
    category: "institutions",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'i71',
    text: "Quelle est l'organisation administrative de la France ?",
    options: ["Provinces et comtés", "Cantons et États", "Länder et districts", "Communes, départements et régions"],
    correctAnswer: 3,
    explanation: "La France est organisée en communes, départements et régions, qui sont des collectivités territoriales.",
    category: "institutions",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'i72',
    text: "Pourquoi séparer les trois pouvoirs dans une démocratie ?",
    options: ["Pour éviter qu'une seule personne ou un seul organe concentre tous les pouvoirs", "Pour réduire le nombre de ministres", "Pour faire des économies", "Pour que les citoyens ne votent plus"],
    correctAnswer: 0,
    explanation: "La séparation des pouvoirs évite les abus : chaque pouvoir limite les autres.",
    category: "institutions",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'i73',
    text: "Qui sanctionne l'auteur d'un vol ?",
    options: ["Le président de la République", "Un juge (le pouvoir judiciaire)", "Le maire", "Le Parlement"],
    correctAnswer: 1,
    explanation: "Seuls les juges et les tribunaux peuvent condamner l'auteur d'une infraction.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i74',
    text: "Que se passe-t-il si un ministre ne respecte pas la loi ?",
    options: ["Rien, il est protégé par son statut", "Il est puni uniquement par le président", "Il peut être poursuivi et jugé, comme tout citoyen", "Il doit seulement changer de ministère"],
    correctAnswer: 2,
    explanation: "Un ministre n'est pas au-dessus de la loi. Pour les actes faits dans l'exercice de ses fonctions, il est jugé par la Cour de justice de la République.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i75',
    text: "Combien de députés composent l'Assemblée nationale ?",
    options: ["348", "925", "400", "577"],
    correctAnswer: 3,
    explanation: "L'Assemblée nationale compte 577 députés élus pour 5 ans au suffrage universel direct.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i76',
    text: "Qui peut voter aux élections en France ?",
    options: ["Tout citoyen français majeur inscrit sur les listes électorales", "Tous les habitants de plus de 16 ans", "Uniquement les personnes qui travaillent", "Toutes les personnes résidant en France, quelle que soit leur nationalité"],
    correctAnswer: 0,
    explanation: "Pour voter aux élections nationales, il faut être français, majeur, jouir de ses droits civiques et être inscrit sur les listes électorales.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i77',
    text: "La séparation des pouvoirs est un principe fondamental. Quels sont les trois pouvoirs concernés ?",
    options: ["Politique, économique et religieux", "Législatif, exécutif et judiciaire", "National, régional et local", "Militaire, civil et médiatique"],
    correctAnswer: 1,
    explanation: "Le pouvoir législatif fait la loi, l'exécutif l'applique et le judiciaire juge.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i78',
    text: "Est-ce que le président de la République a tous les pouvoirs ?",
    options: ["Oui, il fait les lois seul", "Oui, il juge les crimes", "Non, ses pouvoirs sont limités par la Constitution, le Parlement et la justice", "Oui, pendant les 5 ans de son mandat"],
    correctAnswer: 2,
    explanation: "Le président a des pouvoirs importants mais la loi est votée par le Parlement et la justice est indépendante.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i79',
    text: "Quelle condition est nécessaire pour voter aux élections ?",
    options: ["Avoir un diplôme", "Payer des impôts", "Avoir un emploi", "Être inscrit sur les listes électorales"],
    correctAnswer: 3,
    explanation: "L'inscription sur les listes électorales est obligatoire pour voter. Elle se fait en mairie ou en ligne.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i80',
    text: "Le Parlement est composé :",
    options: ["De l'Assemblée nationale et du Sénat", "Du président et du Premier ministre", "Du Conseil constitutionnel et du Conseil d'État", "Des maires et des préfets"],
    correctAnswer: 0,
    explanation: "Le Parlement français est composé de deux chambres : l'Assemblée nationale et le Sénat.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i81',
    text: "Quel État n'est pas membre de l'Union européenne ?",
    options: ["L'Italie", "La Suisse", "La Belgique", "L'Espagne"],
    correctAnswer: 1,
    explanation: "La Suisse ne fait pas partie de l'Union européenne.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i82',
    text: "Quand célèbre-t-on la journée de l'Europe ?",
    options: ["Le 8 mai", "Le 14 juillet", "Le 9 mai", "Le 11 novembre"],
    correctAnswer: 2,
    explanation: "La journée de l'Europe est célébrée le 9 mai, en souvenir de la déclaration de Robert Schuman en 1950.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i83',
    text: "À quelle fréquence les élections européennes sont-elles organisées ?",
    options: ["Tous les 2 ans", "Tous les 6 ans", "Tous les 10 ans", "Tous les 5 ans"],
    correctAnswer: 3,
    explanation: "Les députés européens sont élus au suffrage universel direct tous les 5 ans.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i84',
    text: "Quelle condition est nécessaire pour voter aux élections européennes ?",
    options: ["Être citoyen de l'Union européenne, majeur et inscrit sur les listes électorales", "Habiter à Strasbourg", "Parler plusieurs langues", "Avoir voyagé dans un autre pays de l'Union"],
    correctAnswer: 0,
    explanation: "En France, les citoyens européens résidant en France peuvent aussi voter aux européennes s'ils sont inscrits sur une liste électorale complémentaire.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i85',
    text: "Quel pays est un pays fondateur de l'Union européenne ?",
    options: ["L'Espagne", "L'Italie", "Le Royaume-Uni", "La Pologne"],
    correctAnswer: 1,
    explanation: "Six pays ont fondé la construction européenne : la France, l'Allemagne, l'Italie, la Belgique, les Pays-Bas et le Luxembourg.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i86',
    text: "Les dirigeants sont élus par les citoyens dans :",
    options: ["Une dictature", "Une monarchie absolue", "Une démocratie", "Une théocratie"],
    correctAnswer: 2,
    explanation: "Dans une démocratie, les citoyens choisissent leurs dirigeants par des élections libres.",
    category: "institutions",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'i87',
    text: "A-t-on le droit de ne pas respecter une loi ?",
    options: ["Oui, si on n'est pas d'accord", "Oui, si on est étranger", "Oui, si personne ne le voit", "Non, la loi s'applique à tous"],
    correctAnswer: 3,
    explanation: "La loi s'impose à tous. Pour la changer, on peut voter, manifester ou s'engager dans une association.",
    category: "institutions",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'i88',
    text: "Qui doit respecter la loi ?",
    options: ["Toutes les personnes présentes sur le territoire, y compris les dirigeants", "Seulement les citoyens français", "Seulement les adultes", "Seulement les personnes qui votent"],
    correctAnswer: 0,
    explanation: "La loi s'applique à tous : citoyens, étrangers, dirigeants et institutions.",
    category: "institutions",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'i89',
    text: "Quel est le rôle de l'autorité judiciaire ?",
    options: ["Voter les lois", "Faire respecter la loi et juger les litiges et les infractions", "Gouverner le pays", "Collecter les impôts"],
    correctAnswer: 1,
    explanation: "L'autorité judiciaire, composée des juges, applique la loi et rend la justice.",
    category: "institutions",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'i90',
    text: "Quel pouvoir détient un juge ? Le pouvoir :",
    options: ["Législatif", "Exécutif", "Judiciaire", "Municipal"],
    correctAnswer: 2,
    explanation: "Les juges détiennent le pouvoir judiciaire.",
    category: "institutions",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'i91',
    text: "L'autorité judiciaire est exercée par :",
    options: ["Les députés", "Les ministres", "Les maires", "Les juges et les magistrats"],
    correctAnswer: 3,
    explanation: "Les magistrats, juges et procureurs, exercent l'autorité judiciaire. Ils sont indépendants.",
    category: "institutions",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'i92',
    text: "Qui est élu lors des élections législatives ?",
    options: ["Les députés", "Le président de la République", "Les sénateurs", "Les maires"],
    correctAnswer: 0,
    explanation: "Les élections législatives servent à élire les 577 députés de l'Assemblée nationale.",
    category: "institutions",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'i93',
    text: "Quand sont élus les sénateurs ?",
    options: ["Tous les 5 ans, en même temps que le président", "Pour 6 ans, avec un renouvellement de la moitié du Sénat tous les 3 ans", "Tous les 2 ans", "Chaque année"],
    correctAnswer: 1,
    explanation: "Les sénateurs sont élus pour 6 ans par des grands électeurs. Le Sénat est renouvelé par moitié tous les 3 ans.",
    category: "institutions",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'i94',
    text: "Qui est élu lors des élections municipales ?",
    options: ["Le président de la République", "Les députés", "Les conseillers municipaux, qui élisent ensuite le maire", "Le préfet"],
    correctAnswer: 2,
    explanation: "Les citoyens élisent les conseillers municipaux. Le conseil municipal élit ensuite le maire.",
    category: "institutions",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'i95',
    text: "Qui est élu lors des élections présidentielles ?",
    options: ["Le Premier ministre", "Les députés", "Le maire de Paris", "Le président de la République"],
    correctAnswer: 3,
    explanation: "Le président de la République est élu au suffrage universel direct.",
    category: "institutions",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'i96',
    text: "À partir de quel âge a-t-on le droit de voter ?",
    options: ["18 ans", "16 ans", "21 ans", "25 ans"],
    correctAnswer: 0,
    explanation: "On peut voter à partir de 18 ans, âge de la majorité civile.",
    category: "institutions",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'i97',
    text: "Pour combien de temps sont élus les députés ?",
    options: ["4 ans", "5 ans", "6 ans", "7 ans"],
    correctAnswer: 1,
    explanation: "Les députés sont élus pour 5 ans, sauf dissolution de l'Assemblée.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i98',
    text: "Concernant les partis politiques, quelle proposition est correcte ?",
    options: ["Il n'y a qu'un seul parti autorisé", "Ils doivent être autorisés par le préfet", "Ils se forment et exercent leur activité librement, dans le respect de la Constitution", "Ils sont réservés aux hommes"],
    correctAnswer: 2,
    explanation: "L'article 4 de la Constitution garantit la liberté des partis politiques, qui doivent respecter les principes de la démocratie.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i99',
    text: "Quel est le rôle des députés ?",
    options: ["Rendre la justice", "Diriger les communes", "Commander l'armée", "Voter les lois et contrôler le Gouvernement"],
    correctAnswer: 3,
    explanation: "Les députés votent la loi, votent le budget et contrôlent l'action du Gouvernement.",
    category: "institutions",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'i100',
    text: "Qui réside au palais de l'Élysée ?",
    options: ["Le président de la République", "Le Premier ministre", "Le président du Sénat", "Le maire de Paris"],
    correctAnswer: 0,
    explanation: "Le palais de l'Élysée, à Paris, est la résidence et le lieu de travail du président de la République.",
    category: "institutions",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'i101',
    text: "Combien y a-t-il de départements en France ?",
    options: ["96", "101", "50", "27"],
    correctAnswer: 1,
    explanation: "La France compte 101 départements : 96 en métropole et 5 en outre-mer.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i102',
    text: "Quel est le rôle du Parlement ?",
    options: ["Appliquer les lois", "Juger les crimes", "Voter les lois et contrôler le Gouvernement", "Diriger les écoles"],
    correctAnswer: 2,
    explanation: "Le Parlement, composé de l'Assemblée nationale et du Sénat, vote la loi et contrôle l'action du Gouvernement.",
    category: "institutions",
    type: 'multiple-choice'
  },
  {
    id: 'i103',
    text: "Combien d'États font partie de l'Union européenne au 1er janvier 2025 ?",
    options: ["28", "15", "35", "27"],
    correctAnswer: 3,
    explanation: "L'Union européenne compte 27 États membres depuis le départ du Royaume-Uni en 2020.",
    category: "institutions",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'i104',
    text: "Quelle est la monnaie utilisée en France ?",
    options: ["L'euro", "Le franc", "Le dollar", "La livre"],
    correctAnswer: 0,
    explanation: "L'euro est la monnaie de la France depuis 2002.",
    category: "institutions",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'i105',
    text: "Qui élit les députés européens ?",
    options: ["Les maires", "Les citoyens de l'Union européenne", "Les gouvernements des États membres", "Le président de la République"],
    correctAnswer: 1,
    explanation: "Les députés européens sont élus au suffrage universel direct par les citoyens de l'Union.",
    category: "institutions",
    level: 'csp',
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
    options: ["Une consultation juridique gratuite", "Une aide financière pour payer un avocat", "Un conseil juridique en ligne", "Une permanence d'avocats bénévoles"],
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
    options: ["Un contrat de concubinage notarié", "Un contrat d'union civile entre deux personnes", "Un accord de vie commune sans engagement", "Une convention de partenariat familial"],
    correctAnswer: 1,
    explanation: "Le PACS (Pacte Civil de Solidarité) est un contrat conclu entre deux personnes majeures pour organiser leur vie commune.",
    category: "droits",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'd36',
    text: "Que signifie la dignité humaine ?",
    options: ["Le droit d'être riche", "Le respect dû à toute personne humaine", "Le droit de vote", "Le droit au travail"],
    correctAnswer: 1,
    explanation: "La dignité humaine est le respect fondamental dû à toute personne, quelles que soient ses origines ou sa situation.",
    category: "droits",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'd37',
    text: "Que signifie le droit de manifester ?",
    options: ["Le droit de casser", "Le droit de se réunir pacifiquement pour exprimer des revendications", "Le droit de bloquer les routes", "Le droit de grève"],
    correctAnswer: 1,
    explanation: "Le droit de manifester permet aux citoyens de se réunir pacifiquement pour exprimer leurs opinions.",
    category: "droits",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'd38',
    text: "Qu'est-ce que le droit de grève ?",
    options: ["Le droit de refuser un poste", "Le droit d'arrêter le travail pour défendre ses intérêts professionnels", "Le droit de changer d'employeur librement", "Le droit de travailler à temps partiel"],
    correctAnswer: 1,
    explanation: "Le droit de grève permet aux salariés de cesser collectivement le travail pour défendre leurs revendications.",
    category: "droits",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'd39',
    text: "Que garantit la liberté de la presse ?",
    options: ["Le droit de publier sans vérification", "Le droit d'informer librement le public", "Le droit de révéler des secrets d'État", "Le droit d'accéder à tous les documents"],
    correctAnswer: 1,
    explanation: "La liberté de la presse garantit le droit d'informer et d'être informé, essentiel à la démocratie.",
    category: "droits",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'd40',
    text: "Que prévoit la Charte de l'environnement ?",
    options: ["Le droit de polluer", "Le droit à un environnement sain et le devoir de le préserver", "L'interdiction des voitures", "La fin de l'industrie"],
    correctAnswer: 1,
    explanation: "La Charte de l'environnement (2004) garantit le droit de vivre dans un environnement équilibré et respectueux de la santé.",
    category: "droits",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'd41',
    text: "Que signifie PMA ?",
    options: ["Procréation Médicalement Assistée", "Protection Maternelle et Assurance", "Prime de Maternité Annuelle", "Programme Médical d'Accompagnement"],
    correctAnswer: 0,
    explanation: "La PMA (Procréation Médicalement Assistée) est un ensemble de techniques médicales pour aider à la procréation.",
    category: "droits",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'd42',
    text: "Concernant l'utilisation des réseaux sociaux, quelle proposition est correcte ?",
    options: ["On peut tout publier sans limite", "On doit respecter les lois contre la diffamation et l'incitation à la haine", "Il n'y a aucune règle", "Seuls les adultes peuvent les utiliser"],
    correctAnswer: 1,
    explanation: "Les réseaux sociaux sont soumis aux mêmes lois que les autres médias : interdiction de diffamer, d'inciter à la haine, etc.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd43',
    text: "Jeter un mégot par terre est :",
    options: ["Autorisé", "Une infraction passible d'amende", "Toléré en ville", "Légal si personne ne regarde"],
    correctAnswer: 1,
    explanation: "Jeter un mégot par terre est passible d'une amende de 68€ minimum.",
    category: "droits",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'd44',
    text: "L'État peut-il limiter les droits et libertés ?",
    options: ["Non, jamais", "Oui, pour protéger l'ordre public et les droits d'autrui", "Oui, sans raison", "Seulement en temps de guerre"],
    correctAnswer: 1,
    explanation: "Les libertés peuvent être limitées pour protéger l'ordre public, la sécurité et les droits d'autrui.",
    category: "droits",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'd45',
    text: "Quel est un exemple d'assistance à personne en danger ?",
    options: ["Ignorer quelqu'un en difficulté", "Appeler les secours pour une personne blessée", "Filmer un accident", "S'enfuir"],
    correctAnswer: 1,
    explanation: "L'assistance à personne en danger est une obligation légale : ne pas aider quelqu'un en péril est un délit.",
    category: "droits",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'd46',
    text: "Quel est le salaire minimum légal en France ?",
    options: ["Le RSA", "Le SMIC", "Le salaire médian", "Il n'y en a pas"],
    correctAnswer: 1,
    explanation: "Le SMIC (Salaire Minimum Interprofessionnel de Croissance) est le salaire minimum légal en France, réévalué chaque année.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd47',
    text: "À partir de quel âge peut-on travailler en France ?",
    options: ["14 ans", "16 ans", "18 ans", "12 ans"],
    correctAnswer: 1,
    explanation: "L'âge minimum pour travailler est 16 ans (fin de l'obligation scolaire), avec des exceptions pour l'apprentissage dès 15 ans.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd48',
    text: "Le congé maternité est-il obligatoire en France ?",
    options: ["Non, c'est facultatif", "Oui, au minimum 8 semaines", "Seulement pour le premier enfant", "Uniquement dans le secteur public"],
    correctAnswer: 1,
    explanation: "Le congé maternité comprend une période obligatoire d'au moins 8 semaines, dont 6 après l'accouchement.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd49',
    text: "Qu'est-ce que le droit d'asile ?",
    options: ["Le droit de construire un abri", "La protection accordée aux personnes persécutées dans leur pays", "Le droit au logement social", "Le droit de voyager librement"],
    correctAnswer: 1,
    explanation: "Le droit d'asile permet à une personne persécutée dans son pays d'obtenir une protection en France.",
    category: "droits",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'd50',
    text: "Quelle est la durée légale du travail par semaine ?",
    options: ["32 heures", "35 heures", "39 heures", "40 heures"],
    correctAnswer: 1,
    explanation: "La durée légale du travail est de 35 heures par semaine depuis 2000, les heures au-delà sont des heures supplémentaires.",
    category: "droits",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'd51',
    text: "Le droit à l'éducation est-il gratuit en France ?",
    options: ["Non, l'école est payante", "Oui, l'école publique est gratuite et obligatoire", "Seulement au primaire", "Uniquement pour les Français"],
    correctAnswer: 1,
    explanation: "L'école publique est gratuite, laïque et obligatoire de 3 à 16 ans pour tous les enfants résidant en France.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd52',
    text: "Le casier judiciaire contient :",
    options: ["Les notes scolaires", "Les condamnations pénales d'une personne", "Les dettes bancaires", "Les arrêts maladie"],
    correctAnswer: 1,
    explanation: "Le casier judiciaire est un fichier informatisé qui recense les condamnations pénales d'une personne.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd53',
    text: "Qu'est-ce que la présomption d'innocence ?",
    options: ["Tout accusé est coupable jusqu'à preuve du contraire", "Tout accusé est innocent jusqu'à ce que sa culpabilité soit prouvée", "Un accusé doit prouver son innocence", "Le juge décide seul de la culpabilité"],
    correctAnswer: 1,
    explanation: "La présomption d'innocence est un principe fondamental : toute personne est considérée innocente tant qu'elle n'a pas été jugée coupable.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd54',
    text: "Combien de jours de congés payés minimum un salarié a-t-il par an ?",
    options: ["20 jours", "25 jours ouvrés (5 semaines)", "30 jours", "15 jours"],
    correctAnswer: 1,
    explanation: "Tout salarié a droit à 2,5 jours ouvrables de congés payés par mois travaillé, soit 5 semaines (25 jours ouvrés) par an.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd55',
    text: "À quelle liberté la PMA fait-elle référence ?",
    options: ["La liberté de religion", "La liberté de la presse", "La liberté de circulation", "La liberté de fonder une famille"],
    correctAnswer: 3,
    explanation: "La PMA (procréation médicalement assistée) fait référence à la liberté de fonder une famille et de choisir de devenir parent. Depuis la loi de bioéthique de 2021, elle est ouverte aux couples formés d'un homme et d'une femme, aux couples de femmes et aux femmes non mariées. Son accès est encadré par la loi.",
    category: "droits",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'd56',
    text: "Au nom de quoi l'État justifie-t-il la restriction des droits ?",
    options: ["De l'intérêt général et de l'ordre public", "Des intérêts du président", "De la religion majoritaire", "Des opinions politiques du moment"],
    correctAnswer: 0,
    explanation: "Une liberté peut être limitée par la loi pour protéger l'ordre public, la sécurité ou les droits des autres.",
    category: "droits",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'd57',
    text: "Concernant le droit de se marier, quelle proposition est correcte ?",
    options: ["Les parents peuvent choisir le conjoint de leur enfant majeur", "Le mariage nécessite le consentement libre des deux époux", "Le mariage est interdit entre deux personnes de même sexe", "Seul le mariage religieux est reconnu par l'État"],
    correctAnswer: 1,
    explanation: "Le mariage forcé est interdit. Les deux époux doivent consentir librement. Le mariage civil à la mairie est le seul reconnu par l'État, et il est ouvert aux couples de même sexe depuis 2013.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd58',
    text: "Est-il toujours possible de divorcer ?",
    options: ["Non, seul le mari peut le demander", "Non, il faut l'accord du maire", "Oui, chaque époux peut demander le divorce", "Non, sauf après 20 ans de mariage"],
    correctAnswer: 2,
    explanation: "Personne ne peut être obligé de rester marié. Chaque époux peut demander le divorce.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd59',
    text: "La peine de mort est :",
    options: ["Autorisée pour les crimes graves", "Autorisée en temps de guerre", "Décidée par le président", "Interdite en France"],
    correctAnswer: 3,
    explanation: "La peine de mort est abolie depuis 1981. La Constitution précise depuis 2007 que nul ne peut être condamné à la peine de mort.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd60',
    text: "Laquelle de ces citations est inscrite dans la Déclaration des Droits de l'homme et du Citoyen de 1789 ?",
    options: ["« Les hommes naissent et demeurent libres et égaux en droits »", "« L'État, c'est moi »", "« Travail, famille, patrie »", "« Du passé faisons table rase »"],
    correctAnswer: 0,
    explanation: "C'est la première phrase de l'article 1er de la Déclaration de 1789.",
    category: "droits",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'd61',
    text: "Le recours à l'avortement est-il autorisé ?",
    options: ["Non, il est interdit", "Oui, l'IVG est autorisée par la loi", "Oui, mais seulement avec l'accord du conjoint", "Oui, mais seulement pour les majeures"],
    correctAnswer: 1,
    explanation: "L'IVG est autorisée en France depuis la loi Veil de 1975. Elle est possible jusqu'à 14 semaines de grossesse et la liberté d'y recourir est inscrite dans la Constitution depuis 2024.",
    category: "droits",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'd62',
    text: "Que contient la Constitution ?",
    options: ["La liste de tous les impôts", "Le Code de la route", "Les règles d'organisation des pouvoirs publics et les principes fondamentaux de la République", "Le règlement des écoles"],
    correctAnswer: 2,
    explanation: "La Constitution organise les institutions et affirme les droits et libertés fondamentaux.",
    category: "droits",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'd63',
    text: "Quel texte est le plus difficile à modifier ?",
    options: ["Un arrêté municipal", "Un décret", "Une loi ordinaire", "La Constitution"],
    correctAnswer: 3,
    explanation: "La Constitution est la norme la plus élevée. Sa révision demande une procédure particulière : un vote du Parlement réuni en Congrès à la majorité des 3/5, ou un référendum.",
    category: "droits",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'd64',
    text: "Quelle liberté permet à une personne de croire en la religion de son choix ?",
    options: ["La liberté de conscience", "La liberté de circulation", "La liberté d'association", "La liberté de la presse"],
    correctAnswer: 0,
    explanation: "La liberté de conscience garantit le droit de croire, de ne pas croire ou de changer de religion.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd65',
    text: "Qu'est-ce que la Constitution ?",
    options: ["Un code de règles de la vie privée", "La loi suprême qui organise les pouvoirs publics et garantit les droits fondamentaux", "Un règlement de l'Assemblée", "Un traité avec l'Union européenne"],
    correctAnswer: 1,
    explanation: "La Constitution est le texte fondamental de la République. Toutes les autres lois doivent la respecter. L'actuelle date de 1958.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd66',
    text: "Qui peut demander à avorter ?",
    options: ["Seulement une femme mariée", "Seulement une femme de plus de 25 ans", "Toute femme enceinte qui ne souhaite pas poursuivre sa grossesse", "Seulement une femme sur décision du médecin"],
    correctAnswer: 2,
    explanation: "C'est la femme enceinte qui décide, majeure ou mineure. Elle fait la demande elle-même.",
    category: "droits",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'd67',
    text: "Une femme majeure de nationalité française a-t-elle le droit de voter aux élections ?",
    options: ["Non, seulement avec l'accord de son mari", "Non, seulement aux élections municipales", "Oui, mais seulement si elle travaille", "Oui, comme tout citoyen français majeur inscrit sur les listes électorales"],
    correctAnswer: 3,
    explanation: "Les femmes votent en France depuis 1944. Elles ont voté pour la première fois en 1945.",
    category: "droits",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'd68',
    text: "Parmi ces actions, laquelle permet d'adopter une attitude respectueuse de l'environnement ?",
    options: ["Trier ses déchets", "Jeter ses piles à la poubelle", "Laisser les lumières allumées", "Jeter ses déchets dans la nature"],
    correctAnswer: 0,
    explanation: "Trier ses déchets permet leur recyclage et protège l'environnement.",
    category: "droits",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'd69',
    text: "Quelle proposition constitue une obligation ?",
    options: ["Voter à chaque élection", "Payer ses impôts", "Adhérer à un syndicat", "Participer à une association"],
    correctAnswer: 1,
    explanation: "Payer ses impôts selon ses revenus est une obligation. Voter est un droit, pas une obligation.",
    category: "droits",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'd70',
    text: "Quelle obligation concerne toutes les personnes résidant en France quelle que soit leur nationalité ?",
    options: ["Effectuer la Journée défense et citoyenneté", "Voter", "Respecter les lois françaises", "Faire un service militaire"],
    correctAnswer: 2,
    explanation: "Toute personne présente sur le territoire doit respecter la loi. La JDC et le vote concernent les citoyens français.",
    category: "droits",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'd71',
    text: "Pour quel motif peut-on limiter la liberté d'expression ?",
    options: ["Parce que le gouvernement n'est pas d'accord", "Parce que l'opinion est minoritaire", "Pour protéger la popularité du président", "Pour interdire la haine, l'injure, la diffamation ou l'incitation à la violence"],
    correctAnswer: 3,
    explanation: "La loi punit l'injure, la diffamation, l'incitation à la haine, la discrimination et l'apologie du terrorisme.",
    category: "droits",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'd72',
    text: "Que doit faire une victime de violences ?",
    options: ["Alerter la police ou la gendarmerie et porter plainte", "Rester silencieuse", "Se venger elle-même", "Attendre que cela s'arrête"],
    correctAnswer: 0,
    explanation: "Une victime peut appeler le 17, porter plainte et demander de l'aide à une association. Le 3919 aide les femmes victimes de violences.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd73',
    text: "Quelle est l'attitude à avoir lorsqu'on est témoin de violences ?",
    options: ["Filmer et publier la vidéo en ligne", "Prévenir la police ou les secours sans se mettre en danger", "Passer son chemin sans rien faire", "Intervenir violemment"],
    correctAnswer: 1,
    explanation: "Chacun doit porter assistance à une personne en danger, en alertant les secours quand on ne peut pas intervenir sans risque.",
    category: "droits",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'd74',
    text: "Que doit-on faire face aux ordres des policiers ou gendarmes ?",
    options: ["S'enfuir", "Refuser de répondre dans tous les cas", "Se conformer à leurs instructions et accepter les contrôles d'identité", "Les insulter pour se défendre"],
    correctAnswer: 2,
    explanation: "Les forces de l'ordre agissent au nom de la loi. On doit leur obéir, et on peut contester ensuite une décision injuste.",
    category: "droits",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'd75',
    text: "Quel est le rôle de la police ?",
    options: ["Rendre la justice", "Voter les lois", "Gérer les écoles", "Protéger les personnes et les biens et faire respecter la loi"],
    correctAnswer: 3,
    explanation: "La police assure la sécurité, l'ordre public et la recherche des auteurs d'infractions.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd76',
    text: "Quel exemple illustre une limitation de liberté pour protéger l'intérêt général ?",
    options: ["L'interdiction de fumer dans les lieux publics fermés", "L'interdiction de changer de religion", "L'obligation de voter", "L'interdiction d'avoir un compte bancaire"],
    correctAnswer: 0,
    explanation: "Interdire de fumer dans les lieux publics protège la santé de tous.",
    category: "droits",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'd77',
    text: "Qui veille au maintien de l'ordre public ?",
    options: ["Les pompiers", "La police et la gendarmerie", "Les enseignants", "Les associations"],
    correctAnswer: 1,
    explanation: "La police nationale et la gendarmerie nationale assurent la sécurité et l'ordre public.",
    category: "droits",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'd78',
    text: "Quelle est l'infraction la plus grave ?",
    options: ["Le délit", "La contravention", "Le crime", "L'amende"],
    correctAnswer: 2,
    explanation: "Les infractions sont classées en trois niveaux : la contravention, le délit et le crime, qui est le plus grave.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd79',
    text: "Quelle proposition représente un exemple de crime ?",
    options: ["Le vol simple", "Un excès de vitesse", "Le tapage nocturne", "Le meurtre"],
    correctAnswer: 3,
    explanation: "Le meurtre et le viol sont des crimes, jugés par la cour d'assises. Le vol est un délit.",
    category: "droits",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'd80',
    text: "Quelle proposition représente un exemple de délit ?",
    options: ["Le vol", "Le meurtre", "Le stationnement gênant", "Le tapage nocturne"],
    correctAnswer: 0,
    explanation: "Le vol est un délit, jugé par le tribunal correctionnel. Le stationnement gênant et le tapage nocturne sont des contraventions.",
    category: "droits",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'd81',
    text: "S'agissant des déchets, quelle proposition est correcte ?",
    options: ["Chacun peut jeter ses déchets où il veut", "Abandonner ses déchets dans la nature est interdit et puni d'une amende", "Le tri des déchets est interdit", "Seul le maire doit trier ses déchets"],
    correctAnswer: 1,
    explanation: "Le dépôt sauvage de déchets est puni d'une amende. Le tri protège l'environnement.",
    category: "droits",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'd82',
    text: "Comment s'appelle la Constitution actuelle de la France ?",
    options: ["La Constitution de la IVe République", "La Constitution de 1791", "La Constitution de la Ve République", "La Constitution de l'Empire"],
    correctAnswer: 2,
    explanation: "La Constitution de la Ve République date de 1958.",
    category: "droits",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'd83',
    text: "Parmi ces textes, lequel garantit les droits et libertés en France ?",
    options: ["Le Code de la route", "Un règlement de supermarché", "Un règlement de copropriété", "La Constitution"],
    correctAnswer: 3,
    explanation: "La Constitution de 1958 garantit les droits et libertés, avec la Déclaration de 1789 et le préambule de 1946 auxquels elle renvoie.",
    category: "droits",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'd84',
    text: "Concernant les droits individuels, quelle proposition est correcte ?",
    options: ["Chacun a des droits garantis, dans le respect des droits des autres et de la loi", "Les droits sont réservés aux Français", "Les droits dépendent de la religion", "Chacun peut faire ce qu'il veut sans limite"],
    correctAnswer: 0,
    explanation: "Les droits individuels s'accompagnent de devoirs. Ma liberté s'arrête là où commence celle des autres.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd85',
    text: "Lequel de ces droits est un droit fondamental ?",
    options: ["Le droit de ne pas payer d'impôts", "La liberté d'expression", "Le droit de ne pas respecter la loi", "Le droit de conduire sans permis"],
    correctAnswer: 1,
    explanation: "La liberté d'expression est un droit fondamental garanti par la Déclaration de 1789.",
    category: "droits",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'd86',
    text: "Quel droit permet à une personne de se défendre devant la justice ?",
    options: ["Le droit de grève", "Le droit de vote", "Le droit à la défense", "Le droit de propriété"],
    correctAnswer: 2,
    explanation: "Toute personne accusée peut être assistée par un avocat et se défendre. C'est le droit à la défense.",
    category: "droits",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'd87',
    text: "De quelle année date la Déclaration des droits de l'homme et du citoyen ?",
    options: ["1848", "1905", "1958", "1789"],
    correctAnswer: 3,
    explanation: "La Déclaration des droits de l'homme et du citoyen a été adoptée en août 1789, pendant la Révolution française.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd88',
    text: "Quel texte a été adopté pendant la Révolution française ?",
    options: ["La Déclaration des droits de l'homme et du citoyen", "La Charte de l'environnement", "Le Code de la route", "La loi de 1905"],
    correctAnswer: 0,
    explanation: "La Déclaration des droits de l'homme et du citoyen date de 1789.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd89',
    text: "En France, est-ce légal d'être marié à plusieurs personnes en même temps ?",
    options: ["Oui, si tout le monde est d'accord", "Non, la polygamie est interdite", "Oui, pour les hommes", "Oui, après 40 ans"],
    correctAnswer: 1,
    explanation: "On ne peut être marié qu'avec une seule personne à la fois. La bigamie est un délit.",
    category: "droits",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'd90',
    text: "Faut-il réduire ses déchets ?",
    options: ["Non, c'est inutile", "Non, c'est le rôle du maire seul", "Oui, pour protéger l'environnement", "Oui, mais seulement les entreprises"],
    correctAnswer: 2,
    explanation: "Réduire ses déchets protège l'environnement. C'est un devoir de chaque citoyen.",
    category: "droits",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'd91',
    text: "Comment peut-on réduire ses déchets ?",
    options: ["En brûlant les déchets", "En jetant plus", "En achetant plus d'emballages", "En évitant le gaspillage et en réutilisant les objets"],
    correctAnswer: 3,
    explanation: "On réduit ses déchets en évitant le gaspillage, en réparant, en réutilisant et en triant.",
    category: "droits",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'd92',
    text: "Que doit faire une personne en cas d'accident ?",
    options: ["Protéger, alerter les secours (112, 15 ou 18) et secourir si possible", "Partir rapidement", "Filmer la scène", "Attendre sans rien faire"],
    correctAnswer: 0,
    explanation: "Porter assistance à une personne en danger est une obligation. On protège les lieux, on alerte les secours et on aide sans se mettre en danger.",
    category: "droits",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'd93',
    text: "Que permet la citoyenneté française ?",
    options: ["Ne pas payer d'impôts", "Voter, se présenter aux élections et participer à la vie politique", "Ne pas respecter certaines lois", "Voyager gratuitement"],
    correctAnswer: 1,
    explanation: "Les citoyens français ont des droits civiques comme voter et être élus. Ils ont aussi des devoirs.",
    category: "droits",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'd94',
    text: "Que risque une personne qui ne respecte pas la loi ?",
    options: ["Rien du tout", "Une récompense", "Une sanction : une amende, voire de la prison", "Un simple avertissement du maire"],
    correctAnswer: 2,
    explanation: "Celui qui enfreint la loi risque une sanction décidée par un juge.",
    category: "droits",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'd95',
    text: "Quel est le rôle de la gendarmerie ?",
    options: ["Rendre la justice", "Voter les lois", "Gérer les hôpitaux", "Assurer la sécurité des personnes et des biens et faire respecter la loi"],
    correctAnswer: 3,
    explanation: "La gendarmerie nationale est une force de sécurité. Elle intervient surtout dans les petites villes et les campagnes.",
    category: "droits",
    type: 'multiple-choice'
  },
  {
    id: 'd96',
    text: "Qu'est-ce qu'une infraction ?",
    options: ["Un acte interdit par la loi et puni d'une sanction", "Un droit", "Un impôt", "Un contrat"],
    correctAnswer: 0,
    explanation: "Il existe trois sortes d'infractions : la contravention, le délit et le crime.",
    category: "droits",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'd97',
    text: "En quoi consiste la traite des êtres humains ?",
    options: ["À commercer entre pays", "À exploiter des personnes, par exemple par le travail forcé ou la prostitution", "À organiser des voyages", "À employer des travailleurs étrangers en règle"],
    correctAnswer: 1,
    explanation: "La traite des êtres humains est un crime. Elle consiste à recruter, transporter ou héberger des personnes pour les exploiter.",
    category: "droits",
    level: 'csp',
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
    level: 'cr',
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
    id: 'c36',
    text: "Quel était le surnom de Louis XIV ?",
    options: ["Le Roi Soleil", "Le Bien-Aimé", "Le Grand", "Le Prudent"],
    correctAnswer: 0,
    explanation: "Louis XIV était surnommé le Roi Soleil en raison de son règne éclatant et centralisateur.",
    category: "culture",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'c37',
    text: "Qui était une figure de la Résistance française pendant la Seconde Guerre mondiale ?",
    options: ["Philippe Pétain", "Jean Moulin", "Pierre Laval", "Charles Maurras"],
    correctAnswer: 1,
    explanation: "Jean Moulin était un héros de la Résistance française, mort sous la torture nazie en 1943.",
    category: "culture",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'c38',
    text: "En 1944, qu'est-ce qui a changé pour les femmes ?",
    options: ["Le droit de travailler", "Le droit de vote", "Le droit au divorce", "Le droit d'hériter"],
    correctAnswer: 1,
    explanation: "Les femmes françaises ont obtenu le droit de vote en 1944 et ont voté pour la première fois en 1945.",
    category: "culture",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'c39',
    text: "Quelle organisation internationale a été créée en 1945 après la Seconde Guerre mondiale ?",
    options: ["L'Union européenne", "L'ONU", "L'OTAN", "L'UNESCO"],
    correctAnswer: 1,
    explanation: "L'Organisation des Nations Unies (ONU) a été créée en 1945 pour maintenir la paix mondiale.",
    category: "culture",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'c40',
    text: "Quelle peine a été supprimée en 1981 ?",
    options: ["La peine de prison", "La peine de mort", "Les travaux forcés", "L'amende"],
    correctAnswer: 1,
    explanation: "La peine de mort a été abolie en France en 1981 sous la présidence de François Mitterrand.",
    category: "culture",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'c41',
    text: "Où a eu lieu le débarquement en 1944 ?",
    options: ["En Provence", "En Normandie", "En Bretagne", "En Aquitaine"],
    correctAnswer: 1,
    explanation: "Le débarquement du 6 juin 1944 (D-Day) a eu lieu sur les plages de Normandie.",
    category: "culture",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'c42',
    text: "Quelle est la population approximative de la France en 2025 ?",
    options: ["45 millions", "55 millions", "68 millions", "80 millions"],
    correctAnswer: 2,
    explanation: "La France compte environ 68 millions d'habitants (métropole et outre-mer).",
    category: "culture",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'c44',
    text: "Quel pays a une frontière terrestre avec la France métropolitaine au nord-est ?",
    options: ["Les Pays-Bas", "La Belgique", "Le Danemark", "La Pologne"],
    correctAnswer: 1,
    explanation: "La Belgique partage une frontière avec le nord-est de la France.",
    category: "culture",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'c45',
    text: "Quelle chaîne de montagnes est située entre la France et l'Espagne ?",
    options: ["Les Alpes", "Le Jura", "Les Pyrénées", "Les Vosges"],
    correctAnswer: 2,
    explanation: "Les Pyrénées forment la frontière naturelle entre la France et l'Espagne.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c46',
    text: "Qui était Marguerite Yourcenar ?",
    options: ["Une chanteuse", "Une écrivaine", "Une scientifique", "Une reine"],
    correctAnswer: 1,
    explanation: "Marguerite Yourcenar était une écrivaine française, première femme élue à l'Académie française en 1980.",
    category: "culture",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'c47',
    text: "Qui était Auguste Rodin ?",
    options: ["Un peintre", "Un sculpteur", "Un musicien", "Un architecte"],
    correctAnswer: 1,
    explanation: "Auguste Rodin était un sculpteur français célèbre pour 'Le Penseur' et 'Le Baiser'.",
    category: "culture",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'c48',
    text: "Qui était Auguste Renoir ?",
    options: ["Un sculpteur", "Un musicien", "Un peintre impressionniste", "Un écrivain"],
    correctAnswer: 2,
    explanation: "Auguste Renoir était un peintre impressionniste français du XIXe siècle.",
    category: "culture",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'c49',
    text: "Quelle cathédrale célèbre a été en partie détruite par un incendie en 2019 ?",
    options: ["Notre-Dame de Chartres", "Notre-Dame de Paris", "Notre-Dame de Reims", "Notre-Dame de Strasbourg"],
    correctAnswer: 1,
    explanation: "La cathédrale Notre-Dame de Paris a été gravement endommagée par un incendie le 15 avril 2019.",
    category: "culture",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'c50',
    text: "Combien de personnes parlent français dans le monde ?",
    options: ["50 millions", "150 millions", "300 millions", "500 millions"],
    correctAnswer: 2,
    explanation: "Environ 300 millions de personnes parlent français dans le monde (francophonie).",
    category: "culture",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'c51',
    text: "Quand peut-on visiter gratuitement des lieux culturels en France ?",
    options: ["Le 1er mai", "Pendant les Journées du patrimoine", "Le 14 juillet uniquement", "Jamais"],
    correctAnswer: 1,
    explanation: "Les Journées européennes du patrimoine (septembre) permettent de visiter gratuitement de nombreux sites.",
    category: "culture",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'c52',
    text: "Où habite la majorité des Français ?",
    options: ["À la campagne", "En ville", "À l'étranger", "Dans les DOM-TOM"],
    correctAnswer: 1,
    explanation: "Environ 80% des Français vivent en zone urbaine.",
    category: "culture",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'c53',
    text: "Parmi ces pays, lequel attire le plus de visiteurs chaque année ?",
    options: ["L'Espagne", "L'Italie", "La France", "Le Royaume-Uni"],
    correctAnswer: 2,
    explanation: "La France est le pays le plus visité au monde avec environ 90 millions de touristes par an.",
    category: "culture",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'c54',
    text: "Quelle île française se trouve dans l'océan Indien ?",
    options: ["La Martinique", "La Guadeloupe", "La Réunion", "Saint-Pierre-et-Miquelon"],
    correctAnswer: 2,
    explanation: "La Réunion est un département français situé dans l'océan Indien.",
    category: "culture",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'c55',
    text: "Quelle mer se situe entre la France et l'Angleterre ?",
    options: ["La mer Méditerranée", "La Manche", "La mer du Nord", "L'océan Atlantique"],
    correctAnswer: 1,
    explanation: "La Manche sépare la France de l'Angleterre.",
    category: "culture",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'c56',
    text: "Quel événement commémore-t-on le 11 novembre ?",
    options: ["La Révolution française", "L'armistice de 1918", "La Libération de Paris", "La fête du Travail"],
    correctAnswer: 1,
    explanation: "Le 11 novembre commémore l'armistice de 1918 qui a mis fin à la Première Guerre mondiale.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c57',
    text: "Qu'est-ce que le Panthéon ?",
    options: ["Un stade", "Un monument où reposent les grands personnages de l'histoire de France", "Un musée d'art moderne", "Une église"],
    correctAnswer: 1,
    explanation: "Le Panthéon à Paris est le lieu où sont inhumées les personnalités ayant marqué l'histoire de France.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c58',
    text: "Qui a écrit « Les Misérables » ?",
    options: ["Émile Zola", "Victor Hugo", "Gustave Flaubert", "Alexandre Dumas"],
    correctAnswer: 1,
    explanation: "« Les Misérables » est un roman de Victor Hugo publié en 1862, œuvre majeure de la littérature française.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c59',
    text: "Quel roi a fait construire le château de Versailles ?",
    options: ["Louis XIV", "Louis XVI", "François Ier", "Napoléon Ier"],
    correctAnswer: 0,
    explanation: "Louis XIV, le Roi-Soleil, a fait construire le château de Versailles où il a installé la cour en 1682.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c60',
    text: "Quel est le plus long fleuve de France ?",
    options: ["La Seine", "Le Rhône", "La Loire", "La Garonne"],
    correctAnswer: 2,
    explanation: "La Loire est le plus long fleuve de France avec 1 006 km, elle se jette dans l'océan Atlantique.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c61',
    text: "Qui était Jeanne d'Arc ?",
    options: ["Une reine de France", "Une héroïne de la guerre de Cent Ans", "Une révolutionnaire", "Une scientifique"],
    correctAnswer: 1,
    explanation: "Jeanne d'Arc est une héroïne française du XVe siècle qui a mené les armées françaises contre les Anglais pendant la guerre de Cent Ans.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c62',
    text: "Quel est le plus haut sommet de France ?",
    options: ["Le mont Ventoux", "Le mont Blanc", "Le Pic du Midi", "La Montagne Sainte-Victoire"],
    correctAnswer: 1,
    explanation: "Le mont Blanc culmine à 4 807 mètres dans les Alpes, c'est le plus haut sommet d'Europe occidentale.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c63',
    text: "Quel musée abrite la Joconde ?",
    options: ["Le musée d'Orsay", "Le Centre Pompidou", "Le Louvre", "Le musée Rodin"],
    correctAnswer: 2,
    explanation: "La Joconde, chef-d'œuvre de Léonard de Vinci, est exposée au musée du Louvre à Paris.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c64',
    text: "Qu'est-ce que la Résistance pendant la Seconde Guerre mondiale ?",
    options: ["L'armée officielle française", "Les mouvements de lutte contre l'occupation allemande", "Un parti politique", "Une entreprise"],
    correctAnswer: 1,
    explanation: "La Résistance désigne l'ensemble des mouvements et réseaux qui ont lutté contre l'occupation allemande de 1940 à 1944.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c65',
    text: "Quel événement a eu lieu le 8 mai 1945 ?",
    options: ["Le début de la Seconde Guerre mondiale", "La fin de la Seconde Guerre mondiale en Europe", "La Révolution française", "La création de l'Union européenne"],
    correctAnswer: 1,
    explanation: "Le 8 mai 1945 marque la victoire des Alliés et la fin de la Seconde Guerre mondiale en Europe.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c66',
    text: "En quelle année la Première République a-t-elle été proclamée ?",
    options: ["1789", "1792", "1804", "1848"],
    correctAnswer: 1,
    explanation: "La Première République est proclamée le 22 septembre 1792, après l'abolition de la royauté par la Convention nationale.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c67',
    text: "La Deuxième République a été proclamée en quelle année ?",
    options: ["1830", "1848", "1852", "1870"],
    correctAnswer: 1,
    explanation: "La Deuxième République est proclamée en 1848, après la révolution de février qui renverse le roi Louis-Philippe.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c68',
    text: "La Troisième République a débuté en quelle année ?",
    options: ["1848", "1852", "1870", "1940"],
    correctAnswer: 2,
    explanation: "La Troisième République est proclamée le 4 septembre 1870, après la chute du Second Empire.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c69',
    text: "Quel régime politique a existé en France de 1940 à 1944 ?",
    options: ["La Quatrième République", "Le régime de Vichy", "La Troisième République", "Le Gouvernement provisoire"],
    correctAnswer: 1,
    explanation: "Après l'armistice de juin 1940, le régime de Vichy, dirigé par le maréchal Pétain, collabore avec l'Allemagne nazie jusqu'à la Libération en 1944.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c70',
    text: "La Quatrième République a été proclamée en quelle année ?",
    options: ["1944", "1946", "1958", "1962"],
    correctAnswer: 1,
    explanation: "La Quatrième République est proclamée en 1946, après l'adoption de sa Constitution par référendum.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c71',
    text: "En quelle année la loi légalisant l'interruption volontaire de grossesse (IVG) a-t-elle été adoptée ?",
    options: ["1965", "1975", "1981", "1999"],
    correctAnswer: 1,
    explanation: "La loi du 17 janvier 1975, portée par Simone Veil, légalise l'interruption volontaire de grossesse.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c72',
    text: "Que fait le Code civil de 1804, aussi appelé Code Napoléon ?",
    options: ["Il unifie les règles de droit civil sur tout le territoire français", "Il instaure la séparation des Églises et de l'État", "Il crée la Sécurité sociale", "Il abolit la peine de mort"],
    correctAnswer: 0,
    explanation: "Promulgué en 1804 sous Napoléon Bonaparte, le Code civil unifie et modernise le droit civil, remplaçant la diversité des coutumes locales.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c73',
    text: "Combien de jours fériés légaux existe-t-il en France ?",
    options: ["8", "9", "11", "13"],
    correctAnswer: 2,
    explanation: "Le Code du travail fixe 11 jours fériés légaux en France, dont le 1er janvier, le 1er mai et le 25 décembre.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c74',
    text: "Que célèbre-t-on en France le 1er mai ?",
    options: ["La Fête nationale", "La Fête du Travail", "L'Armistice de 1918", "La Toussaint"],
    correctAnswer: 1,
    explanation: "Le 1er mai est la Fête du Travail, seul jour férié dont le chômage est obligatoire pour la plupart des salariés.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c75',
    text: "Que célèbre le jour férié du 15 août en France ?",
    options: ["L'Assomption", "La Pentecôte", "L'Ascension", "La Toussaint"],
    correctAnswer: 0,
    explanation: "Le 15 août correspond à la fête catholique de l'Assomption, jour férié en France.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c76',
    text: "En quelle année l'Algérie a-t-elle accédé à l'indépendance ?",
    options: ["1954", "1958", "1962", "1968"],
    correctAnswer: 2,
    explanation: "L'indépendance de l'Algérie est proclamée en juillet 1962, après les accords d'Évian signés en mars de la même année.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c77',
    text: "Le traité de Rome, qui crée la Communauté économique européenne (CEE), a été signé en quelle année ?",
    options: ["1945", "1951", "1957", "1992"],
    correctAnswer: 2,
    explanation: "Signé en 1957 par six pays dont la France, le traité de Rome crée la Communauté économique européenne, ancêtre de l'Union européenne.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c78',
    text: "Que désigne le terme « la Shoah » ?",
    options: ["Un traité de paix signé après la Première Guerre mondiale", "Le génocide des Juifs perpétré par le régime nazi pendant la Seconde Guerre mondiale", "Un mouvement de résistance française", "La reconstruction économique de la France après 1945"],
    correctAnswer: 1,
    explanation: "La Shoah désigne le génocide des Juifs d'Europe perpétré par le régime nazi et ses collaborateurs pendant la Seconde Guerre mondiale.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c79',
    text: "Quel roi de France a été exécuté pendant la Révolution française ?",
    options: ["Louis XIV", "Louis XV", "Henri IV", "Louis XVI"],
    correctAnswer: 3,
    explanation: "Louis XVI a été guillotiné le 21 janvier 1793.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c80',
    text: "Lequel de ces personnages a un lien avec la République française ?",
    options: ["Marianne", "Louis XIV", "Charlemagne", "Cléopâtre"],
    correctAnswer: 0,
    explanation: "Marianne est la figure qui symbolise la République française.",
    category: "culture",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'c81',
    text: "De quand date l'appel à la résistance du général de Gaulle ?",
    options: ["Du 8 mai 1945", "Du 18 juin 1940", "Du 11 novembre 1918", "Du 6 juin 1944"],
    correctAnswer: 1,
    explanation: "Le 18 juin 1940, depuis Londres, le général de Gaulle appelle les Français à continuer le combat.",
    category: "culture",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'c82',
    text: "Quel pays a été colonisé par la France ?",
    options: ["La Suède", "Le Japon", "L'Algérie", "L'Irlande"],
    correctAnswer: 2,
    explanation: "La France a colonisé l'Algérie à partir de 1830. Elle est devenue indépendante en 1962.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c83',
    text: "Depuis quand les Français élisent-ils le président de la République au suffrage universel direct ?",
    options: ["1958", "1946", "1981", "1962"],
    correctAnswer: 3,
    explanation: "Un référendum a adopté ce mode d'élection en 1962. La première élection a eu lieu en 1965.",
    category: "culture",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'c84',
    text: "Quelle est la première étape de la construction européenne en 1951 ?",
    options: ["La CECA (Communauté européenne du charbon et de l'acier)", "L'euro", "L'espace Schengen", "Le Parlement européen"],
    correctAnswer: 0,
    explanation: "Le traité de Paris de 1951 crée la CECA entre six pays, pour mettre en commun la production de charbon et d'acier.",
    category: "culture",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'c85',
    text: "Durant le mandat de quel président la peine de mort a-t-elle été abolie ?",
    options: ["Charles de Gaulle", "François Mitterrand", "Jacques Chirac", "Nicolas Sarkozy"],
    correctAnswer: 1,
    explanation: "La loi d'abolition a été votée en 1981 sous la présidence de François Mitterrand, sur proposition du garde des Sceaux Robert Badinter.",
    category: "culture",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'c86',
    text: "En quelle année a commencé la Première Guerre mondiale ?",
    options: ["1918", "1939", "1914", "1905"],
    correctAnswer: 2,
    explanation: "La Première Guerre mondiale a duré de 1914 à 1918.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c87',
    text: "Quel continent a été le plus concerné par la décolonisation française après la Seconde Guerre mondiale ?",
    options: ["L'Europe", "L'Amérique du Sud", "L'Océanie", "L'Afrique"],
    correctAnswer: 3,
    explanation: "La plupart des anciennes colonies françaises sont en Afrique. Beaucoup sont devenues indépendantes autour de 1960.",
    category: "culture",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'c88',
    text: "Quelle mer ou océan borde la France métropolitaine ?",
    options: ["L'océan Atlantique", "L'océan Pacifique", "La mer Baltique", "La mer Noire"],
    correctAnswer: 0,
    explanation: "La France métropolitaine est bordée par l'océan Atlantique, la Manche, la mer du Nord et la mer Méditerranée.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c89',
    text: "Quelle ville française est un port maritime ?",
    options: ["Limoges", "Marseille", "Clermont-Ferrand", "Dijon"],
    correctAnswer: 1,
    explanation: "Marseille est le premier port de France, sur la mer Méditerranée.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c90',
    text: "Où se trouvent les principales activités économiques en France ?",
    options: ["Uniquement dans les villages de montagne", "Uniquement en Corse", "Principalement dans les grandes métropoles, dont l'Île-de-France", "Uniquement dans l'outre-mer"],
    correctAnswer: 2,
    explanation: "L'activité économique se concentre en Île-de-France, qui produit près de 30 % du PIB, avec Paris et le quartier d'affaires de La Défense (sièges d'entreprises, finance, recherche). Les grandes métropoles comptent aussi : Lyon (chimie, pharmacie, industrie), Toulouse (aéronautique et spatial), Marseille (grand port, commerce). Nantes, Bordeaux, Rennes et Lille se développent. L'industrie est présente autour de Lyon, dans le Grand Est, les Hauts-de-France et l'Ouest. L'agriculture est forte dans le Bassin parisien, en Bretagne et en Nouvelle-Aquitaine.",
    category: "culture",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'c91',
    text: "Quelle région est la plus peuplée ?",
    options: ["La Bretagne", "La Corse", "La Normandie", "L'Île-de-France"],
    correctAnswer: 3,
    explanation: "L'Île-de-France compte plus de 12 millions d'habitants, soit près d'un Français sur cinq.",
    category: "culture",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'c92',
    text: "Quelle ville française fait partie des 10 plus grandes métropoles du pays ?",
    options: ["Toulouse", "Cahors", "Aurillac", "Carcassonne"],
    correctAnswer: 0,
    explanation: "Paris, Lyon, Marseille, Toulouse, Lille, Bordeaux, Nice, Nantes, Strasbourg ou Montpellier sont parmi les plus grandes métropoles.",
    category: "culture",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'c93',
    text: "Lequel de ces départements de France est le plus touristique ?",
    options: ["La Creuse", "Paris", "Le Cantal", "La Lozère"],
    correctAnswer: 1,
    explanation: "Paris est le département qui reçoit le plus de touristes, grâce à la tour Eiffel, au Louvre et à Notre-Dame. Viennent ensuite notamment la Seine-et-Marne (Disneyland Paris), les Alpes-Maritimes et les Bouches-du-Rhône, pour le tourisme du littoral et des villes du Sud. Par habitant, la Corse-du-Sud est souvent en tête.",
    category: "culture",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'c94',
    text: "Quel peintre est français ?",
    options: ["Pablo Picasso", "Vincent van Gogh", "Claude Monet", "Salvador Dalí"],
    correctAnswer: 2,
    explanation: "Claude Monet est un peintre français, l'un des fondateurs de l'impressionnisme.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c95',
    text: "Quel est le classement de la langue française parmi les langues les plus parlées dans le monde ?",
    options: ["1re", "10e", "20e", "5e"],
    correctAnswer: 3,
    explanation: "Selon l'Organisation internationale de la Francophonie, le français est la 5e langue la plus parlée au monde, après l'anglais, le chinois, l'hindi et l'espagnol.",
    category: "culture",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'c96',
    text: "Qui était une écrivaine française célèbre ?",
    options: ["Marguerite Duras", "Agatha Christie", "Jane Austen", "Virginia Woolf"],
    correctAnswer: 0,
    explanation: "Marguerite Duras est une écrivaine française, auteure de L'Amant.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c97',
    text: "Qui était un célèbre musicien français ?",
    options: ["Ludwig van Beethoven", "Claude Debussy", "Wolfgang Amadeus Mozart", "Johann Sebastian Bach"],
    correctAnswer: 1,
    explanation: "Claude Debussy est un compositeur français, auteur de Clair de lune.",
    category: "culture",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 'c98',
    text: "Quelle fête est française ?",
    options: ["Thanksgiving", "Oktoberfest", "Le 14 juillet", "Hanami"],
    correctAnswer: 2,
    explanation: "Le 14 juillet est la fête nationale française.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c99',
    text: "Quel écrivain est français ?",
    options: ["William Shakespeare", "Dante", "Cervantès", "Victor Hugo"],
    correctAnswer: 3,
    explanation: "Victor Hugo est un écrivain français, auteur des Misérables et de Notre-Dame de Paris.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c100',
    text: "Lequel de ces personnages historiques est français ?",
    options: ["Louis Pasteur", "Albert Einstein", "Isaac Newton", "Galilée"],
    correctAnswer: 0,
    explanation: "Louis Pasteur est un scientifique français, inventeur du vaccin contre la rage.",
    category: "culture",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'c101',
    text: "Dans quelle République est-on aujourd'hui ?",
    options: ["La Ire République", "La Ve République", "La IIIe République", "La IVe République"],
    correctAnswer: 1,
    explanation: "La France vit sous la Ve République depuis la Constitution de 1958.",
    category: "culture",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'c102',
    text: "Qui a rendu l'école gratuite, laïque et obligatoire ?",
    options: ["Napoléon Ier", "Charles de Gaulle", "Jules Ferry", "Louis XIV"],
    correctAnswer: 2,
    explanation: "Les lois de Jules Ferry, en 1881 et 1882, ont rendu l'école primaire gratuite, laïque et obligatoire.",
    category: "culture",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'c103',
    text: "Quand a eu lieu la Seconde Guerre mondiale ?",
    options: ["De 1914 à 1918", "De 1950 à 1955", "De 1870 à 1871", "De 1939 à 1945"],
    correctAnswer: 3,
    explanation: "La Seconde Guerre mondiale a duré de 1939 à 1945.",
    category: "culture",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'c104',
    text: "Quand a eu lieu la Première Guerre mondiale ?",
    options: ["De 1914 à 1918", "De 1939 à 1945", "De 1870 à 1871", "De 1789 à 1799"],
    correctAnswer: 0,
    explanation: "La Première Guerre mondiale a duré de 1914 à 1918.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c105',
    text: "En quelle année l'esclavage a-t-il été aboli définitivement en France ?",
    options: ["1789", "1848", "1905", "1946"],
    correctAnswer: 1,
    explanation: "L'esclavage a été aboli définitivement par le décret du 27 avril 1848, grâce notamment à Victor Schœlcher.",
    category: "culture",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'c106',
    text: "Depuis quelle année l'école publique est-elle gratuite ?",
    options: ["1789", "1946", "1881", "1958"],
    correctAnswer: 2,
    explanation: "La gratuité de l'école primaire publique date de la loi du 16 juin 1881.",
    category: "culture",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'c107',
    text: "Combien y a-t-il eu de républiques en France ?",
    options: ["3", "2", "7", "5"],
    correctAnswer: 3,
    explanation: "La France a connu cinq républiques. La première date de 1792 et la Ve République est en vigueur depuis 1958.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c108',
    text: "Qui a fondé la Ve République ?",
    options: ["Charles de Gaulle", "Napoléon III", "Georges Pompidou", "François Mitterrand"],
    correctAnswer: 0,
    explanation: "Charles de Gaulle a fait adopter la Constitution de 1958 et il a été le premier président de la Ve République.",
    category: "culture",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'c109',
    text: "Pourquoi l'année 1958 est-elle importante pour la France ?",
    options: ["La Révolution française commence", "La Constitution de la Ve République est adoptée", "La Première Guerre mondiale se termine", "L'euro est créé"],
    correctAnswer: 1,
    explanation: "La Constitution de la Ve République, toujours en vigueur, a été adoptée en 1958.",
    category: "culture",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'c110',
    text: "Quelle ville est française ?",
    options: ["Berlin", "Madrid", "Lyon", "Rome"],
    correctAnswer: 2,
    explanation: "Lyon est une grande ville du sud-est de la France.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c111',
    text: "Quelle est la capitale de la France ?",
    options: ["Lyon", "Marseille", "Bordeaux", "Paris"],
    correctAnswer: 3,
    explanation: "Paris est la capitale de la France.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c112',
    text: "Qu'est-ce que Paris ?",
    options: ["La capitale de la France", "Un département d'outre-mer", "Un fleuve", "Une région de montagne"],
    correctAnswer: 0,
    explanation: "Paris est la capitale de la France et la ville la plus peuplée du pays.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c113',
    text: "Sur quel continent se situe la France métropolitaine ?",
    options: ["En Afrique", "En Europe", "En Asie", "En Amérique"],
    correctAnswer: 1,
    explanation: "La France métropolitaine est située en Europe de l'Ouest.",
    category: "culture",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'c114',
    text: "Quelle île est un département d'outre-mer français ?",
    options: ["La Corse", "La Sardaigne", "La Martinique", "Majorque"],
    correctAnswer: 2,
    explanation: "La Martinique est un département d'outre-mer, comme la Guadeloupe, la Guyane, La Réunion et Mayotte.",
    category: "culture",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'c115',
    text: "Quelle est la mer au sud de la France métropolitaine ?",
    options: ["La mer du Nord", "La mer Baltique", "La mer Noire", "La Méditerranée"],
    correctAnswer: 3,
    explanation: "La mer Méditerranée borde le sud de la France.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c116',
    text: "Quelle ville est située au bord de la mer Méditerranée ?",
    options: ["Marseille", "Lyon", "Strasbourg", "Lille"],
    correctAnswer: 0,
    explanation: "Marseille et Nice sont des villes françaises au bord de la Méditerranée.",
    category: "culture",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'c117',
    text: "Où se situe la Corse ?",
    options: ["Dans l'océan Atlantique", "Dans la mer Méditerranée", "Dans la Manche", "Dans la mer du Nord"],
    correctAnswer: 1,
    explanation: "La Corse est une île française de la mer Méditerranée.",
    category: "culture",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'c118',
    text: "Quelle chaîne de montagnes est située entre la France et l'Italie ?",
    options: ["Les Pyrénées", "Le Massif central", "Les Alpes", "Les Vosges"],
    correctAnswer: 2,
    explanation: "Les Alpes séparent la France et l'Italie. Le Mont-Blanc en fait partie.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c119',
    text: "Qui était Molière ?",
    options: ["Un roi de France", "Un peintre impressionniste", "Un explorateur", "Un auteur et acteur de théâtre du XVIIe siècle"],
    correctAnswer: 3,
    explanation: "Molière est un dramaturge français, auteur de comédies comme Le Malade imaginaire et L'Avare.",
    category: "culture",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'c120',
    text: "Qui était Charles Baudelaire ?",
    options: ["Un poète français", "Un général", "Un peintre", "Un président"],
    correctAnswer: 0,
    explanation: "Charles Baudelaire est l'auteur du recueil de poèmes Les Fleurs du mal.",
    category: "culture",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'c121',
    text: "Qui était George Sand ?",
    options: ["Une reine de France", "Une femme de lettres française", "Une chanteuse", "Une scientifique"],
    correctAnswer: 1,
    explanation: "George Sand est le pseudonyme de l'écrivaine Aurore Dupin, auteure de La Mare au diable.",
    category: "culture",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'c122',
    text: "Qui était Simone de Beauvoir ?",
    options: ["Une championne de tennis", "Une actrice de cinéma", "Une écrivaine et philosophe féministe", "Une présidente de la République"],
    correctAnswer: 2,
    explanation: "Simone de Beauvoir est l'auteure du Deuxième Sexe, une œuvre majeure du féminisme.",
    category: "culture",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'c123',
    text: "Qui était Albert Camus ?",
    options: ["Un peintre", "Un général", "Un chanteur", "Un écrivain et philosophe, prix Nobel de littérature"],
    correctAnswer: 3,
    explanation: "Albert Camus est l'auteur de L'Étranger. Il a reçu le prix Nobel de littérature en 1957.",
    category: "culture",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'c124',
    text: "Qui était Paul Cézanne ?",
    options: ["Un peintre français", "Un écrivain", "Un musicien", "Un roi"],
    correctAnswer: 0,
    explanation: "Paul Cézanne est un peintre français né à Aix-en-Provence.",
    category: "culture",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'c125',
    text: "Qui était Marc Chagall ?",
    options: ["Un écrivain", "Un peintre", "Un compositeur", "Un chef d'État"],
    correctAnswer: 1,
    explanation: "Marc Chagall est un peintre né dans l'Empire russe, devenu français en 1937.",
    category: "culture",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'c126',
    text: "Qui était Joséphine Baker ?",
    options: ["Une reine", "Une scientifique", "Une chanteuse et danseuse, résistante pendant la Seconde Guerre mondiale", "Une championne olympique"],
    correctAnswer: 2,
    explanation: "Joséphine Baker, née aux États-Unis et devenue française, a été résistante. Elle est entrée au Panthéon en 2021.",
    category: "culture",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'c127',
    text: "Qui était une chanteuse française célèbre ?",
    options: ["Madonna", "Whitney Houston", "Adele", "Édith Piaf"],
    correctAnswer: 3,
    explanation: "Édith Piaf est une chanteuse française, auteure de La Vie en rose.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c128',
    text: "Qu'est-ce que le Louvre ?",
    options: ["Un musée situé à Paris", "Un château de la Loire", "Une cathédrale", "Une gare"],
    correctAnswer: 0,
    explanation: "Le musée du Louvre à Paris abrite notamment La Joconde.",
    category: "culture",
    type: 'multiple-choice'
  },
  {
    id: 'c129',
    text: "Qui était Jean de La Fontaine ?",
    options: ["Un roi de France", "Un poète auteur de fables", "Un général", "Un peintre"],
    correctAnswer: 1,
    explanation: "Jean de La Fontaine est connu pour ses Fables, comme Le Corbeau et le Renard.",
    category: "culture",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'c130',
    text: "Dans quelle ville se trouve la tour Eiffel ?",
    options: ["Lyon", "Marseille", "Paris", "Lille"],
    correctAnswer: 2,
    explanation: "La tour Eiffel a été construite pour l'Exposition universelle de 1889 à Paris.",
    category: "culture",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 'c131',
    text: "Quand célèbre-t-on Noël ?",
    options: ["Le 1er janvier", "Le 14 juillet", "Le 1er mai", "Le 25 décembre"],
    correctAnswer: 3,
    explanation: "Noël est célébré le 25 décembre. C'est un jour férié en France.",
    category: "culture",
    level: 'csp',
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
    options: ["15 ans avec accord parental", "17 ans en conduite accompagnée", "16 ans avec dérogation préfectorale", "18 ans uniquement"],
    correctAnswer: 1,
    explanation: "La conduite accompagnée (AAC) permet de passer l'examen dès 17 ans. Sans AAC, c'est à partir de 18 ans.",
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
    options: ["Un engagement de cohabitation informel", "Une union civile entre deux personnes", "Un certificat de vie maritale", "Une déclaration de concubinage"],
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
    text: "À quel âge peut-on obtenir le permis de conduire B (voiture) en France ?",
    options: ["17 ans avec conduite supervisée", "18 ans", "16 ans avec autorisation parentale", "17 ans après formation accélérée"],
    correctAnswer: 1,
    explanation: "Le permis B s'obtient à 18 ans. La conduite accompagnée permet de conduire dès 17 ans mais le permis définitif reste délivré à 18 ans.",
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
    options: ["Un crédit d'impôt pour frais de formation", "Un droit à la formation professionnelle", "Une aide financière pour les demandeurs d'emploi", "Un compte épargne pour financer ses études"],
    correctAnswer: 1,
    explanation: "Le CPF permet à toute personne active d'acquérir des droits à la formation utilisables tout au long de sa vie professionnelle.",
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
  },
  {
    id: 's26',
    text: "Quel mariage est reconnu par l'État ?",
    options: ["Le mariage religieux uniquement", "Le mariage civil uniquement", "Les deux également", "Aucun"],
    correctAnswer: 1,
    explanation: "Seul le mariage civil célébré en mairie est reconnu par l'État français.",
    category: "societe",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 's27',
    text: "En cas de divorce, qui exerce l'autorité parentale ?",
    options: ["Le père uniquement", "La mère uniquement", "Les deux parents conjointement", "L'État"],
    correctAnswer: 2,
    explanation: "En principe, l'autorité parentale reste exercée conjointement par les deux parents après le divorce.",
    category: "societe",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 's28',
    text: "Quelle aide permet aux personnes en difficulté financière d'avoir un avocat ?",
    options: ["L'aide juridictionnelle", "Le RSA", "La prime d'activité", "L'assurance maladie"],
    correctAnswer: 0,
    explanation: "L'aide juridictionnelle permet aux personnes à faibles revenus d'accéder gratuitement à un avocat.",
    category: "societe",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 's29',
    text: "Où peut-on déposer un lave-vaisselle cassé ?",
    options: ["Dans la rue", "À la déchetterie", "Dans la poubelle normale", "N'importe où"],
    correctAnswer: 1,
    explanation: "Les appareils électroménagers doivent être déposés en déchetterie ou repris par le vendeur.",
    category: "societe",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 's30',
    text: "Qui peut demander un congé parental d'éducation ?",
    options: ["Le père uniquement", "La mère uniquement", "Le père ou la mère", "L'employeur"],
    correctAnswer: 2,
    explanation: "Le congé parental d'éducation peut être pris par le père ou la mère pour élever son enfant.",
    category: "societe",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 's31',
    text: "Quelles sont les affaires traitées par le conseil de prud'hommes ?",
    options: ["Les divorces", "Les litiges entre employeurs et salariés", "Les crimes", "Les délits routiers"],
    correctAnswer: 1,
    explanation: "Le conseil de prud'hommes règle les litiges individuels entre salariés et employeurs.",
    category: "societe",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 's32',
    text: "Dans une entreprise, le droit syndical permet :",
    options: ["De ne pas travailler", "De créer ou adhérer à un syndicat", "De licencier les employés", "De fixer les salaires"],
    correctAnswer: 1,
    explanation: "Le droit syndical garantit aux salariés le droit de créer ou d'adhérer à un syndicat de leur choix.",
    category: "societe",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 's33',
    text: "Comment s'appelle le diplôme passé par les élèves à la fin du collège ?",
    options: ["Le baccalauréat", "Le brevet", "Le CAP", "Le BTS"],
    correctAnswer: 1,
    explanation: "Le diplôme national du brevet (DNB) est passé à la fin de la classe de troisième.",
    category: "societe",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 's34',
    text: "Qu'est-ce que l'école maternelle ?",
    options: ["L'école pour les mères", "L'école pour les enfants de 3 à 6 ans", "L'école primaire", "Le collège"],
    correctAnswer: 1,
    explanation: "L'école maternelle accueille les enfants de 3 à 6 ans avant l'entrée à l'école élémentaire.",
    category: "societe",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 's35',
    text: "Qui peut manger à la cantine scolaire ?",
    options: ["Seulement les bons élèves", "Tous les élèves inscrits", "Seulement les Français", "Seulement ceux qui paient le prix fort"],
    correctAnswer: 1,
    explanation: "La cantine est accessible à tous les élèves inscrits, avec des tarifs adaptés aux revenus des familles.",
    category: "societe",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 's36',
    text: "À quel âge commence l'instruction obligatoire des enfants ?",
    options: ["5 ans", "3 ans", "6 ans", "4 ans"],
    correctAnswer: 1,
    explanation: "Depuis 2019, l'instruction est obligatoire à partir de 3 ans en France.",
    category: "societe",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 's37',
    text: "Un enfant inscrit à l'école :",
    options: ["Peut manquer quand il veut", "Doit y aller régulièrement sauf absence justifiée", "N'a aucune obligation", "Peut choisir ses cours"],
    correctAnswer: 1,
    explanation: "La fréquentation régulière de l'école est obligatoire. Les absences doivent être justifiées.",
    category: "societe",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 's38',
    text: "Quand ont lieu les vacances scolaires de Noël ?",
    options: ["En novembre", "Fin décembre - début janvier", "En février", "En mars"],
    correctAnswer: 1,
    explanation: "Les vacances de Noël ont lieu pendant environ deux semaines fin décembre et début janvier.",
    category: "societe",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 's39',
    text: "À l'école, un enfant en situation de handicap :",
    options: ["Ne peut pas être scolarisé", "A le droit d'être scolarisé comme les autres", "Doit rester à la maison", "Doit aller dans une école spéciale uniquement"],
    correctAnswer: 1,
    explanation: "Tout enfant en situation de handicap a le droit d'être inscrit dans l'école la plus proche de son domicile.",
    category: "societe",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 's40',
    text: "Qu'est-ce que le principe de confidentialité dans le domaine de la santé ?",
    options: ["Le médecin peut tout raconter", "Le secret médical protège les informations sur le patient", "Les dossiers sont publics", "Il n'existe pas"],
    correctAnswer: 1,
    explanation: "Le secret médical garantit la confidentialité des informations de santé du patient.",
    category: "societe",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 's41',
    text: "Qu'est-ce que le tri sélectif ?",
    options: ["Trier ses vêtements", "Séparer les déchets recyclables des autres", "Choisir ses amis", "Sélectionner ses courses"],
    correctAnswer: 1,
    explanation: "Le tri sélectif consiste à séparer les déchets selon leur nature (verre, plastique, papier, etc.) pour permettre leur recyclage.",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's42',
    text: "Qu'est-ce que la CAF ?",
    options: ["Une banque", "La Caisse d'Allocations Familiales", "Une école", "Un hôpital"],
    correctAnswer: 1,
    explanation: "La CAF (Caisse d'Allocations Familiales) verse les allocations familiales et aides sociales (APL, RSA, etc.).",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's43',
    text: "Le permis de conduire français est valable :",
    options: ["5 ans", "10 ans", "15 ans", "À vie"],
    correctAnswer: 2,
    explanation: "Le permis de conduire au format carte est valable 15 ans (pour les catégories voiture/moto légères).",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's44',
    text: "Qu'est-ce que Pôle emploi (France Travail) ?",
    options: ["Une entreprise privée", "Le service public de l'emploi en France", "Une agence de voyage", "Un syndicat"],
    correctAnswer: 1,
    explanation: "France Travail (anciennement Pôle emploi) est le service public de l'emploi qui accompagne les demandeurs d'emploi.",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's45',
    text: "Quel document permet de justifier son domicile ?",
    options: ["La carte d'identité", "Une facture d'électricité ou de téléphone récente", "Le permis de conduire", "Une photo"],
    correctAnswer: 1,
    explanation: "Les factures de services (électricité, gaz, téléphone, etc.) de moins de 3 mois servent de justificatif de domicile.",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's46',
    text: "À quelle vitesse maximale peut-on rouler sur autoroute en France ?",
    options: ["110 km/h", "120 km/h", "130 km/h", "150 km/h"],
    correctAnswer: 2,
    explanation: "La vitesse maximale autorisée sur autoroute est de 130 km/h (110 km/h par temps de pluie).",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's47',
    text: "Qu'est-ce qu'un contrat de travail CDI ?",
    options: ["Un contrat à durée déterminée", "Un contrat à durée indéterminée", "Un contrat d'intérim", "Un stage"],
    correctAnswer: 1,
    explanation: "Le CDI (Contrat à Durée Indéterminée) est un contrat de travail sans date de fin prévue.",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's49',
    text: "En France, le port de la ceinture de sécurité est :",
    options: ["Recommandé mais pas obligatoire", "Obligatoire à l'avant uniquement", "Obligatoire pour tous les passagers", "Facultatif sur autoroute"],
    correctAnswer: 2,
    explanation: "Le port de la ceinture de sécurité est obligatoire pour tous les occupants d'un véhicule, à l'avant comme à l'arrière.",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's50',
    text: "Qu'est-ce que la mutuelle santé ?",
    options: ["L'assurance maladie obligatoire", "Une assurance complémentaire qui rembourse les frais non couverts par la Sécu", "Un hôpital", "Un médecin"],
    correctAnswer: 1,
    explanation: "La mutuelle est une assurance complémentaire santé qui rembourse tout ou partie des frais non pris en charge par la Sécurité sociale.",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's51',
    text: "Auprès de quelle institution les parents peuvent-ils inscrire leur enfant à l'école publique ?",
    options: ["La préfecture", "Le tribunal", "La caisse d'allocations familiales", "La mairie"],
    correctAnswer: 3,
    explanation: "Pour l'école maternelle et élémentaire, l'inscription se fait d'abord à la mairie, puis auprès de la directrice ou du directeur de l'école.",
    category: "societe",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 's52',
    text: "Où faut-il déclarer la naissance d'un enfant ?",
    options: ["À la mairie du lieu de naissance", "À la préfecture", "Au commissariat", "À la caisse d'allocations familiales"],
    correctAnswer: 0,
    explanation: "La naissance se déclare à l'état civil de la mairie du lieu de naissance, dans les 5 jours.",
    category: "societe",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 's53',
    text: "Un bail locatif est valide s'il est :",
    options: ["Uniquement oral", "Écrit et signé par le propriétaire et le locataire", "Signé par le maire", "Enregistré à la préfecture"],
    correctAnswer: 1,
    explanation: "Le contrat de location d'un logement doit être écrit et signé par le bailleur et le locataire.",
    category: "societe",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 's54',
    text: "Concernant l'accès aux soins, quelle proposition est correcte ?",
    options: ["Le médecin est imposé par l'État", "Les soins sont réservés aux Français", "Chaque personne est libre de choisir son médecin", "Il faut l'autorisation du maire pour consulter"],
    correctAnswer: 2,
    explanation: "Le libre choix du médecin est un principe du système de santé français.",
    category: "societe",
    type: 'multiple-choice'
  },
  {
    id: 's55',
    text: "À qui est accessible la contraception ?",
    options: ["Uniquement aux femmes mariées", "Uniquement aux majeures", "Uniquement aux Françaises", "À toute personne, y compris les mineures"],
    correctAnswer: 3,
    explanation: "La contraception est accessible à toutes et à tous. Pour les mineures, elle est confidentielle et gratuite.",
    category: "societe",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 's56',
    text: "L'inscription à l'Assurance maladie est :",
    options: ["Obligatoire et gratuite pour toute personne qui réside en France de façon stable et régulière", "Réservée aux salariés", "Payante, selon l'âge", "Réservée aux personnes de nationalité française"],
    correctAnswer: 0,
    explanation: "Toute personne qui réside en France de manière stable et régulière doit être affiliée à l'Assurance maladie, et l'inscription est gratuite. À la naissance en France, l'immatriculation est automatique. Un salarié du privé est inscrit par son employeur. Sans employeur ou pour une première inscription, il faut envoyer à sa caisse (CPAM) le formulaire Cerfa 15763*02 avec les pièces justificatives (identité, domicile, RIB). Les étudiants étrangers s'inscrivent en ligne sur etudiant-etranger.ameli.fr.",
    category: "societe",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 's57',
    text: "Lorsqu'un employeur veut qu'un salarié travaille plus longtemps que la durée prévue dans le contrat de travail :",
    options: ["Le salarié travaille gratuitement", "Les heures supplémentaires doivent être payées plus cher ou compensées par du repos", "Le salarié doit payer l'employeur", "Le salarié perd ses congés"],
    correctAnswer: 1,
    explanation: "Toute heure travaillée au-delà de la durée légale (35 heures par semaine) ou de celle du contrat est une heure supplémentaire (temps plein) ou complémentaire (temps partiel). Elle est payée avec une majoration ou compensée par du repos, selon les accords de l'entreprise. Pour un temps plein, l'employeur peut en principe demander des heures supplémentaires dans la limite du contingent annuel, et un refus injustifié peut être une faute. Il doit respecter les durées maximales (10 heures par jour, 48 heures par semaine) et les temps de repos obligatoires.",
    category: "societe",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 's58',
    text: "Quelles sont les conditions pour toucher les allocations chômage ?",
    options: ["Avoir démissionné sans raison", "Avoir plus de 70 ans", "Avoir perdu son emploi involontairement, avoir assez travaillé et être inscrit à France Travail", "Ne jamais avoir travaillé"],
    correctAnswer: 2,
    explanation: "Il faut avoir travaillé une durée minimale, être à la recherche d'un emploi et inscrit à France Travail, en général après une perte d'emploi involontaire.",
    category: "societe",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 's59',
    text: "Les parents d'élève ont le droit de :",
    options: ["Choisir les notes de leur enfant", "Renvoyer un enseignant", "Décider du programme scolaire", "Élire leurs représentants et participer à la vie de l'école"],
    correctAnswer: 3,
    explanation: "Les parents élisent leurs représentants au conseil d'école ou au conseil d'administration, et ils sont informés de la scolarité de leur enfant.",
    category: "societe",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 's60',
    text: "À l'école, il est interdit aux parents de :",
    options: ["Menacer ou insulter les enseignants", "Rencontrer l'enseignant", "Voter pour les représentants de parents", "Être informés des résultats de leur enfant"],
    correctAnswer: 0,
    explanation: "Les violences et les insultes envers le personnel de l'école sont punies par la loi.",
    category: "societe",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 's61',
    text: "Quel motif d'absence est accepté par l'école ?",
    options: ["Des vacances en famille", "La maladie de l'enfant", "Une grasse matinée", "Un anniversaire"],
    correctAnswer: 1,
    explanation: "Les motifs valables sont par exemple la maladie, le décès d'un proche ou une difficulté de transport imprévue. Les parents doivent prévenir l'école.",
    category: "societe",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 's62',
    text: "Des parents ne respectent pas l'obligation d'instruction pour leurs enfants. Quelle sanction maximale risquent-ils ?",
    options: ["Un avertissement oral du maire", "Une amende de 15 euros", "6 mois d'emprisonnement et 7 500 euros d'amende", "Aucune sanction"],
    correctAnswer: 2,
    explanation: "Refuser d'inscrire son enfant à l'école après une mise en demeure est puni de 6 mois d'emprisonnement et de 7 500 euros d'amende (article 227-17-1 du Code pénal).",
    category: "societe",
    level: 'cr',
    type: 'multiple-choice'
  },
  {
    id: 's63',
    text: "Après avoir obtenu le permis de conduire, que faut-il faire pour pouvoir conduire sa voiture ?",
    options: ["S'inscrire à la mairie", "Payer une taxe au préfet", "Rien de plus", "L'assurer et l'immatriculer (carte grise)"],
    correctAnswer: 3,
    explanation: "Un véhicule doit être assuré (assurance obligatoire) et immatriculé pour circuler.",
    category: "societe",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 's64',
    text: "Le travail non déclaré est :",
    options: ["Illégal et puni par la loi, pour l'employeur comme pour le salarié", "Autorisé pour les étrangers", "Autorisé pour de courtes périodes", "Un droit du salarié"],
    correctAnswer: 0,
    explanation: "Le travail non déclaré prive le salarié de protection sociale. Il est sanctionné.",
    category: "societe",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 's65',
    text: "Que doit faire un employeur pour fixer un salaire ?",
    options: ["Payer ce qu'il veut", "Respecter au moins le SMIC et les règles de sa convention collective", "Payer en fonction de la nationalité", "Demander l'avis du maire"],
    correctAnswer: 1,
    explanation: "Le salaire ne peut pas être inférieur au SMIC. Il doit être le même pour un travail de valeur égale, sans discrimination.",
    category: "societe",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 's66',
    text: "Quelle est la première démarche à réaliser pour chercher un emploi ?",
    options: ["S'inscrire à la mairie", "S'adresser au tribunal", "S'inscrire à France Travail", "Demander un visa"],
    correctAnswer: 2,
    explanation: "France Travail accompagne les demandeurs d'emploi, qui doivent s'y inscrire.",
    category: "societe",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 's67',
    text: "Qui est aidé par France Travail ?",
    options: ["Uniquement les retraités", "Uniquement les enfants", "Uniquement les élus", "Les personnes qui cherchent un emploi"],
    correctAnswer: 3,
    explanation: "France Travail aide les demandeurs d'emploi à trouver un travail et à être indemnisés.",
    category: "societe",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 's68',
    text: "Une personne étrangère en situation régulière peut créer son entreprise :",
    options: ["Oui, si son titre de séjour l'autorise à exercer une activité professionnelle", "Non, jamais", "Oui, sans aucun titre de séjour", "Oui, uniquement dans son pays d'origine"],
    correctAnswer: 0,
    explanation: "Une personne étrangère en situation régulière peut créer son entreprise si son titre de séjour l'autorise à travailler.",
    category: "societe",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 's69',
    text: "Une femme peut-elle créer son entreprise ?",
    options: ["Non, avec l'accord de son mari seulement", "Oui, comme un homme", "Non, jamais", "Oui, mais seulement après 40 ans"],
    correctAnswer: 1,
    explanation: "Les femmes et les hommes ont les mêmes droits pour créer une entreprise.",
    category: "societe",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 's70',
    text: "Auprès de quel organisme faut-il demander le remboursement des frais de santé ?",
    options: ["La préfecture", "La mairie", "L'Assurance maladie (la CPAM)", "France Travail"],
    correctAnswer: 2,
    explanation: "L'Assurance maladie rembourse une partie des frais de santé. Avec la carte Vitale, le remboursement est automatique.",
    category: "societe",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 's71',
    text: "Qu'est-ce qu'un numéro d'urgence ?",
    options: ["Un numéro payant pour les réclamations", "Un numéro de téléphone du maire", "Un numéro réservé aux entreprises", "Un numéro gratuit, joignable à tout moment, pour obtenir une aide rapide"],
    correctAnswer: 3,
    explanation: "Les numéros d'urgence comme le 15, le 17, le 18 et le 112 sont gratuits et joignables 24 heures sur 24.",
    category: "societe",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 's72',
    text: "En cas de problème de santé non urgent, à qui faut-il s'adresser en premier ?",
    options: ["Au médecin traitant", "Aux pompiers", "À la police", "À la mairie"],
    correctAnswer: 0,
    explanation: "Pour un problème de santé non urgent, on consulte d'abord son médecin traitant.",
    category: "societe",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 's73',
    text: "Quel est le rôle du médecin traitant ?",
    options: ["Rendre la justice", "Suivre le patient, coordonner ses soins et l'orienter vers un spécialiste", "Délivrer les titres de séjour", "Gérer la carte Vitale"],
    correctAnswer: 1,
    explanation: "Le médecin traitant est le médecin que l'on choisit pour assurer le suivi de sa santé.",
    category: "societe",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 's74',
    text: "Dans quelles situations doit-on se rendre aux urgences de l'hôpital ?",
    options: ["Pour un petit rhume", "Pour renouveler une ordonnance", "En cas de danger grave pour la santé, par exemple une forte douleur à la poitrine", "Pour un rendez-vous de routine"],
    correctAnswer: 2,
    explanation: "Les urgences sont réservées aux situations graves. En cas de doute, on peut appeler le 15 (SAMU) ou le 112.",
    category: "societe",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 's75',
    text: "Quel est l'objectif des vaccinations obligatoires ?",
    options: ["Faire payer les familles", "Limiter le nombre de médecins", "Contrôler les citoyens", "Protéger la personne vaccinée et la population contre des maladies graves"],
    correctAnswer: 3,
    explanation: "Les vaccinations obligatoires protègent chacun et évitent la propagation des maladies dans la population.",
    category: "societe",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 's76',
    text: "L'autorité parentale prévoit l'obligation :",
    options: ["De protéger, d'éduquer et de prendre soin de son enfant", "De choisir son métier", "De lui donner un salaire", "De le marier"],
    correctAnswer: 0,
    explanation: "L'autorité parentale est un ensemble de droits et de devoirs des parents, dans l'intérêt de l'enfant, jusqu'à sa majorité.",
    category: "societe",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 's77',
    text: "Pour qui l'école est-elle obligatoire ?",
    options: ["Uniquement pour les enfants français", "Pour tous les enfants de 3 à 16 ans, français ou étrangers", "Uniquement pour les garçons", "Uniquement pour les enfants de plus de 10 ans"],
    correctAnswer: 1,
    explanation: "L'instruction est obligatoire pour tous les enfants de 3 à 16 ans résidant en France, quelle que soit leur nationalité.",
    category: "societe",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 's78',
    text: "Quel diplôme obtient-on à la fin du lycée ?",
    options: ["Le brevet", "Le CAP uniquement", "Le baccalauréat", "Le permis de conduire"],
    correctAnswer: 2,
    explanation: "Le baccalauréat est le diplôme qui conclut les études au lycée.",
    category: "societe",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 's79',
    text: "Dans quels établissements scolaires vont les élèves après l'école élémentaire ?",
    options: ["À l'école maternelle", "À l'université", "À la crèche", "Au collège"],
    correctAnswer: 3,
    explanation: "Après l'école élémentaire, les élèves entrent au collège, puis vont au lycée.",
    category: "societe",
    level: 'csp',
    type: 'multiple-choice'
  },
  {
    id: 's80',
    text: "Les enfants qui ne parlent pas français :",
    options: ["Peuvent être inscrits à l'école, où des dispositifs les aident à apprendre le français", "Ne sont pas acceptés à l'école", "Doivent attendre d'avoir 18 ans", "Doivent passer un examen avant d'entrer"],
    correctAnswer: 0,
    explanation: "Tout enfant a droit à l'école. Des classes d'accueil aident les élèves allophones à apprendre le français.",
    category: "societe",
    level: 'csp',
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
  },
  {
    id: 'sc11',
    text: "Vous apprenez qu'un élève de la classe de votre enfant est harcelé. Que faites-vous ?",
    options: ["Je n'interviens pas, ce n'est pas mon enfant", "Je poste l'information sur les réseaux sociaux", "Je punis moi-même les harceleurs", "J'alerte l'école (enseignant, directeur ou conseiller d'éducation)"],
    correctAnswer: 3,
    explanation: "Le harcèlement scolaire est interdit. On le signale à l'école, et le numéro 3020 peut aider les familles.",
    category: "societe",
    type: 'scenario'
  },
  {
    id: 'sc12',
    text: "Vous recevez un SMS qui vous demande vos coordonnées bancaires au nom de l'Assurance maladie. Que faites-vous ?",
    options: ["Je ne réponds pas et je signale le message", "J'envoie mes coordonnées bancaires", "Je réponds avec mon mot de passe", "Je transfère le message à tous mes amis"],
    correctAnswer: 0,
    explanation: "Un organisme public ne demande jamais ses coordonnées bancaires par message. C'est une tentative d'escroquerie (hameçonnage). On peut la signaler sur la plateforme officielle de signalement.",
    category: "societe",
    type: 'scenario'
  },
  {
    id: 'sc13',
    text: "Votre propriétaire entre dans votre logement sans vous prévenir. Que dit la loi ?",
    options: ["Il en a le droit car il est propriétaire", "Il n'en a pas le droit : le domicile du locataire est protégé", "Il en a le droit une fois par semaine", "Il en a le droit s'il a la clé"],
    correctAnswer: 1,
    explanation: "Le propriétaire ne peut pas entrer chez le locataire sans son accord. Le logement loué est le domicile du locataire.",
    category: "societe",
    type: 'scenario'
  },
  {
    id: 'sc14',
    text: "Un policier vous demande votre pièce d'identité lors d'un contrôle. Que faites-vous ?",
    options: ["Je m'enfuis", "Je refuse de répondre", "Je la montre calmement", "Je réponds que je n'ai pas à obéir"],
    correctAnswer: 2,
    explanation: "Les forces de l'ordre peuvent contrôler l'identité d'une personne. On présente son document et on peut contester ensuite si le contrôle est abusif.",
    category: "societe",
    type: 'scenario'
  },
  {
    id: 'sc15',
    text: "Vous êtes témoin d'un accident de la route. Que faites-vous en premier ?",
    options: ["Je prends une photo pour la partager", "Je continue ma route", "J'attends que quelqu'un d'autre agisse", "Je protège la zone et j'appelle les secours (112, 15 ou 18)"],
    correctAnswer: 3,
    explanation: "Porter assistance à une personne en danger est une obligation. On protège, on alerte, puis on secourt si on le peut sans risque.",
    category: "societe",
    type: 'scenario'
  },
  {
    id: 'sc16',
    text: "Vous venez de perdre votre emploi. Quelle est la première démarche ?",
    options: ["Je m'inscris à France Travail", "Je vais à la préfecture", "Je m'adresse au tribunal", "Je quitte la France"],
    correctAnswer: 0,
    explanation: "L'inscription à France Travail permet de chercher un emploi et, selon les conditions, de toucher l'allocation chômage.",
    category: "societe",
    type: 'scenario'
  },
  {
    id: 'sc17',
    text: "Votre enfant de 8 ans ne veut pas aller à l'école. Que faites-vous ?",
    options: ["Je le garde à la maison, c'est son choix", "Je parle avec lui et avec l'enseignant, car l'école est obligatoire", "Je l'inscris au travail", "Je ne dis rien à l'école"],
    correctAnswer: 1,
    explanation: "L'instruction est obligatoire de 3 à 16 ans. En cas de difficulté, il faut contacter l'école.",
    category: "societe",
    type: 'scenario'
  },
  {
    id: 'sc18',
    text: "Un collègue vous harcèle sexuellement au travail. Que faites-vous ?",
    options: ["Je ne dis rien", "Je démissionne sans en parler", "J'en parle à ma hiérarchie ou aux représentants du personnel et je garde des preuves", "Je réponds par des insultes"],
    correctAnswer: 2,
    explanation: "Le harcèlement sexuel est un délit. On peut alerter l'employeur, les représentants du personnel, l'inspection du travail ou porter plainte.",
    category: "societe",
    type: 'scenario'
  },
  {
    id: 'sc19',
    text: "Vous recevez une convocation du tribunal pour être témoin. Que faites-vous ?",
    options: ["Je ne réponds pas", "Je donne une fausse version", "J'envoie quelqu'un à ma place", "Je me présente et je dis ce que je sais"],
    correctAnswer: 3,
    explanation: "Un témoin convoqué doit se présenter et dire la vérité. Le faux témoignage est puni par la loi.",
    category: "societe",
    type: 'scenario'
  },
  {
    id: 'sc20',
    text: "Vous entendez des cris de violence chez un voisin. Que faites-vous ?",
    options: ["J'appelle la police (17) ou le 112", "Je mets de la musique", "Je tape sur la porte avec un objet", "Je ne fais rien"],
    correctAnswer: 0,
    explanation: "On alerte la police ou la gendarmerie. En cas de violences conjugales, le 3919 est aussi disponible.",
    category: "societe",
    type: 'scenario'
  },
  {
    id: 'sc21',
    text: "Votre employeur refuse de payer vos heures supplémentaires. Que faites-vous ?",
    options: ["Je ne dis rien", "J'en parle à l'employeur, aux représentants du personnel ou à l'inspection du travail", "Je cesse de venir sans prévenir", "Je dégrade le matériel de l'entreprise"],
    correctAnswer: 1,
    explanation: "Les heures supplémentaires doivent être payées ou récupérées. En dernier recours, on peut saisir le conseil de prud'hommes.",
    category: "societe",
    type: 'scenario'
  },
  {
    id: 'sc22',
    text: "Vous souhaitez créer une association. Quelle démarche faut-il faire ?",
    options: ["Demander l'accord du ministre", "Rien, c'est interdit", "Déclarer l'association à la préfecture", "S'inscrire au tribunal de commerce"],
    correctAnswer: 2,
    explanation: "Une association est libre de se créer. Pour avoir une existence légale, on la déclare à la préfecture ou à la sous-préfecture.",
    category: "societe",
    type: 'scenario'
  },
  {
    id: 'sc23',
    text: "Vous voyez un sac abandonné dans une gare. Que faites-vous ?",
    options: ["Je l'ouvre pour voir ce qu'il contient", "Je le ramène chez moi", "Je le déplace", "Je m'éloigne et je préviens le personnel ou la police"],
    correctAnswer: 3,
    explanation: "Un colis suspect peut être dangereux. On ne le touche pas et on alerte les autorités.",
    category: "societe",
    type: 'scenario'
  },
  {
    id: 'sc24',
    text: "Un ami vous propose d'acheter à bas prix un téléphone dont il dit qu'il est volé. Que faites-vous ?",
    options: ["Je refuse, car acheter un objet volé est un délit", "J'achète, c'est une bonne affaire", "J'achète et je le revends", "J'achète si personne ne le sait"],
    correctAnswer: 0,
    explanation: "Acheter ou garder un objet volé est du recel, un délit puni par la loi.",
    category: "societe",
    type: 'scenario'
  },
  {
    id: 'sc25',
    text: "Vous ne pouvez pas aller voter le jour d'une élection. Que pouvez-vous faire ?",
    options: ["Envoyer un ami voter avec ma carte d'identité", "Donner une procuration à une personne inscrite sur les listes électorales", "Voter plus tard, après la fermeture des bureaux", "Rien, un vote ne peut jamais être confié"],
    correctAnswer: 1,
    explanation: "Le vote par procuration est possible. La demande se fait sur maprocuration.gouv.fr, puis on confirme son identité avec une application ou dans un commissariat ou une gendarmerie. La personne choisie vote à votre place avec sa propre pièce d'identité.",
    category: "societe",
    type: 'scenario'
  },
  {
    id: 'sc26',
    text: "Une personne accepte de voter pour vous par procuration. Que doit-elle faire le jour du vote ?",
    options: ["Présenter votre carte d'identité", "Voter dans son propre bureau de vote", "Aller dans votre bureau de vote avec sa propre pièce d'identité", "Envoyer une lettre à la mairie"],
    correctAnswer: 2,
    explanation: "Le mandataire vote dans le bureau de vote du mandant. Il présente seulement sa propre pièce d'identité et il n'a pas besoin de la carte électorale du mandant. Il ne peut recevoir qu'une seule procuration établie en France.",
    category: "societe",
    type: 'scenario'
  },
  {
    id: 'sc27',
    text: "À la mairie, un usager demande à être reçu par un agent de sa religion. Que répond l'agent ?",
    options: ["Qu'il va chercher un agent de la même religion", "Qu'il doit d'abord dire quelle est sa religion", "Qu'il sera reçu en priorité", "Qu'il ne peut pas choisir son agent : tous les usagers sont traités de la même façon"],
    correctAnswer: 3,
    explanation: "Le service public est neutre et égal pour tous. Un usager ne peut pas choisir son agent selon ses convictions, et les agents traitent chaque demande de la même façon.",
    category: "societe",
    type: 'scenario'
  },
  {
    id: 'sc28',
    text: "Dans une mairie, une personne dit qu'elle doit être servie en premier parce qu'elle habite la commune depuis longtemps. Que dit le principe d'égalité ?",
    options: ["Aucun usager n'a de priorité pour cette raison", "Les habitants les plus anciens passent en premier", "Les personnes les plus âgées passent toujours en premier", "L'agent choisit selon la personne"],
    correctAnswer: 0,
    explanation: "L'égalité devant le service public interdit les traitements de faveur. Chaque usager doit respecter les règles de fonctionnement de la mairie.",
    category: "societe",
    type: 'scenario'
  },
  {
    id: 'sc29',
    text: "Vous venez d'arriver en France et vous n'avez pas d'employeur. Comment vous inscrire à l'Assurance maladie ?",
    options: ["Je n'ai aucune démarche à faire", "J'envoie le formulaire de demande d'ouverture des droits avec mes pièces justificatives à ma caisse", "Je m'adresse au tribunal", "Je m'inscris auprès de la mairie uniquement"],
    correctAnswer: 1,
    explanation: "Sans employeur ou pour une première inscription, on envoie sa demande à sa caisse d'Assurance maladie (CPAM) avec une pièce d'identité, un justificatif de domicile et un RIB. L'inscription est gratuite.",
    category: "societe",
    type: 'scenario'
  },
  {
    id: 'sc30',
    text: "Vous êtes étudiant étranger et vous arrivez en France. Comment vous inscrire à l'Assurance maladie ?",
    options: ["En payant une assurance privée obligatoire", "En me rendant à la préfecture", "En ligne sur le site dédié aux étudiants étrangers", "Je ne peux pas m'inscrire"],
    correctAnswer: 2,
    explanation: "Les étudiants étrangers s'inscrivent entièrement en ligne sur etudiant-etranger.ameli.fr. L'inscription est gratuite.",
    category: "societe",
    type: 'scenario'
  },
  {
    id: 'sc31',
    text: "Votre employeur vous demande de rester 2 heures de plus que prévu dans votre contrat. Que dit la loi ?",
    options: ["Ces heures ne sont jamais payées", "Ces heures sont payées moins cher", "Je peux refuser sans aucune raison", "Ces heures sont des heures supplémentaires, payées avec une majoration ou compensées par du repos"],
    correctAnswer: 3,
    explanation: "Toute heure travaillée au-delà de la durée légale ou de celle du contrat doit être payée avec une majoration ou récupérée. Pour un temps plein, un refus injustifié peut être une faute.",
    category: "societe",
    type: 'scenario'
  },
  {
    id: 'sc32',
    text: "Votre employeur vous fait travailler 12 heures par jour toute la semaine. Est-ce légal ?",
    options: ["Non, la durée maximale est en principe de 10 heures par jour et 48 heures par semaine", "Oui, l'employeur décide", "Oui, si je suis étranger", "Oui, si c'est écrit dans le contrat"],
    correctAnswer: 0,
    explanation: "L'employeur doit respecter les durées maximales de travail (10 heures par jour, 48 heures par semaine) et les temps de repos obligatoires. Un contrat ne peut pas écarter ces règles.",
    category: "societe",
    type: 'scenario'
  },
  {
    id: 'sc33',
    text: "Un ami affirme que le président de la République ne pourra jamais être poursuivi en justice. Que lui répondez-vous ?",
    options: ["Il peut être arrêté à tout moment", "Il n'est pas au-dessus de la loi, mais il est protégé pendant son mandat, et les poursuites peuvent reprendre un mois après la fin de ses fonctions", "Il ne peut jamais être jugé, même après son mandat", "Seul le maire peut le juger"],
    correctAnswer: 1,
    explanation: "L'article 67 de la Constitution protège temporairement le président pendant son mandat. Il peut seulement être destitué par le Parlement réuni en Haute Cour en cas de manquement à ses devoirs (article 68).",
    category: "societe",
    type: 'scenario'
  },
  {
    id: 'sc34',
    text: "Une femme seule souhaite avoir un enfant par procréation médicalement assistée (PMA). En a-t-elle le droit ?",
    options: ["Non, la PMA est réservée aux couples mariés", "Non, la PMA est interdite en France", "Oui, depuis la loi de bioéthique de 2021, dans le cadre fixé par la loi", "Oui, mais seulement avec l'accord d'un homme"],
    correctAnswer: 2,
    explanation: "Depuis 2021, la PMA est ouverte aux couples formés d'un homme et d'une femme, aux couples de femmes et aux femmes non mariées. Son accès est encadré par la loi.",
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
  societe: [...SOCIETE_QUESTIONS, ...SCENARIO_QUESTIONS]
};

// ============================================================
// GAMIFICATION: BADGES
// ============================================================
export const BADGES: Badge[] = [
  { id: 'first_quiz', name: 'Premier Pas', description: 'Compléter votre premier quiz', icon: 'fa-shoe-prints' },
  { id: 'perfect_quiz', name: 'Sans Faute', description: 'Obtenir 100% à un quiz', icon: 'fa-bullseye' },
  { id: 'streak_3', name: 'Régulier', description: 'Se connecter 3 jours consécutifs', icon: 'fa-fire' },
  { id: 'streak_7', name: 'Assidu', description: 'Se connecter 7 jours consécutifs', icon: 'fa-fire-flame-curved' },
  { id: 'streak_30', name: 'Dévoué', description: 'Se connecter 30 jours consécutifs', icon: 'fa-meteor' },
  { id: 'all_themes', name: 'Explorateur', description: 'Compléter un quiz dans chaque thème', icon: 'fa-compass' },
  { id: 'exam_passed', name: 'Admis', description: 'Réussir un examen blanc (32/40)', icon: 'fa-award' },
  { id: 'exam_master', name: 'Expert', description: 'Réussir 3 examens blancs', icon: 'fa-crown' },
  { id: 'quiz_10', name: 'Entraîné', description: 'Compléter 10 quiz', icon: 'fa-dumbbell' },
  { id: 'quiz_50', name: 'Champion', description: 'Compléter 50 quiz', icon: 'fa-trophy' },
  { id: 'score_80', name: 'Performant', description: 'Obtenir 80% de moyenne globale', icon: 'fa-chart-line' },
  { id: 'fast_exam', name: 'Rapide', description: 'Terminer un examen en moins de 20 minutes', icon: 'fa-bolt' }
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
    answer: "Les 5 thématiques officielles sont les mêmes pour la carte de séjour pluriannuelle (CSP) et la carte de résident (CR). Notre banque de questions n'est pas répartie par niveau de difficulté ; pour les modalités exactes propres à chaque titre de séjour, consultez le site du Ministère de l'Intérieur.",
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

// ============================================================
// FICHES OFFICIELLES (liens vers formation-civique.interieur.gouv.fr)
// ============================================================
const BASE_URL = 'https://formation-civique.interieur.gouv.fr/fiches-par-thematiques';

export const OFFICIAL_FICHES: FicheCategory[] = [
  {
    id: 'valeurs',
    title: 'Principes et valeurs de la République',
    icon: 'fa-balance-scale',
    fiches: [
      { id: 'f1', title: 'La devise de la République', url: `${BASE_URL}/principes-et-valeurs-de-la-republique/devise-et-symboles-de-la-republique/` },
      { id: 'f2', title: 'Les symboles de la République', url: `${BASE_URL}/principes-et-valeurs-de-la-republique/les-symboles-de-la-republique/` },
      { id: 'f3', title: 'La laïcité', url: `${BASE_URL}/principes-et-valeurs-de-la-republique/laicite/` },
      { id: 'f4', title: 'La langue de la République', url: `${BASE_URL}/principes-et-valeurs-de-la-republique/la-langue-de-la-republique/` },
      { id: 'f5', title: 'Le contrat d\'engagement républicain', url: `${BASE_URL}/principes-et-valeurs-de-la-republique/le-contrat-dengagement-%C3%A0-respecter-les-principes-de-la-republique/le-contrat-engagement-republicain/` },
    ]
  },
  {
    id: 'institutions',
    title: 'Système institutionnel et politique',
    icon: 'fa-landmark',
    fiches: [
      { id: 'f6', title: 'État de droit et séparation des pouvoirs', url: `${BASE_URL}/systeme-institutionnel-et-politique/etat-de-droit-et-separation-des-pouvoirs/` },
      { id: 'f7', title: 'Démocratie et droit de vote', url: `${BASE_URL}/systeme-institutionnel-et-politique/democratie-et-droit-de-vote/` },
      { id: 'f8', title: 'Organisation de la République française', url: `${BASE_URL}/systeme-institutionnel-et-politique/organisation-de-la-republique-fran%C3%A7aise/` },
      { id: 'f9', title: 'Institutions européennes', url: `${BASE_URL}/systeme-institutionnel-et-politique/institutions-europeennes/` },
    ]
  },
  {
    id: 'droits',
    title: 'Droits et devoirs',
    icon: 'fa-handshake-angle',
    fiches: [
      { id: 'f10', title: 'Droits fondamentaux', url: `${BASE_URL}/droits-et-devoirs/droits-fondamentaux/` },
      { id: 'f11', title: 'Obligations et devoirs', url: `${BASE_URL}/droits-et-devoirs/obligations-et-devoirs-des-personnes-residant-en-france/` },
    ]
  },
  {
    id: 'culture',
    title: 'Histoire, géographie et culture',
    icon: 'fa-monument',
    fiches: [
      { id: 'f12', title: 'Les régimes politiques depuis 1789', url: `${BASE_URL}/histoire-geographie-et-culture/les-regimes-politiques-depuis-1789/` },
      { id: 'f13', title: 'La Vème République', url: `${BASE_URL}/histoire-geographie-et-culture/la-cinquieme-republique/` },
      { id: 'f14', title: 'Les conflits mondiaux', url: `${BASE_URL}/histoire-geographie-et-culture/les-conflits-mondiaux-et-le-nouvel-ordre-mondial/` },
      { id: 'f15', title: 'Atlas de la France', url: `${BASE_URL}/histoire-geographie-et-culture/atlas-de-la-france/` },
      { id: 'f16', title: 'La France dans l\'Europe et le monde', url: `${BASE_URL}/histoire-geographie-et-culture/la-france-dans-leurope-et-dans-le-monde/` },
      { id: 'f17', title: 'Les régions françaises', url: `${BASE_URL}/histoire-geographie-et-culture/les-regions-fran%C3%A7aises/` },
      { id: 'f18', title: 'Culture', url: `${BASE_URL}/histoire-geographie-et-culture/culture/` },
    ]
  },
  {
    id: 'societe',
    title: 'Vivre dans la société française',
    icon: 'fa-house-user',
    fiches: [
      { id: 'f19', title: 'Santé', url: `${BASE_URL}/vivre-dans-la-societe-fran%C3%A7aise/sante/` },
      { id: 'f20', title: 'Emploi', url: `${BASE_URL}/vivre-dans-la-societe-fran%C3%A7aise/emploi/` },
      { id: 'f21', title: 'Parentalité', url: `${BASE_URL}/vivre-dans-la-societe-fran%C3%A7aise/parentalite/` },
      { id: 'f22', title: 'Démarches administratives', url: `${BASE_URL}/vivre-dans-la-societe-fran%C3%A7aise/demarches-administratives/` },
    ]
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
  questionMastery: {} as SRSMap,
  flashcardMastery: {} as SRSMap,
  themeProgress: {} as Record<string, { correct: number; total: number }>
};
