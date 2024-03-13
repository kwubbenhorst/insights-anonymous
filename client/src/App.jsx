// This file, App.jsx, serves as the main entry point for the React application. It sets up the overall structure of the application
// by defining the routing using React Router. Sometimes the routing is done in main.jsx, but we have made the decision to do it here. 
// The application consists of different pages, each represented by a component.
// The pages Home, My Conversation, Signup/Login, and Resources are rendered based on the specified routes.
import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import React, { useState } from 'react';
import Header from './components/HeaderWithNav/Header';
import Footer from './components/Footer';
import Home from './pages/Home'; 

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
        <div className="container">
          <Outlet>
            <Routes>
              <Route path="/" element={<Home />} />
              
            </Routes>
          </Outlet>
        </div>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;