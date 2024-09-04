import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';

import { checkUserSession } from './store/user/user.actions';
 
const App = () => {
  // We use the redux-dispatch to get a hook
  // This dispatch function doesn't change 
  // and this is the redux function 
  // which takes the action object and 
  // passes it on to all the reducers
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(checkUserSession());
  },[])

  return (
    <Routes>
      <Route path='/' element = {<Navigation />}>
        <Route index={true} element = {<Home />} /> 
        <Route path='shop/*' element = {<Shop />} /> 
        <Route path='auth' element = {<SignIn />} />
        <Route path='checkout' element ={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;