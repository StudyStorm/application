<template>
  <div class="mx-auto h-screen">
    <div
      class="mx-auto flex h-full w-full max-w-xs flex-col items-center justify-center"
    >
      <nuxt-img
        src="/images/Logo.svg"
        class="h-16 w-full pr-10"
        alt="StudyStorm Logo"
      />
      <div class="mt-16 w-full text-4xl font-bold">
        {{ $t("app.verify.title") }}
      </div>
      <div class="mt-10 w-full text-xl">
        {{ $t("app.verify.firstParagraph") }}
      </div>
      <br />
      <div class="w-full text-xl">{{ $t("app.verify.secondParagraph") }}</div>
      <a href="#" class="mt-16 w-full hover:text-storm-blue hover:underline">{{
        $t("app.verify.noEmail")
      }}</a>
    </div>
  </div>
</template>
