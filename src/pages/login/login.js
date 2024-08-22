import { useEffect, useState } from "react";
import "./login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../api/products";
import useAuth from "../../hooks/useAuth";

function Login() {
  // Regex
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  // Handle User
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // Errors
  const [errors, setErrors] = useState({
    emailErr: "",
    passErr: "",
    emailErrStyle: "",
    passErrStyle: "",
  });

  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.pathname || "/";

  // navigate to home if you logged in
  useEffect(() => {
    auth?.user && navigate("/");
  }, [navigate, auth?.user]);

  // Handle Change Input
  const handleForm = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setUser({ ...user, email: value });

      // Handle Email Error Message
      if (value.length === 0) {
        setErrors({
          ...errors,
          emailErr: "required",
          emailErrStyle: "is-invalid",
        });
      } else if (!emailPattern.test(value)) {
        setErrors({
          ...errors,
          emailErr: "email invalid",
          emailErrStyle: "is-invalid",
        });
      } else {
        setErrors({ ...errors, emailErr: "", emailErrStyle: "is-valid" });
      }
    } else if (name === "password") {
      setUser({ ...user, password: value });

      // Handle Password Error Message
      if (value.length === 0) {
        setErrors({
          ...errors,
          passErr: "required",
          passErrStyle: "is-invalid",
        });
      } else if (value.length < 7) {
        setErrors({
          ...errors,
          passErr: "password must be more than 7 characters",
          passErrStyle: "is-invalid",
        });
      } else {
        setErrors({ ...errors, passErr: "", passErrStyle: "is-valid" });
      }
    }
  };

  //Check if the form is valid
  const isFormValid = () => {
    return !errors.emailErr && !errors.passErr && user.email && user.password;
  };

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  let foundedUser = null;

  const checkEmail = async (email) => {
    try {
      let response = await api.get(`/users?email=${email}`);
      foundedUser = await response.data[0];

      return response.data.length > 0;
    } catch (err) {
      console.error("Error checking email", err);
      return false;
    }
  };

  //Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      let checkEmailFound = await checkEmail(user.email);
      if (checkEmailFound) {
        if (foundedUser.password === user.password) {
          setSuccessMsg("Login Successful");
          setErrorMsg("");
          setAuth({ user: foundedUser });
          localStorage.setItem("active-user", JSON.stringify(foundedUser));
          setTimeout(() => {
            navigate(from, { replace: true });
          }, 2000);
        } else {
          setErrorMsg("Email or Password is invalid");
          setSuccessMsg("");
          setErrors({
            ...errors,
            emailErrStyle: "is-invalid",
            passErrStyle: "is-invalid",
          });
        }
      } else {
        setErrorMsg("Email or Password is invalid");
        setSuccessMsg("");
        setErrors({
          ...errors,
          emailErrStyle: "is-invalid",
          passErrStyle: "is-invalid",
        });
      }
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
        <Link
          style={{ textDecoration: "none" }}
          to="/"
          className="text-warning"
        >
          <h3>Gaza Store</h3>
        </Link>
      </div>
      <div className="p-5 form card shadow-lg col-lg-4 col-md-6 col-sm-12 p-4">
        <h4 className="mb-4 text-center">Sign in</h4>
        {successMsg && <div className="alert alert-success">{successMsg}</div>}
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
        <form onSubmit={handleSubmit}>
          {/* email */}
          <div className="mb-5">
            <input
              name="email"
              placeholder="Email"
              type="email"
              className={`form-control ${errors.emailErrStyle}`}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={handleForm}
            />
            {/* email message */}
            <div id="emailHelp" className="form-text text-danger">
              <small>{errors.emailErr}</small>
            </div>
          </div>
          {/* password */}
          <div id="passStyle" className="mb-5">
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
            {/* pass message */}
            <div id="passHelp" className="form-text text-danger">
              <small>{errors.passErr}</small>
            </div>
          </div>
          <button
            disabled={!isFormValid()}
            type="submit"
            className="w-100 btn btn-primary"
          >
            Login
          </button>
        </form>
      </div>
      <hr className="bg-light w-50" style={{ height: "2px" }} />
      <div className="bg-light col-lg-4 rounded text-center">
        <Link to="/signup" className="w-100 btn btn-success text-center">
          create new account
        </Link>
      </div>
    </div>
  );
}

export default Login;
