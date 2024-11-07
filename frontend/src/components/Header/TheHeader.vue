<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { IconCart } from '@/components/icons/'
import { useShoppingBasketStore } from '@/stores/shopping-basket'

const isShaking = ref(false)

const { totalCount } = storeToRefs(useShoppingBasketStore())

watch(totalCount, () => {
  isShaking.value = true
})
</script>

<template>
  <nav>
    <RouterLink to="/"> <h2>Products</h2></RouterLink>
    <RouterLink to="/shopping-basket"><h2>Shopping Basket</h2></RouterLink>
    <RouterLink to="/about"> <h2>About us</h2></RouterLink>

    <RouterLink to="/shopping-basket" class="basket">
      <h2 class="yellow">{{ totalCount }}</h2>
      <transition name="shake">
        <IconCart
          :class="['cart-icon', { shake: isShaking }]"
          @animationend="isShaking = false"
        />
      </transition>
    </RouterLink>
  </nav>
</template>

<style>
nav {
  padding: 0.5rem;
  @media (min-width: 420px) {
    padding: 1rem;
  }
  @media (min-width: 824) {
    padding: 2rem;
  }

  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  line-height: 1.5;
  max-height: 100vh;
  border-bottom: 1px solid darkgrey;
  background-color: rgb(10, 10, 10);

  .basket {
    display: flex;
    gap: 4px;
    align-items: center;
    margin-left: auto;
  }
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.cart-icon {
  width: 36px;
  height: 36px;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
}

.shake {
  animation: shake 0.5s ease-in-out;
}
</style>
