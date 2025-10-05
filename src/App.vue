<script setup lang="ts">
import BrandThemeSwitcher from '@/components/BrandThemeSwitcher.vue'
import CategoryFilter from '@/components/CategoryFilter.vue'
import RaceList from '@/components/RaceList.vue'
import { onMounted, onBeforeUnmount } from 'vue'
import { useRaceStore } from '@/stores/races'

const races = useRaceStore()

onMounted(() => {
  races.startTicker()
  races.startPoller(15000)
})
onBeforeUnmount(() => {
  races.stopPoller()
  races.stopTicker()
})
</script>

<template>
  <main class="min-h-screen bg-page text-text transition-colors duration-500 p-6">
    <div class="mx-auto max-w-3xl space-y-6">
      <header class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 class="text-2xl font-semibold">Next-to-Go <span class="text-primary">Races</span></h1>
        <BrandThemeSwitcher />
      </header>

      <section class="space-y-3">
        <CategoryFilter />
        <RaceList />
      </section>
    </div>
  </main>
</template>



<!--<script setup lang="ts">-->
<!--import BrandThemeSwitcher from '@/components/BrandThemeSwitcher.vue'-->
<!--</script>-->

<!--<template>-->
<!--  <main class="min-h-screen bg-page text-text transition-colors duration-500 p-6">-->
<!--    <div class="mx-auto max-w-2xl space-y-6">-->
<!--      <h1 class="text-3xl font-semibold">-->
<!--        Next-to-Go <span class="text-primary">Brand & Theme</span> Demo-->
<!--      </h1>-->

<!--      <BrandThemeSwitcher />-->

<!--      <section class="rounded-brand border border-primary-soft bg-primary/10 p-4 shadow-brand">-->
<!--        <p class="text-primary mb-4">Example branded elements:</p>-->
<!--        <div class="flex gap-2">-->
<!--          <button class="rounded-brand bg-primary px-4 py-2 text-white hover:opacity-90">Primary</button>-->
<!--          <button class="rounded-brand bg-secondary px-4 py-2 text-white hover:opacity-90">Secondary</button>-->
<!--          <button class="rounded-brand bg-accent px-4 py-2 text-white hover:opacity-90">Accent</button>-->
<!--        </div>-->
<!--      </section>-->
<!--    </div>-->
<!--  </main>-->
<!--</template>-->
