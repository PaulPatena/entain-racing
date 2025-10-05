<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <footer
      class="w-full border-t border-primary-soft bg-surface text-text transition-colors duration-300"
      role="contentinfo"
  >
    <div
        class="mx-auto max-w-3xl px-6 py-3 text-sm flex flex-col sm:flex-row items-center justify-between gap-2"
    >
      <span class="opacity-80 text-center sm:text-left">
        made by <span class="font-medium">Paul Patena</span> © 2025
      </span>

      <a
          href="https://paulpatena.com"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 text-primary hover:text-accent transition-colors duration-200"
      >
        paulpatena.com
        <Icon icon="mdi:open-in-new" class="w-4 h-4" />
      </a>
    </div>
  </footer>
</template>
