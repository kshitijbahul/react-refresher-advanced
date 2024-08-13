import { useContext } from 'react';
import {BUTTON_TYPE_CLASSES} from '../button/button.component';
import { CartContext } from '../../context/cart.context';
import {ProductCardContainer, Image, StyledButton,Footer} from './product-card.styles.jsx';

const ProductCard = ({product}) => {
    const {addItemToCart} = useContext(CartContext);
    const { name, imageUrl, price } = product;
    const handleAddToCart = () => {
        addItemToCart(product);
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