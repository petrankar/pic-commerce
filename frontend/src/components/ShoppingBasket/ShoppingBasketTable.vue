<script setup lang="ts">
import { toRefs } from 'vue'
import { ShoppingBasketItem } from './'
import { useShoppingBasketStore } from '@/stores/shopping-basket'

const store = useShoppingBasketStore()
const { products, totalPrice } = toRefs(store)
</script>
<template>
  <div v-if="products?.length" class="shopping-basket">
    <div class="header">
      <span>Price</span>
      <span>Quantity</span>
      <span>Total</span>
    </div>
    <TransitionGroup tag="div">
      <ShoppingBasketItem
        v-for="product in products"
        :key="product.id"
        :product="product"
        @increase="store.increaseQuantity(product.id)"
        @decrease="store.decreaseQuantity(product.id)"
      />
    </TransitionGroup>
    <div class="basket-footer">
      <h3 class="text">Total Payment</h3>
      <h3 class="total-price">{{ totalPrice.toFixed(2) }}</h3>
    </div>
  </div>
  <div v-else>
    <span>Shopping basket is empty, please add items from the</span>
    <RouterLink to="/"> product list page </RouterLink>
  </div>
</template>

<style scoped>
.shopping-basket {
  .header {
    display: flex;
    justify-content: flex-end;
    column-gap: 68px;
  }
  .basket-footer {
    display: flex;
    column-gap: 24px;
    justify-content: flex-end;
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
}

.shopping-basket > * {
  padding: 8px;
}
</style>
