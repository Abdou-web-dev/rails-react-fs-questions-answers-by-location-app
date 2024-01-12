// Example React component using React Router
import { Navigate } from "react-router-dom";
import { MainPage } from "./MainPage";

export const AuthGuardedComponent = () => {
  const userToken = localStorage.getItem("userToken");
  // const { userToken } = useAuth();

  if (userToken) {
    // User is authenticated, render the protected component
    return <MainPage />;
  }

  // Redirect to login page or handle the unauthenticated state
  return <Navigate to="/login" />;
};
