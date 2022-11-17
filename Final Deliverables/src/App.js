import { Routes, Route } from 'react-router-dom';

import Home from './routes/home/home';
import Authentication from './routes/authentication/authentication';
import Navigation from './routes/navigation/navigation';
// import Shop from './routes/shop/shop';
import Category from './components/category/category';
import Checkout from './routes/checkout/checkout';

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />}/>
        <Route path="shop/:category" element={<Category />}/>
        <Route path="auth/*" element={<Authentication />}/>
        <Route path="checkout" element={<Checkout />}/>
      </Route>
    </Routes>
  );
};

export default App;
