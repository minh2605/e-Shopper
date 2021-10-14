import React, { useState } from "react";
import Register from "./Register";
import "./Login.scss";
import FormErrors from "../FormErrors";
import API from "../Api";

function isEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function Login(props) {
  const [loginInfo, setLoginInfo] = useState({
    level: 0,
  });
  const [formErrors, setFormErrors] = useState({});
  // const [validForm, setValidForm] = useState(false);
  // useEffect(() => {

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [validForm]);

  function postLogin() {
    const userLogin = loginInfo;
    API.post(`/api/login`, userLogin)
      .then((res) => {
        const { Auth, response, success } = res.data;
        if (response === "success") {
          localStorage.setItem("auth", JSON.stringify(Auth));
          localStorage.setItem("token", success.token);
          console.log(Auth);
          console.log(success);
          alert("Login successfully");
          props.history.push("/");
        } else {
          console.log(res.data.response);
          alert("Email or password is not correct");
        }
      })
      .catch((error) => console.log(error));
  }

  function handleInput(e) {
    const newLoginInfo = { ...loginInfo, [e.target.name]: e.target.value };
    setLoginInfo(newLoginInfo);
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    const { email, password } = loginInfo;
    let flag = true;
    const newFormErrors = {};
    if (!isEmail(email)) {
      flag = false;
      newFormErrors.email = "Email is not valid";
      setFormErrors(newFormErrors);
    }

    if (!email || email.trim().length === 0) {
      flag = false;
      newFormErrors.email = "Email must not be empty";
      setFormErrors(newFormErrors);
    }

    if (!password || password.trim().length === 0) {
      flag = false;
      newFormErrors.password = "Password must not be empty";
      setFormErrors(newFormErrors);
    }

    if (flag) {
      postLogin();
      // setValidForm(true);
    }
  }

  return (
    <div className="login-section col-sm-9">
      <div className="row">
        <div className="login col-sm-5">
          <FormErrors errors={formErrors} />
          <form className="login-form" onSubmit={handleSubmitForm}>
            <h4 className="form__title">Login to your account</h4>
            <div className="register-errors"></div>
            <input
              type="text"
              name="email"
              onChange={handleInput}
              className="form__ip ip__email"
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              onChange={handleInput}
              className="form__ip ip__pass"
              placeholder="Password"
            />
            <div className="form__option">
              <input type="checkbox" name="" id="" />
              <span>Keep me signed in</span>
            </div>
            <button className="form__btn" type="submit">
              Login
            </button>
          </form>
        </div>
        <Register />
      </div>
    </div>
  );
}

export default Login;
