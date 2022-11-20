<template>
    <app-container class="cart">
        <page-header><h1>Корзина</h1></page-header>
        <ul class="list">
            <li v-for="cart in $store.state.auth.cart" :key="cart.id">
                <cart-item :cart="cart" />
            </li>
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
import { computed, defineComponent } from 'vue';
import { useMutation } from 'vue-query';
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
        const store = useStore<State>();

        const totalPrice = computed(
            () =>
                store.state.auth.cart?.reduce(
                    (acc, cart) => (acc += cart.quantity * (cart.product.discounted ?? cart.product.price)),
                    0
                ) ?? 0
        );

        const { mutate: onCreateOrderClick, isLoading: createIsLoading } = useMutation(createOrder, {
            onSuccess: () => store.commit('SetCart', []),
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