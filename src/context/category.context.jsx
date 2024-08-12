import { useState, createContext, useEffect } from "react";
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

export const CategoryContext = createContext({
    categoriesMap: {},
});

export const CategoryProvider = ({children}) => {
    const [ categoriesMap, setCategoriesMap ] = useState({});
    useEffect(()=> {
        const getCategories = async () => {
            const categories = await getCategoriesAndDocuments();
            console.log('categories are 111', categories);
            setCategoriesMap(categories);
        }
        getCategories();
    }, []);
    
    const providerValue = { categoriesMap };
    return (
        <CategoryContext.Provider value = {providerValue}>
            {children}
        </CategoryContext.Provider>
    );
}