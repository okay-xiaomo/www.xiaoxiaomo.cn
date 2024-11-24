<template>
  <main class="w-screen h-screen flex flex-col items-center justify-center">
    {{ title }}
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const title = ref('你好')
</script>
