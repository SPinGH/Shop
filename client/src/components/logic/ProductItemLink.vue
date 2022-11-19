<template>
    <router-link class="productLink" :to="`/product/${product.id}`">
        <product-item class="productItem" :product="product" :variant="variant" />
    </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import ProductItem from '@/components/logic/ProductItem.vue';
import Product from '@/models/Product';

export default defineComponent({
    components: { ProductItem },
    props: {
        product: { type: Object as PropType<Product>, required: true },
        variant: { type: String as PropType<'inline' | 'small' | 'column' | 'twoColumn'>, default: 'column' },
    },
});
</script>

<style lang="scss" scoped>
.productLink {
    display: block;
    height: 100%;
    overflow: hidden;
    text-decoration: none;
}
.productItem {
    transition: transform 0.3s ease;
    @media (any-hover: hover) {
        &:hover {
            transform: scale(1.05);
        }
    }
}
</style>
