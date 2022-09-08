# StudyStorm - Application

Le frontend de StudyStorm est une application web développée en Typescript avec NuxtJS. Elle respecte le standard PWA et est donc installable sur les plateformes implémentant cette fonctionnalité.

## Stack du frontend
* [Typescript](https://www.typescriptlang.org/)
* [Nuxt 3](https://v3.nuxtjs.org/getting-started/quick-start/)
* [TailwindCSS](https://tailwindcss.com/)
* [Flowbite](https://flowbite.com/)
* [Vitest](https://vitest.dev/)
* [Eslint](https://eslint.org/)

## Prérequis
* [NodeJS](https://nodejs.org/en/download/) >= version 16
* [NPM](https://www.npmjs.com/package/download) >= version 8
* [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) >= version 1.22

## Extensions recommandées sur VSCode
* Volar
* TailwindCSS IntelliSense
* ESLint
* Prettier
* i18n Ally

## Lancer le serveur de développement

Une fois le repository cloné, il faut tout d'abord installer toutes les dépendances:

```bash
> cd racine_du_projet
> yarn install
```
Dupliquez le fichier [.env.example](https://github.com/StudyStorm/application/blob/main/.env.example), renommez le en ``.env`` et remplacez les valeurs par les vôtres.

Pour votre environnement de développement, vous pouvez utiliser les valeurs suivantes:

```yaml
BASE_URL=http://localhost:3000
LOCAL_API_URL=http://localhost:3333
PRODUCTION_API_URL=http://localhost:3333
```

> **Note**  
> Il est conseillé d'utiliser le serveur de développement pour la variable ``PRODUCTION_API_URL`` en cas de test en local de l'output de production.

Lancer le serveur de développement:

```bash
yarn dev
```

Le serveur est maintenant accessible à l'adresse affichée sur le terminal.

## Problèmes éventuels pendant le développement

### Linter
Le fichier ``settings.json`` présent dans le dossier ``.vscode`` permet normalement de configurer correctement le linter à condition d'avoir les extensions recommandées.

### Bugs
La version de Nuxt utilisée est une release candidate et peut donc comporter des bugs. Le dossier ``.nuxt`` ne doit pas être modifié par le développeur et peut entraîner des crashs. Si c'est le cas, il est possible de le regénérer avec la commande : 

```bash
yarn prepare
```

## Lancement des tests et du linter

Pour les tests: 
```bash
yarn test
```

Pour fixer des éventuels problèmes de formattage:
```bash
yarn format
```
## Mise en production

Durant la configuration de votre pipeline de déploiement sur le providers de votre choix, il est impératif d'utiliser les deux commandes suivantes:

```bash
# Build du dossier .outpur contenant le code de production
yarn build

# Démarrage du serveur de production
yarn start
```
La majorité des providers proposent des champs spécifiques pour lancer ces commandes.

> **Warning**  
> Le ``.env`` n'étant pas commit, il ne faut pas oublier d'ajouter les bonnes variables durant la configuration.


### Précisions sur le déploiement

Nuxt3 a la capacité d'être déployé sur l'edge (Cloudflare Workers, Vercel Edge Functions...) en utilisant [différents presets de déploiement](https://v3.nuxtjs.org/guide/deploy/presets).

Cependant, notre application a été développée avec l'objectif d'être déployée sur un serveur NodeJS "classique". Il est alors nécessaire d'utiliser des providers comme AWS, Azure ou Digital Ocean.
