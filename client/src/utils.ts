export const getDeclOfNum = (n: number, textForms: string[]) => {
    n = Math.abs(n) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) return textForms[2];
    if (n1 > 1 && n1 < 5) return textForms[1];
    if (n1 === 1) return textForms[0];
    return textForms[2];
};
export const productForms = ['товар', 'товара', 'товаров'];
export const searchedForms = ['найден', 'найдено', 'найдено'];

export const objectToFormData = (object: { [s: string]: any }) => {
    const formData = new FormData();
    Object.entries(object).forEach(([key, value]) => formData.append(key, value));
};
