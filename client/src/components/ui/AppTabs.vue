<template>
    <div class="appTabs">
        <div class="header">
            <button
                v-for="(tab, index) in tabs"
                :key="index"
                @click="selectTab(index)"
                :class="{ tab: true, selected: index === selectedIndex }">
                {{ tab.props?.title }}
            </button>
        </div>
        <div class="body"><slot></slot></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, provide, onMounted, onBeforeMount, toRefs, VNode } from 'vue';
import { TabProps } from '@/components/ui/AppTab.vue';

export interface TabsState {
    selectedIndex: number;
    tabs: VNode<TabProps>[];
    count: number;
}

export default defineComponent({
    name: 'AppTabs',
    setup(_, { slots }) {
        const state: TabsState = reactive({
            selectedIndex: 0,
            tabs: [] as VNode<TabProps>[],
            count: 0,
        });

        provide('TabsProvider', state);

        const selectTab = (i: number) => (state.selectedIndex = i);

        onBeforeMount(() => {
            if (slots.default) {
                state.tabs = slots.default() as VNode<TabProps>[];
            }
        });

        onMounted(() => selectTab(0));

        return { ...toRefs(state), selectTab };
    },
});
</script>

<style lang="scss" scoped>
@import '../../mixins.scss';
.appTabs {
    flex: 1 1 auto;

    display: flex;
    flex-direction: column;
}
.header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 20px;
    column-gap: 20px;
    row-gap: 10px;
}
.tab {
    padding: 0.7em 1.1em;
    cursor: pointer;
    border: none;

    border-radius: 28px;

    text-transform: capitalize;
    @include respValue('font-size', 18, 12);
    font-weight: 300;
    color: var(--dark-text-color);
    &.selected {
        background-color: var(--bg-color);
    }
}
.body {
    flex: 1 1 auto;

    position: relative;
    padding: 1em;
    border-radius: 1em;
    background-color: var(--bg-color);

    display: flex;
    flex-direction: column;
}
</style>
