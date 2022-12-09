<template>
    <statistics-card>
        <div class="header">
            <p class="title">Прибыль</p>
            <app-input class="input" type="month" outlined v-model="month" />
        </div>
        <app-loader v-if="monthIsLoading || yearIsLoading" class="loader" />
        <svg v-if="monthValues" class="graph" width="100%" viewBox="-30 0 460 105" xmlns="http://www.w3.org/2000/svg">
            line
            <line
                v-for="(value, index) in monthValues.values"
                :key="index"
                :x1="5 + monthValues.columnWidth * index"
                :x2="5 + monthValues.columnWidth * index"
                y1="5"
                y2="85"
                stroke="var(--text-color)" />
            <line x1="5" x2="425" y1="85" y2="85" strokeWidth="2" stroke="var(--text-color)" />

            <path :d="`M ${path}`" stroke="var(--primary-color)" fill="none" />
            <ellipse
                v-for="(value, index) in monthValues.values"
                :key="index"
                stroke="var(--primary-color)"
                ry="2"
                rx="2"
                :cy="85 - value.height"
                :cx="5 + index * monthValues.columnWidth"
                fill="var(--bg-color)">
                <title>${{ value.value }}</title>
            </ellipse>

            <template v-for="(value, index) in monthValues.values" :key="index">
                <text
                    v-if="!(index % 2)"
                    :x="5 + index * monthValues.columnWidth"
                    y="100"
                    font-size="10px"
                    fill="var(--dark-text-color)"
                    text-anchor="middle">
                    {{ index + 1 }}
                </text>
            </template>

            <text x="-2" y="12" font-size="8px" fill="var(--dark-text-color)" text-anchor="end">
                {{ monthValues.maxProfit }}
            </text>
            <text x="-2" y="47" font-size="8px" fill="var(--dark-text-color)" text-anchor="end">
                {{ monthValues.maxProfit / 2 }}
            </text>
            <text x="-2" y="87" font-size="8px" fill="var(--dark-text-color)" text-anchor="end">0</text>
        </svg>
        <svg v-if="yearValues" class="graph" width="100%" viewBox="-30 0 460 105" xmlns="http://www.w3.org/2000/svg">
            line
            <line
                v-for="(value, index) in yearValues.values"
                :key="index"
                :x1="17 + 36 * index"
                :x2="17 + 36 * index"
                :y1="85"
                :y2="85 - value.height"
                stroke-width="24"
                stroke="var(--primary-color)">
                <title>${{ value.value }}</title>
            </line>
            <line x1="5" x2="425" y1="85" y2="85" strokeWidth="2" stroke="var(--text-color)" />

            <text
                v-for="(value, index) in MonthName"
                :key="index"
                :x="17 + 36 * index"
                y="100"
                font-size="10px"
                fill="var(--dark-text-color)"
                text-anchor="middle">
                {{ value }}
            </text>

            <text x="-2" y="12" font-size="8px" fill="var(--dark-text-color)" text-anchor="end">
                {{ yearValues.maxProfit }}
            </text>
            <text x="-2" y="47" font-size="8px" fill="var(--dark-text-color)" text-anchor="end">
                {{ yearValues.maxProfit / 2 }}
            </text>
            <text x="-2" y="87" font-size="8px" fill="var(--dark-text-color)" text-anchor="end">0</text>
        </svg>
        <p v-if="monthError || yearError" class="error">Произошла ошибка при загрузке</p>
    </statistics-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useQuery } from 'vue-query';

import StatisticsCard from '@/components/logic/StatisticsCard.vue';
import AppLoader from '@/components/ui/AppLoader.vue';
import AppInput from '@/components/ui/AppInput.vue';
import { getProfit } from '@/api/statisticsApi';
import { Profit } from '@/models/Profit';

export default defineComponent({
    components: { StatisticsCard, AppInput, AppLoader },
    setup() {
        const MonthName = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
        const today = new Date();

        const month = ref(`${today.getFullYear()}-${today.getMonth() + 1}`);

        const monthParams = computed(() => ({
            month: month.value !== '' ? month.value : undefined,
        }));

        const select = (data: Profit[], type: 'month' | 'year' = 'month') => {
            const currentDate = new Date(month.value);
            const count =
                type === 'month' ? new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate() : 12;

            const columnWidth = 420 / (count - 1);
            const maxProfit = Math.max(...(data.length ? data.map(({ profit }) => profit) : [1]));

            const values: { height: number; value: number }[] = Array(count).fill({ height: 0, value: 0 });
            data.forEach(({ period, profit }) => {
                const index = type === 'month' ? Number(period.substring(8)) - 1 : Number(period.substring(5)) - 1;
                values[index] = { height: (80 * profit) / maxProfit, value: profit };
            });

            return {
                columnWidth,
                maxProfit,
                values,
            };
        };

        const {
            data: monthValues,
            isLoading: monthIsLoading,
            error: monthError,
        } = useQuery(['profit', monthParams], () => getProfit(monthParams.value), {
            keepPreviousData: true,
            select,
        });

        const path = computed(() =>
            monthValues.value?.values
                .map(({ height }, index) => `${5 + index * monthValues.value?.columnWidth},${85 - height}`)
                .join(' ')
        );

        const yearParams = computed(() => ({
            year: month.value !== '' ? month.value.substring(0, 4) : undefined,
        }));

        const {
            data: yearValues,
            isLoading: yearIsLoading,
            error: yearError,
        } = useQuery(['profit', yearParams], () => getProfit(yearParams.value), {
            keepPreviousData: true,
            select: (data) => select(data, 'year'),
        });

        return {
            MonthName,
            month,
            monthValues,
            monthIsLoading,
            monthError,
            path,
            yearValues,
            yearIsLoading,
            yearError,
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
.graph:last-child {
    padding-top: 10px;
    border-top: 1px solid var(--dark-bg-color);
}
.input {
    font-size: 16px !important;
}
.error {
    font-size: 0.8em;
}
</style>
