import { $authHost } from './index';
import Order from '@/models/Order';

export const getOrders = async () => {
    const { data } = await $authHost.get<Order[]>('api/orders');
    return data;
};

export const createOrder = async () => {
    const { data } = await $authHost.post<{ id: number }>('api/orders');
    return data.id;
};
