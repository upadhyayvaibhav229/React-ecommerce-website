import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./Components/Hero.jsx";
import About from "./Pages/About.jsx";
import Collection from "./Pages/Collection.jsx";
import Contact from "./Pages/Contact.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import Products from "./Pages/Products.jsx";
import Cart from "./Pages/Cart.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import PlaceOrder from "./Pages/PlaceOrder.jsx";
import Order from "./Components/Order.jsx";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import PublicRoute from "./Components/PublicRoute.jsx"; // Import PublicRoute
import Profile from "./Components/Profile.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="collection" element={<Collection />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="product/:id" element={<Products />} />

      {/* 🔒 Private Routes (Only for logged-in users) */}
      <Route element={<PrivateRoute />}>
        <Route path="cart" element={<Cart />} />
        <Route path="place-order" element={<PlaceOrder />} />
        <Route path="order" element={<Order />} />
        <Route path="profile" element= {<Profile/>}/>
      </Route>

      {/* 🔓 Public Routes (Only for guests) */}
      <Route element={<PublicRoute />}>
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<Signup />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
