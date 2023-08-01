import React from 'react';
import ReactDOM from 'react-dom/client';
//Browser Router is a generic router keep track of user's history where user is navigating.
import { BrowserRouter } from 'react-router-dom';


import './index.scss';
import App from './App';
  /* Userprovider tell us inside my compoenent tree check which components has access to my context */
import { UserProvider } from './context/userContext';
import { ProductsProvider } from './context/products.context';
import { CartProvider } from './context/cart.context';


import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductsProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
