import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import { convertMoney } from './utils/convertMoney';
import { dateFormat } from './utils/dateFormat';

const app = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');

app.config.globalProperties.$dateFormat = dateFormat;
app.config.globalProperties.$convertMoney = convertMoney;

