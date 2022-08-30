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
        class="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0"
      >
        <div class="mr-auto place-self-center lg:col-span-7">
          <h1
            class="mb-4 flex max-w-2xl items-center font-[ZwoDrei] text-4xl font-extrabold leading-none text-storm-dark hover:bg-gradient-to-r hover:from-storm-grad-left hover:to-storm-grad-right hover:bg-clip-text hover:text-transparent md:text-5xl xl:text-6xl"
          >
            <AnimatedLogo class="mr-3 h-20 md:h-32 lg:h-28 xl:h-40" />
            <span
              >StudyStorm<span class="align-super font-sans text-base"
                >™</span
              ></span
            >
          </h1>
          <p
            class="mb-6 ml-16 max-w-2xl font-light text-gray-500 md:text-lg lg:mb-8 lg:text-2xl"
          >
            {{ $t("landing.homePage.catchPhrase") }}
          </p>
        </div>
        <div class="lg:col-span-5 lg:mt-0 lg:flex">
          <nuxt-img src="/images/mockup_iphone_crop.png" alt="mockup" />
        </div>
      </div>
    </LandingSection>

    <LandingSection id="about">
      <div class="px-4 py-8 sm:py-16 lg:px-6">
        <div class="mb-8 lg:mb-16">
          <h2
            class="mb-4 pb-8 text-center text-4xl font-extrabold text-storm-dark"
          >
            {{ $t("landing.homePage.about.title") }}
          </h2>
          <p class="whitespace-pre-wrap text-gray-500 sm:text-xl lg:px-20">
            {{ $t("landing.homePage.about.text") }}
          </p>
        </div>
        <h2 class="mb-4 text-center text-4xl font-extrabold text-storm-dark">
          {{ $t("landing.homePage.features.title") }}
        </h2>
        <div
          class="space-y-8 p-10 md:grid md:gap-24 md:space-y-2 lg:grid-cols-2"
        >
          <div
            v-for="(feature, i) in features"
            :key="i"
            class="flex flex-col items-center pb-10"
          >
            <nuxt-img
              class="mb-3 h-24 w-24"
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
        <div class="mx-auto mb-8 max-w-screen-sm lg:mb-16">
          <h2
            class="mb-4 text-3xl font-extrabold tracking-tight text-storm-dark xl:text-4xl"
          >
            {{ $t("landing.homePage.team.title") }}
          </h2>
          <p class="font-light text-gray-500 sm:text-xl">
            {{ $t("landing.homePage.team.text") }}
          </p>
        </div>
        <div
          class="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-16"
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
      <div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center">
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
            class="mr-2 mb-2 rounded-lg bg-storm-blue px-5 py-2.5 text-sm font-medium text-white hover:bg-storm-darkblue focus:outline-none focus:ring-4"
          >
            {{ $t("landing.homePage.startNow.button") }}
          </button>
        </div>
      </div>
    </section>

    <LandingFooter />
  </div>
</template>