export interface Product {
  id: number
  name: string
  price: number
  image?: string
  description?: string
}

export interface PaginatedResponse {
  data: Product[]
  first: number | null
  items: number | null
  last: number | null
  next: number | null
  pages: number | null
  prev: number | null
}
