import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { installAxiosConfig } from '@/lib/api';
import { installGlobalComponents } from '@/components';

import App from './App.vue';
import router from './router';

import './assets/main.css';

const app = createApp(App);

installAxiosConfig(app);
installGlobalComponents(app);

app.use(createPinia());
app.use(router);

app.mount('#app');
