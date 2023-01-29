import { $authHost } from './index';

export const getLikeStatus = async (productId: number) => {
    const { data } = await $authHost.get<{ status: boolean }>('api/likes', { params: { productId } });
    return data.status;
};

export const toggleLike = async (productId: number) => {
    const { data } = await $authHost.post<{ status: boolean }>('api/likes', { productId });
    return data.status;
};
