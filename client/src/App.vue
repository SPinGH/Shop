<template>
    <div v-if="$store.state.auth.isLoading" class="center">
        <app-loader />
    </div>
    <template v-else>
        <app-header />
        <app-aside />
        <router-view />
    </template>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';

import AppHeader from '@/components/logic/AppHeader.vue';
import AppAside from '@/components/logic/AppAside.vue';
import AppLoader from '@/components/ui/AppLoader.vue';
import { State } from '@/store';

export default defineComponent({
    components: { AppLoader, AppHeader, AppAside },
    setup() {
        const store = useStore<State>();

        onMounted(() => store.dispatch('auth'));
    },
});
</script>

<style>
@import './reset.scss';
@import './vars.scss';
html {
    font-family: 'Montserrat', sans-serif;
}
.center {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    font-size: 30px;
    background-color: var(--bg-color);
    color: var(--primary-color);
}
</style>
