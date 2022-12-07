<template>
    <aside ref="aside" :class="{ opened: isAsideOpened }">
        <button class="burger" @click="toggleIsAsideOpened">
            <span></span>
        </button>
        <div class="wrapper" :inert="!isAsideOpened">
            <app-loader v-if="isLoading" class="loader" />
            <ul class="list">
                <li v-for="category in categories" :key="category.id">
                    <router-link :to="`/products/${category.id}`" class="item">
                        <category-item :category="category" withHover />
                    </router-link>
                </li>
            </ul>
            <p v-if="error">Произошла ошибка при загрузке</p>
            <app-button to="/categories" variant="underline">Показать все категории</app-button>
        </div>
    </aside>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useQuery } from 'vue-query';

import CategoryItem from '@/components/logic/CategoryItem.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppLoader from '@/components/ui/AppLoader.vue';
import { getCategories } from '@/api/categoryApi';

export default defineComponent({
    components: { AppLoader, AppButton, CategoryItem },
    setup() {
        const aside = ref<HTMLElement | null>(null);
        const isAsideOpened = ref(false);

        const toggleIsAsideOpened = () => (isAsideOpened.value = !isAsideOpened.value);

        const onClickOutside = (e: MouseEvent) => {
            if (e.target !== aside.value && !aside.value?.contains(e.target as HTMLElement)) {
                isAsideOpened.value = false;
            }
        };

        watch(isAsideOpened, () => {
            if (isAsideOpened.value) {
                document.body.addEventListener('click', onClickOutside);
            } else {
                document.body.removeEventListener('click', onClickOutside);
            }
        });

        const { data: categories, isLoading, error } = useQuery('categories', getCategories);

        return {
            categories,
            aside,
            isAsideOpened,
            toggleIsAsideOpened,
            isLoading,
            error,
        };
    },
});
</script>

<style lang="scss" scoped>
.opened {
    .burger {
        span {
            background-color: var(--bg-color);
            &::before {
                transform: rotate(45deg);
                top: 0px;
            }
            &::after {
                transform: rotate(-45deg);
                bottom: 0px;
            }
        }
    }
    .wrapper {
        transform: translateX(0);
    }
}
.burger {
    border: none;
    cursor: pointer;
    position: fixed;
    z-index: 5;
    top: 20px;
    right: 15px;
    width: 50px;
    height: 50px;

    border-radius: 50%;
    background-color: var(--bg-color);
    box-shadow: 0px 0px 25px 0px var(--shadow-color);
    transition: box-shadow 0.3s ease;

    display: flex;
    justify-content: center;
    align-items: center;

    @media (any-hover: hover) {
        &:hover {
            box-shadow: 0px 0px 25px 15px var(--shadow-color);
        }
    }

    @media (max-width: 767px) {
        top: 10px;
        right: 12px;
    }

    span {
        position: relative;

        &,
        &::before,
        &::after {
            background-color: var(--primary-color);
            width: 15px;
            height: 2px;
            transition: transform 0.3s ease, top 0.3s ease, bottom 0.3s ease;
        }

        &::before,
        &::after {
            content: '';
            position: absolute;
            left: 0;
        }

        &::before {
            top: -4px;
        }

        &::after {
            bottom: -4px;
        }
    }
}
.wrapper {
    position: fixed;
    right: 0;
    z-index: 4;
    height: 100vh;
    padding: 7em 3em 2em 3em;

    font-size: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: var(--bg-color);
    box-shadow: 0px 0px 25px 0px var(--shadow-color);
    transform: translateX(100%);
    transition: transform 0.6s ease;

    @media (max-width: 767px) {
        font-size: 8px;
    }
}
.list {
    flex: 1 1 auto;

    display: flex;
    flex-direction: column;
    justify-content: center;

    li:not(:last-child) {
        margin-bottom: 2em;
    }
}
.item {
    text-decoration: none;
}
.loader {
    flex: 1 1 auto;

    display: flex;
    align-items: center;

    font-size: 20px !important;
    color: var(--primary-color);
}
</style>
