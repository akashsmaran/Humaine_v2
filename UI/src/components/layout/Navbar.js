import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const logoutUser = () => {
    logout();
  };
  const authLinks = (
    <div className="main-nav-wrapper">
      <div className="mt-2 mb-5">
        <div className="header-head">
          <span className="text-one">Hum</span>
          <span className="text-two">ai</span>
          <span className="text-one">ne</span>
        </div>
      </div>
      <div className="mt-5">
        <ul className="navbar-nav mr-auto flex-column vertical-nav col-no-padd">
          {/* <li className="nav-item">
              <Link to="/dashboard" className="link-unstyled whiten">
                  <div className="nav-items-label">
                      <span className="mr-1 mt-1-adjust fa fa-pie-chart"></span><span
                      className="ml-2">
                        Dashboard
                        </span>
                  </div>
                  </Link>
              </li> */}
          <li className="nav-item">
            <Link to="/dashboard" className="nav-items-label">
              <span className="mr-1 mt-1-adjust fa fa-credit-card"></span>
              <span className="ml-2">Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <div className="nav-items-label">
              <span className="mr-1 mt-1-adjust fa fa-credit-card"></span>
              <span className="ml-2">Overview</span>
            </div>
          </li>
          <li className="nav-item">
            <div className="nav-items-label">
              <span className="mr-1 mt-1-adjust fa fa-comment"></span>
              <span className="ml-2">Discuss</span>
            </div>
          </li>
        </ul>
        <div className="logout-btm">
          <div className="user-info-img">
            <img
              src="./assets/images/user.png"
              className="img img-responsive"
              width="80"
              height="80"
            />
          </div>
          <div className="nav-items-label">
            <span className="mt-5 logout-btn" onClick={() => logoutUser()}>
              Logout
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <Fragment>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </Fragment>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
