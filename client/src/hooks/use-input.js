import { useState } from "react";
const useInput = (validateHandler) => {
  const [enteredValue, setenteredValue] = useState("");
  const [isTouched, setisTouched] = useState(false);

  const valueIsValid = validateHandler(enteredValue);
  const hasEror = !valueIsValid && isTouched;

  const valueChangeHandler = (e) => {
    setenteredValue(e.target.value);
  };

  const inputBlurHandler = (e) => {
    setisTouched(true);
  };

  const reset = () => {
    setenteredValue("");
    setisTouched(false);
  };
  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasEror,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
