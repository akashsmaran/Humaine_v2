import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { clearAlert, setAlert } from "../../actions/alert";
import { Link } from "react-router-dom";
import { resetPassword } from "../../actions/auth";
import Alert from "./../layout/Alert";

const ChangePassword = ({
  login,
  clearAlert,
  isAuthenticated,
  match,
  setAlert,
  resetPassword,
}) => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    userId: match.params.token,
  });

  const { password, confirmPassword, token } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    clearAlert();
    if (password !== confirmPassword) {
      setAlert("Password and Confirm Password fields does not match", "danger");
    } else {
      resetPassword(formData);
    }
  };

  return (
    <Fragment>
      <div className="container">
        <div className="col-lg-12 col-resp">
          <div className="login-box box-wrapper-head">
            <div className="logo logo-top">
              <Link to="/">
                <img src="assets/images/logo.png" />
              </Link>
            </div>
            <div className="logo-text-bottom">
              <span>Revolutionizing medical education</span>
            </div>
            <div className="form-wrapper">
              <div className="form-container-box">
                <h3 className="mb-5 reset-pass-lbl">Reset Password</h3>
                <form className="form" onSubmit={(e) => onSubmit(e)}>
                  <div className="form-group">
                    <input
                      className="form-control passwordInput"
                      type="password"
                      id="passwordInput"
                      placeholder="New Password"
                      name="password"
                      value={password}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control passwordInput"
                      type="password"
                      id="confirmPasswordInput"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block btn-login-custom"
                  >
                    Change Password
                  </button>
                </form>
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
    </Fragment>
  );
};

ChangePassword.propTypes = {
  clearAlert: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  resetPassword,
  clearAlert,
  setAlert,
})(ChangePassword);
