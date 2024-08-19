import { useSelector } from "react-redux";
import { selectCategories } from "../../store/category/category.selector";
import CategoryPreview from "../../components/category-preview/category-preview.component";


const CategoriesPreview = () => {
    const categoriesMap  = useSelector(selectCategories);
    return (
    <div className="category-preview-container">
        {
        Object.keys(categoriesMap).map((title)=> {
            const products = categoriesMap[title];
            return (
            <CategoryPreview key={title} title={title} products={products}></CategoryPreview>
            )
        })
        }
    </div>
    );
}

export default CategoriesPreview;
