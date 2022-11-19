<template>
    <figure :class="{ figure: true, [variant]: true }">
        <div class="img">
            <img :src="imageSrc" :alt="product.name" />
        </div>
        <figcaption class="caption">
            <p class="name">{{ product.name }}</p>
            <p v-if="product.description" class="descr">{{ product.description }}</p>
            <div class="priceWrapper">
                <p class="price">{{ product.discounted ?? product.price }}</p>
                <p v-if="product.discounted" class="price old">{{ product.price }}</p>
            </div>
        </figcaption>
    </figure>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

import Product from '@/models/Product';

export default defineComponent({
    props: {
        product: { type: Object as PropType<Product>, required: true },
        variant: { type: String as PropType<'inline' | 'small' | 'column' | 'twoColumn'>, default: 'column' },
    },
    setup(props) {
        const imageSrc = computed(() => `${process.env.VUE_APP_API_URL}/${props.product.img}`);
        return { imageSrc };
    },
});
</script>

<style lang="scss" scoped>
@import '@/mixins.scss';

.figure {
    height: 100%;
    @include respValue('padding', 15, 8);

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;

    transition: transform 0.3s ease;
    background-color: var(--bg-color);

    &.twoColumn {
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    &.inline {
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;

        transition: filter 0.3s ease;
        .img {
            width: 70px;
            height: 70px;
            flex: 0 0 70px;
        }
        .caption {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 10px;
        }
        .priceWrapper {
            gap: 10px;
        }
        .descr {
            order: 1;
        }
        .price {
            width: 70px;
        }
        .name {
            width: 300px;
        }
    }

    &.small {
        .name {
            font-size: 16px;
        }
        .descr {
            font-size: 12px;
        }
        .img {
            max-width: 80%;
        }
    }
}
.img {
    max-width: 60%;
    align-self: center;
    height: 200px;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
.caption {
    display: flex;
    flex-direction: column;
    gap: 5px;
}
.name {
    text-transform: capitalize;

    @include respValue('font-size', 24, 18);
    font-weight: 300;
    color: var(--dark-text-color);
    transition: color 0.3s ease;
}
.descr {
    margin-bottom: 8px;

    @include respValue('font-size', 18, 16);
    font-weight: 300;
    color: var(--text-color);
}
.priceWrapper {
    display: flex;
    align-items: center;
    gap: 5px;
}
.price {
    transition: color 0.3s ease;
    font-size: 22px;
    font-weight: 700;
    color: var(--primary-color);
    &::before {
        content: '$';
    }
    &.old {
        font-size: 14px;
        text-decoration: line-through;
        color: var(--dark-text-color);
    }
}
</style>
