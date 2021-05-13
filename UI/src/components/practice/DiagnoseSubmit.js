import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { clearAlert, setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { Modal } from "react-bootstrap";
import {Redirect} from "react-router-dom";
import {addDiagnosis} from '../../actions/chat';

const DiagnoseSubmit = ({ caseID, showEndDialog, handleCloseEndDialog, addDiagnosis }) => {

    const [formData, setFormData] = useState({
        caseId: caseID,
        diagnosis: ''

    });

    const { diagnosis } = formData;
    
    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        addDiagnosis(formData);
        setTimeout(() => handleCloseEndDialog(), 100);
    };

    return (
        <Fragment>
            <Modal show={showEndDialog} size="md">
                <Modal.Body>
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div>
                                <h5 className="title text-center mt-4" >Submit Differential or Working Diagnoses</h5>
                                <span className="close-btn" onClick={() => handleCloseEndDialog()}>X</span>
                            </div>
                            <div className="form-wrapper">
                                <form className="form" onSubmit={e => onSubmit(e)}>
                                    <div className="form-container-box box-forget-pass">
                                        <div className="row row-space">
                                            <div className="col-12">
                                                <div className="form-group text-left">
                                                    <select
                                                        className="form-control style-common mt-2"
                                                        name="diagnosis"
                                                        onChange={e => onChange(e)}
                                                        value={diagnosis}
                                                        id="selectInput"
                                                        required
                                                    >
                                                        <option value="">Enter your Diagnoses</option>
                                                        <option value="1">Option One - 1</option>
                                                        <option value="2">Option Two - 2</option>
                                                        <option value="3">Option Three - 3</option>
                                                        <option value="4">Option Four - 4</option>
                                                        <option value="5">Option Five - 5</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn-lg  mt-4 mb-2 btn btn-warning btn-yellow">Submit</button>
                                        
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

DiagnoseSubmit.propTypes = {
    handleCloseEndDialog: PropTypes.func.isRequired,
    addDiagnosis: PropTypes.func.isRequired,
    showEndDialog: PropTypes.bool,
};

export default connect(null, {addDiagnosis})(DiagnoseSubmit);
