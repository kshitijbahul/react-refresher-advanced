import { createSelector } from "reselect";


const selectCategoryReducer = (state) => state.categories; 

const selectCategories = createSelector(
    [selectCategoryReducer], // This is an input selector
    (categoriesSlice) => categoriesSlice.categories // This is the output selector i.e when the categories has not chnaged on the Root state, it will return the same value
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => categories.reduce((acc, category)=> {
        const {title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})
);
/* 
export const selectCategoriesMap = (state) => {
    console.log('Category Selector fired, ', state);
    return state.categories.categories.reduce((acc, category)=> {
        const {title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});
    
} // This is a selector function */