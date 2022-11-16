<template>
    <router-link v-if="to && !disabled" :class="{ appBtn: true, [variant]: true, outlined, disabled }" :to="to">
        <span><slot></slot></span>
    </router-link>
    <p v-else-if="to && disabled" :class="{ appBtn: true, [variant]: true, outlined, disabled }">
        <span><slot></slot></span>
    </p>
    <button
        v-else
        :disabled="loading || disabled"
        :type="type"
        :class="{ appBtn: true, [variant]: true, outlined, loading, disabled }"
        @click="onClick">
        <span><slot></slot></span>
        <app-loader v-if="loading" class="loader" variant="light" />
    </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import AppLoader from './AppLoader.vue';
export default defineComponent({
    components: { AppLoader },
    props: {
        onClick: Function as PropType<() => void>,
        to: String,
        type: { type: String as PropType<'button' | 'submit' | 'reset'>, default: 'button' },
        variant: { type: String as PropType<'primary' | 'danger' | 'underline'>, default: 'primary' },
        outlined: Boolean,
        loading: Boolean,
        disabled: Boolean,
    },
});
</script>

<style lang="scss" scoped>
.appBtn {
    display: inline-block;
    position: relative;
    cursor: pointer;
    text-transform: uppercase;
    text-decoration: none;
    text-align: center;
    border: none;

    font-size: 16px;
    font-weight: 900;
    line-height: 1.4em;
    padding: 0.7em 2em;
    transition: background-color 0.3s ease;

    span {
        position: relative;
    }
    &.loading {
        cursor: progress !important;
        span {
            color: transparent !important;
        }
    }
    &.disabled {
        cursor: default;
    }
}
.primary,
.danger {
    border-radius: 1.7em;

    &::before {
        content: '';
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;

        opacity: 0;
        transition: opacity 0.3s ease;

        border-radius: 1.7em;
        background-color: currentColor;
    }
    &:not(.outlined)::before {
        background-color: var(--invert-bg-color);
    }
    &.outlined {
        background-color: transparent !important;
        box-shadow: inset 0 0 0 1px currentColor;
    }
    &.disabled {
        &:not(.outlined) {
            background-color: var(--text-color);
        }
        &.outlined {
            color: var(--text-color);
        }
    }
    &:not(.disabled):not(.loading):active::before {
        opacity: 0.3 !important;
    }
    @media (any-hover: hover) {
        &:not(.disabled):not(.loading):hover::before {
            opacity: 0.15;
        }
    }
}
.primary {
    background-color: var(--primary-color);
    color: var(--bg-color);
    &.outlined {
        color: var(--primary-color);
    }
}
.danger {
    background-color: var(--danger-color);
    color: var(--bg-color);
    &.outlined {
        color: var(--danger-color);
    }
}
.underline {
    background-color: transparent;
    padding: 0.5em;

    font-weight: 400;
    color: var(--primary-color);

    &::after {
        content: '';
        position: absolute;
        right: 0px;
        bottom: 0px;
        left: 0px;
        margin: 0 auto;

        height: 2px;
        width: 80%;
        transition: width 0.3s ease;
        background-color: var(--primary-color);
    }
    &.loading::after {
        width: 0;
    }
    &.disabled {
        color: var(--text-color);
        &::after {
            background-color: var(--text-color);
        }
    }
    &:not(.disabled):not(.loading):active {
        filter: brightness(0.7);
    }
    @media (any-hover: hover) {
        &:not(.disabled):not(.loading):hover::after {
            width: 100%;
        }
    }
}
.loader {
    position: absolute;
    font-size: 1.2em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
}
</style>
