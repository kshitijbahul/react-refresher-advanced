import { useDispatch } from 'react-redux';
import {CartIconContainer, ShoppingIcon,ItemCount} from './cart-icon.styles.jsx';
import { useSelector } from 'react-redux';
import { selectCartSize, selectCartOpened } from '../../store/cart/cart.selector.js';
import { toggleCartShown } from '../../store/cart/cart.actions';


const CartIcon = () => {
    const dispatch = useDispatch();
    const cartSize = useSelector(selectCartSize);
    const cartOpened = useSelector(selectCartOpened);
    const toggleCartDisplay = () => {
        dispatch(toggleCartShown(cartOpened));
      };
    return (
        <CartIconContainer onClick={toggleCartDisplay}>
            <ShoppingIcon />
            <ItemCount>{cartSize}</ItemCount>
        </CartIconContainer>
    );
}

export default CartIcon;