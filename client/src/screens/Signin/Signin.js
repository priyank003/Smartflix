import React from "react";
// import { TextField } from "@mui/material";
import { Form, Button } from "react-bootstrap";
import useInput from "../../hooks/use-input";
import { loggedInActions } from "../../store/loginAuth-slice";
import { userInfoActions } from "../../store/userInfo-slice";
import { useDispatch } from "react-redux";
import "./Signin.css";
import { Link, useNavigate } from "react-router-dom";

export default function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    value: enteredName,
    // isValid: enteredNameIsValid,
    // hasEror: nameInputHasEror,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    // reset: resetEmailInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    // hasEror: emailInputHasEror,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    // reset: resetEmailInput,
  } = useInput((value) => value.trim().includes("@"));

  const {
    value: enteredPassword, // eslint-disable-next-line
    // isValid: enteredPasswordIsValid, // eslint-disable-next-line
    // hasEror: passwordInputHasEror,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler, // eslint-disable-next-line
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "");
  let formIsValid = false;

  if (enteredEmailIsValid) {
    // eslint-disable-next-line
    formIsValid = true;
  }
  // const [post, setPost] = useState({
  //   user_email: "",
  //   user_password: "",
  // });

  const BASE_URL = "http://localhost:8000/auth/signin";
  // const BASE_URL_REC_ENG = "http://localhost:9000/prep";

  const submitFormHandler = async (userData) => {
    await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => console.log(res))
      .then(async () => {
        const userIdRes = await fetch(`${BASE_URL}/user/rec-prep`, {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const userIdResData = await userIdRes.json();
        navigate("/");
        dispatch(loggedInActions.setLoginState(true));
        dispatch(
          userInfoActions.setUserInfoState({
            email: userData.email,
            name: userData.name,
            id: userIdResData.userId,
          })
        );
      });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    submitFormHandler({
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
    });
  };

  return (
    <div className="signin__container flex__center">
      <div className="landing-overlay overlay"></div>
      <div className="signin__form-wrapper flex__center">
        <form className="signin__form" onSubmit={formSubmitHandler}>
          <h1 className="signin__form-header mb-4">Signin</h1>

          <Form.Floating className="mb-3">
            <Form.Control
              id="floatingInputNameCustom"
              type="text"
              placeholder="username"
              onChange={nameChangeHandler}
              value={enteredName}
              onBlur={nameBlurHandler}
            />
            <label htmlFor="floatingInputCustom">username</label>
          </Form.Floating>

          <Form.Floating className="mb-3">
            <Form.Control
              id="floatingInputEmailCustom"
              type="email"
              placeholder="name@example.com"
              onChange={emailChangeHandler}
              value={enteredEmail}
              onBlur={emailBlurHandler}
            />
            <label htmlFor="floatingInputCustom">Email address</label>
          </Form.Floating>
          <Form.Floating>
            <Form.Control
              id="floatingPasswordCustom"
              type="password"
              placeholder="Password"
              onChange={passwordChangeHandler}
              value={enteredPassword}
              onBlur={passwordBlurHandler}
            />
            <label htmlFor="floatingPasswordCustom">Password</label>
          </Form.Floating>
          <Form.Group
            className="mb-3 signin__remember-me"
            id="formGridCheckbox"
          >
            <Form.Check type="checkbox" label="Check me out" />
            <Link to="#">Need Help ?</Link>
          </Form.Group>
          <Button
            variant="primary"
            size="lg"
            className="signin__form-btn"
            type="submit"
          >
            Signin
          </Button>

          <div className="signin__form-bottom ">
            New to Smartflix ? <Link to="#">Signup now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
