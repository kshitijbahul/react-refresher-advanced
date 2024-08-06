import { useContext } from "react";
import { ProductsContext } from "../../context/products.context";


const Shop = () => {
const {products} = useContext(ProductsContext);
 return (
   <div>
     {
        products.map((shopItem) => 
             (
                <div key={shopItem.id} className='shop-item'>
                    <h2>{shopItem.name}</h2>
                    <p>{shopItem.price}</p>
                </div>
            )
        )
     }
   </div>
 );
};

export default Shop;