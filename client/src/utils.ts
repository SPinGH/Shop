import { AxiosError } from 'axios';
import { Ref } from 'vue';

import BadRequestError from '@/models/BadRequestError';

export const getDeclOfNum = (n: number, textForms: string[]) => {
    n = Math.abs(n) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) return textForms[2];
    if (n1 > 1 && n1 < 5) return textForms[1];
    if (n1 === 1) return textForms[0];
    return textForms[2];
};
export const productForms = ['товар', 'товара', 'товаров'];
export const categoryForms = ['категория', 'категории', 'категорий'];
export const searchedForms = ['найден', 'найдено', 'найдено'];

export const objectToFormData = (object: { [s: string]: any }) => {
    const formData = new FormData();
    Object.entries(object).forEach(([key, value]) => {
        if (value !== null) formData.append(key, value);
    });
    return formData;
};

export const clearErrors = (errors: Ref<{ [key: string]: string; global: string }>) =>
    (Object.keys(errors.value) as Array<keyof typeof errors.value>).forEach((key) => (errors.value[key] = ''));

export const parseError = (error: AxiosError, errors: Ref<{ [key: string]: string; global: string }>) => {
    if (error.response) {
        if (error.response.status === 400) {
            const messages = (error.response.data as BadRequestError)?.messages;
            messages.forEach((message) => {
                if (message.property in errors.value) (errors.value as any)[message.property] = message.errors[0];
            });
        } else {
            errors.value.global = (error.response.data as any)?.message ?? 'Произошла ошибка';
        }
    }
};
