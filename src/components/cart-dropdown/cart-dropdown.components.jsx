import Button, { BUTTON_TYPE_CLASSES} from '../button/button.component';
import { useNavigate } from 'react-router-dom';
import CartItem from '../cart-item/cart-item.component';

import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

import './cart-dropdown.styles.scss';



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
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={checkoutHandler} >GO TO CHECKOUT</Button>
        </div>
    );
}

export default CartDropDown;