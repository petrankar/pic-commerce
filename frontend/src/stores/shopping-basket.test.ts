import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useShoppingBasketStore } from '@/stores/shopping-basket' // Adjust to the correct path
import type { Product } from '@/types/'

describe('useShoppingBasketStore', () => {
  let store: ReturnType<typeof useShoppingBasketStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useShoppingBasketStore()
  })

  it('should add a product to the basket', () => {
    const product: Product = { id: 1, name: 'Product A', price: 100 }

    store.add(product)

    expect(store.products).toHaveLength(1)
    expect(store.products[0].id).toBe(1)
    expect(store.products[0].quantity).toBe(1)
  })

  it('should increase quantity if the product already exists in the basket', () => {
    const product: Product = { id: 1, name: 'Product A', price: 100 }

    store.add(product)
    store.add(product)

    expect(store.products[0].quantity).toBe(2)
  })

  it('should decrease quantity of a product', () => {
    const product: Product = { id: 1, name: 'Product A', price: 100 }

    store.add(product)
    store.add(product)
    store.decreaseQuantity(product.id)

    expect(store.products[0].quantity).toBe(1)
  })

  it('should remove product when quantity reaches 0 after decrease', () => {
    const product: Product = { id: 1, name: 'Product A', price: 100 }

    store.add(product)
    store.decreaseQuantity(product.id)

    expect(store.products).toHaveLength(0)
  })

  it('should calculate totalPrice correctly', () => {
    const productA: Product = { id: 1, name: 'Product A', price: 100 }
    const productB: Product = { id: 2, name: 'Product B', price: 50 }

    store.add(productA)
    store.add(productB)
    store.add(productA)

    expect(store.totalPrice).toBe(250)
  })

  it('should calculate totalCount correctly', () => {
    const productA: Product = { id: 1, name: 'Product A', price: 100 }
    const productB: Product = { id: 2, name: 'Product B', price: 50 }

    store.add(productA)
    store.add(productB)
    store.add(productA)

    expect(store.totalCount).toBe(3)
  })

  it('should empty the basket', () => {
    const product: Product = { id: 1, name: 'Product A', price: 100 }

    store.add(product)
    store.empty()

    expect(store.products).toHaveLength(0)
  })
})
