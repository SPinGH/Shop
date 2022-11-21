<template>
    <label :class="{ appSelectWrapper: true, [variant]: true }">
        <p v-if="label" class="label">{{ label }}</p>
        <select
            :class="{ appSelect: true, outlined, withError: error }"
            :value="modelValue"
            :disabled="disabled"
            @change="onchange">
            <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.label }}
            </option>
        </select>
        <p :class="{ error: true, open: !!error }">{{ error }}</p>
    </label>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
export default defineComponent({
    props: {
        variant: { type: String as PropType<'vertical' | 'inline'>, default: 'vertical' },
        options: Array as PropType<{ value: string; label: string }[]>,
        disabled: Boolean,
        outlined: Boolean,
        modelValue: String,
        label: String,
        error: String,
    },
    methods: {
        onchange(e: Event) {
            this.$emit('update:modelValue', (e.target as HTMLInputElement).value);
        },
    },
});
</script>

<style lang="scss" scoped>
@import '@/mixins.scss';
.appSelectWrapper {
    position: relative;
    display: flex;

    &.vertical {
        flex-direction: column;
        row-gap: 10px;
    }
    &.inline {
        align-items: center;
        column-gap: 10px;
        .appInput {
            flex: 1 1 auto;
        }
    }
}
.outlined {
    box-shadow: 0 0 0px 1px var(--dark-text-color);
}
.label {
    font-weight: 400;
    color: var(--dark-text-color);
}
.appSelect {
    width: 100%;
    z-index: 1;
    border: none;
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
