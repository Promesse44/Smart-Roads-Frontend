import { useState } from "react";
import "./App.css";
import View from "./components/View";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <h2 className="loginTitle">Smart Roads</h2>
      </div>
      <div className="loginDiv">
        <h1 className="loginDivh1">Shape Your Neighborhood</h1>
        <p className="loginDivp">
          Log in or Sign up to submit and track road improvement requests.
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
            <p className="loginEmailp">
              Phone Number <span className="loginPhoneSpan">(Optional)</span>
            </p>
            <input
              type="text"
              className="loginInputEmail"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="loginEmailHolder">
            <div className="loginEmailpHolder">
              <p className="loginEmailp">Password</p>
              <Link className="loginEmailLink">Forgot Password?</Link>
            </div>
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
          <button className="loginBtn" type="submit">
            Login
          </button>
        </form>
        <div className="signUpLinkHolder">
          <Link className="signUpLink" to={"/signup"}>
            Sign up
          </Link>
        </div>
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
}

export default App;
