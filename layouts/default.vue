<template>
  <div class="h-screen min-h-screen flex-col md:flex">
    <!-- TODO: Move Body classes to script setup? -->
    <Body
      class="bg-white text-black antialiased transition-colors selection:bg-green-400 selection:text-[black]"
    />
    <div class="relative h-full"><slot /></div>
  </div>
</template>
