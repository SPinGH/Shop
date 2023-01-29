import UserOrder from '@/models/UserOrder';
import { $authHost } from './index';
import Order from '@/models/Order';

export const getOrders = async () => {
    const { data } = await $authHost.get<Order[]>('api/orders');
    return data;
};

export const getAllOrders = async (params?: { email?: string; limit?: number; page?: number }) => {
    const { data } = await $authHost.get<{ count: number; rows: UserOrder[] }>('api/orders/all', {
        params,
    });
    return data;
};

export const createOrder = async () => {
    const { data } = await $authHost.post<{ id: number }>('api/orders');
    return data.id;
};

export const deleteOrder = async (id: number) => {
    await $authHost.delete(`api/orders/${id}`);
    return true;
};
