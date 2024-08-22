import { useEffect, useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/products";
import useAuth from "../../hooks/useAuth";
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

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Check if the form is valid
  const isFormValid = () => {
    return (
      !errors.usernameErr &&
      !errors.emailErr &&
      !errors.passErr &&
      !errors.confirmPassErr &&
      !errors.genderErr &&
      user.username &&
      user.email &&
      user.password &&
      user.confirmPassword &&
      user.gender
    );
  };

  // check email is exist or not
  const checkEmailExists = async (email) => {
    try {
      const response = await api.get(`/users?email=${email}`);
      return response.data.length > 0;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };
  const navigate = useNavigate();
  const { auth } = useAuth();
  useEffect(() => {
    auth?.user && navigate("/");
  }, [auth?.user]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      const emailExists = await checkEmailExists(user.email);
      if (emailExists) {
        setErrorMsg("Email already exists.");
        setErrors({ ...errors, emailErrStyle: "is-invalid" });
        setSuccessMsg("");
      } else {
        try {
          let userData = { ...user };
          delete userData.confirmPassword;
          delete userData.gender;
          userData.role = "user";
          userData.cart = [];
          userData.wishlist = [];
          await api.post("/users", userData);
          setSuccessMsg("Signup successful!");
          setErrorMsg("");
          setTimeout(() => navigate("/login"), 1000);
        } catch (error) {
          setErrorMsg("Signup failed. Please try again.");
          setSuccessMsg("");
        }
      }
    } else {
      setErrorMsg("Please correct the errors in the form.");
      setSuccessMsg("");
    }
  };

  return (
    <div className="body container-fluid">
      <div className="text-center p-2 mb-2 bg-info bg-opacity-10 border border-success border-start rounded">
        <i className="text-danger fa-solid fa-sort-down"></i>
        <Link
          style={{ textDecoration: "none" }}
          to="/"
          className="text-warning"
        >
          <h3>Gaza Store</h3>
        </Link>
      </div>
      <div className="p-3 form card shadow-lg col-lg-4 col-md-6 col-sm-12 p-4">
        <h4 className="mb-4 text-center">Sign up</h4>
        {successMsg && <div className="alert alert-success">{successMsg}</div>}
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
        <form onSubmit={handleSubmit}>
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
          <button
            type="submit"
            className="w-100 btn btn-primary"
            disabled={!isFormValid()}
          >
            Sign Up
          </button>
        </form>
        <p className="text-center ">
          <small>
            Already have an account?{" "}
            <Link to="/login" role="button" className="text-primary">
              Sign in
            </Link>
          </small>
        </p>
      </div>
    </div>
  );
}

export default Signup;
