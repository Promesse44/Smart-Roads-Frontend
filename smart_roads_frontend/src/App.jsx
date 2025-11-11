import { useState } from "react";
import "./App.css";
import View from "./components/View";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();

    try {
      const login = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => res.json())
        .then((output) => {
          console.log(output);

          if (output.success) {
            localStorage.setItem("token", output.token);
            // setUser(output.user);
            // console.log(output.user.user_type);
            localStorage.setItem("user", JSON.stringify(output.user));
            alert(output.msg);
            if (output.user.user_type !== "Citizen") {
              navigate("/approve", { state: { user: output.user } });
            } else {
              navigate("/view", { state: { user: output.user } });
            }
          } else {
            alert(output.msg);
          }
        })
        .catch((error) => {
          alert(error);
        });
    } catch (error) {
      alert("Login Error");
      console.log(error);
    }
  };

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
        <form className="loginForm">
          <div className="loginEmailHolder">
            <p className="loginEmailp">Email</p>
            <input
              type="email"
              className="loginInputEmail"
              placeholder="Enter your email address"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            ></input>
          </div>
          <div className="loginEmailHolder"></div>
          <div className="loginEmailHolder">
            <div className="loginEmailpHolder">
              <p className="loginEmailp">Password</p>
              <Link className="loginEmailLink">Forgot Password?</Link>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className="loginInputEmail"
              placeholder="Enter your password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <button
              type="button"
              className="viewPasswordBtn"
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
          <button className="loginBtn" onClick={onLogin}>
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
