<script setup lang="ts">
import { useBrandTheme, type Brand, type Theme } from '@/composables/useBrandTheme'
import {ACTIVE_BUTTON_STYLE, DEFAULT_BUTTON_STYLE} from "@/components/constants";

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
            :class="[
            DEFAULT_BUTTON_STYLE,
            activeBrand === b && ACTIVE_BUTTON_STYLE
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
            :class="[
            DEFAULT_BUTTON_STYLE,
            activeTheme === t && ACTIVE_BUTTON_STYLE
          ]"
        >
          {{ t }}
        </button>
      </div>
    </div>
  </section>
</template>
