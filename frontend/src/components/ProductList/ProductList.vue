<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { ProductCard, ProductSearch } from './'
import { fetchProductsByPage } from '@/services/product.service'
import { useShoppingBasketStore } from '@/stores/shopping-basket'
import type { Product } from '@/types'
import type { PaginatedResponse } from '@/types/product.types'

const products = ref<Product[] | null>(null)
const totalPages = ref<number | null>()
const prevPage = ref<number | null>()
const currentPage = ref<number>(1)
const nextPage = ref<number | null>()
const searchTerm = ref('')

const { add } = useShoppingBasketStore()

loadProducts()

const filteredProducts = computed(() => {
  if (!products.value?.length) return [] as Product[]
  return (
    products.value &&
    products.value.filter((product: Product) =>
      product.name.toLowerCase().includes(searchTerm.value.toLowerCase()),
    )
  )
})

async function loadProducts() {
  // products.value = []
  const res: PaginatedResponse = await fetchProductsByPage(currentPage.value)
  products.value = res.data ?? []
  totalPages.value = res.pages
  prevPage.value = res.prev
  nextPage.value = res.next
}

watch(currentPage, () => {
  loadProducts()
})
</script>

<template>
  <div>
    <div class="header">
      <h2>Products</h2>
      <ProductSearch v-model.trim="searchTerm" class="product-search" />
    </div>

    <div v-if="filteredProducts?.length" class="product-list">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product?.id"
        :product="product"
        @clicked="add(product)"
      />
    </div>
    <div v-else class="not-found">
      <h2>Products not found</h2>
      <h3>
        We're sorry, but we couldn't find any products matching your search
        term.
      </h3>
      <h3>Please try using different keywords or check your spelling</h3>
    </div>

    <div class="pagination" v-show="filteredProducts?.length">
      <button :disabled="!prevPage" @click="currentPage--">Previous</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button :disabled="!nextPage" @click="currentPage++">Next</button>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 8px 0;
}

.product-list {
  display: grid;
  gap: 16px;

  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  @media (min-width: 420px) {
    grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
  }
  @media (min-width: 824px) {
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  }
}

.not-found {
  margin-top: 1rem;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h3:not(:last-child) {
    margin-top: 0.5rem;
  }
}

.pagination {
  margin-top: 1rem;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 8px;

  button {
    padding: 0.5rem;
    min-width: 5rem;
  }

  span {
    font-size: 1.1rem;
  }
}
</style>
