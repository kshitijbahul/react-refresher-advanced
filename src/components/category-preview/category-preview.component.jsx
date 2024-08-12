
import { Link } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import {CategoryPreviewContainer, Title, Preview} from './category-preview.styles.jsx';

const CategoryPreview = ({title, products}) => {
    return (
        <CategoryPreviewContainer>
            <Title to={`${title}`}>
                {title.toUpperCase()}
            </Title>
            <Preview>
            {
                    products
                    .filter((_,idx) => idx<4 )
                    .map((product) => <ProductCard key={product.id} product={product}></ProductCard> )
            }
            </Preview>
        </CategoryPreviewContainer>
    );   
}

export default CategoryPreview;