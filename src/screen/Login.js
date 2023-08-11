import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/login.css";

export default function Login() {
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const [warn, setWarn] = useState(false);

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const [showpass, setShowPass] = useState("password");

  const showPass = () => {
    showpass === "password" ? setShowPass("text") : setShowPass("password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/loginuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        setCredentials({ email: "", password: "" });
        setWarn(true);
        setTimeout(() => {
          setWarn("");
        }, 5000);
      }

      if (json.success) {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", json.authToken);
        console.log(localStorage.getItem("authToken"));
        navigate("/");
      }
    } catch (err) {
      console.log(`Error aa gaya hai : ${err}`);
    }
  };
  return (
    <>
      <div className="mains">
        <div className="mycontainer">
          <div className="heading">
            <h2>Login Form</h2>
          </div>
          <div className="reaction">
            {warn && (
              <img
                src="../../wrongPass.png"
                alt="wrongPass"
                className="wrongPass"
              />
            )}
            {!warn && (
              <img
                src="../../allOkay.png"
                alt="all is well"
                className="allOkay"
              />
            )}
          </div>
          <div className="conatiner p-5 ">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  type="email"
                  className="form-control bg-white"
                  value={credentials.email}
                  onChange={handleChange}
                  placeholder="example@example.com"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password"> Password </label>
                <div className="pass">
                  <input
                    type={showpass}
                    name="password"
                    className="form-control bg-white"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="password"
                  />
                  <i
                    className="bi-eye"
                    id="showPassButton"
                    onClick={showPass}
                  ></i>
                </div>
              </div>
              <div className="form-group mb-3">
                <button type="submit" className="btn1">
                  {" "}
                  Login{" "}
                </button>
                <Link to="/createuser" className="btn1">
                  {" "}
                  Create Account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
