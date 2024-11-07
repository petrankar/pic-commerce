import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { BasketItem, Product } from '@/types'

export const useShoppingBasketStore = defineStore('shopping-basket', () => {
  const products = ref<BasketItem[]>([])

  function add(product: Product) {
    const index = products.value.findIndex(p => p.id === product.id)
    if (index === -1) {
      products.value.push({ ...product, quantity: 1 })
      return
    }
    products.value[index].quantity++
  }

  const totalPrice = computed(() => {
    return products.value.reduce(
      (total: number, product: BasketItem) =>
        total + product.quantity * product.price,
      0,
    )
  })

  const totalCount = computed(() => {
    return products.value.reduce(
      (total: number, product: BasketItem) => total + product.quantity,
      0,
    )
  })

  function increaseQuantity(id: number) {
    const index = products.value.findIndex((p: BasketItem) => p.id === id)
    if (index === -1) return
    products.value[index].quantity++
  }

  function decreaseQuantity(id: number) {
    const index = products.value.findIndex((p: BasketItem) => p.id === id)
    if (index === -1) return
    if (products.value[index].quantity > 1) {
      products.value[index].quantity--
    } else {
      products.value.splice(index, 1)
    }
  }

  function empty() {
    products.value = []
  }

  return {
    products,
    totalPrice,
    totalCount,
    add,
    empty,
    increaseQuantity,
    decreaseQuantity,
  }
})
