<template>
    <app-container class="categories">
        <page-header>
            <h1>Категории</h1>
        </page-header>
        <app-loader v-if="isLoading" class="loader" />
        <ul v-else class="list">
            <li v-for="category in categories" :key="category.id">
                <router-link class="item" :to="`/products/${category.id}`">
                    <category-item :category="category" variant="large" withHover />
                </router-link>
            </li>
        </ul>
    </app-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuery } from 'vue-query';

import CategoryItem from '@/components/logic/CategoryItem.vue';
import AppContainer from '@/components/ui/AppContainer.vue';
import PageHeader from '@/components/ui/PageHeader.vue';
import AppLoader from '@/components/ui/AppLoader.vue';
import { getCategories } from '@/api/categoryApi';

export default defineComponent({
    components: { AppContainer, CategoryItem, PageHeader, AppLoader },
    setup() {
        const { data: categories, isLoading, isError } = useQuery('categories', getCategories);
        return {
            categories,
            isLoading,
            isError,
        };
    },
});
</script>

<style lang="scss" scoped>
@import '../mixins.scss';
.categories {
    background-color: var(--dark-bg-color);
}
.list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    align-items: center;
    column-gap: 20px;
    row-gap: 30px;
    grid-auto-flow: dense;
}
.item {
    text-decoration: none;
}
.loader {
    margin: 0 auto;

    font-size: 20px !important;
    color: var(--primary-color);
}
</style>
