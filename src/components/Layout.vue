<template>
  <div class="app-body">
    <Nav @toggle-nav="toggleNav" :isOpen="navIsOpen" />
    <main class="app-content" :class="{ 'app-content--shrink': navIsOpen }">
      <slot></slot>
    </main>
  </div>
</template>

<script>
import Nav from './Nav.vue';

export default {
  components: {
    Nav,
  },
  data() {
    return {
      navIsOpen: false,
    };
  },
  methods: {
    toggleNav() {
      this.navIsOpen = !this.navIsOpen;
    },
  },
};
</script>

<style lang="scss">
.app-body {
  display: flex;
  width: 100%;
  min-height: 100vh;
  overflow-x: auto;
}

.app-content {
  width: 100%;
  background: #fafafa;
  overflow: hidden;
  padding: 2rem 1rem;

  @media screen and (min-width: 768px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  &--shrink {
    flex-shrink: 0;

    @media screen and (min-width: 768px) {
      flex-shrink: 1;
    }
  }
}
</style>
