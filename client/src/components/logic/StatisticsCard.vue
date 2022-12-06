<template>
    <div class="statisticsCard">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>

<style lang="scss" scoped>
.statisticsCard {
    padding: 1em;
    font-size: 20px;

    border-radius: 1em;
    border: 1px solid var(--dark-bg-color);
}
</style>
