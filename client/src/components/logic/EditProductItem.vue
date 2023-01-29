<template>
    <div class="editProductItem">
        <product-item :product="product" variant="inline" />
        <div class="controls">
            <app-button class="control" :to="`/product/${product.id}`" outlined aria-label="Перейти к товару">
                <link-icon class="controlIcon" />
            </app-button>
            <app-button class="control" outlined @click="openEditModal" aria-label="Редактировать">
                <edit-icon class="controlIcon" />
            </app-button>
            <app-button class="control" variant="danger" outlined @click="onDeleteClick" aria-label="Удалить">
                <app-loader v-if="deleteIsLoading" class="controlLoader danger" />
                <delete-icon v-else class="controlIcon" />
            </app-button>
        </div>
    </div>

    <app-modal :visible="isMessageModalVisible" @close="closeMessageModal" label="Ошибка при удалении товара">
        <template v-slot:body>
            <p class="message">
                Товар невозможно удалить так как существуют заказы <br />
                с этим товаром
            </p>
        </template>
        <template v-slot:footer>
            <div class="modalControls">
                <app-button outlined @click="closeMessageModal">Хорошо</app-button>
            </div>
        </template>
    </app-modal>

    <app-modal :visible="isEditModalVisible" @close="closeEditModal" label="Изменение товара">
        <template v-slot:body>
            <product-form id="editProductForm" :defaultValue="product" :errors="errors" :onSubmit="onUpdateClick" />
        </template>
        <template v-slot:footer>
            <div class="modalControls">
                <p v-if="errors.global" class="error">{{ errors.global }}</p>
                <app-button outlined @click="closeEditModal">Отмена</app-button>
                <app-button type="submit" form="editProductForm" :loading="updateIsLoading">Сохранить</app-button>
            </div>
        </template>
    </app-modal>
</template>

<script lang="ts">
import { useMutation, useQueryClient } from 'vue-query';
import { defineComponent, PropType, ref } from 'vue';

import { updateProduct as updateProductApi, deleteProduct as deleteProductApi, ProductBody } from '@/api/productsApi';
import { LinkIcon, EditIcon, DeleteIcon } from '@/components/ui/Icons';
import ProductItem from '@/components/logic/ProductItem.vue';
import ProductForm from '@/components/logic/ProductForm.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppLoader from '@/components/ui/AppLoader.vue';
import AppModal from '@/components/ui/AppModal.vue';
import { clearErrors, parseError } from '@/utils';
import Product from '@/models/Product';

export default defineComponent({
    components: { ProductItem, AppButton, LinkIcon, EditIcon, DeleteIcon, AppLoader, AppModal, ProductForm },
    props: {
        product: { type: Object as PropType<Product>, required: true },
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
            description: '',
            img: '',
            categoryId: '',
            price: '',
            discounted: '',
            global: '',
        });

        const { mutate: updateProduct, isLoading: updateIsLoading } = useMutation(updateProductApi, {
            onSuccess: () => {
                clearErrors(errors);
                isEditModalVisible.value = false;
                queryClient.invalidateQueries('products');
                queryClient.invalidateQueries(['product', props.product.id]);
            },
            onError: (error: any) => {
                clearErrors(errors);
                parseError(error, errors);
            },
        });

        const { mutate: deleteProduct, isLoading: deleteIsLoading } = useMutation(deleteProductApi, {
            onSuccess: () => {
                queryClient.invalidateQueries('products');
                queryClient.invalidateQueries(['product', props.product.id]);
            },
            onError: () => {
                isMessageModalVisible.value = true;
            },
        });

        const onDeleteClick = () => deleteProduct(props.product.id);
        const onUpdateClick = (body: ProductBody) => updateProduct({ id: props.product.id, body });

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
