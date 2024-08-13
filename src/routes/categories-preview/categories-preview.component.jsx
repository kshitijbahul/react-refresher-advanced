import { useContext } from "react";
import { CategoryContext } from "../../context/category.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";


const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoryContext);
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
