<script setup lang="ts">
import { useBrandTheme, type Brand, type Theme } from '@/composables/useBrandTheme'

const { activeBrand, activeTheme, applyBrand, applyTheme } = useBrandTheme()
</script>

<template>
  <section class="space-y-4">
    <div>
      <h2 class="text-sm opacity-80 mb-2">Brand</h2>
      <div class="flex gap-3">
        <button
            v-for="b in ['blue','red','purple']"
            :key="b"
            @click="applyBrand(b as Brand)"
            class="px-3 py-1 text-sm transition-all duration-200 border rounded-brand"
            :class="[
            'border-primary-soft',
            activeBrand === b
              ? 'bg-primary text-white border-primary shadow-brand scale-[1.02]'
              : 'bg-transparent hover:bg-primary/10'
          ]"
        >
          {{ b }}
        </button>
      </div>
    </div>

    <div>
      <h2 class="text-sm opacity-80 mb-2">Theme</h2>
      <div class="flex gap-3">
        <button
            v-for="t in ['light','dark']"
            :key="t"
            @click="applyTheme(t as Theme)"
            class="px-3 py-1 text-sm transition-all duration-200 border rounded-brand"
            :class="[
            'border-primary-soft',
            activeTheme === t
              ? 'bg-primary text-white border-primary shadow-brand scale-[1.02]'
              : 'bg-transparent hover:bg-primary/10'
          ]"
        >
          {{ t }}
        </button>
      </div>
    </div>
  </section>
</template>
