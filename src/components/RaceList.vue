<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRaceStore } from '@/stores/races'
import RaceCard from '@/components/RaceCard.vue'

const store = useRaceStore()
const { visible, loading, error } = storeToRefs(store)
</script>

<template>
  <div class="space-y-3">
    <div v-if="error" class="text-sm text-white bg-danger rounded-brand px-2 py-1">Error: {{ error }}</div>

    <template v-if="loading && visible.length === 0">
      <div v-for="i in 5" :key="i" class="h-[68px] rounded-brand bg-muted animate-pulse"></div>
    </template>

    <template v-else>
      <RaceCard v-for="r in visible" :key="r.id" :race="r" />
      <div v-if="visible.length === 0" class="text-sm opacity-70">
        No races matching current filters in the next few minutes.
      </div>
    </template>
  </div>
</template>
