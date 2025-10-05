<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import HarnessIcon from '@/components/icons/HarnessIcon.vue'

const GREYHOUND = '9daef0d7-bf3c-4f50-921d-8e818c60fe61'
const HARNESS   = '161d9be2-e909-4326-8c2c-35ed71fb460b'
const HORSE     = '4a2788f8-e825-4d36-9894-efd4baf1cfae'

const props = defineProps<{
  categoryId: string
  class?: string
}>()

const mode = computed(() => {
  if (props.categoryId === HARNESS) return { kind: 'custom' as const }
  if (props.categoryId === HORSE)   return { kind: 'iconify' as const, name: 'mdi:horse' }
  if (props.categoryId === GREYHOUND) return { kind: 'iconify' as const, name: 'mdi:dog-side' }
  return { kind: 'iconify' as const, name: 'mdi:help-circle' }
})
</script>

<template>
  <component
      :is="mode.kind === 'custom' ? HarnessIcon : Icon"
      v-bind="mode.kind === 'iconify' ? { icon: mode.name } : {}"
      :class="props.class"
  />
</template>
