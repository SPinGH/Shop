import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import CategoriesPage from '@/pages/CategoriesPage.vue';
import ProductsPage from '@/pages/ProductsPage.vue';
import MainPage from '@/pages/MainPage.vue';
import AuthPage from '@/pages/AuthPage.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: MainPage,
    },
    {
        path: '/login',
        component: AuthPage,
    },
    {
        path: '/registration',
        component: AuthPage,
    },
    {
        path: '/categories',
        component: CategoriesPage,
    },
    {
        path: '/products/:id?',
        component: ProductsPage,
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/',
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active',
});

export default router;
