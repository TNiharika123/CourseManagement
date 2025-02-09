// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ element }) => {
//   const authToken = localStorage.getItem('authToken');
//   const learnerId = localStorage.getItem('userId');
  
//   if (!authToken || !learnerId) {
//     return <Navigate to="/login" />;
//   }

//   return element;
// };

// export default PrivateRoute;

import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const authToken = localStorage.getItem("authToken");

  return authToken ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
