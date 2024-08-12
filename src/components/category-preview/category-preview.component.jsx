
import { Link } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import './category-preview.styles.scss';

const CategoryPreview = ({title, products}) => {
    return (
        <div className='category-preview-container'>
            <Link className="" to={`${title}`}>
                {title.toUpperCase()}
            </Link>
            <div className='preview'>
            {
                    products
                    .filter((_,idx) => idx<4 )
                    .map((product) => <ProductCard key={product.id} product={product}></ProductCard> )
            }
            </div>
        </div>
    );   
}

export default CategoryPreview;