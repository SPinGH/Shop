<template>
    <form class="categoryForm" @submit.prevent="handleSubmit">
        <image-input class="img" :defaultValue="category.img" v-model="category.file" :error="errors?.img" />
        <app-input class="input" label="Название" outlined v-model="category.name" :error="errors?.name" />
    </form>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

import ImageInput from '@/components/ui/ImageInput.vue';
import AppInput from '@/components/ui/AppInput.vue';
import { CategoryBody } from '@/api/categoryApi';
import Category from '@/models/Category';

export default defineComponent({
    components: { AppInput, ImageInput },
    props: {
        onSubmit: { type: Function as PropType<(product: CategoryBody) => void>, required: true },
        defaultValue: Object as PropType<Category>,
        errors: Object as PropType<{ [key in keyof Category]?: string }>,
    },
    setup(props) {
        const category = ref({
            name: props.defaultValue?.name ?? '',
            img: props.defaultValue?.img ?? '',
            file: undefined as File | undefined,
        });

        const handleSubmit = () =>
            props.onSubmit({
                name: category.value.name,
                img: category.value.file ?? undefined,
            });

        return {
            category,
            handleSubmit,
        };
    },
});
</script>

<style lang="scss" scoped>
.categoryForm {
    margin-bottom: 10px;

    display: flex;
    align-items: flex-start;
    gap: 10px;
}
.img {
    flex: 0 0 100px;
    font-size: 100px;
}
.input {
    flex: 1 1 auto;
    width: 100%;
}
</style>
