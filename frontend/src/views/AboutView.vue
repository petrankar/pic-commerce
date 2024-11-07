<script setup lang="ts">
import AboutUs from '@/components/AboutUs/AboutUs.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import TheHeader from '@/components/Header/TheHeader.vue'
</script>

<template>
  <DefaultLayout>
    <template #header>
      <TheHeader />
    </template>
    <AboutUs />
  </DefaultLayout>
</template>
