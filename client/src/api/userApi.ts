import { $authHost } from './index';
import User from '@/models/User';

export const getUser = async () => {
    const { data } = await $authHost.get<User>('api/users');
    return data;
};

export const getAllUsers = async () => {
    const { data } = await $authHost.get<User[]>('api/users/all');
    return data;
};

export const updateUser = async (payload: { id: number; body: { email?: string; address?: string } }) => {
    await $authHost.put(`api/users/${payload.id}`, payload.body);
    return true;
};

export const deleteUser = async (id: number) => {
    await $authHost.delete(`api/users/${id}`);
    return true;
};
