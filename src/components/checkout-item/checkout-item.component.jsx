import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

import {CheckoutItemContainer,ImageContainer,Quantity, RemoveButton, ItemDetail} from './checkout-item.styles.jsx';

const CheckoutItem = ({ item }) => {
    const {imageUrl, name, quantity, price } = item;
    const { removeItemFromCart, decreaseItemFromCart, addItemToCart } = useContext(CartContext);
    const handleRemoveItem = () => {
        removeItemFromCart(item);
    };
    const handleDecreaseItem = () => {
        decreaseItemFromCart(item);
    };
    const handleIncreaseItem = () => {
        addItemToCart(item);
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
