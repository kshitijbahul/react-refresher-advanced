import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';


const CartIcon = () => {
    const { cartOpened , setCartOpened, cartSize } = useContext(CartContext);
    const toggleCartDisplay = () => {
        console.log('Toggle Cart Display');
        setCartOpened(!cartOpened);
      };
    return (
        <div className='cart-icon-container'>
            <ShoppingIcon className='shopping-icon' onClick={toggleCartDisplay}></ShoppingIcon>
            <span className='item-count'>{cartSize}</span>
        </div>
    );
}

export default CartIcon;