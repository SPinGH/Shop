<template>
    <div class="tab" v-show="isActive">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, onBeforeMount, ref, watch } from 'vue';
import { TabsState } from '@/components/ui/AppTabs.vue';

export interface TabProps {
    title: string;
}

export default defineComponent({
    name: 'AppTab',
    props: {
        title: { type: String, required: true },
    },
    setup() {
        const index = ref(0);
        const isActive = ref(false);

        const tabs = inject<TabsState>('TabsProvider');

        watch(
            () => tabs?.selectedIndex,
            () => {
                isActive.value = index.value === tabs?.selectedIndex;
            }
        );

        onBeforeMount(() => {
            if (tabs) {
                index.value = tabs.count ?? 0;
                tabs.count++;
                isActive.value = index.value === tabs.selectedIndex;
            }
        });
        return { isActive };
    },
});
</script>

<style></style>
