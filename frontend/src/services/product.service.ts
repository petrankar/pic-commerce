import type { PaginatedResponse } from '../types/product.types'

const BASE_URL = 'http://localhost:3000'

export async function fetchProductsByPage(
  page: number,
  perPage: number = 10,
): Promise<PaginatedResponse> {
  try {
    const response = await fetch(
      `${BASE_URL}/products?_page=${page}&_per_page=${perPage}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (!response.ok)
      throw new Error(`Failed to fetch products: ${response.statusText}`)

    const res = await response.json()
    return res
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}
