import { Route,Routes } from 'react-router-dom';
import './App.css';
import SideNavBar from './component/navigation/sidenavbar.component';
import OrderContainer from './routes/orders-page/orders-container';
import ProductContainer from './routes/products-page/products-container';
import UserContainer from './routes/users-page/users-container';


const App = () => {

  return (
    <Routes>
      <Route path='/' element={<SideNavBar/>}>
        <Route index element={<OrderContainer/>}/>
        <Route path='users/' element={<UserContainer />}/>
        {/* <Route path='products/' element={<ProductContainer/>}/> */}
      </Route>
    </Routes>
    // <div className="App">
      /* <SideNavBar />
      <ProductContainer /> */
     
    // </div>
  );
}

export default App;
