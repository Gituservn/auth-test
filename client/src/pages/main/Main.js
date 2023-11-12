import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import useUserStore from "../../store/UserStore";

function Main() {
  const navigate = useNavigate();
  const [__, removeCookie] = useCookies([]);
  const { user, updateUser } = useUserStore();

  const logout = () => {
    removeCookie("token");
    navigate("/login");
    useUserStore.setState({});
  };
  return (
    <div>
      <h4>
        welcome {user.username} you are {user.role}
      </h4>
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default Main;
