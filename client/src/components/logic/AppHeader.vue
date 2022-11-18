<template>
    <header>
        <div :class="{ container: true, open: isMenuOpened }">
            <button
                class="menuButton"
                @click="toggleMenuVisible"
                aria-haspopup="true"
                :aria-label="menuButtonLabel"
                :aria-expanded="isMenuOpened">
                <img src="/logo.svg" alt="Logo" />
            </button>
            <div class="navWrapper" :inert="!isMenuOpened">
                <nav class="nav">
                    <ul class="links">
                        <li>
                            <router-link to="/" exact class="link" aria-label="На главную">
                                <main-icon />
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                to="/products"
                                :class="{ link: true, active: $route.path.startsWith('/products') }"
                                aria-label="К списку товаров">
                                <products-icon />
                            </router-link>
                        </li>
                        <li v-if="$store.state.auth.user?.role === 'USER'" aria-label="В корзину">
                            <router-link to="/cart" class="link">
                                <cart-icon />
                            </router-link>
                        </li>
                        <li v-else-if="$store.state.auth.user?.role === 'ADMIN'" aria-label="В панель администратора">
                            <router-link to="/admin" class="link">
                                <admin-icon />
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/search" class="link" aria-label="К поиску товаров">
                                <search-icon />
                            </router-link>
                        </li>
                    </ul>
                </nav>
                <button v-if="$store.state.auth.user" class="signOut" @click="logOut" aria-label="Выйти">
                    <auth-icon />
                </button>
                <router-link v-else to="/login" class="signIn" aria-label="Войти">
                    <auth-icon />
                </router-link>
            </div>
        </div>
    </header>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

import { AdminIcon, AuthIcon, ProductsIcon, SearchIcon, MainIcon, CartIcon } from '@/components/ui/Icons';

export default defineComponent({
    components: { MainIcon, ProductsIcon, AdminIcon, SearchIcon, AuthIcon, CartIcon },
    setup() {
        const store = useStore();
        const isMenuOpened = ref(true);

        const menuButtonLabel = computed(() => `${isMenuOpened.value ? 'Закрыть' : 'Открыть'} меню`);

        const toggleMenuVisible = () => (isMenuOpened.value = !isMenuOpened.value);
        const logOut = () => store.dispatch('logout');

        return {
            isMenuOpened,
            menuButtonLabel,
            toggleMenuVisible,
            logOut,
        };
    },
});
</script>

<style lang="scss" scoped>
.container {
    z-index: 5;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;

    font-size: 10px;

    display: flex;
    flex-direction: column;

    @media (max-width: 767px) {
        font-size: 8px;
        &.open .navWrapper {
            transform: translateY(0);
        }
    }
}
.menuButton {
    z-index: 5;
    padding: 1.5em 2em;
    border: none;
    border-radius: 0 0 50% 0;
    background-color: var(--bg-color);

    font-size: inherit;

    img {
        font-size: 3.2em;
        width: 1em;
        height: 1em;
        flex: 1em;
    }
}
.navWrapper {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;

    padding: 7em 2em 3em 2em;
    flex: 1 1 auto;
    overflow-y: auto;
    overflow-x: hidden;

    background-color: var(--bg-color);
    box-shadow: 0px 0px 2.5em 0px var(--shadow-color);

    display: flex;
    flex-direction: column;
    align-items: center;

    transition: transform 1s ease;

    @media (max-width: 767px) {
        transform: translateY(-100%);
    }
}
.nav {
    flex: 1 1 auto;
}
.links li {
    margin-bottom: 2.6em;
}
.link,
.signIn,
.signOut {
    display: block;
    border: none;
    background: none;
    text-align: center;
    cursor: pointer;
    padding: 8px;

    font-size: 2.5em;
    color: var(--text-color);
    transition: color 0.3s ease;

    svg {
        display: block;
    }
    @media (any-hover: hover) {
        &:not(.active):hover {
            color: var(--dark-text-color);
        }
    }
}
.link.active {
    color: var(--primary-color);
}
.signOut {
    transform: rotate(90deg);
}
</style>
