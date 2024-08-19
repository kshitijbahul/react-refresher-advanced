import { useContext, useState,useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectCategories } from '../../store/category/category.selector';
import ProductCard from '../../components/product-card/product-card.component';

import {CategoryContainer, Title } from './category.styles.jsx';

const Category = () => {
    const { category } = useParams(); 
    const categoriesMap  = useSelector(selectCategories);
    const [ products, setProducts ] = useState(categoriesMap[category]);
    useEffect(()=> {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);
    return (
        <Fragment>
            <Title>
                    {category.toUpperCase()}
            </Title>
            <CategoryContainer>
                
                {   
                    // Added a check for products since products is loaded async and on the first render it can be empty
                    // this is a good practice to avoid errors
                    products && products.map(
                        (categoryItem) => (<ProductCard key={categoryItem.id} product = {categoryItem} />)
                    )
                }
            </CategoryContainer>
        </Fragment>
    );
}

export default Category;