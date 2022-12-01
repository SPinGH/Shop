<template>
    <div class="orderItem">
        <ul>
            <li v-for="orderItem in order.orderItems" :key="orderItem.id" class="item">
                <product-item
                    :product="{
                        name: orderItem.product.name,
                        img: orderItem.product.img,
                    }"
                    variant="inline"
                    class="product" />
                <p class="quantity">
                    {{ orderItem.quantity }} x <span class="price">{{ orderItem.price }}</span>
                </p>
            </li>
            <div class="footer">
                <p class="date">{{ new Date(order.date).toLocaleString() }}</p>
                <p class="total">
                    Итого: <span class="price">{{ totalPrice }}</span>
                </p>
            </div>
        </ul>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

import ProductItem from '@/components/logic/ProductItem.vue';
import Order from '@/models/Order';

export default defineComponent({
    components: { ProductItem },
    props: {
        order: { type: Object as PropType<Order>, required: true },
    },
    setup(props) {
        const totalPrice = computed(
            () =>
                props.order.orderItems?.reduce((acc, orderItem) => (acc += orderItem.quantity * orderItem.price), 0) ??
                0
        );
        return {
            totalPrice,
        };
    },
});
</script>

<style lang="scss" scoped>
@import '@/mixins.scss';
.orderItem {
    background-color: var(--bg-color);
    @include respValue('padding', 15, 8);
}
.item {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    border-bottom: 1px solid var(--text-color);
}
.product {
    padding: 0 !important;
}
.quantity {
    flex: 1 1 auto;
    min-width: 100px;
    text-align: right;
    font-size: 20px;
}
.footer {
    margin-top: 10px;

    display: flex;
    justify-content: space-between;
    align-items: center;
}
.date {
    font-size: 18px;
    color: var(--text-color);
}
.total {
    font-size: 22px;
    color: var(--dark-text-color);
}
.price {
    font-size: inherit;
    font-weight: 700;
    color: var(--primary-color);

    &::before {
        content: '$';
    }
}
</style>
