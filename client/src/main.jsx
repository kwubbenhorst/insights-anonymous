import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx';
import './App.css';
import Home from './pages/Home'
//import MyConversation from './pages/MyConversation.jsx'
//import LoginSignup from './pages/LoginSignup.jsx'
//import Resources from './pages/Resources.jsx'
import Error from './pages/Error.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      // {
      //   path: '/myconversation',
      //   element: <MyConversation />,
      // },
      // {
      //   path: '/login-signup',
      //   element: <LoginSignup />,
      // },
      // {
      //   path: '/resources',
      //   element: <Resources />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
