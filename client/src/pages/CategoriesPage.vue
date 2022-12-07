<template>
    <app-container class="categories">
        <page-header>
            <h1>Категории</h1>
        </page-header>
        <app-loader v-if="isLoading" class="loader" />
        <ul class="list">
            <transition-group name="list">
                <li v-for="category in categories" :key="category.id">
                    <router-link class="item" :to="`/products/${category.id}`">
                        <category-item :category="category" variant="large" withHover />
                    </router-link>
                </li>
            </transition-group>
        </ul>
        <p v-if="categories?.length === 0">Категории не найдены</p>
        <p v-if="error">Произошла ошибка при загрузке</p>
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
        const { data: categories, isLoading, error } = useQuery('categories', getCategories);
        return {
            categories,
            isLoading,
            error,
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

    position: relative;
    &-enter-from,
    &-leave-to {
        opacity: 0;
    }
    &-leave-active {
        position: absolute;
    }
    .item {
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
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
