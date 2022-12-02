<template>
    <app-container class="cart">
        <page-header><h1>Корзина</h1></page-header>
        <ul class="list">
            <transition-group name="list">
                <li v-for="cart in $store.state.auth.cart" :key="cart.id" class="item">
                    <cart-item :cart="cart" />
                </li>
            </transition-group>
        </ul>
        <div class="result">
            <p v-if="$store.state.auth.cart && $store.state.auth.cart.length === 0" class="empty">Корзина пуста</p>
            <span class="price">{{ totalPrice }}</span>
            <app-button
                class="buy"
                @click="onCreateOrderClick"
                :loading="createIsLoading"
                :disabled="$store.state.auth.cart?.length === 0">
                Купить
            </app-button>
        </div>
    </app-container>
</template>

<script lang="ts">
import { useMutation, useQueryClient } from 'vue-query';
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

import AppContainer from '@/components/ui/AppContainer.vue';
import PageHeader from '@/components/ui/PageHeader.vue';
import CartItem from '@/components/logic/CartItem.vue';
import AppButton from '@/components/ui/AppButton.vue';
import { createOrder } from '@/api/orderApi';
import { State } from '@/store';

export default defineComponent({
    components: { AppContainer, PageHeader, AppButton, CartItem },
    setup() {
        const queryClient = useQueryClient();
        const store = useStore<State>();

        const totalPrice = computed(
            () =>
                store.state.auth.cart?.reduce(
                    (acc, cart) => (acc += cart.quantity * (cart.product.discounted ?? cart.product.price)),
                    0
                ) ?? 0
        );

        const { mutate: onCreateOrderClick, isLoading: createIsLoading } = useMutation(createOrder, {
            onSuccess: () => {
                store.commit('SetCart', []);
                queryClient.refetchQueries('orders');
            },
        });

        return {
            totalPrice,
            onCreateOrderClick,
            createIsLoading,
        };
    },
});
</script>

<style lang="scss" scoped>
@import '@/mixins.scss';
.cart {
    display: flex;
    flex-direction: column;

    background-color: var(--dark-bg-color);
}
.item {
    transition: opacity 0.8s ease, transform 0.8s ease;
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
    margin-bottom: 20px;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(335px, 1fr));
    column-gap: 20px;
    row-gap: 30px;
    grid-auto-flow: dense;
    justify-content: center;
}
.result {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.empty {
    flex: 1 1 auto;
}
.price {
    margin-right: 30px;

    transition: color 0.3s ease;
    font-size: 32px;
    font-weight: 700;
    color: var(--primary-color);

    &::before {
        content: '$';
    }
}
</style>
