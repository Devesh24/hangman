import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../config";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookies, setCookies, removeCookie] = useCookies();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await axios.post(`${BASE_URL}/auth/login`, {
        username: username,
        password: password,
      });
      setLoading(false);

      alert("Login Successfull");
      setCookies("token", data.data.accessToken);
      setTimeout(() => {
        setPassword("");
        setUsername("");
        window.location.pathname = "/profile";
      }, 1000);
    } catch (err) {
      setLoading(false);
      alert("Login Failed!!!");
      console.log(err);
    }
  };

  return (
    <div className="register_user_main_cont">
      <form onSubmit={handleSubmit} className="form loginForm">
        <h1>LOGIN</h1>
        <div className="row">
          <div className="col-md-12 my-2">
            <label className="form-label" htmlFor="username">
              Username:{" "}
            </label>
            <input
              className="form-control"
              type="text"
              name="username"
              id="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
          </div>
          <div className="col-md-12 my-2">
            <label className="form-label" htmlFor="pass">
              Password:{" "}
            </label>
            <input
              className="form-control"
              type="password"
              name="pass"
              id="pass"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          <div className="submit_btn_box mt-4">
            <button type="submit" className="submit_btn">
              LOG IN
            </button>
            <div>
              Not Registered Yet?{" "}
              <Link className="alternateLink" to={"/signup"}>
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
