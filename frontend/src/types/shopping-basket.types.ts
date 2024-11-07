import type { Product } from './product.types'

export interface BasketItem extends Product {
  quantity: number
}
