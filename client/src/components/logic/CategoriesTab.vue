<template>
    <div class="categoriesTab">
        <app-button class="addBtn" outlined @click="openModal">Добавить</app-button>
        <app-loader v-if="categoriesIsLoading" class="loader" />
        <ul class="list">
            <transition-group name="list">
                <li v-for="category in categories" :key="category.id" class="item">
                    <edit-category-item :category="category" />
                </li>
            </transition-group>
        </ul>
        <p v-if="categories?.length !== 0" class="message">{{ countString }}</p>
        <p v-else>Товары не найдены</p>
        <p v-if="categoriesError">Произошла ошибка при загрузке</p>

        <app-modal :visible="isModalVisible" @close="closeModal" label="Добавление категории">
            <template v-slot:body>
                <category-form id="editProductForm" :errors="errors" :onSubmit="onAddClick" />
            </template>
            <template v-slot:footer>
                <div class="modalControls">
                    <p v-if="errors.global" class="error">{{ errors.global }}</p>
                    <app-button outlined @click="closeModal">Отмена</app-button>
                    <app-button type="submit" form="editProductForm" :loading="createIsLoading">Сохранить</app-button>
                </div>
            </template>
        </app-modal>
    </div>
</template>

<script lang="ts">
import { useMutation, useQuery, useQueryClient } from 'vue-query';
import { computed, defineComponent, ref } from 'vue';

import { CategoryBody, createCategory as createCategoryApi, getCategories } from '@/api/categoryApi';
import { categoryForms, clearErrors, getDeclOfNum, parseError, searchedForms } from '@/utils';
import EditCategoryItem from '@/components/logic/EditCategoryItem.vue';
import CategoryForm from '@/components/logic/CategoryForm.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppLoader from '@/components/ui/AppLoader.vue';
import AppModal from '@/components/ui/AppModal.vue';
import Category from '@/models/Category';

export default defineComponent({
    components: { AppLoader, AppButton, AppModal, EditCategoryItem, CategoryForm },
    setup() {
        const queryClient = useQueryClient();

        const isModalVisible = ref(false);

        const closeModal = () => (isModalVisible.value = false);
        const openModal = () => (isModalVisible.value = true);

        const errors = ref({
            name: '',
            img: '',
            global: '',
        });

        const {
            data: categories,
            isLoading: categoriesIsLoading,
            error: categoriesError,
        } = useQuery<Category[]>('categories', getCategories);

        const countString = computed(() => {
            const num = categories.value?.length ?? 0;
            return `${num} ${getDeclOfNum(num, categoryForms)} ${getDeclOfNum(num, searchedForms)}`;
        });

        const { mutate: createCategory, isLoading: createIsLoading } = useMutation(createCategoryApi, {
            onSuccess: () => {
                clearErrors(errors);
                isModalVisible.value = false;
                queryClient.invalidateQueries('categories');
            },
            onError: (error: any) => {
                clearErrors(errors);
                parseError(error, errors);
            },
        });
        const onAddClick = (body: CategoryBody) => createCategory(body);

        return {
            isModalVisible,
            openModal,
            closeModal,
            categories,
            categoriesIsLoading,
            categoriesError,
            onAddClick,
            createIsLoading,
            errors,
            countString,
        };
    },
});
</script>

<style lang="scss" scoped>
.categoriesTab {
    display: flex;
    flex-direction: column;
}
.addBtn {
    display: block;
    margin-left: auto;
}
.loader {
    font-size: 20px !important;
    margin: 0 auto;
    color: var(--primary-color);
}
.list {
    flex: 1 1 auto;
    overflow-x: auto;
    overflow-y: hidden;

    position: relative;
    &-enter-from,
    &-leave-to {
        opacity: 0;
    }
    &-leave-active {
        position: absolute;
    }
    .item {
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
}
.item {
    width: 100%;
}
.message {
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
