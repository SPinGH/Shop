<template>
    <div class="statisticsTab">
        <statistics-total class="header" />
        <statistics-popular class="popular" />
        <statistics-month-profit class="monthGraph" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import StatisticsMonthProfit from '@/components/logic/StatisticsMonthProfit.vue';
import StatisticsPopular from '@/components/logic/StatisticsPopular.vue';
import StatisticsTotal from '@/components/logic/StatisticsTotal.vue';

export default defineComponent({
    components: { StatisticsTotal, StatisticsPopular, StatisticsMonthProfit },
});
</script>

<style lang="scss" scoped>
.statisticsTab {
    display: grid;
    grid-template-columns: 500px 1fr;
    grid-template-rows: auto auto 1fr;
    grid-template-areas: 'header header' 'popular monthGraph' 'popular empty';
    gap: 15px;

    @media (max-width: 1100px) {
        grid-template-columns: 1fr;
        grid-template-areas: 'header' 'monthGraph' 'popular';
    }
}
.header {
    grid-area: header;
}
.popular {
    grid-area: popular;
    overflow-x: auto;
    overflow-y: hidden;
}
.monthGraph {
    grid-area: monthGraph;
}
</style>
