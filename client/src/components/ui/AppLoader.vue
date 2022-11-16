<template>
    <div class="appLoader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>

<style lang="scss" scoped>
.appLoader {
    position: relative;
    font-size: inherit;
    width: 1em;
    height: 1em;

    div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 0.8em;
        height: 0.8em;
        margin: 0.1em;
        font-size: inherit;
        border: 0.1em solid var(--bg-color);
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: currentColor transparent transparent transparent;

        &:nth-child(1) {
            animation-delay: -0.45s;
        }
        &:nth-child(2) {
            animation-delay: -0.3s;
        }
        &:nth-child(3) {
            animation-delay: -0.15s;
        }
    }
}
@keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
