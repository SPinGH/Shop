<template>
    <app-container class="search">
        <div class="container">
            <form class="form" @submit.prevent="onSubmit">
                <div :class="{ input: true, loading: isLoading }">
                    <input id="search" ref="search" type="text" />
                    <button type="reset" aria-label="Очистить" />
                </div>
                <label class="inputLabel" htmlFor="search">Введите название товара, который вы ищете</label>
            </form>
            <app-loader v-if="isLoading" class="loader" />
            <template v-else>
                <ul class="list">
                    <li v-for="product in products" :key="product.id">
                        <product-item-link :product="product" variant="twoColumn" hover />
                    </li>
                </ul>
                <div class="footer">
                    <app-button
                        v-if="hasNextPage"
                        class="more"
                        variant="underline"
                        @click="fetchNextPage"
                        :loading="isFetching">
                        Показать больше товаров
                    </app-button>
                    <p v-if="products && products.length !== 0" class="count">{{ countString }}</p>
                </div>
                <p v-if="products && products.length === 0">Товары не найдены</p>
            </template>
        </div>
    </app-container>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useInfiniteQuery } from 'vue-query';

import ProductItemLink from '@/components/logic/ProductItemLink.vue';
import { getDeclOfNum, productForms, searchedForms } from '@/utils';
import AppContainer from '@/components/ui/AppContainer.vue';
import AppLoader from '@/components/ui/AppLoader.vue';
import AppButton from '@/components/ui/AppButton.vue';
import { getProducts } from '@/api/productsApi';

export default defineComponent({
    components: { AppContainer, AppLoader, ProductItemLink, AppButton },
    setup() {
        const query = ref<string | undefined>(undefined);
        const search = ref<HTMLInputElement | null>(null);

        const { data, isLoading, isFetching, error, fetchNextPage, hasNextPage } = useInfiniteQuery(
            ['products', { query }],
            ({ pageParam = 1 }) => getProducts({ query: query.value, page: pageParam }),
            {
                getNextPageParam: (lastPage, pages) =>
                    lastPage.count > pages.length * 5 ? pages.length + 1 : undefined,
            }
        );

        const products = computed(() => data.value?.pages.map((page) => page.rows).flat());
        const countString = computed(() => {
            const num = (data.value?.pages && data.value?.pages[0]?.count) ?? 0;
            return `${num} ${getDeclOfNum(num, productForms)} ${getDeclOfNum(num, searchedForms)}`;
        });

        const onSubmit = () => (query.value = search.value?.value ?? '');

        return {
            search,
            onSubmit,
            products,
            isLoading,
            isFetching,
            error,
            hasNextPage,
            fetchNextPage,
            countString,
        };
    },
});
</script>

<style lang="scss" scoped>
@import '@/mixins.scss';
.search {
    background-color: var(--dark-bg-color);
}
.container {
    @media (min-width: 767px) {
        width: 80%;
        margin: 0 auto;
    }
}
.form {
    @include respValue('margin-bottom', 100, 20);
}
.inputLabel {
    @include respValue('font-size', 26, 16);
    font-weight: 300;
    color: var(--text-color);
}
.input {
    position: relative;
    overflow: hidden;
    margin-bottom: 20px;

    &::after {
        content: '';
        position: absolute;
        bottom: 0px;
        left: 0px;
        height: 2px;
        width: 100%;

        transform: translateX(-100%);
        background-color: var(--primary-color);
    }

    &.loading::after {
        animation: loading 1.5s ease;
        animation-iteration-count: infinite;
    }

    input {
        position: relative;
        width: 100%;
        padding: 20px 0px;
        padding-right: 40px;

        outline: none;
        border: none;
        background: none;

        border-bottom: 2px solid var(--text-color);
        transition: border-color 0.3s ease;

        font-family: inherit;
        @include respValue('font-size', 120, 40);
        font-weight: 100;
        color: var(--dark-text-color);

        &:focus {
            border-color: var(--dark-text-color);
        }
    }

    button {
        position: absolute;
        cursor: pointer;
        top: 50%;
        right: 0px;
        width: 40px;
        height: 40px;

        border: none;
        background-color: transparent;

        transform: translateY(-50%);

        @media (any-hover: hover) {
            &:hover {
                &::before,
                &::after {
                    background-color: var(--dark-text-color);
                }
            }
        }

        &::before,
        &::after {
            content: '';
            position: absolute;
            top: 19px;
            right: 5px;
            width: 30px;
            height: 2px;

            background-color: var(--text-color);
            transition: background-color 0.3s ease;
        }

        &::before {
            transform: rotate(45deg);
        }
        &::after {
            transform: rotate(-45deg);
        }
    }
}
.loader {
    align-self: center;
    font-size: 20px;
    color: var(--primary-color);
}
.list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    align-items: center;
    column-gap: 20px;
    row-gap: 30px;
    grid-auto-flow: dense;
    justify-content: center;
    @include respValue('margin-bottom', 60, 20);
}
.footer {
    display: flex;
    align-items: flex-end;
    gap: 20px;
    flex-wrap: wrap;
}
.more {
    margin: 0 auto;
}
.count {
    font-size: 18px;
    font-weight: 700;
}
@keyframes loading {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translate(100%);
    }
}
</style>
