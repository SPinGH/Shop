import { $host, $authHost } from './index';
import { objectToFormData } from '@/utils';
import Category from '@/models/Category';

type CategoryBody = Omit<Category, 'id'>;

export const getCategories = async () => {
    const { data } = await $host.get<Category[]>('api/categories');
    return data;
};

export const createCategory = async (body: CategoryBody) => {
    const { data } = await $authHost.post<{ id: number }>('api/categories', objectToFormData(body));
    return data.id;
};

export const updateCategory = async (id: number, body: CategoryBody) => {
    await $authHost.put(`api/categories/${id}`, objectToFormData(body));
    return true;
};

export const deleteCategory = async (id: number) => {
    await $authHost.delete(`api/categories/${id}`);
    return true;
};
