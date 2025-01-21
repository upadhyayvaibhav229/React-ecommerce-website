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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Use index to explicitly define the default route */}
      <Route index element={<Home />} /> {/* This makes Home the default route */}
      <Route path="collection" element={<Collection />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
      {/* <App /> */}
    <RouterProvider router={router} />

    </Provider>
  </StrictMode>
);
