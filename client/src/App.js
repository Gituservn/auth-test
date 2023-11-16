import { Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
import Main from "./pages/main/Main";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Header from "./components/header/Header";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./auth/ProtectedRoute";
import { ADMIN_ROLE } from "./constans/constans";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "./store/UserStore";
import { SkewLoader } from "react-spinners";

function App() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const { user, updateUser } = useUserStore();
  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:4000/",
        {},
        {
          withCredentials: true,
        },
      );
      const { status } = data;

      if (status) {
        updateUser(data);
        setLoading(false);
      } else {
        removeCookie("token");
        setLoading(false);
        // navigate("/login");
      }
    };
    checkUser();
  }, [cookies, removeCookie]);

  const Loader = () => {
    return <SkewLoader color="#36c8d6" size={50} />;
  };
  return (
    <div className="App">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Header />
          <Routes>
            <Route element={<ProtectedRoute allowedRoles={[ADMIN_ROLE]} />}>
              <Route path="admin" element={<h1>404</h1>} />
            </Route>

            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
