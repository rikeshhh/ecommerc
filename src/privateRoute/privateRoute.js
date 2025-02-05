import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ element }) => {
  const { user, isAuthenticated } = useAuth0();
  const roles = user?.["https://your-app.com/roles"] || [];

  return isAuthenticated && roles.includes("admin") ? element : <Navigate to="/" />;
};

export default PrivateRoute;
