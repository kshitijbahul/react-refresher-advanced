import { useState, createContext, useEffect } from "react";
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

export const ProductsContext = createContext({
    products: [],
    setProducts: () => null,
});

export const ProductsProvider = ({children}) => {
    useEffect(()=> {
        const getCategories = async () => {
            const categories = await getCategoriesAndDocuments();
            console.log('categories are ', categories);
        }
        getCategories();
    }, []);
    const [products, setProducts] = useState([]);
    const providerValue = { products, setProducts};
    return (
        <ProductsContext.Provider value = {providerValue}>
            {children}
        </ProductsContext.Provider>
    );
}