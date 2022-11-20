<template>
    <div class="cartItem">
        <product-item :product="cart.product" variant="twoColumn" />
        <div class="inputs">
            <app-input
                class="quantity"
                label="Количество"
                type="number"
                outlined
                variant="inline"
                :disabled="changeIsLoading"
                v-model="quantity"
                @change="onQuantityChange" />
            <app-button class="delete" variant="danger" outlined @click="onDeleteClick" :loading="deleteIsLoading">
                Delete
            </app-button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { useMutation } from 'vue-query';
import { useStore } from 'vuex';

import { changeCart as changeCartApi, deleteCart as deleteCartApi } from '@/api/cartApi';
import ProductItem from '@/components/logic/ProductItem.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppInput from '@/components/ui/AppInput.vue';
import Cart from '@/models/Cart';
import { State } from '@/store';

export default defineComponent({
    components: { ProductItem, AppButton, AppInput },
    props: {
        cart: { type: Object as PropType<Cart>, required: true },
    },
    setup(props) {
        const store = useStore<State>();
        const quantity = ref(props.cart.quantity);

        const { mutate: changeCart, isLoading: changeIsLoading } = useMutation(changeCartApi, {
            onSuccess: (_, body) => {
                const cart =
                    store.state.auth.cart?.map((item) => {
                        if (item.id === body.id) return { ...item, quantity: body.quantity };
                        return item;
                    }) ?? null;
                store.commit('SetCart', cart);
            },
        });
        const { mutate: deleteCart, isLoading: deleteIsLoading } = useMutation(deleteCartApi, {
            onSuccess: (_, id) => {
                const cart = store.state.auth.cart?.filter((item) => item.id !== id);
                store.commit('SetCart', cart);
            },
        });

        const onDeleteClick = () => deleteCart(props.cart.id);
        const onQuantityChange = () => {
            if (quantity.value <= 0) quantity.value = 1;
            changeCart({ id: props.cart.id, quantity: quantity.value });
        };

        return {
            quantity,
            changeIsLoading,
            deleteIsLoading,
            onQuantityChange,
            onDeleteClick,
        };
    },
});
</script>

<style lang="scss" scoped>
@import '@/mixins.scss';
.cartItem {
    background-color: var(--bg-color);
    padding: 10px;
}
.inputs {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}
.quantity {
    font-size: 14px;
    max-width: 160px;
}
.delete {
    font-size: 14px;
    outline: none;
}
</style>
