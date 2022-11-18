import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import CategoriesPage from '@/pages/CategoriesPage.vue';
import ProductsPage from '@/pages/ProductsPage.vue';
import SearchPage from '@/pages/SearchPage.vue';
import MainPage from '@/pages/MainPage.vue';
import AuthPage from '@/pages/AuthPage.vue';
import store from '@/store';

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
        path: '/search',
        component: SearchPage,
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

router.beforeEach((to, from, next) => {
    if (
        (to.meta.allowRole === 'USER' && store.state.auth.user?.role !== 'USER') ||
        (to.meta.allowRole === 'ADMIN' && store.state.auth.user?.role !== 'ADMIN')
    ) {
        next(from.path);
    } else {
        next();
    }
});

export default router;
