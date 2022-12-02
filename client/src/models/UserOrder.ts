import Order from './Order';
import User from './User';

export default interface UserOrder extends Order {
    user: User;
}
