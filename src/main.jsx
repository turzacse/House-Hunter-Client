import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css";
import Layout from './Layout/Layout.jsx';
import Home from './Pages/Home/Home.jsx';
import Signup from './Authentication/Shared/Signup.jsx';
import Login from './Authentication/Shared/Login.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthProvider from './Provider/AuthContext.jsx';
import AddHouse from './Pages/AddAHouse/AddHouse.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: '/addhouse',
        element: <AddHouse/>
      }
    ]
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
