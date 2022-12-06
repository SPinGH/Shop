<template>
    <statistics-card>
        <div class="header">
            <p class="title">Топ популярных товаров</p>
            <app-select class="select" :options="options" outlined v-model="categoryId" />
        </div>
        <ul>
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
    </statistics-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useQuery } from 'vue-query';

import StatisticsCard from '@/components/logic/StatisticsCard.vue';
import ProductLikes from '@/components/logic/ProductLikes.vue';
import ProductItem from '@/components/logic/ProductItem.vue';
import AppSelect from '@/components/ui/AppSelect.vue';
import { getPopular } from '@/api/statisticsApi';
import Category from '@/models/Category';

export default defineComponent({
    components: { StatisticsCard, ProductItem, ProductLikes, AppSelect },
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

        const { data: products, isLoading, error } = useQuery(['popular', params], () => getPopular(params.value));

        return {
            categoryId,
            options,
            products,
            isLoading,
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
.list {
    position: relative;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
}

.list-leave-active {
    position: absolute;
}
.item {
    width: 100%;
    transition: opacity 0.8s ease, transform 0.8s ease;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
}
.product {
    padding: 0 !important;
}
</style>
