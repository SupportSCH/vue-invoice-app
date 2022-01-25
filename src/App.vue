<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<script>
import Layout from './components/Layout.vue';

export default {
  name: 'App',
  components: {
    Layout,
  },
  data() {
    return {
      title: 'Invoice App',
    };
  },
  watch: {
    $route(to) {
      document.title = `${to.name} - ${this.title}`;
    },
  },
  created() {
    this.$store.commit('initialiseStore');
    document.title = this.title;
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@700&family=Poppins:wght@300;400;500;600&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --size-s: 0.875rem;
  --size-m: 1rem;
  --size-l: 1.4rem;
  --size-xl: 1.5rem;
  --rounded: 7px;
  --opacity: 0.7;
  --primary: #158566;
}

html {
  font-family: 'Poppins', sans-serif;
  font-size: 14px;

  @media screen and (min-width: 768px) {
    font-size: 16px;
  }
}

li {
  list-style: none;
}

a {
  display: inline-block;
  text-decoration: none;
  color: inherit;
}

button {
  font-size: var(--size-medium);
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  border: 0;
  cursor: pointer;
}

input {
  outline: none;
}

svg {
  display: block;
  width: var(--size-m);
  height: var(--size-m);
  color: inherit;
  outline: none;
}
</style>
