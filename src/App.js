
import Home from './routes/home/home.components';
import { Routes, Route } from 'react-router-dom';

 
const App = () => {
  return (
    <Routes>
      <Route path='/home' element = {<Home></Home>} />
    </Routes>
    
  );
}

export default App;