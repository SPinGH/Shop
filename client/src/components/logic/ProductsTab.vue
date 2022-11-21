<template>
    <div class="header">
        <div class="filters">
            <app-select :options="options" outlined v-model="categoryId" />
            <app-input outlined @keydown="onQueryKeyDown" />
        </div>
        <app-button outlined @click="openModal">Добавить</app-button>
    </div>
    <app-loader v-if="isLoading" class="loader" />
    <ul v-else class="list">
        <li v-for="product in products" :key="product.id">
            <edit-product-item :product="product" />
        </li>
    </ul>
    <div class="footer">
        <app-button v-if="hasNextPage" class="more" variant="underline" @click="fetchNextPage" :loading="isFetching">
            Показать больше товаров
        </app-button>
        <p v-if="products && products.length !== 0" class="count">{{ countString }}</p>
    </div>
    <p v-if="products && products.length === 0">Товары не найдены</p>

    <app-modal v-if="isModalVisible" @close="closeModal" label="Изменение товара">
        <template v-slot:body>
            <product-form id="editProductForm" :errors="errors" :onSubmit="onAddClick" />
        </template>
        <template v-slot:footer>
            <div class="modalControls">
                <p v-if="errors.global" class="error">{{ errors.global }}</p>
                <app-button outlined @click="closeModal">Отмена</app-button>
                <app-button type="submit" form="editProductForm" :loading="createIsLoading">Сохранить</app-button>
            </div>
        </template>
    </app-modal>
</template>

<script lang="ts">
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'vue-query';
import { computed, defineComponent, ref } from 'vue';

import { createProduct as createProductApi, getProducts, ProductBody } from '@/api/productsApi';
import { clearErrors, getDeclOfNum, parseError, productForms, searchedForms } from '@/utils';
import EditProductItem from '@/components/logic/EditProductItem.vue';
import ProductForm from '@/components/logic/ProductForm.vue';
import AppSelect from '@/components/ui/AppSelect.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppLoader from '@/components/ui/AppLoader.vue';
import AppInput from '@/components/ui/AppInput.vue';
import AppModal from '@/components/ui/AppModal.vue';
import Category from '@/models/Category';

export default defineComponent({
    components: { AppSelect, AppInput, AppLoader, EditProductItem, AppButton, AppModal, ProductForm },
    setup() {
        const queryClient = useQueryClient();

        const query = ref('');
        const categoryId = ref('');
        const isModalVisible = ref(false);

        const closeModal = () => (isModalVisible.value = false);
        const openModal = () => (isModalVisible.value = true);

        const errors = ref({
            name: '',
            description: '',
            img: '',
            categoryId: '',
            price: '',
            discounted: '',
            global: '',
        });

        const { data: categories } = useQuery<Category[]>('categories');

        const params = computed(() => ({
            categoryId: categoryId.value !== '' ? Number(categoryId.value) : undefined,
            query: query.value !== '' ? query.value : undefined,
        }));

        const options = computed(() => [
            { value: '', label: 'Не выбрано' },
            ...(categories.value?.map((category) => ({ value: category.id.toString(), label: category.name })) ?? []),
        ]);

        const { data, isLoading, isFetching, error, fetchNextPage, hasNextPage } = useInfiniteQuery(
            ['products', params],
            ({ pageParam = 1 }) => getProducts({ ...params.value, page: pageParam }),
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

        const onQueryKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') query.value = (e.target as HTMLInputElement)?.value;
        };

        const { mutate: createProduct, isLoading: createIsLoading } = useMutation(createProductApi, {
            onSuccess: () => {
                clearErrors(errors);
                isModalVisible.value = false;
                queryClient.invalidateQueries('products');
            },
            onError: (error: any) => {
                clearErrors(errors);
                parseError(error, errors);
            },
        });
        const onAddClick = (body: ProductBody) => createProduct(body);

        return {
            isModalVisible,
            openModal,
            closeModal,
            onAddClick,
            createIsLoading,
            errors,
            categoryId,
            query,
            onQueryKeyDown,
            options,
            countString,
            products,
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
.header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
}
.filters {
    display: flex;
    gap: 10px;
}
.loader {
    font-size: 20px !important;
    margin: 0 auto;
    color: var(--primary-color);
}
.list {
    overflow-x: auto;
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
.modalControls {
    display: flex;
    align-items: center;
    gap: 10px;
}
.error {
    color: var(--danger-color);
}
</style>
