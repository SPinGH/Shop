<template>
    <div class="editProductItem">
        <category-item :category="category" variant="inline" />
        <div class="controls">
            <app-button class="control" outlined @click="openEditModal" aria-label="Редактировать">
                <edit-icon class="controlIcon" />
            </app-button>
            <app-button class="control" variant="danger" outlined @click="onDeleteClick" aria-label="Удалить">
                <app-loader v-if="deleteIsLoading" class="controlLoader danger" />
                <delete-icon v-else class="controlIcon" />
            </app-button>
        </div>
    </div>

    <app-modal :visible="isMessageModalVisible" @close="closeMessageModal" label="Ошибка при удалении категории">
        <template v-slot:body>
            <p class="message">
                Категорию невозможно удалить так как существуют товары <br />
                из этой категории
            </p>
        </template>
        <template v-slot:footer>
            <div class="modalControls">
                <app-button outlined @click="closeMessageModal">Хорошо</app-button>
            </div>
        </template>
    </app-modal>

    <app-modal :visible="isEditModalVisible" @close="closeEditModal" label="Изменение категории">
        <template v-slot:body>
            <category-form id="editCategoryForm" :defaultValue="category" :errors="errors" :onSubmit="onUpdateClick" />
        </template>
        <template v-slot:footer>
            <div class="modalControls">
                <p v-if="errors.global" class="error">{{ errors.global }}</p>
                <app-button outlined @click="closeEditModal">Отмена</app-button>
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
        const isEditModalVisible = ref(false);
        const isMessageModalVisible = ref(false);

        const closeEditModal = () => (isEditModalVisible.value = false);
        const openEditModal = () => (isEditModalVisible.value = true);

        const closeMessageModal = () => (isMessageModalVisible.value = false);

        const errors = ref({
            name: '',
            img: '',
            global: '',
        });

        const { mutate: updateCategory, isLoading: updateIsLoading } = useMutation(updateCategoryApi, {
            onSuccess: () => {
                clearErrors(errors);
                isEditModalVisible.value = false;
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
            onError: () => {
                isMessageModalVisible.value = true;
            },
        });

        const onDeleteClick = () => deleteCategory(props.category.id);
        const onUpdateClick = (body: CategoryBody) => updateCategory({ id: props.category.id, body });

        return {
            isEditModalVisible,
            openEditModal,
            closeEditModal,
            isMessageModalVisible,
            closeMessageModal,
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
.message {
    line-height: 1.2em;
}
.error {
    color: var(--danger-color);
}
</style>
