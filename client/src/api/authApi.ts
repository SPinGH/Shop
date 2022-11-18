import { $host } from './index';

export const registrate = async (body: { email: string; password: string }) => {
    const { data } = await $host.post<{ token: string }>('api/auth/registration', body);
    return data.token;
};

export const login = async (body: { email: string; password: string }) => {
    const { data } = await $host.post<{ token: string }>('api/auth/login', body);
    return data.token;
};
