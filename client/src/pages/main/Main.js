import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import useUserStore from "../../store/UserStore";

function Main() {
  const navigate = useNavigate();
  const [_, removeCookie] = useCookies([]);
  const { user, updateUser } = useUserStore();
  const logout = () => {
    removeCookie("token");
    navigate("/login");
   updateUser({});
  };
  return (
    <div>
      <h4>
        welcome {user.user} you are {user.role}
      </h4>
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default Main;
