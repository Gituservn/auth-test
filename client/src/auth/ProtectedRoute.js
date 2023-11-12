import { useEffect, useState } from "react";
import useUserStore from "../store/UserStore";

const ProtectedRoute = ({ allowedRoles }) => {
  const [role, setRole] = useState(null);
  const user = useUserStore(state => state.user);
  useEffect(() => {
    if (user) {
      setRole(user.role);
    }
  }, [user]);

  console.log(role);
  const admin = role === "ADMIN";

  // if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (admin) return <h1>welcome</h1>;
  if (!admin) return <h1>404</h1>;
};

export default ProtectedRoute;
