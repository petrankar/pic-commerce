<script setup lang="ts">
import ProductList from '@/components/ProductList/ProductList.vue'
import { DefaultLayout } from '@/layouts'
import TheHeader from '@/components/Header/TheHeader.vue'
</script>

<template>
  <DefaultLayout>
    <template #header>
      <TheHeader />
    </template>
    <ProductList />
  </DefaultLayout>
</template>
