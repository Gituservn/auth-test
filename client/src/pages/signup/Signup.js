import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.scss";

const Signup = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
    username: "",
  };
  const [inputValues, setInputValues] = useState({
    ...initialValues,
  });
  const { email, password, username } = inputValues;
  const handleChange = e => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/signup",
        {
          ...inputValues,
        },
        { withCredentials: true },
      );
      const { success } = data;

      if (success) {
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
    setInputValues({
      ...inputValues,
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <div className="form_container">
      <h2 className="title">Create an account</h2>
      <p className="subtitle">Let’s get started with your 30 days free trial</p>
      <form onSubmit={onSubmit}>
        <div className="inputs_wrapper">
          <div className="inputs_wrapper-item">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" value={email} placeholder="Enter your email" onChange={handleChange} />
          </div>
          <div className="inputs_wrapper-item">
            <label htmlFor="email">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Enter your username"
              onChange={handleChange}
            />
          </div>
          <div className="inputs_wrapper-item">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>
          <button className="submit_btn" type="submit">
            Create Account
          </button>
        </div>

        <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
