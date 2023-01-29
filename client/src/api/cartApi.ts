import { $authHost } from './index';
import Cart from '@/models/Cart';

export const getCart = async () => {
    const { data } = await $authHost.get<Cart[]>('api/carts');
    return data;
};

export const addProductToCart = async (body: { productId: number; quantity: number }) => {
    const { data } = await $authHost.post<{ id: number }>('api/carts', body);
    return data.id;
};

export const changeCart = async (payload: { id: number; quantity: number }) => {
    await $authHost.put(`api/carts/${payload.id}`, { quantity: payload.quantity });
    return false;
};

export const deleteCart = async (id: number) => {
    await $authHost.delete(`api/carts/${id}`);
    return false;
};
