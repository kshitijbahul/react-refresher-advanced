import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

import './checkout-item.styles.scss';

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
        <div className='checkout-item-container'>
            <div className = "image-container">
                <img src={imageUrl} alt={`${name}`}/>
            </div>
            <span className='name'>{name}</span>
            <div className='quantity'>
                <span className = "arrow" onClick={handleDecreaseItem}> &#10094;</span>
                <span className='value'>{quantity}</span>
                <span className = "arrow" onClick={handleIncreaseItem}> &#10095;</span>
            </div>
            <span className='price'>{price}</span>
            <div className='remove-button'>
                <span onClick={handleRemoveItem}>&#10005;</span>
            </div>
        </div>
    );
}

export default CheckoutItem;
