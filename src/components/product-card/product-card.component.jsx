import { useDispatch } from 'react-redux';
import {BUTTON_TYPE_CLASSES} from '../button/button.component';
import {ProductCardContainer, Image, StyledButton,Footer} from './product-card.styles.jsx';
import { addCartItem } from '../../store/cart/cart.actions.js';

const ProductCard = ({product}) => {
    const dispatch = useDispatch();
    const { name, imageUrl, price } = product;
    const handleAddToCart = () => {
        dispatch(addCartItem(product));
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