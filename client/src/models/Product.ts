import Category from './Category';

export interface Product {
    id: number;
    name: string;
    description: string | null;
    img: string | null;
    price: number;
    discounted: number | null;
    categoryId: number;
    category?: Category;
    likes?: number;
}
