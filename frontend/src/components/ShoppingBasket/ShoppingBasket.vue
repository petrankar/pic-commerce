<script setup lang="ts">
import { ShoppingBasketTable } from '.'
</script>

<template>
  <div class="header">
    <h2>Shopping Basket</h2>
    <RouterLink to="/">
      <span>Back to Product List</span>
    </RouterLink>
  </div>
  <ShoppingBasketTable />
</template>

<style scoped>
.header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
}
</style>
