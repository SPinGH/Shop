import { $host, $authHost } from './index';
import { objectToFormData } from '@/utils';
import Category from '@/models/Category';

export type CategoryBody = Omit<Category, 'id' | 'img'> & { img: File | null };

export const getCategories = async () => {
    const { data } = await $host.get<Category[]>('api/categories');
    return data;
};

export const createCategory = async (body: CategoryBody) => {
    const { data } = await $authHost.post<{ id: number }>('api/categories', objectToFormData(body));
    return data.id;
};

export const updateCategory = async (payload: { id: number; body: CategoryBody }) => {
    await $authHost.put(`api/categories/${payload.id}`, objectToFormData(payload.body));
    return true;
};

export const deleteCategory = async (id: number) => {
    await $authHost.delete(`api/categories/${id}`);
    return true;
};
