import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

import {CartIconContainer, ShoppingIcon,ItemCount} from './cart-icon.styles.jsx';


const CartIcon = () => {
    const { toggleCart, cartSize } = useContext(CartContext);
    const toggleCartDisplay = () => {
        console.log('Toggle Cart Display');
        toggleCart();
      };
    return (
        <CartIconContainer onClick={toggleCartDisplay}>
            <ShoppingIcon />
            <ItemCount>{cartSize}</ItemCount>
        </CartIconContainer>
    );
}

export default CartIcon;