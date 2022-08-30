<script setup></script>
<template>
  <div class="min-h-full">
    <SideBar />
    <div class="flex flex-col lg:pl-64">
      <main class="flex-1">
        <slot />
      </main>
    </div>
  </div>
</template>
