import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

import {CartIconContainer, Icon,ItemCount} from './cart-icon.styles.jsx';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';


const CartIcon = () => {
    const { toggleCart, cartSize } = useContext(CartContext);
    const toggleCartDisplay = () => {
        console.log('Toggle Cart Display');
        toggleCart();
      };
    return (
        <CartIconContainer onClick={toggleCartDisplay}>
            <Icon />
            <ItemCount>{cartSize}</ItemCount>
        </CartIconContainer>
    );
}

export default CartIcon;