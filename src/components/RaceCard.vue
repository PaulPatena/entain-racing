<script setup lang="ts">
import { computed } from 'vue'
import type { Race } from '@/types/racing'
import { useRaceStore } from '@/stores/races'

const props = defineProps<{ race: Race }>()
const store = useRaceStore()

const remainingMs = computed(() => props.race.startMs - store.nowMs)

const status = computed(() => {
  if (remainingMs.value >= 0) return 'upcoming'
  if (remainingMs.value > -60_000) return 'started'
  return 'stale'
})

const mmss = computed(() => {
  const ms = Math.max(0, remainingMs.value)
  const totalSec = Math.floor(ms / 1000)
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
})
</script>

<template>
  <article
      class="flex items-center justify-between gap-4 border rounded-brand p-3"
      :class="status === 'upcoming' ? 'border-primary-soft bg-surface'
            : status === 'started' ? 'border-primary bg-primary/10'
            : 'opacity-60 border-primary-soft'"
  >
    <div class="min-w-0">
      <div class="text-sm opacity-80">{{ race.meetingName }}</div>
      <div class="font-medium">Race {{ race.raceNumber }}</div>
    </div>
    <div class="text-right">
      <div class="text-xs opacity-70">Starts in</div>
      <div class="text-lg font-semibold tabular-nums text-primary">{{ mmss }}</div>
    </div>
  </article>
</template>
