import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import MainPage from '../pages/MainPage.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: MainPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active',
});

export default router;
