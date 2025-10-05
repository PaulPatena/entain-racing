<script setup lang="ts">
import { computed } from 'vue'
import { useRaceStore } from '@/stores/races'
import { CATEGORY_LABELS, type CategoryID } from '@/types/racing'
import {ACTIVE_BUTTON_STYLE, DEFAULT_BUTTON_STYLE} from "@/components/constants";

const store = useRaceStore()
const categories = computed(() => Object.keys(CATEGORY_LABELS) as CategoryID[])

function selectCategory(id: CategoryID | null) {
  store.setCategory(id)
}
</script>

<template>
  <div class="space-y-2">
    <h2 class="text-sm opacity-80">Filter</h2>

    <div class="flex flex-wrap gap-2" role="group" aria-label="Race category">
      <!-- “All” -->
      <button
          type="button"
          :class="[
              DEFAULT_BUTTON_STYLE,
              store.selected === null && ACTIVE_BUTTON_STYLE
          ]"
          :aria-pressed="store.selected === null"
          @click="selectCategory(null)"
      >
        All
      </button>

      <!-- Individual categories -->
      <button
          v-for="id in categories"
          :key="id"
          type="button"
          :class="[
              DEFAULT_BUTTON_STYLE,
              store.selected === id && ACTIVE_BUTTON_STYLE
          ]"
          :aria-pressed="store.selected === id"
          @click="selectCategory(id)"
      >
        {{ CATEGORY_LABELS[id] }}
      </button>
    </div>
  </div>
</template>
