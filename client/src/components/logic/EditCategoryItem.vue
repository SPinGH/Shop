<template>
    <div class="editProductItem">
        <category-item :category="category" variant="inline" />
        <div class="controls">
            <app-button class="control" outlined @click="openModal" aria-label="Редактировать">
                <edit-icon class="controlIcon" />
            </app-button>
            <app-button class="control" variant="danger" outlined @click="onDeleteClick" aria-label="Удалить">
                <app-loader v-if="deleteIsLoading" class="controlLoader danger" />
                <delete-icon v-else class="controlIcon" />
            </app-button>
        </div>
    </div>

    <app-modal v-if="isModalVisible" @close="closeModal" label="Изменение категории">
        <template v-slot:body>
            <category-form id="editCategoryForm" :defaultValue="category" :errors="errors" :onSubmit="onUpdateClick" />
        </template>
        <template v-slot:footer>
            <div class="modalControls">
                <p v-if="errors.global" class="error">{{ errors.global }}</p>
                <app-button outlined @click="closeModal">Отмена</app-button>
                <app-button type="submit" form="editCategoryForm" :loading="updateIsLoading">Сохранить</app-button>
            </div>
        </template>
    </app-modal>
</template>

<script lang="ts">
import { useMutation, useQueryClient } from 'vue-query';
import { defineComponent, PropType, ref } from 'vue';

import CategoryItem from '@/components/logic/CategoryItem.vue';
import { EditIcon, DeleteIcon } from '@/components/ui/Icons';
import AppButton from '@/components/ui/AppButton.vue';
import AppLoader from '@/components/ui/AppLoader.vue';
import AppModal from '@/components/ui/AppModal.vue';
import { clearErrors, parseError } from '@/utils';
import CategoryForm from './CategoryForm.vue';
import Category from '@/models/Category';
import {
    CategoryBody,
    deleteCategory as deleteCategoryApi,
    updateCategory as updateCategoryApi,
} from '@/api/categoryApi';

export default defineComponent({
    components: { AppButton, EditIcon, DeleteIcon, AppLoader, AppModal, CategoryItem, CategoryForm },
    props: {
        category: { type: Object as PropType<Category>, required: true },
    },
    setup(props) {
        const queryClient = useQueryClient();
        const isModalVisible = ref(false);

        const closeModal = () => (isModalVisible.value = false);
        const openModal = () => (isModalVisible.value = true);

        const errors = ref({
            name: '',
            img: '',
            global: '',
        });

        const { mutate: updateCategory, isLoading: updateIsLoading } = useMutation(updateCategoryApi, {
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

        const { mutate: deleteCategory, isLoading: deleteIsLoading } = useMutation(deleteCategoryApi, {
            onSuccess: () => {
                queryClient.invalidateQueries('categories');
            },
        });

        const onDeleteClick = () => deleteCategory(props.category.id);
        const onUpdateClick = (body: CategoryBody) => updateCategory({ id: props.category.id, body });

        return {
            isModalVisible,
            openModal,
            closeModal,
            onUpdateClick,
            updateIsLoading,
            errors,
            onDeleteClick,
            deleteIsLoading,
        };
    },
});
</script>

<style lang="scss" scoped>
.editProductItem {
    display: flex;
    justify-content: space-between;
}
.controls {
    display: flex;
    align-items: center;
    gap: 10px;
}
.control {
    padding: 7px !important;
}
.controlLoader {
    font-size: 20px !important;
}
.controlIcon {
    display: block;
    font-size: 20px;
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
