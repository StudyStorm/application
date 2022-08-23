<script setup>
import TeamMember from '~~/components/landing/TeamMember.vue';

const teamMembers = [
   {
      name: 'Bijelic Alen',
      title: 'Chad',
      image: '/images/members/ncrausaz.jpg',
   },
   {
      name: 'Crausaz Nicolas',
      title: 'Chad',
      image: '/images/members/ncrausaz.jpg',
   },
   {
      name: 'Friedli Jonathan',
      title: 'Chad',
      image: '/images/members/ncrausaz.jpg',
   },
   {
      name: 'Pavicevic Lazar',
      title: 'Chad',
      image: '/images/members/ncrausaz.jpg',
   },
   {
      name: 'Scharwath Maxime',
      title: 'Chad',
      image: '/images/members/ncrausaz.jpg',
   },
];

const features = [
   {
      title: 'Cartes',
      description:
         'Les cartes de révisions représentent un moyen simple et efficace d’apprendre et de tester la connaissance sur un sujet.',
      image: '/images/members/ncrausaz.jpg',
   },
   {
      title: 'Salles de classe',
      description: 'Mettez en place une manière de créer et partager les collections de cartes selon vos préférences.',
      image: '/images/members/ncrausaz.jpg',
   },
   {
      title: 'Communauté',
      description: 'Organisez, créez et partagez du contenu avec vos collègues et amis.',
      image: '/images/members/ncrausaz.jpg',
   },
   {
      title: 'Votes',
      description:
         'Votez sur la qualité d’une collection de cartes. Une collection avec des votes positifs sera propulsée dans la liste des meilleures cartes.',
      image: '/images/members/ncrausaz.jpg',
   },
];
</script>

<template>
   <div>
      <LandingNavbar />

      <section class="bg-white dark:bg-gray-900">
         <div class="grid py-8 px-4 mx-auto max-w-screen-xl lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div class="place-self-center mr-auto lg:col-span-7">
               <h1 class="font-[ZwoDrei] mb-4 max-w-2xl text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">
                  StudyStorm
               </h1>
               <p class="mb-6 max-w-2xl font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                  Collaborez pour apprendre d’une manière nouvelle…
               </p>
            </div>
            <div class="lg:mt-0 lg:col-span-5 lg:flex">
               <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" alt="mockup" />
            </div>
         </div>
      </section>

      <section class="dark:bg-gray-800" id="about">
         <div class="py-8 px-4 sm:py-16 lg:px-6">
            <div class="mb-8 lg:mb-16 text-center">
               <h2 class="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
                  Designed for business teams like yours
               </h2>
               <p class="text-gray-500 sm:text-xl dark:text-gray-400">
                  L’application StudyStorm permet aux utilisateurs de créer des collections de cartes de révisions et de
                  les partager.
                  
                  Le créateur d’une salle de classe peut partager ses collections à tout le monde ou
                  rendre la salle de classe privée, en invitant uniquement les utilisateurs qu’il souhaite, à rejoindre
                  la salle de classe. 
                  
                  L'organisation des collections est semblable à un système de dossier. Cela permet
                  de regrouper les cartes par sujet, chapitre, unité de cours, etc… La communauté peut évaluer le
                  contenu qu’il a apprécié ou pas. 

                  Les collections avec le plus de votes positifs seront affichées sur
                  la page d’accueil. Les cartes étant réalisées par des personnes, il est possible qu’il y ait des
                  erreurs dans la réponse d’une carte, ou qu’il y ait une réponse plus pertinente. 
                  
                  Les utilisateurs ont la possibilité de signaler une carte en proposant une meilleure réponse. C’est ensuite de la
                  responsabilité du créateur de la carte d’appliquer le changement.
               </p>
            </div>
            <div class="space-y-8 md:grid md:grid-cols-4 lg:grid-cols-2 md:gap-24 md:space-y-2 p-10">
               <div v-for="(feature, i) in features" :key="i" class="flex flex-col items-center pb-10">
                  <img class="mb-3 w-24 h-24 rounded-full shadow-lg" :src="feature.image" alt="Bonnie image" />
                  <h3 class="mb-2 text-xl font-bold dark:text-white">{{ feature.title }}</h3>
                  <p class="text-gray-500 dark:text-gray-400">
                     {{ feature.description }}
                  </p>
               </div>
            </div>
         </div>
      </section>

      <section class="bg-gray-50 dark:bg-gray-900" id="team">
         <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
            <div class="mx-auto mb-8 max-w-screen-sm lg:mb-16">
               <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                  Qui sommes-nous ?
               </h2>
               <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">
                  Nous sommes une équipe de cinq étudiants en ingénierie logicielle de la HEIG-VD
               </p>
            </div>
            <div class="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
               <TeamMember
                  v-for="(member, i) in teamMembers"
                  :key="i"
                  :name="member.name"
                  :title="member.title"
                  :image="member.image"
               />
            </div>
         </div>
      </section>

      <section class="bg-white dark:bg-gray-900">
         <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div class="mx-auto max-w-screen-sm text-center">
               <h2 class="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">
                  Commencez dès maintenant à apprendre !
               </h2>
               <p class="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
                  StudyStorm est complètement gratuit et open source
               </p>
               <button
                  href="#"
                  class="text-white bg-blue-900 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
               >
                  Démarrer
               </button>
            </div>
         </div>
      </section>

      <LandingFooter />
   </div>
</template>
