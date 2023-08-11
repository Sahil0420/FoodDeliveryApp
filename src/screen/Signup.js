import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/registerUser.css";

export default function Signup() {
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
    adress: "",
  });

  const [validPass, setSetValidPass] = useState(false);

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    //perform password validation here and update state accordingly
    const strongPassword = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );
    let result = strongPassword.test(credentials.password);

    setSetValidPass(result);

  }, [credentials.password]);

  const [showpass, setShowPass] = useState("password");

  const showPass = () => {
    showpass === "password" ? setShowPass("text") : setShowPass("password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, address:credentials.address }))
    try {
      const response = await fetch("http://localhost:4000/api/createuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          address: credentials.address,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        // alert("Enter valid credentials")
        console.log("enter valid credentials");
      } else {
        localStorage.setItem("authToken", json.authToken);
        // console.log(localStorage.getItem("authToken"));
        navigate("/");
      }
    } catch (err) {
      console.log(`Error aa gaya : ${err}`);
    }
  };

  return (
    <>
      <div className="mains">
        <div className="mycontainer">
          <div className="heading">
            <h2 className="text-success">Sign Up Form</h2>
          </div>
          <div className="avatar">
            <img src="../../registration.png" alt="avataar" />
          </div>
          <div className="container p-5">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="name" className="text-success">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  className="form-control bg-white"
                  value={credentials.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="email" className="text-success">
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  className="form-control bg-white"
                  value={credentials.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="password" className="form-label text-success">
                  {" "}
                  Password{" "}
                </label>
                <div className="pass">
                  <input
                    type={showpass}
                    name="password"
                    className="form-control bg-white"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="password"
                  />
                  <i className="bi-eye" onClick={showPass}></i>
                </div>
                {!validPass && (
                  <div className="validPass">
                    Password must be minimum 8 characters long. <br />
                    Must have alphanumeric charcters
                  </div>
                )}
              </div>
              <div className="form-group mt-3">
                <label htmlFor="address" className="text-success">
                  Adress
                </label>
                <input
                  name="address"
                  type="text"
                  className="form-control bg-white"
                  onChange={handleChange}
                  placeholder=" Area , Colony"
                  required
                ></input>
              </div>

              <div className="form-group mb-3">
                <button type="submit" className="btn1">
                  {" "}
                  Submit
                </button>
                <Link to="/login" className="btn1">
                  {" "}
                  Already a user
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
