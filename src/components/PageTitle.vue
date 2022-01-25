<template>
  <header>
    <h1>{{ title }}</h1>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
header {
  display: flex;
  align-items: center;
  height: 2.5rem;
  margin-bottom: 1.25rem;

  h1 {
    font-size: var(--size-l);
  }
}
</style>
