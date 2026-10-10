import { createRouter, createWebHistory } from 'vue-router'
import Avaleht from './views/Avaleht.vue'
import Info from './views/Info.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/',     component: Avaleht},
        {path: '/info', component: Info}
    ]
})

export default router