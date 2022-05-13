import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Form, Button } from "react-bootstrap";
import useInput from "../../hooks/use-input";

import "./Signin.css";
import { Link } from "react-router-dom";

export default function Signin() {
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasEror: emailInputHasEror,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    // reset: resetEmailInput,
  } = useInput((value) => value.trim().includes("@"));

  const {
    value: enteredPassword, // eslint-disable-next-line
    isValid: enteredPasswordIsValid, // eslint-disable-next-line
    hasEror: passwordInputHasEror,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler, // eslint-disable-next-line
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "");
  let formIsValid = false;

  if (enteredEmailIsValid) {
    // eslint-disable-next-line
    formIsValid = true;
  }
  const [post, setPost] = useState({
    user_email: "",
    user_password: "",
  });

  const BASE_URL = "";

  const submitFormHandler = (userData) => {
    console.log(post);
    // fetch(BASE_URL, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     user: userData,
    //   }),
    // });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setPost({
      user_email: enteredEmail,
      user_password: enteredPassword,
    });

    submitFormHandler(post);
  };

  return (
    <div className="signin__container flex__center">
      <div className="landing-overlay overlay"></div>
      <div className="signin__form-wrapper flex__center">
        <form className="signin__form" onSubmit={formSubmitHandler}>
          <h1 className="signin__form-header mb-4">Signin</h1>

          <Form.Floating className="mb-3">
            <Form.Control
              id="floatingInputCustom"
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
