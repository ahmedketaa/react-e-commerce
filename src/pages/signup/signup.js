import { useState } from "react";
import "./signup.css";

function Signup() {
  // Regex patterns
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  // Handle User
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  // Errors
  const [errors, setErrors] = useState({
    usernameErr: "",
    emailErr: "",
    passErr: "",
    confirmPassErr: "",
    genderErr: "",
    usernameErrStyle: "",
    emailErrStyle: "",
    passErrStyle: "",
    confirmPassErrStyle: "",
  });

  // Handle Input Change
  const handleForm = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "username":
        setUser({ ...user, username: value });
        setErrors({
          ...errors,
          usernameErr:
            value.length === 0
              ? "required"
              : value.length < 3
              ? "username must be at least 3 characters"
              : "",
          usernameErrStyle:
            value.length === 0 || value.length < 3 ? "is-invalid" : "is-valid",
        });
        break;

      case "email":
        setUser({ ...user, email: value });
        setErrors({
          ...errors,
          emailErr:
            value.length === 0
              ? "required"
              : !emailPattern.test(value)
              ? "email invalid"
              : "",
          emailErrStyle:
            value.length === 0 || !emailPattern.test(value)
              ? "is-invalid"
              : "is-valid",
        });
        break;

      case "password":
        setUser({ ...user, password: value });
        setErrors({
          ...errors,
          passErr:
            value.length === 0
              ? "required"
              : value.length < 7
              ? "password must be more than 7 characters"
              : "",
          passErrStyle:
            value.length === 0 || value.length < 7 ? "is-invalid" : "is-valid",
        });
        break;

      case "confirmPassword":
        setUser({ ...user, confirmPassword: value });
        setErrors({
          ...errors,
          confirmPassErr:
            value.length === 0
              ? "required"
              : value !== user.password
              ? "passwords do not match"
              : "",
          confirmPassErrStyle:
            value.length === 0 || value !== user.password
              ? "is-invalid"
              : "is-valid",
        });
        break;

      case "gender":
        setUser({ ...user, gender: value });
        setErrors({
          ...errors,
          genderErr: value.length === 0 ? "required" : "",
        });
        break;

      default:
        break;
    }
  };

  // Show and Hide Password
  const [showHide, setShowHide] = useState("password");
  const handleShowHide = (e) => {
    setShowHide(e.target.checked ? "text" : "password");
  };

  return (
    <div className="body container-fluid">
      <div className="text-center p-2 mb-2 bg-info bg-opacity-10 border border-success border-start rounded">
        <i className="text-danger fa-solid fa-sort-down"></i>
        <h3 className="text-warning">Gaza Store</h3>
      </div>
      <div className="p-3 form card shadow-lg col-lg-4 col-md-6 col-sm-12 p-4">
        <h4 className="mb-4 text-center">Sign up</h4>
        <form>
          {/* Username */}
          <div id="nameStyle" className="mb-4">
            <input
              name="username"
              placeholder="Username"
              type="text"
              className={`form-control ${errors.usernameErrStyle}`}
              onChange={handleForm}
            />
            <div id="nameHelp" className="form-text text-danger">
              <small>{errors.usernameErr}</small>
            </div>
          </div>
          {/* Email */}
          <div className="mb-4">
            <input
              name="email"
              placeholder="Email"
              type="email"
              className={`form-control ${errors.emailErrStyle}`}
              onChange={handleForm}
            />
            <div id="emailHelp" className="form-text text-danger">
              <small>{errors.emailErr}</small>
            </div>
          </div>
          {/* Password */}
          <div id="passStyle" className="mb-4">
            <div className="input-group">
              <input
                type={showHide}
                className={`form-control ${errors.passErrStyle}`}
                placeholder="Password"
                name="password"
                onChange={handleForm}
              />
              <div className="input-group-text">
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  onChange={handleShowHide}
                />
              </div>
            </div>
            <div id="passHelp" className="form-text text-danger">
              <small>{errors.passErr}</small>
            </div>
          </div>
          {/* Confirm Password */}
          <div id="confirmPassStyle" className="mb-4">
            <input
              type={showHide}
              className={`form-control ${errors.confirmPassErrStyle}`}
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleForm}
            />
            <div id="comfirmHelp" className="form-text text-danger">
              <small>{errors.confirmPassErr}</small>
            </div>
          </div>
          {/* Gender */}
          <div className="mb-4">
            <label className="form-label">Gender</label>
            <div>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={handleForm}
              />
              Male
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={handleForm}
              />
              Female
            </div>
            <div className="form-text text-danger">
              <small>{errors.genderErr}</small>
            </div>
          </div>
          <button type="submit" className="w-100 btn btn-primary">
            Sign Up
          </button>
        </form>
        <p className="text-center ">
          <small>
            Already have an account?{" "}
            <span role="button" className="text-primary">
              Sign in
            </span>
          </small>
        </p>
      </div>
    </div>
  );
}

export default Signup;
