import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { ReactTypeformEmbed } from "react-typeform-embed";

const Navbar = ({ auth: { user, isAuthenticated, loading }, logout }) => {
  const [typeform, setTypeformEmbed] = useState(false);
  const location = useLocation();
  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");

  useEffect(() => {
    console.log("Authentication status in navbar", user);
  }, [user]);
  const confirmEnd = () => {
    // ()
    confirmAlert({
      message: "Are you sure you want to sign out?",
      buttons: [
        {
          label: "Yes",
          onClick: () => logout(),
        },
        {
          label: "No",
          //   onClick: () => alert('Click No')
        },
      ],
    });
  };

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
        <ul className="navbar-nav mr-auto flex-column col-no-padd">
          <li className="nav-item">
            <Link
              to="/dashboard"
              className={
                "link-unstyled" +
                (pathname.includes("dashboard") ? " whiten" : "")
              }
            >
              <span className="mr-1 mt-1-adjust fa fa-sitemap"></span>
              <span className="ml-2">Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            {/* <div className="nav-items-label"> */}
            <div
              className={
                "link-unstyled" +
                (pathname.includes("overview") ? " whiten" : "")
              }
            >
              <span className="mr-1 mt-1-adjust fa fa-credit-card"></span>
              <span className="ml-2">Overview</span>
            </div>
          </li>
          <li className="nav-item">
            {/* <div className="nav-items-label"> */}
            <div
              className={
                "link-unstyled" +
                (pathname.includes("cases/support") ? " whiten" : "")
              }
            >
              <span className="mr-1 mt-1-adjust fa fa-stethoscope"></span>
              <span className="ml-2">Practice</span>
            </div>
          </li>
          <li className="nav-item">
            <Link
              to="/settings"
              className={
                "link-unstyled" +
                (pathname.includes("settings") ? " whiten" : "")
              }
            >
              <span className="mr-1 mt-1-adjust fa fa-cog"></span>
              <span className="ml-2">Settings</span>
            </Link>
          </li>

          <li className="nav-item">
            <div
              className={
                "link-unstyled" +
                (pathname.includes("disscusssion") ? " whiten" : "")
              }
            >
              <span className="mr-1 mt-1-adjust fa fa-comments"></span>
              <span className="ml-2">Discuss</span>
            </div>
          </li>

          <li className="nav-item">
            <Link
              to="/"
              className={
                "link-unstyled" +
                (pathname.includes("feedback") ? " whiten" : "")
              }
              onClick={() => typeform.typeform.open()}
            >
              <span className="mr-1 mt-1-adjust fa fa-comment"></span>
              <span className="ml-2">Feedback</span>
            </Link>
          </li>
        </ul>
        <div className="logout-btm">
          <div className="user-info-img">
            <Link to="/settings" className="nav-items-label">
              {user && user.image ? (
                <img
                  src={user.image}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <img
                  src="/assets/images/user.png"
                  className="img img-responsive"
                  width="80"
                  height="80"
                />
              )}
            </Link>
          </div>
          <div className="nav-items-label">
            <span className="mt-5 logout-btn" onClick={() => confirmEnd()}>
              Logout
            </span>
          </div>
        </div>
      </div>

      <ReactTypeformEmbed
        popup
        autoOpen={false}
        url="https://38ti4g7ro2d.typeform.com/to/HdGxpP1J"
        hideHeaders
        hideFooter
        buttonText="Go!"
        style={{ display: "none" }}
        ref={(tf) => {
          setTypeformEmbed(tf);
        }}
      />
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
