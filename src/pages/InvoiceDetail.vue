<template>
  <PageTitle title="Invoice Detail" />
  <div v-if="currentInvoice" class="invoice">
    <div class="invoice-heading">
      <h2>{{ currentInvoice.name }}</h2>
      <div class="invoice-actions">
        <button type="button" @click="deleteInvoice">
          <img svg-inline src="../assets/x.svg" />
        </button>
      </div>
    </div>
    <div class="invoice-content">
      <div class="invoice-info">
        <div>From: {{ currentInvoice.from }}</div>
        <div>Bill To: {{ currentInvoice.billTo }}</div>
      </div>
      <div class="invoice-info">
        <div>Date: {{ $dateFormat(currentInvoice.date) }}</div>
        <div>Paid: {{ currentInvoice.isPaid ? 'Yes' : 'No' }}</div>
      </div>
    </div>
    <div class="invoice-items">
      <div class="invoice-items-heading">
        <div>Item Name</div>
        <div>Quantity</div>
        <div>Rate</div>
        <div>Amount</div>
      </div>
      <div class="invoice-item" v-for="item in currentInvoice.items" :key="item.id">
        <div>{{ item.name }}</div>
        <div>{{ item.quantity }}</div>
        <div>{{ $convertMoney(item.rate) }}</div>
        <div>{{ $convertMoney(item.amount) }}</div>
      </div>
    </div>
    <div class="invoice-content">
      <div class="invoice-info">
        <div>Notes</div>
        <p v-if="currentInvoice.notes">{{ currentInvoice.notes }}</p>
      </div>
      <div class="invoice-info">
        <div>Terms</div>
        <p v-if="currentInvoice.terms">{{ currentInvoice.terms }}</p>
      </div>
    </div>
    <div class="invoice-content">
      <div class="invoice-info">
        <div>Total: {{ $convertMoney(currentInvoice.total) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PageTitle from '../components/PageTitle.vue';

export default {
  components: {
    PageTitle,
  },
  computed: {
    ...mapState(['currentInvoice']),
  },
  methods: {
    deleteInvoice() {
      this.$store.commit('deleteInvoice', this.currentInvoice.id);
      this.$router.push('/');
    },
  },
  created() {
    this.$store.commit('setCurrentInvoice', this.$route.params.id);
  },
};
</script>

<style lang="scss">
.invoice {
  background: #fff;
  border-radius: var(--rounded);
  padding: 1rem;
  font-size: var(--size-s);

  &-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;

    h2 {
      font-weight: 700;
      font-size: var(--size-m);
      width: 75%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  &-actions {
    display: flex;
    align-items: center;

    button {
      background: transparent;
      padding: 0.25rem 0.5rem;
      margin-left: 0.5rem;

      &:hover {
        opacity: var(--opacity);
      }
    }
  }

  &-content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  &-info {
    width: 100%;
    overflow: hidden;

    div {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    p {
      width: 100%;
      word-break: break-all;
      padding: 1rem;
      border: 1px solid #e7e8eb;
    }
  }

  &-items {
    width: 100%;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: var(--size-s);
  }

  &-items-heading {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    background: #eeeeee;
    padding: 0.25rem 0.5rem;
  }

  &-item {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    padding: 0.25rem 0.5rem;
    margin-top: 0.5rem;

    div {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
