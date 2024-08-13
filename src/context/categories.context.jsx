import { createContext, useState,useEffect } from "react";

import CATEGORIES_DATA from '../categoriesData';

export const CategoriesContext = createContext({
    categories: [],
});

export const CategoriesProvider = ({children}) => {
    const [categories, setCategories] = useState(CATEGORIES_DATA);
    useEffect(()=> {
        setCategories(CATEGORIES_DATA);
    },[categories]);
    const providerValue = { categories };
    return (
        <CategoriesContext.Provider value ={providerValue}>
            {children}
        </CategoriesContext.Provider>
    );
}