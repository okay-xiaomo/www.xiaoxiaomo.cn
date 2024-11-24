import './assets/main.css'
import './assets/app.less'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import VueTyped from 'vue3-typed-js'

import Vuesax from 'vuesax-alpha'
import { MotionPlugin } from '@vueuse/motion'

import 'vuesax-alpha/dist/index.css'
import 'vuesax-alpha/theme-chalk/dark/css-vars.css'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueTyped)
app.use(Vuesax)
app.use(MotionPlugin)

app.mount('#app')
