import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { clearAlert, setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { Modal } from "react-bootstrap";
import {Redirect} from "react-router-dom";
import {forgetPassword} from "../../actions/auth";
import ForgetPasswordAlert from "../layout/ForgetPasswordAlert";

const ForgetPassword = ({ setAlert, clearAlert, forgetPassword, showForgetPassword, handleForgetPasswordClose }) => {
    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        clearAlert();
        console.log(formData);
        forgetPassword(formData);

    };

    return (
        <Fragment>
            <Modal show={showForgetPassword} size="md">
                <Modal.Body>
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div>
                                <h2 className="title text-center mt-4" >Forget Password</h2>
                                <span className="close-btn" onClick={() => handleForgetPasswordClose()}>X</span>
                            </div>
                            <div className="form-wrapper">
                                <form className="form" onSubmit={e => onSubmit(e)}>
                                    <div className="form-container-box box-forget-pass">
                                        <div className="row row-space">
                                            <div className="col-12">
                                                <div className="form-group text-left">
                                                    <label className="mt-4" htmlFor="emailInput">Enter your registered Email Address to reset your password</label>
                                                    <input
                                                        className="form-control style-common mt-2"
                                                        name="email"
                                                        type="email"
                                                        value={email}
                                                        onChange={e => onChange(e)}
                                                        id="emailInput"
                                                        aria-describedby="emailHelp"
                                                        placeholder="Email address"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn btn-success btn-lg active btn-signup-custom mt-4 mb-2">Reset Password</button>
                                        <ForgetPasswordAlert />
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

ForgetPassword.propTypes = {
    setAlert: PropTypes.func.isRequired,
    clearAlert: PropTypes.func.isRequired,
    forgetPassword: PropTypes.func.isRequired,
    handleForgetPasswordClose: PropTypes.func.isRequired,
    showForgetPassword: PropTypes.bool,
};

export default connect(null, { setAlert, clearAlert, forgetPassword })(ForgetPassword);
