import Button, { BUTTON_TYPE_CLASSES} from '../button/button.component';
import { useNavigate } from 'react-router-dom';
import CartItem from '../cart-item/cart-item.component';

import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

import {CartDropdownContainer,EmptyMessage, CartItems} from './cart-dropdown.styles.jsx';



const CartDropDown = () => {
    
    const {cartItems, toggleCart} = useContext(CartContext);
    const navigate = useNavigate();
    const checkoutHandler = () => {
        toggleCart();
        navigate('/checkout');
        
    }
    return (
        <CartDropdownContainer>
            {
                cartItems.length ? 
                <div className='cart-preview'>
                    <CartItems>
                    {
                        cartItems.map( (item) => <CartItem key = {item.id} cartItem = {item}/>) 
                    }
                    </CartItems>
                    <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={checkoutHandler} >GO TO CHECKOUT</Button>
                </div>                         
                :
                <EmptyMessage>Cart is Empty</EmptyMessage>
            }
        </CartDropdownContainer>
    );
}

export default CartDropDown;