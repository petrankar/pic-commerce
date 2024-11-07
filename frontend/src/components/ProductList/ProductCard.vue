<script setup lang="ts">
import { toRefs } from 'vue'
import type { PropType } from 'vue'
import type { Product } from '@/types/product.types'
const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true,
  },
})

const emits = defineEmits(['clicked'])

const { name, price, image, description } = toRefs(props.product)
</script>

<template>
  <div class="product-card">
    <div class="img-container">
      <img :src="image" :alt="name" loading="lazy" />
    </div>
    <div class="description">
      <div class="details">
        <h3>{{ name }}</h3>
        <span class="yellow">${{ price }}</span>
      </div>
      <h4>{{ description }}</h4>
    </div>
    <button @click="emits('clicked')">Add to Basket</button>
  </div>
</template>

<style scoped>
.product-card {
  background-color: rgb(19, 19, 19);
  border: 1px solid rgb(70, 70, 70, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 300px;

  .img-container {
    width: inherit;
    max-height: 280px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .details {
    display: flex;
    justify-content: space-between;
    gap: 6px;
  }
  .description {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 6px;
    padding: 8px;
  }

  button {
    padding: 8px;
    background-color: var(--vt-c-indigo);
    color: var(--vt-c-white-soft);
    font-size: 1rem;
  }
}
</style>
