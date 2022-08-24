<script setup>
import { useI18n } from "vue-i18n";
import TeamMember from "~~/components/landing/TeamMember.vue";
import AnimatedLogo from "~~/components/landing/AnimatedLogo.vue";

const { t } = useI18n();
const teamMembers = [
  {
    name: "Bijelic Alen",
    title: t("landing.homePage.team.members.bijelic_alen"),
    image: "/images/members/ncrausaz.jpg",
  },
  {
    name: "Crausaz Nicolas",
    title: t("landing.homePage.team.members.crausaz_nicolas"),
    image: "/images/members/ncrausaz.jpg",
  },
  {
    name: "Friedli Jonathan",
    title: t("landing.homePage.team.members.friedli_jonathan"),
    image: "/images/members/ncrausaz.jpg",
  },
  {
    name: "Pavicevic Lazar",
    title: t("landing.homePage.team.members.pavicevic_lazar"),
    image: "/images/members/ncrausaz.jpg",
  },
  {
    name: "Scharwath Maxime",
    title: t("landing.homePage.team.members.scharwath_maxime"),
    image: "/images/members/ncrausaz.jpg",
  },
];

const features = [
  {
    title: t("landing.homePage.features.cards.title"),
    description: t("landing.homePage.features.cards.description"),
    image: "/images/Logo.svg",
  },
  {
    title: t("landing.homePage.features.classroom.title"),
    description: t("landing.homePage.features.classroom.description"),
    image: "/images/Logo.svg",
  },
  {
    title: t("landing.homePage.features.community.title"),
    description: t("landing.homePage.features.community.description"),
    image: "/images/Logo.svg",
  },
  {
    title: t("landing.homePage.features.rating.title"),
    description: t("landing.homePage.features.rating.description"),
    image: "/images/Logo.svg",
  },
];
</script>

<template>
  <div>
    <LandingNavbar />

    <LandingSection id="main">
      <div
        class="grid py-8 px-4 mx-auto max-w-screen-xl lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12"
      >
        <div class="place-self-center mr-auto lg:col-span-7">
          <h1
            class="font-[ZwoDrei] text-storm-dark mb-4 max-w-2xl text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl flex items-center hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-storm-grad-left hover:to-storm-grad-right"
          >
            <AnimatedLogo class="h-28 md:h-32 xl:h-40 mr-3" />
            <span>
              StudyStorm<span class="font-sans text-base align-super"
                >™</span
              ></span
            >
          </h1>
          <p
            class="mb-6 max-w-2xl font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl"
          >
            {{ $t("landing.homePage.catchPhrase") }}
          </p>
        </div>
        <div class="lg:mt-0 lg:col-span-5 lg:flex">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
            alt="mockup"
          />
        </div>
      </div>
    </LandingSection>

    <LandingSection id="about">
      <div class="py-8 px-4 sm:py-16 lg:px-6">
        <div class="mb-8 lg:mb-16 text-center">
          <h2 class="mb-4 text-4xl font-extrabold text-storm-dark">
            {{ $t("landing.homePage.about.title") }}
          </h2>
          <p class="text-gray-500 sm:text-xl">
            {{ $t("landing.homePage.about.text") }}
          </p>
        </div>
        <div
          class="space-y-8 md:grid md:grid-cols-4 lg:grid-cols-2 md:gap-24 md:space-y-2 p-10"
        >
          <div
            v-for="(feature, i) in features"
            :key="i"
            class="flex flex-col items-center pb-10"
          >
            <img class="mb-3 w-24 h-24" :src="feature.image" />

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
        <div class="mx-auto mb-8 max-w-screen-sm lg:mb-16">
          <h2
            class="mb-4 text-4xl tracking-tight font-extrabold text-storm-dark"
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
          />
        </div>
      </div>
    </LandingSection>

    <section class="bg-white dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center">
          <h2
            class="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white"
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
