import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

import './cart-dropdown.styles.scss';



const CartDropDown = () => {
    const {cartItems} = useContext(CartContext);
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
             { cartItems && cartItems.map( (item) => <CartItem key = {item.id} cartItem = {item}/>)}
            </div>
            <Button>Go to Checkout</Button>
        </div>
    );
}

export default CartDropDown;