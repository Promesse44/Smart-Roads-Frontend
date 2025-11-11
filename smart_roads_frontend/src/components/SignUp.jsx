import React, { useState } from "react";
import App from "../App";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const role = "Citizen";
  const navigate = useNavigate();

  const onSignUp = async (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, phone, password, role }),
    })
      .then((res) => res.json())
      .then((output) => {
        alert(output.message);
        console.log(output);
        navigate("/");
      });
  };

  return (
    <>
      <div>
        <h2 className="loginTitle">Smart Roads</h2>
      </div>
      <div className="loginDiv">
        <h1 className="loginDivh1">Sign up</h1>
        <p className="loginDivp">
          Sign up to submit and track road improvement requests.
        </p>
        <form className="loginForm">
          <div className="loginEmailHolder">
            <p className="loginEmailp">Name</p>
            <input
              type="text"
              className="loginInputEmail"
              placeholder="Enter your names"
              required
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className="loginEmailHolder">
            <p className="loginEmailp">Email</p>
            <input
              type="text"
              className="loginInputEmail"
              placeholder="Enter your email address"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="loginEmailHolder">
            <p className="loginEmailp">Phone Number</p>
            <input
              type="text"
              className="loginInputEmail"
              placeholder="Enter your phone number"
              required
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="loginEmailHolder">
            <p className="loginEmailp">Password</p>
            <input
              type={showPassword ? "text" : "password"}
              className="loginInputEmail"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="viewPasswordBtn1"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Icon
                icon={showPassword ? "mdi:eye-off-outline" : "mdi-light:eye"}
                width="25"
                height="25"
                className="viewPasswordIcon"
              />
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {/* <div className="loginEmailHolder">
            <p className="loginEmailp">Select Your Role</p>
            <input
              type="text"
              className="loginInputEmail"
              value={"Citizen"}
              onChange={(e) => setRole(e.target.value)}
            />
            <button className="roleDownBtn">
              <Icon
                icon="mingcute:down-line"
                width="24"
                height="24"
                className="roleDown"
              />
            </button>
          </div> */}
          <button className="loginBtn" type="submit" onClick={onSignUp}>
            Sign up
          </button>
        </form>
        <p className="copyright">
          <Icon
            icon="la:copyright-solid"
            width="11"
            height="11"
            className="copyrightIcon"
          />
          <span>Copyrigt2025</span>
        </p>
      </div>
    </>
  );
};

export default SignUp;
