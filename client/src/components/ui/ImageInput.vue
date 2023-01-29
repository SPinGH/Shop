<template>
    <label class="imageInputWrapper">
        <div :class="{ imageWrapper: true, withError: error }">
            <img :src="image" alt="Выбранная картинка" />
        </div>
        <input class="imageInput" type="file" :disabled="disabled" @change="onChange" />
    </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import noPhoto from '@/assets/noPhoto.svg';

export default defineComponent({
    props: {
        disabled: Boolean,
        defaultValue: String,
        modelValue: File,
        error: String,
    },
    computed: {
        image() {
            return this.modelValue
                ? URL.createObjectURL(this.modelValue)
                : this.defaultValue
                ? `${process.env.VUE_APP_API_URL}/${this.defaultValue}`
                : noPhoto;
        },
    },
    methods: {
        onChange(e: Event) {
            const element = e.target as HTMLInputElement;
            this.$emit('update:modelValue', element.files && element.files[0]);
        },
    },
});
</script>

<style lang="scss" scoped>
.imageInputWrapper {
    position: relative;
    cursor: pointer;

    &:focus-within .imageWrapper {
        outline: 2px solid var(--invert-bg-color);
    }
    @media (any-hover: hover) {
        &:hover .imageWrapper::before {
            opacity: 0.3;
        }
    }
}
.imageWrapper {
    overflow: hidden;
    width: 1em;
    height: 1em;

    &::before {
        content: '';
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        opacity: 0;

        background-color: var(--invert-bg-color);
        transition: opacity 0.3s ease;
    }

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    &.withError {
        box-shadow: 0 0 0 1px var(--danger-color);
    }
}
.imageInput {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;
    white-space: nowrap;
    clip-path: inset(100%);
    clip: rect(0 0 0 0);
    overflow: hidden;
}
</style>
