<template>
    <div class="pageHeader"><slot></slot></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>

<style lang="scss" scoped>
@import '@/mixins.scss';
.pageHeader {
    margin-bottom: 20px;
    padding: 0px 60px 0px 0px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    text-transform: uppercase;
    @include respValue('font-size', 34, 18);
    font-weight: 300;
    color: var(--dark-text-color);

    @media (max-width: 767px) {
        padding: 10px 70px 0px 62px;
    }
}
</style>
