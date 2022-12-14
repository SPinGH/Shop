import { objectToFormData } from '@/utils';
import { $authHost, $host } from './index';
import Product from '@/models/Product';

export type ProductBody = Omit<Product, 'id' | 'img'> & { img?: File | null };

export const getProducts = async (params?: { categoryId?: number; query?: string; limit?: number; page?: number }) => {
    const { data } = await $host.get<{ count: number; rows: Product[] }>('api/products', { params });
    return data;
};

export const getProduct = async (id: number) => {
    const { data } = await $host.get<Product>(`api/products/${id}`);
    return data;
};

export const getRecomendedProducts = async (id: number) => {
    const { data } = await $host.get<Product[]>(`api/products/recomended/${id}`);
    return data;
};

export const createProduct = async (body: ProductBody) => {
    const { data } = await $authHost.post<{ id: number }>('api/products', objectToFormData(body));
    return data.id;
};

export const updateProduct = async (payload: { id: number; body: ProductBody }) => {
    await $authHost.put(`api/products/${payload.id}`, objectToFormData(payload.body));
    return true;
};

export const deleteProduct = async (id: number) => {
    await $authHost.delete(`api/products/${id}`);
    return true;
};
