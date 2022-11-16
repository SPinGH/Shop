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

export const updateUser = async (id: number, body: { email: string }) => {
    await $authHost.put(`api/users/${id}`, body);
    return true;
};

export const deleteUser = async (id: number) => {
    await $authHost.get(`api/users/${id}`);
    return true;
};
