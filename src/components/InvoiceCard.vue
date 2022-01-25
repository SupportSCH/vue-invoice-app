<template>
  <div class="invoice-card">
    <div class="invoice-card-content">
      <div class="invoice-card-info">
        <div class="invoice-card-name">{{ invoice.name }}</div>
        <div class="invoice-card-total">{{ $convertMoney(invoice.total) }}</div>
        <div class="invoice-card-date">{{ $dateFormat(invoice.date) }}</div>
      </div>
      <div class="invoice-card-badges">
        <div class="invoice-card-paid" v-if="invoice.isPaid">Paid</div>
      </div>
    </div>
    <router-link :to="`/invoice/${invoice.id}`" class="invoice-card-link">View More</router-link>
  </div>
</template>

<script>
export default {
  props: {
    invoice: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.invoice-card {
  background: #fff;
  border-radius: var(--rounded);
  box-shadow: 0 0 0 1px #e7e8eb;
  padding: 1rem;

  &-content {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  &-info {
    overflow: hidden;
  }

  &-name {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    font-size: var(--size-m);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &-total,
  &-date {
    font-size: var(--size-s);
    font-weight: 300;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &-badges {
    font-size: var(--size-s);
    margin-left: 1rem;
  }

  &-paid {
    padding: 0.25rem 1rem;
    background: #ccfbf1;
    color: #0f766e;
    border-radius: var(--rounded);
  }

  &-link {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 2rem;
    background: #eeeeee;

    &:hover {
      opacity: var(--opacity);
    }
  }
}
</style>
