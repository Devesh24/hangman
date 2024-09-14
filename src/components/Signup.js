import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../config";
import { Link } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkPass, setCheckPass] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkPass !== password) {
      return alert("Passwords do not match");
    }

    try {
        setLoading(true);
        await axios.post(
          `${BASE_URL}/auth/register`,
          {
            name: name,
            username: username,
            password: password,
          }
        );
        alert("User Registered!!")
        setLoading(false);
        window.location.pathname = "/login"
    } catch (err) {
      setLoading(false);
      alert("Sign Up Failed!!!");
      console.log(err);
    }
  };

  return (
    <div className="register_user_main_cont">
        <form onSubmit={handleSubmit} className="form">
          <h1>SIGN UP</h1>
          <div className="row">
            <div className="col-md-6 my-2">
              <label className="form-label" htmlFor="name">
                Name:{" "}
              </label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </div>
            <div className="col-md-6 my-2">
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
            <div className="col-md-6 my-2">
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
            <div className="col-md-6 my-2">
              <label className="form-label" htmlFor="conf_pass">
                Confirm Password:{" "}
              </label>
              <input
                className="form-control"
                type="password"
                name="conf_pass"
                id="conf_pass"
                onChange={(e) => {
                  setCheckPass(e.target.value);
                }}
                required
              />
            </div>
            <div className="submit_btn_box mt-4">
              <button type="submit" className="submit_btn">
                SIGN UP
              </button>
                <div>Already a User? <Link className="alternateLink" to={"/login"}>Login</Link></div>
            </div>
          </div>
        </form>
    </div>
  )
}

export default Signup