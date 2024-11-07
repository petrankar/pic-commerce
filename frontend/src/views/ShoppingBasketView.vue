<script setup lang="ts">
import { DefaultLayout } from '@/layouts'
import TheHeader from '@/components/Header/TheHeader.vue'
import { ShoppingBasket } from '@/components/ShoppingBasket'
</script>

<template>
  <DefaultLayout>
    <template #header>
      <TheHeader />
    </template>
    <ShoppingBasket />
  </DefaultLayout>
</template>
