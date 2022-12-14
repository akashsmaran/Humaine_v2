import React, { Fragment, useState, useMemo } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert, clearAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import { Modal, Form } from "react-bootstrap";
import Moment from "react-moment";
import moment from "moment";
import Alert from "./../layout/Alert";
import countryList from "react-select-country-list";

const Register = ({
  setAlert,
  clearAlert,
  register,
  isAuthenticated,
  showRegister,
  handleClose,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    institution: "",
    levelOfTraining: "",
    gender: "",
    country: "",
    dateOfBirth: "",
  });

  const options = useMemo(() => countryList().getData(), []);
  const {
    name,
    lastName,
    email,
    password,
    confirmPassword,
    institution,
    levelOfTraining,
    gender,
    country,
    dateOfBirth,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    clearAlert();

    if (password !== confirmPassword) {
      setAlert("Password and Confirm Password fields does not match", "danger");
    } else {
      register(formData);
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <Modal show={showRegister} size="lg">
        <Modal.Body>
          <div className="row">
            <div className="col-lg-12 text-center">
              <div>
                <h2 className="title text-center mt-4">Register Now</h2>
                <span className="close-btn" onClick={() => handleClose()}>
                  X
                </span>
              </div>
              <div className="form-wrapper">
                <form className="form" onSubmit={(e) => onSubmit(e)}>
                  <div className="form-container-box-register ">
                    <div className="row row-space">
                      <div className="col-md-6 col-xs-12">
                        <div className="form-group ">
                          <input
                            type="text"
                            name="name"
                            className="form-control style-common"
                            id="nameInput"
                            placeholder="First Name"
                            value={name}
                            onChange={(e) => onChange(e)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-xs-12">
                        <div className="form-group ">
                          <input
                            type="text"
                            name="lastName"
                            className="form-control style-common"
                            id="lastNameInput"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => onChange(e)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row row-space">
                      <div className="col-md-12 col-xs-12">
                        <div className="form-group">
                          <input
                            className="form-control style-common"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => onChange(e)}
                            id="emailInput"
                            aria-describedby="emailHelp"
                            placeholder="Email address"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row row-space">
                      <div className="col-md-6 col-xs-12">
                        <div className="form-group">
                          <input
                            className="form-control style-common"
                            type="password"
                            value={password}
                            onChange={(e) => onChange(e)}
                            id="passwordInput"
                            placeholder="Password"
                            name="password"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-xs-12">
                        <div className="form-group">
                          <input
                            className="form-control style-common"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => onChange(e)}
                            id="confirmPasswordInput"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <h5 className="title text-left text-sm-left-akign">
                      Demographic Information (Optional)
                    </h5>
                    <p className="text-left" style={{ fontStyle: "italic" }}>
                      This information will allow us to develop new cases that
                      suit our users
                    </p>
                    <div className="row row-space">
                      <div className="col-md-12 col-xs-12">
                        <div className="form-group">
                          <input
                            className="form-control style-common"
                            name="institution"
                            value={institution}
                            onChange={(e) => onChange(e)}
                            type="text"
                            id="institutionInput"
                            aria-describedby="institutionHelp"
                            placeholder="Institution"
                            // required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row row-space">
                      <div className="col-md-12 col-xs-12">
                        <div className="form-group">
                          <select
                            className="form-control style-common"
                            name="levelOfTraining"
                            value={levelOfTraining}
                            onChange={(e) => onChange(e)}
                            id="levelOfTrainingInput"
                            // required
                          >
                            <option value="">Level of Training</option>
                            <option value="Pre-clinical Medical Student">
                              Pre-clinical Medical Student
                            </option>
                            <option value="Early Clinical Medical student">
                              Early Clinical Medical student
                            </option>
                            <option value="Final Year Medical Student">
                              Final Year Medical Student
                            </option>
                            <option value="Physician Associate Student">
                              Physician Associate Student
                            </option>
                            <option value="Intern">
                              Intern (House Officer)
                            </option>
                            <option value="Practising Physician Associate">
                              Practising Physician Associate
                            </option>
                            <option value="Practising Nurse Practitioner">
                              Practising Nurse Practitioner
                            </option>
                            <option value="Resident">
                              Resident (Senior House Officer)
                            </option>
                            <option value="Attending">
                              Attending (Registrar upwards)
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row row-space">
                      {/* <div className="col-md-6 col-xs-12">
                        <div className="form-group">
                          <select
                            className="form-control style-common"
                            name="gender"
                            value={gender}
                            onChange={(e) => onChange(e)}
                            id="genderInput"
                            // required
                          >
                            <option value="">Select Gender</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                          </select>
                        </div>
                      </div> */}
                      <div className="col-md-12 col-xs-12">
                        <div className="input-group">
                          <select
                            className="form-control style-common"
                            name="country"
                            value={country}
                            onChange={(e) => onChange(e)}
                            id="cuntryInput"
                            // required
                          >
                            <option value="">Select Country</option>
                            {/* <option>Pakistan</option>
                            <option>India</option>
                            <option>China</option>
                            <option>USA</option>
                            <option>UK</option> */}

                            {options.map((op) => {
                              return (
                                <option value={op.label}>{op.label}</option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                    {/* <h5 className="title text-left text-sm-left-akign">Date of Birth</h5>
                    <div className="row row-space">
                      <div className="col-6">
                        <div className="form-group">
                          <input
                            className="form-control style-common"
                            name="dateOfBirth"
                            value={dateOfBirth}
                            onChange={e => onChange(e)}
                            type="date"
                            id="dateOfBirth"
                            aria-describedby="dateOfBirth"
                            placeholder="Select Date of Birth"
                            data-date-format="DD MMMM YYYY"
                            // required
                          />
                        </div>
                      </div>
                    </div> */}
                    <div className="checkbox text-left term-condition-section ">
                      <label>
                        By signing up, you agree to our{" "}
                        <a
                          href="https://www.privacypolicies.com/live/905b73b5-643d-4240-8080-1ec0889d35d6"
                          target="_blank"
                        >
                          <span className="term-text">Terms & Conditions</span>
                        </a>
                        <span> and </span>
                        <a
                          href="https://www.privacypolicies.com/live/905b73b5-643d-4240-8080-1ec0889d35d6"
                          target="_blank"
                        >
                          <span className="term-text">Privacy Policy</span>
                        </a>
                      </label>
                    </div>

                    {/* <div className="mb-4">
                      <div className="text-disclaimer mb-2">
                        <span className="terms-starting">
                          Terms and Condition:{" "}
                        </span>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                        <div className="terms-starting">
                          Something else here :{" "}
                        </div>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s
                      </div>
                    </div> */}
                    <Alert />
                    <div
                      className="row row-space"
                      style={{ justifyContent: "center" }}
                    >
                      <div className="col-md-8 col-xs-12">
                        <button
                          className="btn btn-success btn-lg active btn-signup-custom"
                          style={{
                            margin: "20px 0px 0px 0px",
                            width: "100%",
                            backgroundColor: "#00B576",
                          }}
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  clearAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,

  showRegister: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, clearAlert, register })(
  Register
);
