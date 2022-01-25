<template>
  <PageTitle title="My Invoices" />
  <InvoiceList :invoices="invoices" />
</template>

<script>
import { mapState } from 'vuex';
import PageTitle from '../components/PageTitle.vue';
import InvoiceList from '../components/InvoiceList.vue';

export default {
  components: {
    PageTitle,
    InvoiceList,
  },
  computed: {
    ...mapState(['invoices']),
  },
};
</script>
