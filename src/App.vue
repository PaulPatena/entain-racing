<script setup lang="ts">
import BrandThemeSwitcher from '@/components/BrandThemeSwitcher.vue'
import CategoryFilter from '@/components/CategoryFilter.vue'
import RaceList from '@/components/RaceList.vue'
import FooterBar from '@/components/FooterBar.vue'
import { onMounted, onBeforeUnmount } from 'vue'
import { useRaceStore } from '@/stores/races'

const races = useRaceStore()
onMounted(() => { races.startTicker(); races.startPoller(15000) })
onBeforeUnmount(() => { races.stopPoller(); races.stopTicker() })
</script>

<template>
  <!-- Sticky footer layout wrapper -->
  <div class="min-h-screen flex flex-col bg-page text-text transition-colors duration-500">
    <!-- Main content grows to fill available space -->
    <main class="flex-1">
      <div class="mx-auto max-w-3xl p-6 space-y-6">
        <header class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 class="text-2xl font-semibold">
            Next-to-Go <span class="text-primary">Races</span>
          </h1>
          <BrandThemeSwitcher />
        </header>

        <section class="space-y-3">
          <CategoryFilter />
          <RaceList />
        </section>
      </div>
    </main>

    <!-- Footer stays at the bottom without causing overflow -->
    <FooterBar />
  </div>
</template>
