import { createApp } from 'vue'
import './index.css'
import App from './App.vue'

import { registerPlugins } from '@/plugins'

const app = createApp(App)

registerPlugins(app)

app.config.performance = true
app.mount('#app')
