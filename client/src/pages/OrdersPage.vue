<template>
    <app-container class="orders">
        <page-header><h1>Заказы</h1></page-header>
        <app-loader v-if="isLoading" class="loader" />
        <ul class="list">
            <transition-group name="list">
                <li v-for="order in orders" :key="order.id" class="item">
                    <order-item :order="order" />
                </li>
            </transition-group>
        </ul>
        <p v-if="orders?.length === 0">У вас нет заказов</p>
        <p v-if="error">Произошла ошибка при загрузке</p>
    </app-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuery } from 'vue-query';

import AppContainer from '@/components/ui/AppContainer.vue';
import OrderItem from '@/components/logic/OrderItem.vue';
import PageHeader from '@/components/ui/PageHeader.vue';
import AppLoader from '@/components/ui/AppLoader.vue';
import { getOrders } from '@/api/orderApi';

export default defineComponent({
    components: { AppContainer, PageHeader, AppLoader, OrderItem },
    setup() {
        const { data: orders, isLoading, error } = useQuery('orders', getOrders);

        return {
            orders,
            isLoading,
            error,
        };
    },
});
</script>

<style lang="scss" scoped>
.orders {
    display: flex;
    flex-direction: column;

    background-color: var(--dark-bg-color);
}

.list {
    flex: 1 1 auto;
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;

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
.item:not(:last-child) {
    margin-bottom: 10px;
}
.result {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
</style>
