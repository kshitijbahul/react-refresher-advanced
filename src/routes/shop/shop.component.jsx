import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

import { fetchCategoriesAsync } from '../../store/category/category.actions';



const Shop = () => {
  const dispatch = useDispatch();
  useEffect( ()=> {
    // Dispatch to a thunk action creator, which will further dispatch
    dispatch(fetchCategoriesAsync());
  });
  return (
    <Routes>
      <Route index element = {<CategoriesPreview/>} />
      <Route path=":category" element = {<Category/>}/>
    </Routes>
  );
};

export default Shop;