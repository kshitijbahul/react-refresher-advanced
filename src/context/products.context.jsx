import { useState, createContext } from "react";
import SHOP_DATA from '../shop-data.json';

export const ProductsContext = createContext({
    products: [],
    setProducts: () => null,
});

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(SHOP_DATA);
    const providerValue = { products, setProducts};
    return (
        <ProductsContext.Provider value = {providerValue}>
            {children}
        </ProductsContext.Provider>
    );
}