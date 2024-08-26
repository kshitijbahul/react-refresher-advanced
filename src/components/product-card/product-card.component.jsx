import { useDispatch, useSelector } from 'react-redux';
import {BUTTON_TYPE_CLASSES} from '../button/button.component';
import {ProductCardContainer, Image, StyledButton,Footer} from './product-card.styles.jsx';
import { addItemToCart } from '../../store/cart/cart.actions.js';
import { selectCartItems } from '../../store/cart/cart.selector.js';

const ProductCard = ({product}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems)
    const { name, imageUrl, price } = product;
    const handleAddToCart = () => {
        dispatch(addItemToCart(cartItems,product));
    };
    return (
        <ProductCardContainer>
            <Image src={imageUrl} alt={`${name}`}></Image>
            <Footer>
                <span className='name'>{name}</span>
                <span className='price'>${price}</span>
            </Footer>
            <StyledButton buttonType={BUTTON_TYPE_CLASSES.inverted} onClick = {handleAddToCart} >Add to Cart</StyledButton>
        </ProductCardContainer>
    );
}

export default ProductCard;