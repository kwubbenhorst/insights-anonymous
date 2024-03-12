// // This file, App.jsx, serves as the main entry point for the React application. It sets up the overall structure of the application
// // by defining the routing using React Router. Sometimes the routing is done in main.jsx, but we have made the decision to do it here. 
// // The application consists of different pages, each represented by a component.
// // The pages Home, My Conversation, Signup/Login, and Resources are rendered based on the specified routes.

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/HeaderWithNav/Header';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import MyConversation from './pages/MyConversation';
// import LoginSignup from './pages/LoginSignup';
// import Resources from './pages/Resources';

// const Layout = ({ children }) => (
//   <>
//     <HeaderWithNav />
//     <main>{children}</main>
//     <Footer />
//   </>
// );

// const App = () => {
//   //Initialize isLoggedIn state
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <Router>
//       <Routes>
//         {/* Render Home for the root path */}
//         <Route
//           path="/"
//           element={
//             <Layout>
//               <Home
//                 isLoggedIn={isLoggedIn}
//                 onLogin={() => setIsLoggedIn(true)}
//                 onLogout={() => setIsLoggedIn(false)}
//               />
//             </Layout>
//           }
//         />
//         <Route path="/myconversation" element={<MyConversation />} />
//         <Route path="/login-signup" element={<LoginSignup />} />
//         <Route path="/resources" element={<Resources />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;



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
import { Outlet } from 'react-router-dom';import React, { useState } from 'react';
import Header from './components/HeaderWithNav/Header';
import Footer from './components/Footer';

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
      <div className="flex-column justify-flex-start min-100-vh">
        <Header />
        <div className="container">
          <Outlet />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;




// const Layout = ({ children }) => (
//   <>
//     <Header />
//     <main>{children}</main>
//     <Footer />
//   </>
// );

// const App = () => {
//   //Initialize isLoggedIn state
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <Router>
//       <Routes>
//         {/* Render Home for the root path */}
//         <Route
//           path="/"
//           element={
//             <Layout>
//               <Home
//                 isLoggedIn={isLoggedIn}
//                 onLogin={() => setIsLoggedIn(true)}
//                 onLogout={() => setIsLoggedIn(false)}
//               />
//             </Layout>
//           }
//         />
//         <Route path="/myconversation" element={<MyConversation />} />
//         <Route path="/login-signup" element={<LoginSignup />} />
//         <Route path="/resources" element={<Resources />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;