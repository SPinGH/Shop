<template>
    <figure :class="{ categoryItem: true, withHover, [variant]: true }">
        <img class="img" :src="imageSrc" :alt="category.name" />
        <figcaption class="caption">{{ category.name }}</figcaption>
    </figure>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

import Category from '@/models/Category';

export default defineComponent({
    props: {
        category: { type: Object as PropType<Category>, required: true },
        variant: { type: String as PropType<'normal' | 'inline' | 'large'>, default: 'normal' },
        withHover: Boolean,
    },
    setup(props) {
        const imageSrc = computed(() => `${process.env.VUE_APP_API_URL}/${props.category.img}`);
        return { imageSrc };
    },
});
</script>

<style lang="scss" scoped>
@import '@/mixins.scss';
.categoryItem {
    text-align: right;
    text-transform: capitalize;
    padding: 8px;

    font-size: 16px;
    font-weight: 400;
    color: var(--text-color);
    transition: color 0.3s ease;

    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    justify-content: right;

    &.withHover {
        @media (any-hover: hover) {
            &:hover {
                color: var(--dark-text-color);
                .img {
                    filter: brightness(0.7);
                }
            }
        }
    }

    &.inline {
        @include respValue('padding', 15, 8);
        font-size: 24px;
        flex-direction: row;
        text-align-last: left;

        .img {
            width: 70px;
            height: 70px;
            flex: 0 0 70px;
            margin-right: 20px;
            margin-left: 0px;
        }
        .caption {
            width: 300px;
            text-transform: capitalize;

            @include respValue('font-size', 24, 18);
            font-weight: 300;
            color: var(--dark-text-color);
        }
    }

    &.large {
        font-size: 24px;
        flex-direction: row;
        justify-content: left;

        .img {
            width: 60px;
            height: 60px;
            flex: 0 0 60px;
            margin-right: 20px;
            margin-left: 0px;
        }
    }
}
.img {
    margin-left: 20px;
    width: 30px;
    height: 30px;
    flex: 0 0 30px;
}
</style>
