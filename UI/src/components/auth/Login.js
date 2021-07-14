import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { clearAlert } from "../../actions/alert";
import { Link } from "react-router-dom";
import { login, removeVerification } from "../../actions/auth";
import Register from "./Register";
import ForgetPassword from "./ForgetPassword";
import Alert from "./../layout/Alert";
import VerificationEmail from "../modals/VerificationEmail";

const Login = ({
  login,
  clearAlert,
  removeVerification,
  isAuthenticated,
  showVerification,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Change the actions so that when registration is successful, it will set a variable which
  // open verfication modal

  const [showRegister, setShowRegister] = useState(false);
  const [showForgetPassword, setShowForgetPassword] = useState(false);

  const handleCloseVerification = () => {
    // add the action which removes modal
    setShowRegister(false);
    removeVerification();
  };

  const handleClose = () => {
    setShowRegister(false);
    clearAlert();
  };
  const handleShow = () => {
    setShowRegister(true);
    clearAlert();
  };

  const handleForgetPasswordClose = () => setShowForgetPassword(false);
  const handleForgetPasswordShow = () => setShowForgetPassword(true);

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    clearAlert();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div className="container">
        <div className="col-lg-12 col-resp">
          <div className="login-box box-wrapper-head">
            <div className="logo logo-top">
              <Link to="/">
                <img className="fix-img" src="assets/images/logo.png" />
              </Link>
            </div>
            <div className="logo-text-bottom">
              <span>Intelligent Medical Education</span>
            </div>
            <div className="form-wrapper">
              <div className="form-container-box">
                <form className="form" onSubmit={(e) => onSubmit(e)}>
                  <div className="form-group">
                    <input
                      className="form-control emailInput"
                      name="email"
                      type="email"
                      id="emailInput"
                      aria-describedby="emailHelp"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control passwordInput"
                      type="password"
                      id="passwordInput"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block btn-login-custom"
                  >
                    Log In
                  </button>
                </form>
                <div className="forget-password-text forget-pass-link">
                  <span>
                    <a
                      className="forget-link"
                      href="#"
                      onClick={() => handleForgetPasswordShow()}
                    >
                      Forgot Password
                    </a>
                  </span>
                </div>
                <button
                  className="btn btn-success btn-lg active btn-signup-custom"
                  onClick={() => handleShow()}
                >
                  Sign Up
                </button>
                <div className="mt-3">
                  <Alert />
                </div>
              </div>
            </div>
            <div className="login-form-image">
              <img
                src="assets/images/image_4.png"
                className="img4 login-image img-responsive"
              />
            </div>
          </div>
        </div>
      </div>
      <Register showRegister={showRegister} handleClose={handleClose} />
      <VerificationEmail
        showVerification={showVerification}
        handleCloseRegister={handleClose}
        handleClose={handleCloseVerification}
      />
      <ForgetPassword
        showForgetPassword={showForgetPassword}
        handleForgetPasswordClose={handleForgetPasswordClose}
      />
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  clearAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  showVerification: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  showVerification: state.auth.showVerification,
});

export default connect(mapStateToProps, {
  login,
  clearAlert,
  removeVerification,
})(Login);
