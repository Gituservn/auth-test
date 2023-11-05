import {Link, useNavigate} from "react-router-dom";
import "./navbar.scss";
import useUserStore from "../../store/UserStore";
import {useCookies} from "react-cookie";

function Navbar() {
    const [cookies, removeCookie] = useCookies([]);
    const navigate = useNavigate();
    const user = useUserStore(state => state.user)
    const logout = () => {
        removeCookie('token')
        navigate('/auth')
    }
    console.log(user)
    return (
        <div className = "navbar">
            <ul className = "navbar__list">
                <li className = "navbar__list-item">
                    <Link className = "App-link" to = "/">
                        Home
                    </Link>
                </li>
                {!user ? (<div className = "navbar__list-auth">
                    <li className = "navbar__list-item">
                        <Link className = "App-link" to = "/auth">
                            Auth
                        </Link>
                    </li>
                    <li className = "navbar__list-item">
                        <Link className = "App-link" to = "/register">
                            Register
                        </Link>
                    </li>
                </div>) : (<button onClick = {logout}>logout</button>)}

            </ul>
        </div>
    );
}

export default Navbar;