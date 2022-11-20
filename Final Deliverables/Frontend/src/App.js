import { Routes, Route } from 'react-router-dom';

import Home from './routes/home/home';
import Authentication from './routes/authentication/authentication';
import Navigation from './routes/navigation/navigation';
import Category from './components/category/category';
import Checkout from './routes/checkout/checkout';
import SideNavBar from './components/admin-navigation/sidenavbar.component';
import OrderContainer from './routes/orders-page/orders-container';
import UserContainer from './routes/users-page/users-container';

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />}/>
        <Route path="shop/:category" element={<Category />}/>
        <Route path="auth/*" element={<Authentication />}/>
        <Route path="checkout" element={<Checkout />}/>
      </Route>
      <Route path='/admin' element={<SideNavBar/>}>
        <Route index element={<OrderContainer/>}/>
        <Route path='users' element={<UserContainer />}/>
      </Route>
    </Routes>
  );
};

export default App;
