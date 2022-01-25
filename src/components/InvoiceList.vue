<template>
  <div class="invoice-list">
    <InvoiceCard v-for="invoice in invoices" :key="invoice.id" :invoice="invoice" />
  </div>
</template>

<script>
import InvoiceCard from './InvoiceCard.vue';

export default {
  props: {
    invoices: {
      type: Array,
      required: true,
    },
  },
  components: {
    InvoiceCard,
  },
};
</script>

<style lang="scss">
.invoice-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.25rem;
}
</style>
