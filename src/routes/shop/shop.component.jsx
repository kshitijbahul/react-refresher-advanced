import { useContext, Fragment } from "react";
import { CategoryContext } from "../../context/category.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";

import './shop.styles.scss';

const Shop = () => {
const { categoriesMap } = useContext(CategoryContext);
console.log('categoriesMap is ', categoriesMap);  
 return (
  <div className="shop-container">
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
};

export default Shop;