<template>
  <nav class="nav" :class="{ 'nav--open': isOpen }">
    <button type="button" class="nav-toggle" @click="$emit('toggle-nav')">
      <img svg-inline src="../assets/list.svg" />
    </button>
    <ul class="nav-list">
      <li class="nav-item">
        <router-link to="/" class="nav-link" active-class="nav-link--active">
          <div class="nav-link-icon">
            <img svg-inline src="../assets/house.svg" />
          </div>
          <span class="nav-link-text" :class="{ 'nav-link-text--visible': isOpen }">Home</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/create-invoice" class="nav-link" active-class="nav-link--active">
          <div class="nav-link-icon">
            <img svg-inline src="../assets/plus.svg" />
          </div>
          <span class="nav-link-text" :class="{ 'nav-link-text--visible': isOpen }">Create Invoice</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/paid-invoices" class="nav-link" active-class="nav-link--active">
          <div class="nav-link-icon">
            <img svg-inline src="../assets/check.svg" />
          </div>
          <span class="nav-link-text" :class="{ 'nav-link-text--visible': isOpen }">Paid Invoices</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['toggle-nav'],
};
</script>

<style lang="scss">
.nav {
  width: 4rem;
  min-height: 100vh;
  box-shadow: 0 0 0 1px #e7e8eb;
  padding: 2rem 0.5rem;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  overflow-x: hidden;

  @media screen and (min-width: 768px) {
    width: 5rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  &-toggle {
    display: flex;
    align-items: center;
    height: 2.5rem;
    background: transparent;
    padding-left: 1rem;
    padding-right: 1rem;

    &:hover {
      opacity: var(--opacity);
    }
  }

  &-list {
    margin-top: 1.25rem;
  }

  &-item {
    margin-bottom: 0.75rem;
  }

  &-link {
    display: flex;
    align-items: center;
    height: 2.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    border-radius: var(--rounded);

    &:hover:not(.nav-link--active) {
      opacity: var(--opacity);
    }

    &--active {
      background-color: var(--primary);
      color: #fff;
    }

    &-text {
      display: none;
      margin-left: 0.5rem;
      white-space: nowrap;

      &--visible {
        display: block;
      }
    }
  }
}

.nav--open {
  width: 14rem;
}
</style>
