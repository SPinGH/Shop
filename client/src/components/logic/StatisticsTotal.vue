<template>
    <div class="statisticsTotal">
        <app-loader v-if="isLoading" />
        <statistics-card>
            <p class="title">Товары</p>
            <p class="content">{{ total?.products }}</p>
        </statistics-card>
        <statistics-card>
            <p class="title">Категории</p>
            <p class="content">{{ total?.categories }}</p>
        </statistics-card>
        <statistics-card>
            <p class="title">Заказы</p>
            <p class="content">{{ total?.orders }}</p>
        </statistics-card>
        <statistics-card>
            <p class="title">Пользователи</p>
            <p class="content">{{ total?.users }}</p>
        </statistics-card>
        <statistics-card>
            <p class="title">Продажи</p>
            <p class="content price">{{ total?.profit }}</p>
        </statistics-card>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuery } from 'vue-query';

import StatisticsCard from '@/components/logic/StatisticsCard.vue';
import AppLoader from '@/components/ui/AppLoader.vue';
import { getTotal } from '@/api/statisticsApi';

export default defineComponent({
    components: { StatisticsCard, AppLoader },
    setup() {
        const { data: total, isLoading, error } = useQuery('total', getTotal);

        return {
            total,
            isLoading,
            error,
        };
    },
});
</script>

<style lang="scss" scoped>
.statisticsTotal {
    display: flex;
    gap: 15px;
    overflow-x: auto;
    padding-bottom: 5px;
}
.title {
    margin-bottom: 10px;
}
.content {
    font-size: 20px;
    font-weight: 700;
    color: var(--primary-color);
}
.price {
    &::before {
        content: '$';
    }
}
</style>
