import Button from '../button/button.component';
import { useNavigate } from 'react-router-dom';
import CartItem from '../cart-item/cart-item.component';

import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

import './cart-dropdown.styles.scss';
import { Link } from 'react-router-dom';



const CartDropDown = () => {
    
    const {cartItems, toggleCart} = useContext(CartContext);
    const navigate = useNavigate();
    const checkoutHandler = () => {
        toggleCart();
        navigate('/checkout');
        
    }
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
             { cartItems && cartItems.map( (item) => <CartItem key = {item.id} cartItem = {item}/>)}
            </div>
            <Button onClick={checkoutHandler} buttonType='inverted'>GO TO CHECKOUT</Button>
        </div>
    );
}

export default CartDropDown;