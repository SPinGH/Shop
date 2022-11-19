import Product from './Product';

export default interface Order {
    id: number;
    date: string;
    orderItems: {
        id: number;
        price: null;
        quantity: number;
        product: Product;
    }[];
}
