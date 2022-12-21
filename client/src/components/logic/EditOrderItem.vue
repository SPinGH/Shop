<template>
    <div :class="{ editOrderItem: true, expanded: isExpanded }">
        <div
            class="header"
            tabindex="0"
            role="button"
            @click="onToggleExpandClick"
            @keydown="onToggleExpandKeyDown"
            :aria-expanded="isExpanded"
            :aria-label="`${isExpanded ? 'Закрыть' : 'Открыть'} заказ`">
            <div class="arrow" />
            <p class="email">{{ order.user.email }}</p>
            <div class="info">
                <p v-show="!isExpanded" class="date">({{ new Date(order.date).toLocaleString() }})</p>
                <p v-show="!isExpanded" class="price">{{ totalPrice }}</p>
            </div>
            <p v-if="deleteError" class="error">Не удалось удалить заказ</p>
            <app-button class="control" variant="danger" @click="onDeleteOrderClick" outlined aria-label="Удалить">
                <app-loader v-if="deleteIsLoading" class="controlLoader" />
                <delete-icon v-else class="controlIcon" />
            </app-button>
        </div>
        <order-item v-show="isExpanded" :order="order" class="order" />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import { useMutation, useQueryClient } from 'vue-query';

import { deleteOrder as deleteOrderApi } from '@/api/orderApi';
import DeleteIcon from '@/components/ui/Icons/DeleteIcon.vue';
import OrderItem from '@/components/logic/OrderItem.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppLoader from '@/components/ui/AppLoader.vue';
import UserOrder from '@/models/UserOrder';

export default defineComponent({
    components: { OrderItem, AppButton, DeleteIcon, AppLoader },
    props: {
        order: { type: Object as PropType<UserOrder>, required: true },
    },
    setup(props) {
        const queryClient = useQueryClient();
        const isExpanded = ref(false);

        const onToggleExpandClick = () => (isExpanded.value = !isExpanded.value);
        const onToggleExpandKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Space' || event.key === 'Enter') {
                event.preventDefault();
                (event.target as HTMLElement).click();
            }
        };
        const totalPrice = computed(
            () =>
                props.order.orderItems?.reduce((acc, orderItem) => (acc += orderItem.quantity * orderItem.price), 0) ??
                0
        );

        const {
            mutate: deleteOrder,
            isLoading: deleteIsLoading,
            error: deleteError,
        } = useMutation(deleteOrderApi, {
            onSuccess: () => {
                queryClient.invalidateQueries('ordersAll');
            },
        });

        const onDeleteOrderClick = (event: MouseEvent) => {
            event.stopPropagation();
            deleteOrder(props.order.id);
        };

        return {
            isExpanded,
            onToggleExpandClick,
            onToggleExpandKeyDown,
            totalPrice,
            onDeleteOrderClick,
            deleteIsLoading,
            deleteError,
        };
    },
});
</script>

<style lang="scss" scoped>
@import '@/mixins.scss';
.editOrderItem {
    border-bottom: 1px solid var(--dark-bg-color);
    &.expanded {
        .arrow::after {
            transform: translateY(3px) rotate(-45deg) scale(-1);
        }
    }
}
.header {
    cursor: pointer;
    @include respValue('padding', 15, 8);

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
}
.info {
    flex: 1 1 auto;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
}
.arrow {
    position: relative;
    display: block;
    background: none;
    border: none;
    width: 20px;
    height: 20px;

    &::after {
        content: '';
        position: absolute;
        top: calc(50% - 7px);
        left: calc(50% - 7px);
        width: 14px;
        height: 14px;
        border-bottom: 2px solid var(--dark-text-color);
        border-left: 2px solid var(--dark-text-color);
        transform: translateY(-3px) rotate(-45deg);
        transition: transform 0.3s ease;
    }
}
.order {
    border-top: 1px solid var(--dark-bg-color);
}
.date {
    color: var(--text-color);
}
.price {
    font-size: inherit;
    font-weight: 700;
    color: var(--text-color);

    &::after {
        content: '₽';
    }
}
.control {
    padding: 7px !important;
}
.controlIcon {
    display: block;
    font-size: 20px;
}
.controlLoader {
    font-size: 20px !important;
}
.error {
    color: var(--danger-color);
}
</style>
