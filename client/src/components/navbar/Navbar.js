import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";
import useUserStore from "../../store/UserStore";
import { useCookies } from "react-cookie";

function Navbar() {
  const [_, removeCookie] = useCookies([]);
  const navigate = useNavigate();
  const { user, updateUser } = useUserStore();
  const logout = () => {
    removeCookie("token");
    navigate("/login");
    updateUser({});
  };
  return (
    <div className="navbar">
      <ul className="navbar__list">
        <li className="navbar__list-item">
          <Link className="App-link" to="/">
            Home
          </Link>
        </li>
        {!user.status ? (
          <div className="navbar__list-auth">
            <li className="navbar__list-item">
              <Link className="App-link" to="/login">
                Auth
              </Link>
            </li>
            <li className="navbar__list-item">
              <Link className="App-link" to="/register">
                Register
              </Link>
            </li>
          </div>
        ) : (
          <button onClick={logout}>logout</button>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
