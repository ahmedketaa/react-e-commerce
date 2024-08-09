import { useState } from "react";
import "./login.css";

function Login() {
  // Regex
  const emailPattern = /^[\w-\d]+@([\w-]+\.)+[\w-]{2,4}$/;

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
      <div className="p-5 form card shadow-lg col-lg-4 col-md-6 col-sm-12 p-4">
        <h4 className="mb-4 text-center">Sign in</h4>
        <form>
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
          <button type="submit" className="w-100 btn btn-primary">
            Login
          </button>
        </form>
      </div>
      <hr className="bg-light w-50" style={{ height: "2px" }} />
      <div className="bg-light col-lg-4 rounded text-center">
        <button className="w-100 btn btn-success text-center">
          create new account
        </button>
      </div>
    </div>
  );
}

export default Login;
