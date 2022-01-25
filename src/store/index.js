import { createStore } from 'vuex'

const store = createStore({
    state: {
        invoices: [],
        currentInvoice: null
    },
    getters: {
        paidInvoices(state) {
            return state.invoices.filter(invoice => invoice.isPaid)
        }
    },
    mutations: {
        initialiseStore(state) {
            const initialInvoices = JSON.parse(localStorage.getItem('invoices_data7')) || [];
            state.invoices = initialInvoices;
        },
        addInvoice(state, payload) {
            state.invoices.push(payload)
        },
        setCurrentInvoice(state, payload) {
            state.currentInvoice = state.invoices.find((invoice) => invoice.id === payload)
        },
        deleteInvoice(state, payload) {
            state.invoices = state.invoices.filter((invoice) => invoice.id !== payload)
        }
    },
})

store.subscribe((_, state) => {
    localStorage.setItem('invoices_data7', JSON.stringify(state.invoices));
});

export default store;