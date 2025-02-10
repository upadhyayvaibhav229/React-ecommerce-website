import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './Components/Hero.jsx';
import About from './Pages/About.jsx';
import Collection from './Pages/Collection.jsx';
import Contact from './Pages/Contact.jsx';
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import Products from './Pages/Products.jsx';
import Cart from './Pages/Cart.jsx';
import Login from './Pages/Login.jsx';
import Signup from './Pages/Signup.jsx';
import PlaceOrder from './Pages/PlaceOrder.jsx';
import Order from './Components/Order.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>

      <Route index element={<Home />} />
      <Route path="collection" element={<Collection />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="product/:id" element={<Products />} />
      <Route path='cart' element={<Cart/>}/>
      <Route path='login' element = {<Login/>}/>
      <Route path='sign-up' element = {<Signup/>}/>
      <Route path='place-order' element = {<PlaceOrder/>}/>
      <Route path='order' element= {<Order/>}/>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >

    <RouterProvider router={router} />

    </Provider>
  </StrictMode>
);
