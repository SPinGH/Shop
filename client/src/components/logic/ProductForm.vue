<template>
    <form class="productForm" @submit.prevent="handleSubmit">
        <div class="column">
            <image-input class="img" :defaultValue="product.img" v-model="product.file" :error="errors?.img" />
            <app-input class="input" label="Название" outlined v-model="product.name" :error="errors?.name" />
        </div>
        <app-textarea
            class="textarea"
            label="Описание"
            outlined
            v-model="product.description"
            :error="errors?.description" />
        <div class="column">
            <app-select
                class="input"
                label="Категрия"
                :options="options"
                outlined
                v-model="product.categoryId"
                :error="errors?.categoryId" />
            <app-input
                class="input"
                label="Цена"
                type="number"
                outlined
                v-model="product.price"
                :error="errors?.price" />
            <app-input
                class="input"
                label="Скидка (%)"
                type="number"
                outlined
                v-model="product.discounted"
                :error="errors?.discounted" />
        </div>
    </form>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import { useQuery } from 'vue-query';

import AppTextarea from '@/components/ui/AppTextarea.vue';
import ImageInput from '@/components/ui/ImageInput.vue';
import AppSelect from '@/components/ui/AppSelect.vue';
import AppInput from '@/components/ui/AppInput.vue';
import { ProductBody } from '@/api/productsApi';
import Category from '@/models/Category';
import Product from '@/models/Product';

export default defineComponent({
    components: { AppInput, AppSelect, ImageInput, AppTextarea },
    props: {
        onSubmit: { type: Function as PropType<(product: ProductBody) => void>, required: true },
        defaultValue: Object as PropType<Product>,
        errors: Object as PropType<{ [key in keyof Product]?: string }>,
    },
    setup(props) {
        const product = ref({
            name: props.defaultValue?.name ?? '',
            description: props.defaultValue?.description ?? '',
            img: props.defaultValue?.img ?? '',
            categoryId: props.defaultValue?.categoryId.toString() ?? '',
            price: props.defaultValue?.price ?? 0,
            discounted: props.defaultValue?.discounted ?? 0,
            file: undefined as File | undefined,
        });

        const { data: categories } = useQuery<Category[]>('categories');

        const options = computed(() =>
            categories.value?.map((category) => ({ value: category.id.toString(), label: category.name }))
        );

        const handleSubmit = () =>
            props.onSubmit({
                name: product.value.name,
                description: product.value.description || null,
                img: product.value.file ?? undefined,
                categoryId: Number(product.value.categoryId),
                price: product.value.price,
                discounted: product.value.discounted || null,
            });

        return {
            product,
            options,
            handleSubmit,
        };
    },
});
</script>

<style lang="scss" scoped>
.productForm {
    display: flex;
    flex-direction: column;
}
.column {
    margin-bottom: 10px;

    display: flex;
    align-items: flex-start;
    gap: 10px;
}
.img {
    flex: 0 0 100px;
    font-size: 100px;
}
.textarea {
    margin-bottom: 30px;
}
.input {
    flex: 1 1 auto;
    width: 100%;
}
</style>
