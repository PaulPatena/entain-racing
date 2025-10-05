<script setup lang="ts">
import { computed } from 'vue'
import { useRaceStore } from '@/stores/races'
import { CATEGORY_LABELS, type CategoryID } from '@/types/racing'

const store = useRaceStore()
const categories = computed(() => Object.keys(CATEGORY_LABELS) as CategoryID[])

function onChange(e: Event) {
  const value = (e.target as HTMLInputElement).value
  store.setCategory(value === 'ALL' ? null : (value as CategoryID))
}
</script>

<template>
  <fieldset class="flex flex-wrap items-center gap-2" role="radiogroup" aria-label="Race category">
    <!-- All -->
    <label
        class="px-3 py-1 text-sm border rounded-brand transition-colors duration-200 cursor-pointer"
        :class="store.selected === null
        ? 'bg-primary text-white border-primary shadow-brand scale-[1.02]'
        : 'border-primary-soft hover:bg-primary/10'"
    >
      <input
          type="radio"
          name="race-category"
          value="ALL"
          class="sr-only"
          :checked="store.selected === null"
          @change="onChange"
      />
      All
    </label>

    <!-- Individual categories -->
    <label
        v-for="id in categories"
        :key="id"
        class="px-3 py-1 text-sm border rounded-brand transition-colors duration-200 cursor-pointer"
        :class="store.selected === id
        ? 'bg-primary text-white border-primary shadow-brand scale-[1.02]'
        : 'border-primary-soft hover:bg-primary/10'"
    >
      <input
          type="radio"
          name="race-category"
          :value="id"
          class="sr-only"
          :checked="store.selected === id"
          @change="onChange"
      />
      {{ CATEGORY_LABELS[id] }}
    </label>
  </fieldset>
</template>

<style scoped>
/* hide-only-visually utility */
.sr-only {
  position: absolute;
  width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
}
</style>
