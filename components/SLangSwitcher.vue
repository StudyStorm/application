<script setup lang="ts">
const i18n = useI18n();
</script>
<template>
  <div>
    <slot
      v-for="locale in $i18n.locales"
      :key="locale.code"
      :locale="locale"
      :on-click="() => i18n.setLocale(locale.code)"
      :active="i18n.locale.value === locale.code"
    />
  </div>
</template>
