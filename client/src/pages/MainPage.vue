<template>
    <div class="container">
        <h1 class="title">OLIOS</h1>
        <p class="subtitle">МЕБЕЛЬНЫЙ МАГАЗИН</p>
        <app-button class="viewmore" to="/products">Каталог</app-button>
        <div class="textBg">МОДЕРН</div>
    </div>
    <div class="bg">
        <picture>
            <source srcset="../assets/1.avif" type="image/avif" />
            <source srcset="../assets/1.webp" type="image/webp" />
            <img src="../assets/1.jpg" alt="furniture" />
        </picture>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AppButton from '@/components/ui/AppButton.vue';

export default defineComponent({
    components: { AppButton },
    methods: {
        onClick() {
            console.log('click');
        },
    },
});
</script>

<style lang="scss" scoped>
@import '@/mixins.scss';
.container {
    position: absolute;
    text-align: center;
    top: 100px;
    left: 0;
    right: 0;
    pointer-events: none;
}
.title {
    text-transform: uppercase;
    margin-bottom: 10px;

    @include respValue('font-size', 150, 80);
    font-weight: 100;
    color: var(--dark-text-color);
}
.subtitle {
    text-transform: uppercase;
    margin-bottom: 35px;

    @include respValue('font-size', 24, 16);
    font-weight: 300;
    color: var(--dark-text-color);
}
.viewmore {
    pointer-events: all;
}
.textBg {
    position: absolute;
    top: 20px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    z-index: -1;
    opacity: 0.2;

    @include respValue('font-size', 200, 60);
    font-weight: 900;
    color: var(--text-color);
}
.bg {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    z-index: -2;

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: bottom;
    }
}
</style>
