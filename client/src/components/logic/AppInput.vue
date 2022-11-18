<template>
    <label class="appInputWrapper">
        <p v-if="label" class="label">{{ label }}</p>
        <input
            :class="{ appInput: true, outlined, withError: error }"
            :type="type"
            :value="modelValue"
            @input="onInput" />
        <p :class="{ error: true, open: !!error }">{{ error }}</p>
    </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    props: {
        type: { type: String, default: 'text' },
        outlined: Boolean,
        modelValue: [String, Number],
        label: String,
        error: String,
    },
    methods: {
        onInput(e: Event) {
            this.$emit('update:modelValue', (e.target as HTMLInputElement).value);
        },
    },
});
</script>

<style lang="scss" scoped>
@import '@/mixins.scss';
.appInputWrapper {
    position: relative;
    display: flex;
    flex-direction: column;
}
.outlined {
    box-shadow: 0 0 1px 0px var(--dark-text-color);
}
.label {
    margin-bottom: 10px;

    font-weight: 400;
    color: var(--dark-text-color);
}
.appInput {
    z-index: 1;
    border: none;
    outline: none;
    padding: 0.7em 0.7em;
    border-radius: 1.7em;

    font-size: inherit;
    font-weight: inherit;
    font-family: inherit;
    color: var(--dark-text-color);

    &.withError {
        box-shadow: 0 0 0 1px var(--danger-color);
    }
}
.error {
    position: absolute;
    bottom: 0px;
    left: 5px;
    padding: 5px 0;
    color: var(--danger-color);
    font-size: 0.8em;
    font-weight: 400;
    transition: transform 0.3s ease;
    &.open {
        transform: translateY(100%);
    }
}
</style>
