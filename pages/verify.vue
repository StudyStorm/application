<script setup lang="ts">

definePageMeta({
  layout: "nosidebar",
});
</script>

<template>
  <div class="h-screen mx-auto mt-10 md:mt-0">
    <div class="flex flex-col w-full h-full max-w-xs mx-auto md:justify-center">
      <nuxt-img src="/images/Logo.svg" class="w-full h-16 pr-10" alt="StudyStorm Logo" />
      <div class="w-full mt-16 text-4xl font-bold">
        {{  $t("app.verify.title")  }}
      </div>
      <div class="w-full mt-10 text-xl">
        {{  $t("app.verify.firstParagraph")  }}
      </div>
      <br />
      <div class="w-full text-xl">{{  $t("app.verify.secondParagraph")  }}</div>
      <a href="#" class="w-full mt-16 hover:text-storm-blue hover:underline">{{
         $t("app.verify.noEmail") 
        }}</a>
    </div>
  </div>
</template>
