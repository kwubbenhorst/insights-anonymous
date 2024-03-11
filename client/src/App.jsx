// This file, App.jsx, serves as the main entry point for the React application. It sets up the overall structure of the application
// by defining the routing using React Router. Sometimes the routing is done in main.jsx, but we have made the decision to do it here. 
// The application consists of different pages, each represented by a component.
// The pages Home, My Conversation, Signup/Login, and Resources are rendered based on the specified routes.

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderWithNav from './components/HeaderWithNav/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MyConversation from './pages/MyConversation';
import LoginSignup from './pages/LoginSignup';
import Resources from './pages/Resources';

const Layout = ({ children }) => (
  <>
    <HeaderWithNav />
    <main>{children}</main>
    <Footer />
  </>
);

const App = () => {
  //Initialize isLoggedIn state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Render Home for the root path */}
        <Route
          path="/"
          element={
            <Layout>
              <Home
                isLoggedIn={isLoggedIn}
                onLogin={() => setIsLoggedIn(true)}
                onLogout={() => setIsLoggedIn(false)}
              />
            </Layout>
          }
        />
        <Route path="/myconversation" element={<MyConversation />} />
        <Route path="/login-signup" element={<LoginSignup />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
    </Router>
  );
};

export default App;