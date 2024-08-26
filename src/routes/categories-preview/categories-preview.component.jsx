import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/category/category.selector";
import CategoryPreview from "../../components/category-preview/category-preview.component";


const CategoriesPreview = () => {
    const categoriesMap  = useSelector(selectCategoriesMap);
    console.log('categoriesMap >>>>>>>>>', categoriesMap);
    return (
    <div className="category-preview-container">
        {
        categoriesMap && Object.keys(categoriesMap).map((title)=> {
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
