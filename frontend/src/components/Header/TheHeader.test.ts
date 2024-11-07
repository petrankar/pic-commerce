import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TheHeader from '@/components/Header/TheHeader.vue'

// Mock the store
vi.mock('@/stores/shopping-basket', () => ({
  useShoppingBasketStore: vi.fn(),
}))

describe('TheHeader.vue', () => {
  it('nav should render correctly', () => {
    const wrapper = mount(TheHeader)
    expect(wrapper.find('nav').exists()).toBe(true)
  })

  it('contains the cart icon', () => {
    const wrapper = mount(TheHeader)
    expect(wrapper.find('.cart-icon').exists()).toBe(true)
  })
})
