import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const authToken = localStorage.getItem('authToken');
  
  if (!authToken) {
    return <Navigate to="/login" />;  // Redirect to login if no token
  }

  return element;
};

export default PrivateRoute;
