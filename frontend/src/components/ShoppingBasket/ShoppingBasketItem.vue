<script setup lang="ts">
import type { PropType } from 'vue'
import type { BasketItem } from '@/types'

defineProps({
  product: {
    type: Object as PropType<BasketItem>,
    required: true,
  },
})
const emits = defineEmits(['increase', 'decrease'])
</script>

<template>
  <div class="shopping-basket-item">
    <div class="details">
      <img :src="product.image" :alt="product.name" loading="lazy" />
      <span>{{ product.name }}</span>
      <span class="yellow">${{ product.price.toFixed(2) }}</span>
    </div>
    <div class="numbers">
      <div class="quantity">
        <button @click="emits('decrease')">-</button>
        <span class="number">{{ product.quantity }}</span>
        <button @click="emits('increase')">+</button>
      </div>
      <div class="total">
        {{ (product.price * product.quantity).toFixed(2) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.shopping-basket-item {
  margin-bottom: 8px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgb(100, 100, 100);
  border-radius: 4px;
  gap: 16px;
  flex-wrap: wrap;
  @media (min-width: 480px) {
    flex-wrap: nowrap;
  }

  .details {
    display: flex;
    align-items: center;
    column-gap: 20px;

    img {
      height: auto;
      width: 64px;
    }
  }

  .numbers {
    display: flex;
    gap: 10px;
    align-items: center;

    .quantity {
      display: flex;
      gap: 12px;

      .number {
        min-width: 20px;
        text-align: center;
      }

      button {
        width: 28px;
        background-color: rgb(136, 136, 136);
        border: none;
        border-radius: 4px;
      }

      button:nth-child(1) {
        background-color: v-bind(
          'product.quantity === 1 ? "rgb(165, 40, 40)" :"rgb(136, 136, 136)"'
        );
      }
    }

    .total {
      min-width: 3.5rem;
      text-align: right;
    }
  }
}

.shopping-basket-item > * {
  /* border: 1px solid red; */
  padding: 4px;
}
</style>
