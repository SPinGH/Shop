<template>
    <transition name="fade">
        <slot :class="'tab'" v-if="isActive"></slot>
    </transition>
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

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
    .content {
        transition: transform 0.3s ease;
    }
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    position: absolute;
    width: calc(100% - 2em);
    .content {
        transform: translateY(20px);
    }
}
.tab {
    flex: 1 1 auto;
}
</style>
