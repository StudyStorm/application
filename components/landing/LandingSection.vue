<script setup lang="ts">
defineProps<{
  backgroundClass: string;
  id: string;
}>();
</script>

<template>
  <section :id="id" :class="backgroundClass" class="py-8 px-4">
    <div class="mx-auto max-w-screen-xl">
      <slot></slot>
    </div>
  </section>
</template>
