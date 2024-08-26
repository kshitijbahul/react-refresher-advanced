import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import {CheckoutContainer, Header, HeaderBlock, Total} from './checkout.styles.jsx';
import { useSelector } from 'react-redux';
import { selectCartValue,selectCartItems } from '../../store/cart/cart.selector.js';



const Checkout = () => {
    const cartValue = useSelector(selectCartValue);
    const cartItems = useSelector(selectCartItems);
    return (
        <CheckoutContainer>
            <Header>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </Header>
                    {cartItems.map(((cartItem) => <CheckoutItem key={cartItem.id} item={cartItem}/>))}
            <Total>
                <span> Total : ${cartValue}</span>
            </Total>
        </CheckoutContainer>
    );
}

export default Checkout;