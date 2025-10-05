<script setup lang="ts">
import { computed } from 'vue'
import { useRaceStore } from '@/stores/races'
import { CATEGORY_LABELS, type CategoryID } from '@/types/racing'

const store = useRaceStore()
const categories = Object.keys(CATEGORY_LABELS) as CategoryID[]

const isActive = (c: CategoryID) => store.selected.has(c)
const toggle = (c: CategoryID) => store.toggleCategory(c)
const showAll = computed(() => store.selected.size === 0)
const clearAll = () => store.clearCategories()
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <button
        class="px-3 py-1 text-sm border rounded-brand transition-colors duration-200"
        :class="showAll ? 'bg-primary text-white border-primary shadow-brand scale-[1.02]' : 'border-primary-soft hover:bg-primary/10'"
        @click="clearAll"
    >
      All
    </button>

    <button
        v-for="id in categories"
        :key="id"
        class="px-3 py-1 text-sm border rounded-brand transition-colors duration-200"
        :class="isActive(id) ? 'bg-primary text-white border-primary shadow-brand scale-[1.02]' : 'border-primary-soft hover:bg-primary/10'"
        @click="toggle(id)"
    >
      {{ CATEGORY_LABELS[id] }}
    </button>
  </div>
</template>
