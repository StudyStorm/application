# StudyStorm - Frontend application

## Stack du frontend
* [Typescript](https://www.typescriptlang.org/)
* [Nuxt 3](https://v3.nuxtjs.org/getting-started/quick-start/)
* [TailwindCSS](https://tailwindcss.com/)
* [Vitest](https://vitest.dev/)
* [Eslint](https://eslint.org/)

## Prérequis
* [NodeJS](https://nodejs.org/en/download/) version 16.17.0
* [NPM](https://www.npmjs.com/package/download) version 8.15.0
* [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) version 1.22.19


## Lancer le serveur de développement

Installer toutes les dépendances :

```bash
# yarn
yarn install

# npm
npm install
```
Dupliquez le fichier [.env.example](https://github.com/StudyStorm/application/blob/main/.env.example), renommez le en .env et  remplacez les valeurs par vos propres.
* BASE_URL : l'url locale du frontend
* LOCAL_API_URL : l'url locale de l'api du backend
* PRODUCTION_API_URL : l'url de l'api du backend en production

TODO : utile de préciser les 3 valeurs ?  

Lancer le serveur de développement à l'adresse http://localhost:3000

```bash
# yarn
yarn dev

# npm
npm run dev
```

## Production

Build l'application pour la production:

```bash
npm run build
```

Pour avoir une preview de la production:

```bash
npm run preview
```

N'hésitez pas à consulter la [documentation de déploiement](https://v3.nuxtjs.org/guide/deploy/presets) pour plus d'informations.
