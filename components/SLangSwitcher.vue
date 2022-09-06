<script setup lang="ts">
const i18n = useI18n();
</script>
<template>
  <slot
    v-for="(locale, index) in $i18n.locales"
    :key="locale.code"
    :tabindex="index"
    :locale="locale"
    :on-click="() => i18n.setLocale(locale.code)"
    :active="i18n.locale.value === locale.code"
  />
</template>
