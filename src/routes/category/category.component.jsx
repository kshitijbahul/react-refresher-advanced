import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/category/category.selector';
import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component'

import {CategoryContainer, Title } from './category.styles.jsx';

const Category = () => {
    const { category } = useParams(); 
    console.log('Rendering category component');
    const categoriesMap  = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [ products, setProducts ] = useState(categoriesMap[category]);
    useEffect(()=> {
        console.log('Setting product');
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);
    return (
        <Fragment>
            <Title>
                    {category.toUpperCase()}
            </Title>
            {
                isLoading ? 
                    <Spinner/> 
                    : 
                    <CategoryContainer>
                    {   
                        // Added a check for products since products is loaded async and on the first render it can be empty
                        // this is a good practice to avoid errors
                        products && products.map(
                            (categoryItem) => (<ProductCard key={categoryItem.id} product = {categoryItem} />)
                        )
                    }
                    </CategoryContainer>
            }
            
        </Fragment>
    );
}

export default Category;