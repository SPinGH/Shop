<template>
    <app-container class="products">
        <page-header>
            <h1>Товары</h1>
            <category-item class="category" v-if="category" :category="category" />
        </page-header>
        <app-loader v-if="isLoading" class="loader" />
        <ul v-else class="list">
            <li
                v-for="(product, index) in products"
                :key="product.id"
                :class="{ item: true, [`span${[1, 3, 1, 2, 1][index % 5]}`]: true }">
                <product-item-link
                    :product="product"
                    :variant="[1, 3, 1, 2, 1][index % 5] === 1 ? 'column' : 'twoColumn'" />
            </li>
        </ul>
        <app-button v-if="hasNextPage" class="more" variant="underline" @click="fetchNextPage" :loading="isFetching">
            Показать больше товаров
        </app-button>
        <p v-if="products && products.length === 0">Товары не найдены</p>
    </app-container>
</template>

<script lang="ts">
import { useInfiniteQuery, useQuery } from 'vue-query';
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

import ProductItemLink from '@/components/logic/ProductItemLink.vue';
import CategoryItem from '@/components/logic/CategoryItem.vue';
import AppContainer from '@/components/ui/AppContainer.vue';
import PageHeader from '@/components/ui/PageHeader.vue';
import AppLoader from '@/components/ui/AppLoader.vue';
import AppButton from '@/components/ui/AppButton.vue';
import { getProducts } from '@/api/productsApi';
import Category from '@/models/Category';

export default defineComponent({
    components: { AppContainer, PageHeader, CategoryItem, AppButton, AppLoader, ProductItemLink },
    setup() {
        const route = useRoute();

        const { data: categories } = useQuery<Category[]>('categories');

        const categoryId = computed(() => (route.params.id ? Number(route.params.id) : undefined));
        const category = computed(() => categories.value?.find((category) => category.id === categoryId.value));

        const { data, isLoading, isFetching, error, fetchNextPage, hasNextPage } = useInfiniteQuery(
            ['products', { categoryId }],
            ({ pageParam = 1 }) => getProducts({ categoryId: categoryId.value, page: pageParam }),
            {
                getNextPageParam: (lastPage, pages) =>
                    lastPage.count > pages.length * 5 ? pages.length + 1 : undefined,
            }
        );

        const products = computed(() => data.value?.pages.map((page) => page.rows).flat());

        return {
            category,
            products,
            isLoading,
            isFetching,
            error,
            hasNextPage,
            fetchNextPage,
        };
    },
});
</script>

<style lang="scss" scoped>
@import '../mixins.scss';
.products {
    background-color: var(--dark-bg-color);
    display: flex;
    flex-direction: column;
}
.category {
    padding: 0 !important;
}
.loader {
    align-self: center;
    font-size: 20px;
    color: var(--primary-color);
}
.list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-flow: dense;
    gap: 20px;
    margin-bottom: 20px;

    @media (max-width: 1140px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 600px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 424px) {
        grid-template-columns: 1fr;
    }
}
.item {
    &.span2 {
        grid-column: span 2;
    }
    &.span3 {
        grid-column: span 3;
    }
    @media (max-width: 600px) {
        &.span3 {
            grid-column: span 2;
        }
    }
    @media (max-width: 424px) {
        &.span2 {
            grid-column: span 1;
        }
        &.span3 {
            grid-column: span 1;
        }
    }
}
.more {
    align-self: center;
}
</style>
