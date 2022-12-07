<template>
    <main class="appContainer"><slot></slot></main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>

<style lang="scss" scoped>
.appContainer {
    min-height: 100vh;
    padding: 30px 20px 30px 92px;

    @media (max-width: 767px) {
        padding: 10px;
    }
}
</style>
