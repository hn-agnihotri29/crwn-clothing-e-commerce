import { Route, Routes } from 'react-router-dom';
import {useEffect, lazy, Suspense } from "react";

import { useDispatch } from 'react-redux';
import Spinner from './components/spinner/spinner.component';


import { GlobalStyle } from './global.styles';
//This is synchrounous import that mean our js don't run until all of the import successfully brought into this file so for that we use 
// dynamic import from modern javascript 
// import Home from './routes/home/home.component'
// import Navigation from './routes/navigation/navigation.component';
// import Authentication from './routes/authentication/authentication.component';
// import Shop from './routes/shop/shop.component';
// import Checkout from './routes/checkout/checkout.component';

import { checkUserSession } from './store/user/user.action';


const Navigation = lazy(() =>
  import('./routes/navigation/navigation.component')
);
const Shop = lazy(() => import('./routes/shop/shop.component'));
const Checkout = lazy(() => import('./routes/checkout/checkout.component'));
const Home = lazy(() => import('./routes/home/home.component'));
const Authentication = lazy(() =>
  import('./routes/authentication/authentication.component')
);


const App = () => {
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserSession())
  }, [])

  return (
    <Suspense fallback={<Spinner />}>
    <GlobalStyle />
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  </Suspense>
  );
}

export default App;
