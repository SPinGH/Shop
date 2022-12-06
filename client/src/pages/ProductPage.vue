<template>
    <app-container class="product">
        <app-loader v-if="productIsLoading" class="loader" />
        <div v-if="product" class="view">
            <product-likes class="likes" :product="product" />
            <product-image class="image" :product="product" />
        </div>
        <div v-if="product" class="descr">
            <div class="descrContent">
                <div class="header">
                    <category-item v-if="product?.category" class="category" :category="product.category" />
                </div>
                <div class="content">
                    <h1 class="name">{{ product.name }}</h1>
                    <p v-if="product.description" class="text">{{ product.description }}</p>
                    <product-order :product="product" />
                </div>
            </div>
            <div class="recomended">
                <div class="recomendedTitle">RECOMENDED</div>
                <ul v-if="recomended" class="recomendedList">
                    <li class="recomendedItem" v-for="product in recomended" :key="product.id">
                        <product-item-link :product="product" variant="small" />
                    </li>
                </ul>
            </div>
        </div>
    </app-container>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useQuery } from 'vue-query';

import { getProduct, getRecomendedProducts } from '@/api/productsApi';
import ProductItemLink from '@/components/logic/ProductItemLink.vue';
import ProductLikes from '@/components/logic/ProductLikes.vue';
import CategoryItem from '@/components/logic/CategoryItem.vue';
import ProductOrder from '@/components/logic/ProductOrder.vue';
import ProductImage from '@/components/logic/ProductImage.vue';
import AppContainer from '@/components/ui/AppContainer.vue';
import AppLoader from '@/components/ui/AppLoader.vue';

export default defineComponent({
    components: { AppContainer, AppLoader, ProductLikes, CategoryItem, ProductItemLink, ProductImage, ProductOrder },
    setup() {
        const route = useRoute();

        const productId = computed(() => Number(route.params.id));

        const { data: product, isLoading: productIsLoading } = useQuery(['product', productId], () =>
            getProduct(productId.value)
        );

        const { data: recomended, isLoading: recomendedIsLoading } = useQuery(['recomended', productId], () =>
            getRecomendedProducts(productId.value)
        );

        return {
            product,
            productIsLoading,
            recomended,
            recomendedIsLoading,
        };
    },
});
</script>

<style lang="scss" scoped>
@import '@/mixins.scss';
.product {
    display: flex;
    flex-wrap: wrap;
}
.loader {
    margin: 0 auto;
    font-size: 20px !important;
}
.view {
    flex: 0 0 50%;
    padding: 0px 80px;

    display: flex;
    flex-direction: column;

    @media (max-width: 767px) {
        flex: 0 0 100%;
        padding: 0px 40px 20px;
    }
}
.likes {
    align-self: flex-end;
}
.image {
    flex: 1 1 auto;
}
.descr {
    flex: 0 0 50%;

    display: flex;
    flex-direction: column;

    @media (max-width: 767px) {
        flex: 0 0 100%;
    }
}

.descrContent {
    flex: 1 1 auto;

    padding: 30px 20px 0 40px;
    margin: -30px -20px 0px -40px;

    display: flex;
    flex-direction: column;

    background-color: var(--dark-bg-color);

    @media (max-width: 767px) {
        padding-top: 20px;
        margin-top: 0px;
    }
}
.header {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    padding-right: 60px;
    margin-bottom: 20px;

    @media (max-width: 767px) {
        padding-right: 0;
    }
}
.category {
    padding: 0 !important;
}
.content {
    flex: 1 1 auto;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 30px;

    @media (max-width: 767px) {
        gap: 15px;
    }
}
.name {
    text-transform: uppercase;
    font-size: 48px;
    font-weight: 300;
    color: var(--primary-color);
}
.text {
    font-size: 18px;
    font-weight: 300;
    line-height: 1.5em;
    color: var(--text-color);
}

.recomended {
    position: relative;
    min-height: 180px;
    padding-top: 10px;

    @media (min-width: 767px) {
        padding-left: 10px;
    }
}
.recomendedTitle {
    text-transform: uppercase;
    position: absolute;
    top: 0;
    left: 0px;
    transform-origin: left bottom;
    transform: rotate(-90deg) translateX(-100%);
    z-index: -1;

    font-weight: 300;
    @include respValue('font-size', 24, 14);
    color: var(--text-color);

    @media (max-width: 767px) {
        display: none;
    }
}
.recomendedList {
    display: flex;
    overflow: hidden;
}
.recomendedItem {
    flex: 0 0 33%;
}
</style>
