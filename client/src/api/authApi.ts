import { $host } from './index';

export const registration = async (email: string, password: string) => {
    const { data } = await $host.post<{ token: string }>('api/auth/registration', { email, password });
    return data.token;
};

export const login = async (email: string, password: string) => {
    const { data } = await $host.post<{ token: string }>('api/auth/login', { email, password });
    return data.token;
};
