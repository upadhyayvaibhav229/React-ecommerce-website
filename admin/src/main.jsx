import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import DoctorProvider from "./Contexts/DoctorContext.jsx";
// import AppProvider from "./Contexts/AppContext.jsx";
// import AdminProvider from "./Contexts/AdminContext.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ProductLists from "./Pages/Admin/ProductLists.jsx";
import Orders from "./Pages/Admin/Orders.jsx";
import AddProducts from "./Pages/Admin/AddProducts.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    // Define your routes here
    <Route path="/" element={<App />}>
      <Route path="/" element={<></>} />
      <Route path="/all-products" element={<ProductLists />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/addProducts" element={<AddProducts />} />
    </Route>
  ),
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <AdminProvider>
      <DoctorProvider>
        <AppProvider> */}
          <RouterProvider router={router} />
        {/* </AppProvider>
      </DoctorProvider>
    </AdminProvider> */}
  </StrictMode>
);
