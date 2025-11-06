import React from "react";
import App from "../App";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const SignUp = () => {
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
        <form action="submit" className="loginForm">
          <div className="loginEmailHolder">
            <p className="loginEmailp">Email</p>
            <input
              type="text"
              className="loginInputEmail"
              placeholder="Enter your email address"
            ></input>
          </div>
          <div className="loginEmailHolder">
            <p className="loginEmailp">Phone Number</p>
            <input
              type="text"
              className="loginInputEmail"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="loginEmailHolder">
            <p className="loginEmailp">Password</p>
            <input
              type="text"
              className="loginInputEmail"
              placeholder="Enter your password"
            />
            <button className="viewPasswordBtn">
              <Icon
                icon="mdi-light:eye"
                width="25"
                height="25"
                className="viewPasswordIcon"
              />
            </button>
          </div>
          <div className="loginEmailHolder">
            <p className="loginEmailp">Select Your Role</p>
            <input type="text" className="loginInputEmail" value={"Citizen"} />
            <button className="roleDownBtn">
              <Icon
                icon="mingcute:down-line"
                width="24"
                height="24"
                className="roleDown"
              />
            </button>
          </div>
          <button className="loginBtn" type="submit">
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
