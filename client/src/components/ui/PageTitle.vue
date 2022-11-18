<template>
    <h1 class="pageTitle"><slot></slot></h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>

<style lang="scss" scoped>
@import '@/mixins.scss';
.pageTitle {
    margin-bottom: 20px;
    padding: 0px 60px 0px 0px;

    text-transform: uppercase;
    @include respValue('font-size', 34, 18);
    font-weight: 300;
    color: var(--dark-text-color);

    @media (max-width: 767px) {
        padding: 0px 60px 0px 52px;
    }
}
</style>
