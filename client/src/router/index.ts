import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const CategoriesPage = () => import('@/pages/CategoriesPage.vue');
const ProductsPage = () => import('@/pages/ProductsPage.vue');
const ProductPage = () => import('@/pages/ProductPage.vue');
const ProfilePage = () => import('@/pages/ProfilePage.vue');
const SearchPage = () => import('@/pages/SearchPage.vue');
const AdminPage = () => import('@/pages/AdminPage.vue');
const MainPage = () => import('@/pages/MainPage.vue');
const AuthPage = () => import('@/pages/AuthPage.vue');
const CartPage = () => import('@/pages/CartPage.vue');
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
        path: '/product/:id',
        component: ProductPage,
    },
    {
        path: '/search',
        component: SearchPage,
    },
    {
        path: '/cart',
        component: CartPage,
        meta: {
            allowRole: 'USER',
        },
    },
    {
        path: '/profile',
        component: ProfilePage,
        meta: {
            allowRole: 'USER',
        },
    },
    {
        path: '/admin',
        component: AdminPage,
        meta: {
            allowRole: 'ADMIN',
        },
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
