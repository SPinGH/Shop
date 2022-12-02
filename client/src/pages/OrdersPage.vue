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
.item {
    transition: opacity 0.8s ease, transform 0.8s ease;
    &:not(:last-child) {
        margin-bottom: 10px;
    }
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
}

.list-leave-active {
    position: absolute;
}
.list {
    flex: 1 1 auto;
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
}
.result {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
</style>
