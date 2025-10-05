<template>
  <!-- Harness racing (sulky + driver + horse) -->
  <svg
      width="20"
      height="20"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="w-5 h-5"
      aria-hidden="true"
  >
    <!-- Wheels -->
    <circle cx="18" cy="46" r="5" />
    <circle cx="46" cy="46" r="5" />
    <!-- Sulky frame -->
    <path d="M23 46h16l8-10" />
    <!-- Traces to horse -->
    <path d="M30 40l6-6M36 38l5-5" />
    <!-- Driver -->
    <circle cx="27" cy="30" r="1.6" />
    <path d="M28 33c0 1.1.9 2 2 2h3" />
    <!-- Horse -->
    <path d="M41 30c5-3 10-4 15-3" />
    <path d="M56 27l3-3 3 2" />
    <path d="M41 30l-3 2" />
  </svg>
</template>
