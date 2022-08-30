<script setup>
import { useI18n } from "vue-i18n";
import TeamMember from "~~/components/landing/TeamMember.vue";
import AnimatedLogo from "~~/components/landing/AnimatedLogo.vue";

const { t } = useI18n();
const teamMembers = [
  {
    name: "Bijelic Alen",
    title: t("landing.homePage.team.members.bijelic_alen"),
    image: "/images/members/alen.png",
    github: "https://github.com/AlenBijelic99",
    linkedin: "https://www.linkedin.com/in/alen-bijelic/",
  },
  {
    name: "Crausaz Nicolas",
    title: t("landing.homePage.team.members.crausaz_nicolas"),
    image: "/images/members/nicolas.png",
    github: "https://github.com/nicrausaz",
    linkedin: "https://www.linkedin.com/in/nicolas-crausaz-861876104/",
  },
  {
    name: "Friedli Jonathan",
    title: t("landing.homePage.team.members.friedli_jonathan"),
    image: "/images/members/jonathan.png",
    github: "https://github.com/Marinlestylo",
    linkedin: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    name: "Pavicevic Lazar",
    title: t("landing.homePage.team.members.pavicevic_lazar"),
    image: "/images/members/lazar.png",
    github: "https://github.com/Lazzzer",
    linkedin: "https://www.linkedin.com/in/lazar-pavicevic/",
  },
  {
    name: "Scharwath Maxime",
    title: t("landing.homePage.team.members.scharwath_maxime"),
    image: "/images/members/maxime.png",
    github: "https://github.com/maxscharwath",
    linkedin: "https://www.linkedin.com/in/maximescharwath/",
  },
];

const features = [
  {
    title: t("landing.homePage.features.cards.title"),
    description: t("landing.homePage.features.cards.description"),
    image: "/icons/cards.svg",
  },
  {
    title: t("landing.homePage.features.classroom.title"),
    description: t("landing.homePage.features.classroom.description"),
    image: "/icons/classroom.svg",
  },
  {
    title: t("landing.homePage.features.community.title"),
    description: t("landing.homePage.features.community.description"),
    image: "/icons/community.svg",
  },
  {
    title: t("landing.homePage.features.rating.title"),
    description: t("landing.homePage.features.rating.description"),
    image: "/icons/like.svg",
  },
];

definePageMeta({
  layout: "landing",
});
</script>

<template>
  <div>
    <LandingNavbar />

    <LandingSection id="main">
      <div
        class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12"
      >
        <div class="mr-auto place-self-center lg:col-span-7">
          <h1
            class="font-[ZwoDrei] text-storm-dark mb-4 max-w-2xl text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl flex items-center hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-storm-grad-left hover:to-storm-grad-right"
          >
            <AnimatedLogo class="h-20 mr-3 lg:h-28 md:h-32 xl:h-40" />
            <span
              >StudyStorm<span class="font-sans text-base align-super"
                >™</span
              ></span
            >
          </h1>
          <p
            class="max-w-2xl mb-6 ml-16 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-2xl"
          >
            {{ $t("landing.homePage.catchPhrase") }}
          </p>
        </div>
        <div class="lg:mt-0 lg:col-span-5 lg:flex">
          <nuxt-img src="/images/mockup_iphone_crop.png" alt="mockup" />
        </div>
      </div>
    </LandingSection>

    <LandingSection id="about">
      <div class="px-4 py-8 sm:py-16 lg:px-6">
        <div class="mb-8 lg:mb-16">
          <h2
            class="pb-8 mb-4 text-4xl font-extrabold text-center text-storm-dark"
          >
            {{ $t("landing.homePage.about.title") }}
          </h2>
          <p class="text-gray-500 whitespace-pre-wrap sm:text-xl lg:px-20">
            {{ $t("landing.homePage.about.text") }}
          </p>
        </div>
        <h2 class="mb-4 text-4xl font-extrabold text-center text-storm-dark">
          {{ $t("landing.homePage.features.title") }}
        </h2>
        <div
          class="p-10 space-y-8 md:grid lg:grid-cols-2 md:gap-24 md:space-y-2"
        >
          <div
            v-for="(feature, i) in features"
            :key="i"
            class="flex flex-col items-center pb-10"
          >
            <nuxt-img
              class="w-24 h-24 mb-3"
              :src="feature.image"
              alt="feature_icon"
            />

            <h3 class="mb-2 text-xl font-bold text-storm-dark">
              {{ feature.title }}
            </h3>
            <p class="text-gray-500">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </LandingSection>

    <LandingSection id="team" background-class="bg-gray-50">
      <div class="py-8">
        <div class="max-w-screen-sm mx-auto mb-8 lg:mb-16">
          <h2
            class="mb-4 text-3xl font-extrabold tracking-tight xl:text-4xl text-storm-dark"
          >
            {{ $t("landing.homePage.team.title") }}
          </h2>
          <p class="font-light text-gray-500 sm:text-xl">
            {{ $t("landing.homePage.team.text") }}
          </p>
        </div>
        <div
          class="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        >
          <TeamMember
            v-for="(member, i) in teamMembers"
            :key="i"
            :name="member.name"
            :title="member.title"
            :image="member.image"
            :github="member.github"
            :linkedin="member.linkedin"
          />
        </div>
      </div>
    </LandingSection>

    <section class="bg-white dark:bg-gray-900">
      <div class="max-w-screen-xl px-4 py-8 mx-auto sm:py-16 lg:px-6">
        <div class="max-w-screen-sm mx-auto text-center">
          <h2
            class="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-gray-900"
          >
            {{ $t("landing.homePage.startNow.title") }}
          </h2>
          <p
            class="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg"
          >
            {{ $t("landing.homePage.startNow.text") }}
          </p>
          <button
            href="#"
            class="text-white bg-storm-blue hover:bg-storm-darkblue focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            {{ $t("landing.homePage.startNow.button") }}
          </button>
        </div>
      </div>
    </section>

    <LandingFooter />
  </div>
</template>
