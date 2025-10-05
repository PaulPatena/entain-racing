<script setup lang="ts">
import { computed } from 'vue'
import type { Race } from '@/types/racing'
import { useRaceStore } from '@/stores/races'
import { CATEGORY_LABELS } from '@/types/racing'
import RaceIcon from '@/components/icons/RaceIcon.vue'

const props = defineProps<{ race: Race }>()
const store = useRaceStore()

const REMOVAL_WINDOW_MS = 60_000

const remainingMs = computed(() => props.race.startMs - store.nowMs)
const startedAgoMs = computed(() => Math.max(0, store.nowMs - props.race.startMs))

const status = computed<'upcoming' | 'started' | 'stale'>(() => {
  if (remainingMs.value >= 0) return 'upcoming'
  if (remainingMs.value > -REMOVAL_WINDOW_MS) return 'started'
  return 'stale'
})

const mmss = computed(() => {
  const ms = Math.max(0, remainingMs.value)
  const totalSec = Math.floor(ms / 1000)
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
})

/** For started races: time until it disappears (counts down from 60s) */
const removalRemainMs = computed(() =>
    Math.max(0, REMOVAL_WINDOW_MS - startedAgoMs.value)
)
const removalRemainSec = computed(() => Math.ceil(removalRemainMs.value / 1000))
</script>

<template>
  <article
      class="flex flex-col gap-2 border rounded-brand p-3 transition-colors"
      :class="status === 'upcoming'
      ? 'border-primary-soft bg-surface'
      : status === 'started'
        ? 'border-primary bg-primary/10'
        : 'opacity-60 border-primary-soft'"
  >
    <div class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-3 min-w-0">
        <RaceIcon :categoryId="race.categoryId" class="w-5 h-5 text-primary shrink-0" />
        <div class="min-w-0">
          <div class="text-sm opacity-80 truncate">{{ race.meetingName }}</div>
          <div class="font-medium">Race {{ race.raceNumber }}</div>
          <div class="text-xs text-secondary">{{ CATEGORY_LABELS[race.categoryId] }}</div>
        </div>
      </div>

      <div class="text-right">
        <template v-if="status === 'upcoming'">
          <div class="text-xs opacity-70">Starts in</div>
          <div class="text-lg font-semibold tabular-nums text-primary">{{ mmss }}</div>
        </template>

        <template v-else-if="status === 'started'">
          <div class="text-xs opacity-70">Started</div>
          <div
              class="text-lg font-semibold tabular-nums"
              :class="removalRemainSec <= 10 ? 'text-danger' : 'text-primary'"
              aria-live="polite"
          >
            Removing in {{ String(removalRemainSec).padStart(2,'0') }}s
          </div>
        </template>
      </div>
    </div>
  </article>
</template>
