<script setup lang="ts">
defineProps<{ name: string }>()
</script>

<template>
  <p>Hello, {{ name }}</p>
</template>

<style scoped>
p { font-weight: 600; }
</style>
