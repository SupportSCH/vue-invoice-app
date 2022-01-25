import { createRouter, createWebHistory } from 'vue-router'
import MyInvoices from '../pages/MyInvoices.vue'
import CreateInvoice from '../pages/CreateInvoice.vue'
import PaidInvoices from '../pages/PaidInvoices.vue'
import InvoiceDetail from '../pages/InvoiceDetail.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'My Invoices',
            component: MyInvoices
        },
        {
            path: '/invoice/:id',
            name: 'Invoice Detail',
            component: InvoiceDetail
        },
        {
            path: '/create-invoice',
            name: 'Create Invoice',
            component: CreateInvoice
        },
        {
            path: '/paid-invoices',
            name: 'Paid Invoices',
            component: PaidInvoices
        }
    ]
})

export default router;