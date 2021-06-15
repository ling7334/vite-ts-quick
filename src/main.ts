import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from "./store";

import ElementPlus from "element-plus"
import "element-plus/lib/theme-chalk/index.css"

import { setupI18n } from './locale'
import zhCN from './locale/lang/zh-cn'

const i18n = setupI18n({
  legacy: false,
  locale: 'zh-cn',
  fallbackLocale: 'en',
  messages: {
    'zh-cn': zhCN
  }
})

import "./assets/css/setting.css"
import "./assets/css/global.css"

const app = createApp(App);

app.use(router);
app.use(store);
app.use(i18n);
app.use(ElementPlus);

app.mount('#app')

export default app;