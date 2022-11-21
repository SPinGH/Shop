<template>
    <div class="modalWrapper">
        <div class="backdrop" @click="close"></div>
        <div class="content" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
            <div class="header">
                <p class="label" id="modalTitle">{{ label }}</p>
                <button type="button" class="closeBtn" @click="close" aria-label="Закрыть"><close-icon /></button>
            </div>
            <div class="body" id="modalDescription">
                <slot name="body"></slot>
            </div>
            <div class="footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import CloseIcon from '@/components/ui/Icons/CloseIcon.vue';

export default defineComponent({
    components: { CloseIcon },
    props: {
        label: String,
    },
    methods: {
        close() {
            this.$emit('close');
        },
    },
});
</script>

<style lang="scss" scoped>
.modalWrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 500;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: opacity 0.5s ease;
}
.backdrop {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;

    background-color: rgba(0, 0, 0, 0.3);
}

.content {
    z-index: 501;
    background: var(--bg-color);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
}

.header,
.footer {
    padding: 20px 30px;
    display: flex;
    @media (max-width: 767px) {
        padding: 15px 20px;
    }
}

.header {
    border-bottom: 1px solid var(--dark-bg-color);
    justify-content: space-between;
    align-items: center;
}

.footer {
    border-top: 1px solid var(--dark-bg-color);
    justify-content: flex-end;
}

.body {
    position: relative;
    padding: 20px 30px;
    @media (max-width: 767px) {
        padding: 15px 20px;
    }
}
.label {
    font-size: 24px;
    font-weight: 300;
    color: var(--dark-text-color);
}
.closeBtn {
    border: none;
    width: 30px;
    height: 30px;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 20px;
    font-weight: bold;
    background: transparent;
    color: var(--text-color);
    transition: color 0.3s ease;

    @media (any-hover: hover) {
        &:hover {
            color: var(--primary-color);
        }
    }
}
</style>
