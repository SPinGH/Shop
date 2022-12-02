<template>
    <div class="ordersTab">
        <div class="header">
            <app-input outlined @keydown="onEmailKeyDown" placeholder="Почта" />
        </div>
        <app-loader v-if="isLoading" class="loader" />
        <ul class="list">
            <transition-group name="list">
                <li v-for="order in orders" :key="order.id" class="item">
                    <edit-order-item :order="order" />
                </li>
            </transition-group>
        </ul>
        <div class="footer">
            <app-button
                v-if="hasNextPage"
                class="more"
                variant="underline"
                @click="fetchNextPage"
                :loading="isFetching">
                Показать больше заказов
            </app-button>
            <p v-if="orders?.length !== 0" class="count">{{ countString }}</p>
        </div>
        <p v-if="orders?.length === 0">Заказы не найдены</p>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useInfiniteQuery } from 'vue-query';

import { getDeclOfNum, orderForms, searchedForms } from '@/utils';
import EditOrderItem from '@/components/logic/EditOrderItem.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppLoader from '@/components/ui/AppLoader.vue';
import AppInput from '@/components/ui/AppInput.vue';
import { getAllOrders } from '@/api/orderApi';

export default defineComponent({
    components: { AppInput, AppLoader, AppButton, EditOrderItem },
    setup() {
        const email = ref('');

        const params = computed(() => ({
            email: email.value !== '' ? email.value : undefined,
        }));

        const { data, isLoading, isFetching, error, fetchNextPage, hasNextPage } = useInfiniteQuery(
            ['ordersAll', params],
            ({ pageParam = 1 }) => getAllOrders({ ...params.value, page: pageParam }),
            {
                keepPreviousData: true,
                getNextPageParam: (lastPage, pages) =>
                    lastPage.count > pages.length * 5 ? pages.length + 1 : undefined,
            }
        );

        const orders = computed(() => data.value?.pages.map((page) => page.rows).flat());
        const countString = computed(() => {
            const num = (data.value?.pages && data.value?.pages[0]?.count) ?? 0;
            return `${num} ${getDeclOfNum(num, orderForms)} ${getDeclOfNum(num, searchedForms)}`;
        });

        const onEmailKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') email.value = (e.target as HTMLInputElement)?.value;
        };

        return {
            email,
            onEmailKeyDown,
            countString,
            orders,
            isLoading,
            isFetching,
            fetchNextPage,
            hasNextPage,
            error,
        };
    },
});
</script>

<style lang="scss" scoped>
.ordersTab {
    display: flex;
    flex-direction: column;
}
.header {
    display: flex;
    align-items: center;
    gap: 10px;
}
.loader {
    font-size: 20px !important;
    margin: 0 auto;
    color: var(--primary-color);
}
.list {
    flex: 1 1 auto;
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
}
.item {
    width: 100%;
    transition: opacity 0.8s ease, transform 0.8s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
}

.list-leave-active {
    position: absolute;
}

.footer {
    margin-top: 10px;

    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: 20px;
}
.more {
    margin: 0 auto;
}
.count {
    font-size: 18px;
    font-weight: 700;
}
.modalControls {
    display: flex;
    align-items: center;
    gap: 10px;
}
.error {
    color: var(--danger-color);
}
</style>
