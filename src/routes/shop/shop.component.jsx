import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

import { fetchCategoriesStart } from '../../store/category/category.actions';



const Shop = () => {
  const dispatch = useDispatch();
  useEffect( ()=> {
    // Commented the Thunk dispatch to test Sagas
    // dispatch(fetchCategoriesAsync());
    // Dispatching fetchCategoriesStart since the Saga will listen to that 
    dispatch(fetchCategoriesStart());
  });
  return (
    <Routes>
      <Route index element = {<CategoriesPreview/>} />
      <Route path=":category" element = {<Category/>}/>
    </Routes>
  );
};

export default Shop;