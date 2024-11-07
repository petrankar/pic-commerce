<script setup lang="ts">
const model = defineModel()
</script>

<template>
  <div class="search">
    <input v-model="model" type="text" placeholder="Search" />
  </div>
</template>

<style scoped>
input {
  padding: 6px;
}
</style>
