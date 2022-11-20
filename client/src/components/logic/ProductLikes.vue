<template>
    <button
        v-if="canLike"
        class="likes wthHover"
        @click="onToggleLikeClick"
        :disabled="likeIsLoading || toggleLikeIsLoading">
        {{ product.likes }}
        <filled-heart-icon v-if="isLiked" class="likesIcon" />
        <heart-icon v-else class="likesIcon" />
    </button>
    <p v-else class="likes">{{ product.likes }}<heart-icon class="likesIcon" /></p>
</template>

<script lang="ts">
import { useMutation, useQuery, useQueryClient } from 'vue-query';
import { computed, defineComponent, PropType } from 'vue';
import { useStore } from 'vuex';

import { getLikeStatus, toggleLike as toggleLikeApi } from '@/api/likesApi';
import FilledHeartIcon from '@/components/ui/Icons/FilledHeartIcon.vue';
import HeartIcon from '@/components/ui/Icons/HeartIcon.vue';
import Product from '@/models/Product';
import { State } from '@/store';

export default defineComponent({
    components: { FilledHeartIcon, HeartIcon },
    props: {
        product: { type: Object as PropType<Product>, required: true },
    },
    setup(props) {
        const store = useStore<State>();
        const queryClient = useQueryClient();

        const productId = computed(() => props.product.id);
        const canLike = computed(() => store.state.auth.user?.role === 'USER');

        const { data: isLiked, isLoading: likeIsLoading } = useQuery(
            ['like', productId],
            () => getLikeStatus(productId.value),
            {
                enabled: canLike,
            }
        );

        const { mutate: toggleLike, isLoading: toggleLikeIsLoading } = useMutation(toggleLikeApi, {
            onSuccess: (status) => {
                queryClient.setQueryData(['like', productId], status);
                queryClient.setQueryData(['product', productId], (prev) => {
                    const product = prev as Product;
                    if (product.likes !== undefined) {
                        product.likes += status ? 1 : -1;
                    }
                    return product;
                });
            },
        });

        const onToggleLikeClick = () => toggleLike(productId.value);

        return {
            canLike,
            isLiked,
            likeIsLoading,
            toggleLikeIsLoading,
            onToggleLikeClick,
        };
    },
});
</script>

<style lang="scss" scoped>
.likes {
    align-self: flex-end;
    border: none;
    outline: none;
    background: none;
    padding: 5px;

    display: flex;
    align-items: center;
    gap: 5px;

    font-size: 16px;
    font-weight: 300;
    transition: transform 0.3s ease;

    @media (max-width: 767px) {
        margin-right: 10px;
    }

    &.wthHover {
        cursor: pointer;
        @media (any-hover: hover) {
            &:hover {
                transform: scale(1.05);
            }
        }
    }
}
.likesIcon {
    font-size: 20px;
    color: #ff537e;
}
</style>
