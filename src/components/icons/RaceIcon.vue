<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

// Constants for category IDs (same as in your types)
const GREYHOUND = '9daef0d7-bf3c-4f50-921d-8e818c60fe61'
const HARNESS   = '161d9be2-e909-4326-8c2c-35ed71fb460b'
const HORSE     = '4a2788f8-e825-4d36-9894-efd4baf1cfae'

const props = defineProps<{
  categoryId: string
  class?: string
}>()

// Map category → icon name in Iconify
const iconName = computed(() => {
  switch (props.categoryId) {
    case GREYHOUND:
      return 'mdi:dog-side'         // Material Design icon for dog
    case HORSE:
      return 'mdi:horse'       // Material Design icon for horse
    case HARNESS:
      return 'mdi:buggy'       // e.g. “buggy” as a close proxy (sulky) — adjust as you like
    default:
      return 'mdi:help-circle' // fallback icon
  }
})
</script>

<template>
  <Icon :icon="iconName" :class="props.class" />
</template>
