// This file contains code for the nav component. Using NavLink from react-router-dom, each link in the navbar routes to an endpoint where a different main-content section of the application is rendered. The Nav is exported from here and imported into the Header.jsx file as this component is part fo the header. 
import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <NavLink to="/" activeClassName="active" exact>
        Home
      </NavLink>
      <NavLink to="/myconversation" activeClassName="active">
        My Conversation
      </NavLink>
      <NavLink to="/login-signup" activeClassName="active">
        Login/Signup
      </NavLink>
      <NavLink to="/resources" activeClassName="active">
        Resources
      </NavLink>
    </nav>
  );
};

export default Nav;

// import React from 'react';
// import { NavLink } from 'react-router-dom';

// const Nav = () => {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark">
//       <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-nav" aria-controls="navbar-nav" aria-expanded="false" aria-label="Toggle navigation">
//         <span className="navbar-toggler-icon"></span>
//       </button>

//       <div className="collapse navbar-collapse" id="navbar-nav">
//         <ul className="navbar-nav ml-auto">
//           <li className="nav-item">
//             <NavLink to="/" activeClassName="active" className="nav-link" exact>
//               Home
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink to="/myconversation" activeClassName="active" className="nav-link">
//               My Conversation
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink to="/login-signup" activeClassName="active" className="nav-link">
//               Login/Signup
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink to="/resources" activeClassName="active" className="nav-link">
//               Resources
//             </NavLink>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Nav;