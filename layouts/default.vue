<script setup lang="ts">
useHead({
  titleTemplate: (title) =>
    title !== "StudyStorm" ? `${title} - StudyStorm` : title,
});
</script>

<template>
  <div>
    <slot />
  </div>
</template>
