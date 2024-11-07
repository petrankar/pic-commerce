<template>
  <div class="basic-layout">
    <header>
      <slot name="header">Default Header</slot>
    </header>
    <main>
      <slot>Default Content</slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style scoped>
header {
  top: 0;
  position: sticky;
}

main {
  margin: 0.5rem;
  @media (min-width: 420px) {
    margin: 1rem;
  }
  @media (min-width: 824) {
    margin: 2rem;
  }
}

footer {
  margin-top: auto;
}
</style>
