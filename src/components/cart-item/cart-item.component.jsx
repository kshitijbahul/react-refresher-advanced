

import './cart-item.styles.scss';

const CartItem = ({cartItem}) => {
    const {name, quantity, imageUrl, price } = cartItem;
    return (
        <div className='cart-item-container'>
            <img src={imageUrl} alt={`${name}`} className=''/>
            <div className='item-details'>
            <span className='name'>{name}</span>
            <span className='proce'>{quantity} x ${price}</span>
            </div>
        </div>
    );
}

export default CartItem;