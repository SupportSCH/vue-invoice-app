<template>
  <PageTitle title="Paid Invoices" />
  <InvoiceList :invoices="paidInvoices" />
</template>

<script>
import { mapGetters } from 'vuex';
import PageTitle from '../components/PageTitle.vue';
import InvoiceList from '../components/InvoiceList.vue';

export default {
  computed: {
    ...mapGetters(['paidInvoices']),
  },
  components: {
    PageTitle,
    InvoiceList,
  },
};
</script>
