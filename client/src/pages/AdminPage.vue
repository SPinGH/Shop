<template>
    <app-container class="admin">
        <page-header><h1>Панель Администратора</h1></page-header>
        <app-tabs class="tabs">
            <app-tab title="Товары"><products-tab /></app-tab>
            <app-tab title="Категории"><categories-tab /></app-tab>
        </app-tabs>
    </app-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import CategoriesTab from '@/components/logic/CategoriesTab.vue';
import ProductsTab from '@/components/logic/ProductsTab.vue';
import AppContainer from '@/components/ui/AppContainer.vue';
import PageHeader from '@/components/ui/PageHeader.vue';
import AppTabs from '@/components/ui/AppTabs.vue';
import AppTab from '@/components/ui/AppTab.vue';

export default defineComponent({
    components: { AppContainer, PageHeader, AppTabs, AppTab, ProductsTab, CategoriesTab },
});
</script>

AppContainer
<style lang="scss" scoped>
@import '../mixins.scss';
.admin {
    display: flex;
    flex-direction: column;

    background-color: var(--dark-bg-color);
}
.tabs {
    flex: 1 1 auto;
}
</style>
