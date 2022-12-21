<template>
    <div class="productOrder">
        <div class="column">
            <div class="columnName">Цена</div>
            <div class="columnBody">
                <div class="price">
                    {{ Math.ceil((product.price / 100) * (100 - (product.discounted ?? 0))) }}
                </div>
                <div v-if="product.discounted" class="price old">
                    {{ product.price }}
                </div>
            </div>
        </div>
        <div class="column">
            <p class="columnCenter" v-if="!$store.state.auth.user">Войдите чтобы добавить товар в корзину</p>
            <template v-else-if="isProductInCart">
                <p class="columnName">Товар уже находится в корзине</p>
                <div class="columnBody">
                    <app-button to="/cart" class="addToCart">Перейти в корзину</app-button>
                </div>
            </template>
            <template v-else-if="$store.state.auth.user.role !== 'ADMIN'">
                <div class="columnName">Количество</div>
                <div class="columnBody">
                    <app-input type="number" class="quantity" v-model="quantity" @change="onQuantityChange" />
                    <app-button class="addToCart" @click="onAddToCartClick" :loading="addToCartIsLoading">
                        Добавить в корзину
                    </app-button>
                </div>
            </template>
            <p v-if="addToCartError" class="error">Произошла ошибка при загрузке</p>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import { useMutation } from 'vue-query';
import { useStore } from 'vuex';

import AppButton from '@/components/ui/AppButton.vue';
import AppInput from '@/components/ui/AppInput.vue';
import { addProductToCart } from '@/api/cartApi';
import Product from '@/models/Product';
import { State } from '@/store';

export default defineComponent({
    components: { AppButton, AppInput },
    props: {
        product: { type: Object as PropType<Product>, required: true },
    },
    setup(props) {
        const store = useStore<State>();

        const quantity = ref(1);

        const onQuantityChange = () => {
            if (quantity.value <= 0) quantity.value = 1;
        };

        const isProductInCart = computed(
            () => !!store.state.auth.cart?.find((cart) => cart.product.id === props.product.id)
        );

        const {
            mutate: addToCart,
            isLoading: addToCartIsLoading,
            error: addToCartError,
        } = useMutation(addProductToCart, {
            onSuccess: (id, { quantity }) => {
                store.commit('SetCart', [
                    ...(store.state.auth.cart ?? []),
                    {
                        id,
                        product: props.product,
                        quantity,
                    },
                ]);
            },
        });

        const onAddToCartClick = () => addToCart({ productId: props.product.id, quantity: quantity.value });

        return {
            quantity,
            onQuantityChange,
            isProductInCart,
            addToCartIsLoading,
            addToCartError,
            onAddToCartClick,
        };
    },
});
</script>

<style lang="scss" scoped>
.productOrder {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
}
.column {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}
.columnName {
    margin-bottom: 10px;
}
.columnBody {
    display: flex;
    align-items: center;
}
.columnCenter {
    margin: auto 0;
}
.price {
    display: inline;
    margin-right: 10px;
    align-self: center;
    font-weight: 700;

    font-size: 32px;
    font-weight: 700;
    color: var(--primary-color);

    &::after {
        content: '₽';
    }
    &.old {
        font-size: 16px;
        text-decoration: line-through;
        color: var(--dark-text-color);
    }
}
.quantity {
    width: 70px;
    margin-right: 30px;

    font-size: 14px !important;
    font-weight: 700;
}
.addToCart {
    font-size: 14px;
    outline: none;
}
.error {
    margin-top: 5px;
    color: var(--danger-color);
}
</style>
