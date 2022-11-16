<template>
    <div v-if="isLoading" class="center">
        <app-loader />
    </div>
    <router-view v-else />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

import AppLoader from '@/components/ui/AppLoader.vue';
import { getUser } from '@/api/userApi';
import { State } from '@/store';

export default defineComponent({
    components: { AppLoader },
    setup() {
        const store = useStore<State>();

        const isLoading = ref(true);

        getUser()
            .then((user) => {
                store.commit('SetUser', user);
            })
            .finally(() => {
                isLoading.value = false;
            });

        return {
            isLoading,
        };
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
