<template>
  <PageTitle title="Create Invoice" />
  <form class="form" @submit.prevent="handleSubmit">
    <div class="form-group">
      <div class="form-col">
        <div class="form-field">
          <label>Invoice Name</label>
          <div class="form-input-group">
            <input type="text" class="form-input" required v-model.trim="invoice.name" />
          </div>
        </div>
        <div class="form-field">
          <label>Who is this invoice from?</label>
          <div class="form-input-group">
            <input type="text" class="form-input" required v-model.trim="invoice.from" />
          </div>
        </div>
      </div>
      <div class="form-col">
        <div class="form-field">
          <label>Invoice Date</label>
          <div class="form-input-group">
            <input type="date" class="form-input" required v-model.trim="invoice.date" />
          </div>
        </div>
        <div class="form-field">
          <label>Who is this invoice to?</label>
          <div class="form-input-group">
            <input type="text" class="form-input" required v-model.trim="invoice.billTo" />
          </div>
        </div>
      </div>
    </div>
    <div class="form-items">
      <div class="form-items-heading">
        <div>Item Name</div>
        <div>Quantity</div>
        <div>Rate</div>
        <div>Amount</div>
      </div>
      <div class="form-item" v-for="item in invoice.items" :key="item.id">
        <div class="form-item-name">
          <button type="button" class="form-item-delete" @click="deleteItem(item.id)">x</button>
          <div class="form-input-group">
            <input
              type="text"
              class="form-input"
              placeholder="Product or item name"
              v-model.trim="item.name"
              required
            />
          </div>
        </div>
        <div class="form-input-group">
          <input type="number" class="form-input" placeholder="0" v-model.number="item.quantity" />
        </div>
        <div class="form-input-group">
          <div class="form-input-prefix">$</div>
          <input type="number" class="form-input" placeholder="0" step="0.01" v-model.number="item.rate" />
        </div>
        <div class="form-item-amount">
          <span class="form-item-amount-val">
            {{ calculateItemAmount(item.id, item.quantity, item.rate) }}
          </span>
        </div>
      </div>
      <button type="button" class="form-item-add" @click="addItem">Add New Item</button>
    </div>
    <div class="form-group">
      <div class="form-col">
        <div class="form-field">
          <label>Invoice Notes</label>
          <div class="form-input-group">
            <textarea rows="3" class="form-text" v-model.trim="invoice.notes"></textarea>
          </div>
        </div>
      </div>
      <div class="form-col">
        <div class="form-field">
          <label>Invoice Terms</label>
          <div class="form-input-group">
            <textarea rows="3" class="form-text" v-model.trim="invoice.terms"></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="form-summary">
      <div class="form-summary-value">Total: {{ calculateTotal() }}</div>
    </div>
    <div class="form-group">
      <div class="form-col">
        <div class="form-field-row">
          <label>Paid</label>
          <div class="form-input-group">
            <input type="checkbox" class="form-checkbox" v-model="invoice.isPaid" />
          </div>
        </div>
      </div>
      <div class="form-col form-submit">
        <button type="submit" class="form-submit-button">Save Invoice</button>
      </div>
    </div>
  </form>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import PageTitle from '../components/PageTitle.vue';

export default {
  data() {
    return {
      invoice: {},
    };
  },
  methods: {
    handleSubmit() {
      this.$store.commit('addInvoice', this.invoice);
      this.$router.push('/');
    },
    addItem() {
      this.invoice.items.push({
        id: uuidv4(),
        name: '',
        quantity: null,
        rate: null,
        amount: null,
      });
    },
    deleteItem(itemId) {
      this.invoice.items = this.invoice.items.filter((item) => item.id !== itemId);
    },
    calculateTotal() {
      const total = this.invoice.items.reduce((a, c) => a + c.amount, 0);
      this.invoice.total = total;
      return this.$convertMoney(total);
    },
    calculateItemAmount(itemId, qty, rate) {
      const itemIndex = this.invoice.items.findIndex((item) => item.id === itemId);
      const itemTotal = qty * rate;
      this.invoice.items[itemIndex].amount = itemTotal;
      return this.$convertMoney(itemTotal);
    },
  },
  created() {
    this.invoice = {
      id: uuidv4(),
      name: 'Invoice',
      date: '',
      from: '',
      billTo: '',
      items: [
        {
          id: uuidv4(),
          name: '',
          quantity: null,
          rate: null,
          amount: 0,
        },
      ],
      notes: '',
      terms: '',
      isPaid: false,
      total: 0,
    };
  },
  components: {
    PageTitle,
  },
};
</script>

<style lang="scss">
.form {
  font-size: var(--size-s);

  &-group {
    @media screen and (min-width: 768px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem;
      align-items: center;
    }
  }

  &-col {
    width: 100%;
  }

  &-field {
    width: 100%;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  &-field-row {
    @extend .form-field;
    display: flex;
    align-items: center;

    .form-input-group {
      margin-top: 0;
      margin-bottom: 0;

      input {
        margin-left: 0.5rem;
      }
    }
  }

  &-input-group {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
    width: 100%;

    &:hover > * {
      box-shadow: 0 0 0 1px #d0d1d3;
    }

    &:focus-within > * {
      outline: 1px solid #d0d1d3;
    }
  }

  &-input-prefix {
    display: flex;
    align-items: center;
    height: 2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    box-shadow: 0 0 0 1px #e7e8eb;
  }

  &-input {
    width: 100%;
    height: 2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    box-shadow: 0 0 0 1px #e7e8eb;
    border: none;
  }

  &-checkbox {
    width: 1.2rem;
    height: 1.2rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
    outline: none;
    box-shadow: 0 0 0 1px #e7e8eb;
    cursor: pointer;

    &:checked {
      background: white url('../assets/check.svg') no-repeat;
      background-size: 1rem 1rem;
      background-position: 50% 50%;
    }
  }

  &-text {
    @extend .form-input;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    resize: none;
    height: unset;
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
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;

    div {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
  }

  &-item {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
  }

  &-item-name {
    display: flex;
    align-items: center;
  }

  &-item-delete {
    display: flex;
    align-items: center;
    height: 2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    background: transparent;
    box-shadow: 0 0 0 1px #e7e8eb;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
  }

  &-item-amount {
    display: flex;
    align-items: center;
    width: 100%;
    height: 2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-top: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &-item-amount-val {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &-item-add {
    display: flex;
    align-items: center;
    height: 2rem;
    margin-top: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    background: #eeeeee;

    &:hover {
      opacity: var(--opacity);
    }
  }

  &-summary-group {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  &-summary {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  &-submit {
    display: flex;
    justify-content: flex-end;
  }

  &-submit-button {
    display: flex;
    align-items: center;
    height: 2.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    background: var(--primary);
    color: #fff;
    border-radius: var(--rounded);

    &:hover {
      opacity: var(--opacity);
    }
  }
}
</style>
