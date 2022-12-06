import Product from '@/models/Product';
import { $authHost } from './index';

interface Total {
    products: number;
    orders: number;
    categories: number;
    users: number;
    profit: number;
}

interface Profit {
    day: string;
    profit: number;
}

export const getTotal = async () => {
    const { data } = await $authHost.get<Total>('api/statistics/total');
    return data;
};

export const getPopular = async (params: { categoryId?: number }) => {
    const { data } = await $authHost.get<Product[]>('api/statistics/popular', { params });
    return data;
};

export const getProfit = async (params: { month?: string }) => {
    const { data } = await $authHost.get<Profit[]>('api/statistics/profit', { params });
    return data;
};
