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
</script>

<template>
  <div>
    <LandingNavbar />

    <LandingSection id="main">
      <div
        class="grid py-8 px-4 mx-auto max-w-screen-xl lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12"
      >
        <div class="place-self-center mx-auto lg:mr-auto lg:col-span-7">
          <h1
            class="font-[ZwoDrei] text-storm-dark mb-4 max-w-2xl text-4xl font-extrabold leading-none lg:justify-start md:text-5xl xl:text-6xl flex items-center justify-center hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-storm-grad-left hover:to-storm-grad-right"
          >
            <AnimatedLogo class="h-20 lg:h-28 md:h-32 xl:h-40 mr-3" />
            <span
              >StudyStorm<span class="font-sans text-base align-super"
                >™</span
              ></span
            >
          </h1>
          <p
            class="mb-6 ml-2 md:ml-10 lg:ml-16 max-w-2xl font-light text-gray-500 lg:mb-8 md:text-lg lg:text-2xl"
          >
            {{ $t("landing.homePage.catchPhrase") }}
          </p>
        </div>
        <div class="lg:col-span-5 lg:flex">
          <nuxt-img
            format="webp"
            src="/images/mockup_iphone_crop.png"
            alt="mockup"
          />
        </div>
      </div>
    </LandingSection>

    <LandingSection id="about">
      <div class="py-8 px-6 sm:py-16 lg:px-6">
        <div class="mb-8 lg:mb-16">
          <h2
            class="lg:mb-4 text-3xl lg:text-4xl font-extrabold text-storm-dark pb-8 text-center"
          >
            {{ $t("landing.homePage.about.title") }}
          </h2>
          <p
            class="text-gray-500 lg:text-xl text-justify whitespace-pre-wrap lg:px-20"
          >
            {{ $t("landing.homePage.about.text") }}
          </p>
        </div>
        <h2
          class="mb-4 text-3xl lg:text-4xl font-extrabold text-storm-dark text-center"
        >
          {{ $t("landing.homePage.features.title") }}
        </h2>
        <div class="md:grid md:grid-cols-2 md:gap-y-24 md:gap-x-12 py-10">
          <div
            v-for="(feature, i) in features"
            :key="i"
            class="flex flex-col items-center pb-10 md:px-4 lg:px-24"
          >
            <nuxt-img
              class="mb-3 w-24 h-24"
              :src="feature.image"
              alt="feature_icon"
              loading="lazy"
            />

            <h3 class="mb-2 text-xl font-bold text-storm-dark">
              {{ feature.title }}
            </h3>
            <p class="text-gray-500 text-justify">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </LandingSection>

    <LandingSection id="team" background-class="bg-gray-50">
      <div class="px-6 py-8">
        <div class="mx-auto mb-8 max-w-screen-sm md:max-w-screen-md lg:mb-16">
          <h2
            class="mb-4 text-3xl xl:text-4xl tracking-tight font-extrabold text-storm-dark"
          >
            {{ $t("landing.homePage.team.title") }}
          </h2>
          <p
            class="font-light text-justify text-gray-500 sm:text-lg lg:text-xl"
          >
            {{ $t("landing.homePage.team.text") }}
          </p>
        </div>
        <div class="md:gap-6 md:flex md:flex-wrap md:justify-center">
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
      <div class="py-8 px-6 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center">
          <h2
            class="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900"
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
            class="text-white bg-storm-blue hover:bg-storm-darkblue focus:ring-4 focus:ring-storm-darkblue/50 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            {{ $t("landing.homePage.startNow.button") }}
          </button>
        </div>
      </div>
    </section>

    <LandingFooter />
  </div>
</template>
