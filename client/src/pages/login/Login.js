import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../signup/Signup.scss";

const Login = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleChange = e => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/login", { ...inputValue }, { withCredentials: true });
      console.log(data);
      const { success, message } = data;
      if (success) {
        toast(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };
  return (
    <div className="form_container">
      <h2 className="title">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputs_wrapper">
          <div className="inputs_wrapper-item">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="inputs_wrapper-item">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <button className="submit_btn" type="submit">
            login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
