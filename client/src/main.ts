import { VueQueryPlugin, VueQueryPluginOptions } from 'vue-query';
import { createApp } from 'vue';

import router from '@/router';
import store from '@/store';
import App from '@/App.vue';

const vueQueryPluginOptions: VueQueryPluginOptions = {
    queryClientConfig: {
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                refetchOnMount: false,
                staleTime: 1000 * 60 * 5,
            },
        },
    },
};

createApp(App).use(VueQueryPlugin, vueQueryPluginOptions).use(router).use(store).mount('#app');
