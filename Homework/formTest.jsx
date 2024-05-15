import { useState } from "react";

function SimpleInput() {
  const SimpleInput = (props) => {
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

    const enteredEmailIsValid =
      enteredEmail.trim() !== "" && enteredEmail.includes("@");
    const emailInputIsValid = !enteredEmailIsValid && enteredEmailTouched;
  };

  let formIsValid = false;

  if (emailInputIsValid) {
    formIsValid = true;
  }

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const emailInputBlurHandler = () => {
    setEnteredEmailTouched(true);
  };

  return (
    <div className={nameInputClasses}>
      <label htmlFor="email">Your Email</label>
      <input
        type="email"
        id="email"
        onChange={emailInputChangeHandler}
        onBlur={emailInputBlurHandler}
        value={enteredEmail}
      />
      {emailInputIsValid && (
        <p className="error-text">Email must have '@' sign.</p>
      )}
    </div>
  );
}
