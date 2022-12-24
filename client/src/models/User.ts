export default interface User {
    id: number;
    email: string;
    address: string;
    role: 'USER' | 'ADMIN';
}
