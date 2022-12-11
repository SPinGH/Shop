<template>
    <statistics-card>
        <div class="header">
            <p class="title">Топ популярных товаров</p>
            <app-select class="select" :options="options" outlined v-model="categoryId" />
        </div>
        <app-loader v-if="isLoading" class="loader" />
        <ul class="list">
            <transition-group name="list">
                <li v-for="product in products" :key="product.id" class="item">
                    <product-item
                        :product="{
                            name: product.name,
                            img: product.img,
                        }"
                        variant="inline"
                        class="product" />
                    <product-likes :product="product" />
                </li>
            </transition-group>
        </ul>
        <p v-if="products?.length === 0" class="message">Товары не найдены</p>
        <p v-if="error" class="message">Произошла ошибка при загрузке</p>
    </statistics-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useQuery } from 'vue-query';

import StatisticsCard from '@/components/logic/StatisticsCard.vue';
import ProductLikes from '@/components/logic/ProductLikes.vue';
import ProductItem from '@/components/logic/ProductItem.vue';
import AppSelect from '@/components/ui/AppSelect.vue';
import AppLoader from '@/components/ui/AppLoader.vue';
import { getPopular } from '@/api/statisticsApi';
import Category from '@/models/Category';

export default defineComponent({
    components: { StatisticsCard, ProductItem, ProductLikes, AppSelect, AppLoader },
    setup() {
        const categoryId = ref('');

        const { data: categories } = useQuery<Category[]>('categories');

        const params = computed(() => ({
            categoryId: categoryId.value !== '' ? Number(categoryId.value) : undefined,
        }));

        const options = computed(() => [
            { value: '', label: 'Не выбрано' },
            ...(categories.value?.map((category) => ({ value: category.id.toString(), label: category.name })) ?? []),
        ]);

        const {
            data: products,
            isLoading,
            isFetching,
            error,
        } = useQuery(['popular', params], () => getPopular(params.value), { keepPreviousData: true });

        return {
            categoryId,
            options,
            products,
            isLoading,
            isFetching,
            error,
        };
    },
});
</script>

<style lang="scss" scoped>
.header {
    margin-bottom: 10px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
}
.select {
    font-size: 16px !important;
}
.loader {
    align-self: center;
    font-size: 20px;
    color: var(--primary-color);
}
.list {
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
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
}
.product {
    padding: 0 !important;
}
.message {
    font-size: 0.8em;
}
</style>
