import { useSelector } from "react-redux";

import ProductCard from "../../components/product-card/product-card.component";
import {CategoryPreviewContainer, Title, Preview} from './category-preview.styles.jsx';
import {selectCategoriesIsLoading} from '../../store/category/category.selector.js'

import Spinner from '../spinner/spinner.component';


const CategoryPreview = ({title, products}) => {
    const isLoading = useSelector(selectCategoriesIsLoading);
    return (
        isLoading ? <Spinner/> :
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