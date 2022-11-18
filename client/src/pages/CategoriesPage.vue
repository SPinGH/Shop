<template>
    <app-container class="categories">
        <page-title>Категории</page-title>
        <ul class="list">
            <li v-for="category in $store.state.categories" :key="category.id">
                <router-link class="item" :to="`/products/${category.id}`">
                    <category-item :category="category" size="large" withHover />
                </router-link>
            </li>
        </ul>
    </app-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import CategoryItem from '@/components/logic/CategoryItem.vue';
import AppContainer from '@/components/ui/AppContainer.vue';
import PageTitle from '@/components/ui/PageTitle.vue';

export default defineComponent({
    components: { AppContainer, CategoryItem, PageTitle },
});
</script>

<style lang="scss" scoped>
@import '../mixins.scss';
.categories {
    background-color: var(--dark-bg-color);
}
.list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    align-items: center;
    column-gap: 20px;
    row-gap: 30px;
    grid-auto-flow: dense;
}
.item {
    text-decoration: none;
}
</style>
