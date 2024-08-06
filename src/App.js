
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';

import { Routes, Route } from 'react-router-dom';

 
const App = () => {
  return (
    <Routes>
      <Route path='/' element = {<Navigation />}>
        <Route index={true} element = {<Home />} /> 
        <Route path='shop' element = {<Shop />} /> 
        <Route path='auth' element = {<SignIn />} /> 
      </Route>
      
    </Routes>
    
  );
}

export default App;