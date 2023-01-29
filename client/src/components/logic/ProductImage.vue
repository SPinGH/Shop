<template>
    <div class="productImage">
        <div class="img">
            <img :src="image" :alt="product.name" :style="`transform: scale(${zoom});`" />
        </div>
        <div class="zoom">
            <button @click="onZoomInClick" aria-label="Приблизить"><plus-icon class="zoomIcon" /></button>
            <button @click="onZoomOutClick" aria-label="Отдалить"><minus-icon class="zoomIcon" /></button>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';

import MinusIcon from '@/components/ui/Icons/MinusIcon.vue';
import PlusIcon from '@/components/ui/Icons/PlusIcon.vue';
import Product from '@/models/Product';

export default defineComponent({
    components: { PlusIcon, MinusIcon },
    props: {
        product: { type: Object as PropType<Product>, required: true },
    },
    setup(props) {
        const zoom = ref(1);

        const image = computed(() => `${process.env.VUE_APP_API_URL}/${props.product.img}`);

        const onZoomInClick = () => (zoom.value = zoom.value < 2 ? zoom.value + 0.2 : zoom.value);
        const onZoomOutClick = () => (zoom.value = zoom.value > 1 ? zoom.value - 0.2 : zoom.value);

        return {
            image,
            zoom,
            onZoomInClick,
            onZoomOutClick,
        };
    },
});
</script>

<style lang="scss" scoped>
.productImage {
    display: flex;
    flex-direction: column;
}
.img {
    flex: 1 1 auto;
    overflow: hidden;

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
        transition: transform 0.3s ease;
    }
}
.zoom {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;

    button {
        cursor: pointer;
        padding: 5px;
        border: none;
        background: none;
        transition: transform 0.3s ease;

        @media (any-hover: hover) {
            &:hover {
                transform: scale(1.1);
            }
        }
    }
}
.zoomIcon {
    display: block;
    font-size: 20px;
    color: var(--primary-color);
}
</style>
