import { useDispatch, useSelector } from 'react-redux';

import {CheckoutItemContainer,ImageContainer,Quantity, RemoveButton, ItemDetail} from './checkout-item.styles.jsx';

import { addItemToCart, removeItemsFromCart, decreaseItemsFromCart } from '../../store/cart/cart.actions';
import { selectCartItems } from '../../store/cart/cart.selector.js';

const CheckoutItem = ({ item }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems)
    const {imageUrl, name, quantity, price } = item;
    const handleRemoveItem = () => {
        dispatch(removeItemsFromCart(cartItems,item));
    };
    const handleDecreaseItem = () => {
        dispatch(decreaseItemsFromCart(cartItems,item));
    };
    const handleIncreaseItem = () => {
        dispatch(addItemToCart(cartItems, item));
    };
    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`}/>
            </ImageContainer>
            <ItemDetail>{name}</ItemDetail>
            <Quantity>
                <span className = "arrow" onClick={handleDecreaseItem}> &#10094;</span>
                <span className='value'>{quantity}</span>
                <span className = "arrow" onClick={handleIncreaseItem}> &#10095;</span>
            </Quantity>
            <ItemDetail>{price}</ItemDetail>
            <RemoveButton>
                <span onClick={handleRemoveItem}>&#10005;</span>
            </RemoveButton>
        </CheckoutItemContainer>
    );
}

export default CheckoutItem;
