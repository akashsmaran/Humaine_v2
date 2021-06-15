import React, { Fragment, useEffect, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Moment from "react-moment";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import { getCases, handleFileUpload } from "../../actions/dashboard";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import UpdateBasicProfile from "./../modals/updateProfileInfo";

const apiUrl = process.env.API_URL || "http://127.0.0.1:4000/";

//Show initials in the formm of an image
const InitialIcon = ({ initials }) => {
  return (
    <div
      style={{
        backgroundColor: "#4f92ff",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        width: 100,
        height: 100,
      }}
    >
      <span
        style={{
          color: "white",
          fontSize: 25,
          display: "block",
          padding: "33px",
        }}
      >
        {initials}
      </span>
    </div>
  );
};

const Settings = ({
  getCases,
  handleFileUpload,
  auth: { user },
  loading,
  case: { cases, casesLoading },
}) => {
  let settings = null;
  //Basic info
  const [showEditModal, setShowEditModal] = useState(false);
  const handleCloseupdateBasicProfile = () => setShowEditModal(false);

  //Password
  const [changePasswordsShown, setChangePasswordShown] = useState(false);
  const [message, setMessage] = useState(false);
  const [passwordBeingUpdated, setPasswordBeingUpdated] = useState(false);

  const [inputs, setInputs] = useState({});
  const [inputErrors, setInputErrors] = useState({});
  const onChangeHandler = useCallback(({ target: { name, value } }) => {
    setInputs((state) => ({ ...state, [name]: value }), []);
    let errors = inputErrors;

    switch (name) {
      case "current_password":
        errors.current_password =
          value.length < 3 ? "Current password must be 3 characters long!" : "";
        break;
      case "new_password":
        errors.new_password =
          value.length < 3 ? "New password must be 3 characters long" : "";
        break;
      case "new_password_confirmation":
        errors.new_password_confirmation =
          value.length < 3
            ? "Confirm new password must be 3 characters long!"
            : "";
        break;
      default:
        break;
    }

    setInputErrors(errors);
  });
  //Validations
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  const updatePassword = async () => {
    try {
      setPasswordBeingUpdated(true);
      console.log("Update password buttom clicked", inputs);
      //validations
      if (Object.keys(inputs).length < 2) {
        setMessage("Please enter required fields");
        return;
      }
      if (!validateForm(inputErrors)) {
        return;
      }

      let data = { userId: user.id, password: inputs.new_password };
      const resp = await axios.post(apiUrl + "users/reset-password", data);
      setMessage("Password updated successfully");
    } catch (err) {
      console.log("Something went wrong while updating password", err);
      let errorMsg = "Something went wrong while updating password";

      setMessage(errorMsg);
    } finally {
      setPasswordBeingUpdated(false);
      setTimeout(() => {
        setMessage(false);
      }, 5000);
    }
  };
  useEffect(() => {
    getCases();
  }, [getCases]);

  useEffect(() => {
    console.log("User info ", user);
    if (user && !user.image) {
      user.image = "/assets/images/user.png";
    }
  }, [user]);
  return loading === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="case-main-container">
        <div className="row case-wrapper no-padding">
          <div className="col-2-cust case-col-left dashboard-width">
            <Sidebar />
          </div>
          {/* Start of tabs */}
          <section id="tabs" className="project-tab">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <nav>
                    <div
                      className="nav nav-tabs nav-fill"
                      id="nav-tab"
                      role="tablist"
                    >
                      <span
                        className={
                          "nav-item nav-link " +
                          (changePasswordsShown ? "" : "active")
                        }
                        onClick={() => setChangePasswordShown(false)}
                        data-toggle="tab"
                        role="tab"
                        aria-controls="nav-home"
                        aria-selected="true"
                      >
                        Account Settings
                      </span>
                      <span
                        className={
                          "nav-item nav-link " +
                          (changePasswordsShown ? "active" : "")
                        }
                        data-toggle="tab"
                        onClick={() => setChangePasswordShown(true)}
                        role="tab"
                        aria-controls="nav-profile"
                        aria-selected="false"
                      >
                        Password Management
                      </span>
                    </div>
                  </nav>
                  <div className="tab-content" id="nav-tabContent">
                    <div
                      className={`tab-pane fade ${
                        changePasswordsShown ? "" : "show active"
                      }`}
                      id="nav-home"
                      role="tabpanel"
                      aria-labelledby="nav-home-tab"
                    >
                      {!changePasswordsShown && (
                        <div className="row">
                          {false && <Spinner />}
                          <div
                            className="page-content page-container"
                            id="page-content"
                          >
                            <div className="padding">
                              <div className="row container">
                                <div className="col-md-12 grid-margin stretch-card">
                                  <div
                                    className="card"
                                    style={{ width: "126%" }}
                                  >
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
                                      <InitialIcon
                                        initials={
                                          user && user.name
                                            ? user.name
                                                .split(" ")
                                                .map((l) => l[0])
                                                .join()
                                            : ""
                                        }
                                      />
                                    )}
                                    {/* Image upload functionality */}
                                    <div
                                      className="editImg"
                                      onClick={() =>
                                        document
                                          .getElementById("inpProfileImg")
                                          .click()
                                      }
                                    >
                                      Edit
                                    </div>
                                    <input
                                      type="file"
                                      style={{ display: "none" }}
                                      onChange={handleFileUpload}
                                      id="inpProfileImg"
                                    />
                                    {/* End of image upload functionality */}
                                    <div className="card-body">
                                      <h4 className="card-title">
                                        {user && user.title}&nbsp;&nbsp;
                                        {user && user.name}
                                      </h4>
                                      <div className="template-demo">
                                        <table className="table mb-0">
                                          <tbody>
                                            <tr>
                                              <th className="pl-0">Name</th>
                                              <td className="pr-0 text-right">
                                                {user && user.name}
                                              </td>
                                            </tr>

                                            <tr>
                                              <th className="pl-0">
                                                Email Address
                                              </th>
                                              <td className="pr-0 text-right">
                                                {user && user.email}
                                              </td>
                                            </tr>

                                            <tr>
                                              <th className="pl-0">Gender</th>
                                              <td className="pr-0 text-right">
                                                {user && user.gender}
                                              </td>
                                            </tr>

                                            <tr>
                                              <th className="pl-0">
                                                Date of birth
                                              </th>
                                              <td className="pr-0 text-right">
                                                {user && user.date_of_birth
                                                  ? user.date_of_birth.split(
                                                      "T"
                                                    )[0]
                                                  : " "}
                                              </td>
                                            </tr>

                                            <tr>
                                              <th className="pl-0">
                                                Institution
                                              </th>
                                              <td className="pr-0 text-right">
                                                {user && user.institution}
                                              </td>
                                            </tr>

                                            <tr>
                                              <th className="pl-0">
                                                Level of Training
                                              </th>
                                              <td className="pr-0 text-right">
                                                {user && user.level_of_training}
                                              </td>
                                            </tr>

                                            <tr>
                                              <th className="pl-0">Country</th>
                                              <td className="pr-0 text-right">
                                                {user && user.country}
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                    {/* Pencil icon */}
                                    <span
                                      className="mr-1 mt-1-adjust fa fa-pencil settingsPencil"
                                      onClick={() => setShowEditModal(true)}
                                    >
                                      {" "}
                                    </span>
                                    {/* End of Pencil icon */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div
                      className={`tab-pane fade ${
                        changePasswordsShown ? "show active" : ""
                      }`}
                      id="nav-profile"
                      role="tabpanel"
                      aria-labelledby="nav-profile-tab"
                    >
                      {changePasswordsShown && (
                        <div className="card" style={{ width: "126%" }}>
                          <div className="row">
                            <div className="col-md-12 col-md-offset-2">
                              <div className="panel panel-default">
                                <div className="panel-body">
                                  <form
                                    className="form-horizontal"
                                    method="POST"
                                    action="{{ route('changePassword') }}"
                                  >
                                    {/* <div className="form-group{{ $errors->has('current-password') ? ' has-error' : '' }}">
                                                                                            <label htmlFor="new-password" className="col-md-4 control-label">Old Password</label>

                                                                                            <div className="col-md-12">
                                                                                                <input type="password" className="form-control" name="current_password" onChange={onChangeHandler} value={inputs.current_password || ''} required />
                                                                                                {inputErrors && inputErrors.current_password && inputErrors.current_password.length > 0 &&
                                                                                                    ( <span className="help-block">
                                                                                                        <strong>{inputErrors.current_password}</strong>
                                                                                                    </span> )}

                                                                                            </div>
                                                                                        </div> */}

                                    <div className="form-group{{ $errors->has('new-password') ? ' has-error' : '' }}">
                                      <label
                                        htmlFor="new-password"
                                        className="col-md-4 control-label"
                                      >
                                        New Password
                                      </label>

                                      <div className="col-md-12">
                                        <input
                                          type="password"
                                          className="form-control"
                                          name="new_password"
                                          onChange={onChangeHandler}
                                          value={inputs.new_password || ""}
                                          required
                                        />
                                        {inputErrors &&
                                          inputErrors.new_password &&
                                          inputErrors.new_password.length >
                                            0 && (
                                            <span className="help-block">
                                              <strong>
                                                {inputErrors.new_password}
                                              </strong>
                                            </span>
                                          )}
                                      </div>
                                    </div>

                                    <div className="form-group">
                                      <label
                                        htmlFor="new-password-confirm"
                                        className="col-md-12 control-label"
                                      >
                                        Confirm New Password
                                      </label>
                                      <div className="col-md-12   ">
                                        <input
                                          type="password"
                                          className="form-control"
                                          name="new_password_confirmation"
                                          onChange={onChangeHandler}
                                          value={
                                            inputs.new_password_confirmation ||
                                            ""
                                          }
                                          required
                                        />
                                        {inputs &&
                                        inputs.new_password &&
                                        inputs.new_password_confirmation &&
                                        inputs.new_password.length > 2 &&
                                        inputs.new_password_confirmation !=
                                          inputs.new_password ? (
                                          <span className="help-block error-msg">
                                            Password and confirm password must
                                            be same
                                          </span>
                                        ) : (
                                          ""
                                        )}
                                        {inputErrors &&
                                          inputErrors.new_password_confirmation &&
                                          inputErrors.new_password_confirmation
                                            .length > 0 && (
                                            <span className="help-block">
                                              <br />
                                              <strong>
                                                {
                                                  inputErrors.new_password_confirmation
                                                }
                                              </strong>
                                            </span>
                                          )}
                                      </div>
                                    </div>

                                    <div className="form-group">
                                      <div className="col-md-6 col-md-offset-4">
                                        <button
                                          type="button"
                                          className="btn btn-primary"
                                          onClick={() => updatePassword()}
                                        >
                                          {passwordBeingUpdated ? (
                                            <span>
                                              Updating
                                              <img
                                                className="modalsLoader"
                                                src="/assets/images/loader.gif"
                                              />
                                            </span>
                                          ) : (
                                            "Update Password"
                                          )}
                                        </button>
                                      </div>
                                    </div>
                                  </form>
                                  {message && (
                                    <div
                                      className={
                                        "alert " +
                                        ((message + "")
                                          .toLowerCase()
                                          .includes("success")
                                          ? "alert-success"
                                          : "alert-danger")
                                      }
                                    >
                                      {message}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* End of Tabs */}
          <div className="col-10-cust no-padding add-padding" id="style-10">
            {!changePasswordsShown && (
              <button className="mt-2 btn btn-primary changePassword col-3">
                Change Password
              </button>
            )}
          </div>
        </div>
      </div>
      <UpdateBasicProfile
        showupdateBasicProfile={showEditModal}
        handleCloseupdateBasicProfile={handleCloseupdateBasicProfile}
      ></UpdateBasicProfile>
    </Fragment>
  );
};

Settings.propTypes = {
  auth: PropTypes.object.isRequired,
  getCases: PropTypes.func.isRequired,
  case: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  case: state.dashboard,
});

export default connect(mapStateToProps, { getCases, handleFileUpload })(
  Settings
);
