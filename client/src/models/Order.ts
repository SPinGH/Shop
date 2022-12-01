import Product from './Product';

export default interface Order {
    id: number;
    date: string;
    orderItems: {
        id: number;
        price: number;
        quantity: number;
        product: Product;
    }[];
}
