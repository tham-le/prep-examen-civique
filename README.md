# Objectif Citoyen - Préparation Examen Civique 2026

Une plateforme gratuite et open source pour préparer le nouvel examen civique français obligatoire dès janvier 2026.

## Fonctionnalités

- **125+ questions** couvrant les 5 thématiques officielles
- **Examen blanc** en conditions réelles (40 questions, 45 minutes)
- **Système de gamification** (XP, niveaux, 12 badges)
- **Révision intelligente** (spaced repetition des points faibles)
- **100% hors ligne** - toutes les données stockées localement
- **Aucune collecte de données** personnelles

## Thématiques couvertes

1. Principes et valeurs de la République
2. Système institutionnel et politique
3. Droits et devoirs
4. Histoire, géographie et culture
5. Vivre dans la société française

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/votre-username/objectif-citoyen.git
cd objectif-citoyen

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Construire pour la production
npm run build
```

## Déploiement

Le site peut être déployé sur n'importe quelle plateforme de hosting statique :

- **Vercel** : `vercel deploy`
- **Netlify** : Connecter le repo GitHub
- **GitHub Pages** : Utiliser le dossier `dist/` après build

## Stack technique

- React 19
- TypeScript
- Vite
- Tailwind CSS (via CDN)

## Source des informations

Les informations relatives à l'examen civique sont issues du site officiel du Ministère de l'Intérieur :
https://formation-civique.interieur.gouv.fr/examen-civique/informations-générales-sur-lexamen-civique/

## Avertissement

**Objectif Citoyen** est une plateforme pédagogique indépendante éditée à titre privé. Elle n'est en aucun cas affiliée au Ministère de l'Intérieur, à l'OFII ou à tout organisme gouvernemental français.

La réussite aux simulations ne garantit pas l'obtention de l'examen officiel.

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer de nouvelles questions
- Améliorer l'interface
- Corriger des erreurs

## Licence

MIT License - voir [LICENSE](LICENSE)

---

Fait avec coeur pour aider les futurs citoyens français.
