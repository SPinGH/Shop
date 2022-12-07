<template>
    <statistics-card>
        <div class="header">
            <p class="title">Прибыль за месяц</p>
            <app-input class="input" type="month" outlined v-model="month" />
        </div>
        <svg class="graph" width="100%" viewBox="0 0 430 105" xmlns="http://www.w3.org/2000/svg">
            line
            <line
                v-for="(value, index) in values"
                :key="index"
                :x1="5 + widthColumn * index"
                :x2="5 + widthColumn * index"
                y1="5"
                y2="85"
                strokeWidth="2"
                stroke="var(--text-color)" />
            <line x1="5" x2="425" y1="85" y2="85" strokeWidth="2" stroke="var(--text-color)" />

            <path
                :d="`M ${path}`"
                fillOpacity="null"
                strokeOpacity="null"
                strokeWidth="2"
                stroke="var(--primary-color)"
                fill="none" />
            <ellipse
                v-for="(value, index) in values"
                :key="index"
                stroke="var(--primary-color)"
                ry="2"
                rx="2"
                :cy="85 - value.height"
                :cx="5 + index * widthColumn"
                fill="var(--bg-color)"
                strokeWidth="2">
                <title>${{ value.value }}</title>
            </ellipse>

            <template v-for="(value, index) in values" :key="index">
                <text
                    v-if="!(index % 2)"
                    :x="5 + index * widthColumn"
                    y="100"
                    font-size="10px"
                    fill="var(--dark-text-color)"
                    text-anchor="middle">
                    {{ index + 1 }}
                </text>
            </template>
        </svg>
        <p v-if="error" class="error">Произошла ошибка при загрузке</p>
    </statistics-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useQuery } from 'vue-query';

import StatisticsCard from '@/components/logic/StatisticsCard.vue';
import AppInput from '@/components/ui/AppInput.vue';
import { getProfit } from '@/api/statisticsApi';

export default defineComponent({
    components: { StatisticsCard, AppInput },
    setup() {
        const today = new Date();
        const month = ref(`${today.getFullYear()}-${today.getMonth() + 1}`);
        const count = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

        const params = computed(() => ({
            month: month.value !== '' ? month.value : undefined,
        }));

        const { data: profit, isLoading, error } = useQuery(['profit', params], () => getProfit(params.value));

        const widthColumn = 420 / (count - 1);

        const maxProfit = computed(() => Math.max(...(profit.value?.map(({ profit }) => profit) ?? [])));

        const values = computed(() => {
            const temp: { height: number; value: number }[] = Array(count).fill({ height: 0, value: 0 });
            profit.value?.forEach(({ day, profit }) => {
                const index = Number(day.substring(8));
                temp[index] = { height: (80 * profit) / maxProfit.value, value: profit };
            });
            return temp;
        });

        const path = computed(() =>
            values.value.map(({ height }, index) => `${5 + index * widthColumn},${85 - height}`).join(' ')
        );

        return {
            month,
            count,
            widthColumn,
            maxProfit,
            values,
            path,
            isLoading,
            error,
        };
    },
});
</script>

<style lang="scss" scoped>
.header {
    margin-bottom: 10px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
}
.input {
    font-size: 16px !important;
}
.graph {
    path {
        transition: d 0.6s ease;
    }
    ellipse {
        transition: cy 0.6s ease;
    }
}
.error {
    font-size: 0.8em;
}
</style>
