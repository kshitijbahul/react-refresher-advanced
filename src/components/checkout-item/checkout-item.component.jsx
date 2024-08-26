import { useDispatch } from 'react-redux';

import {CheckoutItemContainer,ImageContainer,Quantity, RemoveButton, ItemDetail} from './checkout-item.styles.jsx';

import { addCartItem, removeCartItem, decreaseCartItem } from '../../store/cart/cart.actions';

const CheckoutItem = ({ item }) => {
    const dispatch = useDispatch();
    const {imageUrl, name, quantity, price } = item;
    const handleRemoveItem = () => {
        dispatch(removeCartItem(item));
    };
    const handleDecreaseItem = () => {
        dispatch(decreaseCartItem(item));
    };
    const handleIncreaseItem = () => {
        dispatch(addCartItem(item));
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
