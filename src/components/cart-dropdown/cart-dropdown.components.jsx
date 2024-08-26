import Button, { BUTTON_TYPE_CLASSES} from '../button/button.component';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from '../cart-item/cart-item.component';

import {CartDropdownContainer,EmptyMessage, CartItems} from './cart-dropdown.styles.jsx';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartOpened } from '../../store/cart/cart.selector.js';
import { toggleCartShown } from '../../store/cart/cart.actions';



const CartDropDown = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const cartOpened = useSelector(selectCartOpened);
    const navigate = useNavigate();
    const checkoutHandler = () => {
        dispatch(toggleCartShown(cartOpened))
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