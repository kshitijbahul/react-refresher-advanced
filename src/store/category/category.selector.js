export const selectCategoriesMap = (state) => {
    console.log('Category Selector fired, ', state);
    return state.categories.categories.reduce((acc, category)=> {
        const {title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});
    
} // This is a selector function