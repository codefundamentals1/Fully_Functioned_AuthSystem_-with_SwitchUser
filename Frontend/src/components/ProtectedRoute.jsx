import AuthContext from '../contexts/Authcontext';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';

const ProtectedRoute = ({ children }) => {
  const { isLoggedin, isloading } = useContext(AuthContext);

  // Show nothing or loader while checking initial auth state
  if (isloading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If not loading and not authenticated, redirect to login
  console.log("int protected rote is logged in" , isLoggedin )
  return isLoggedin ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;