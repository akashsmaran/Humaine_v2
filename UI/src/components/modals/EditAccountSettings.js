import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { clearAlert, setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { Modal } from "react-bootstrap";
import {Redirect} from "react-router-dom";
import {stepsSubmitted} from '../../actions/chat';

const EditAccountSettings = ({ showEditAccountSettings, handleCloseEditAccountSettings , stepsSubmitted }) => {
    const [beingSaved , setBeingSaved] = useState(false);

    return (
        <Fragment>
            <Modal show={showEditAccountSettings} size="lg">
                <Modal.Body>
                    <div className="row">
                        <div className="col-lg-12 ">
                            <div>
                                <h3 className="title mt-4">Typeform API!</h3>
                                <span className="close-btn" onClick={() => handleCloseEditAccountSettings()}>X</span>
                            </div>

                            <div className="form-wrapper p-2">

                                {/* End of Next step section */}
                                <button className="btn-lg  mt-4 mb-2 btn btn-warning btn-yellow" onClick={() =>stepsSubmitted()}>
                                    { beingSaved && (
                                        <span>
                                            Submitting
                                            <img className="modalsLoader" src="/assets/images/loader.gif" />
                                        </span>
                                    ) }
                                    {!beingSaved  && (
                                        'Submit Steps'
                                    )}
                                </button>
                                <button className="btn-lg  mt-4 mb-2 btn btn-notify text-underline" type="button" onClick={() => handleCloseEditAccountSettings()}>
                                    <u>Or, return to the patient</u>
                                </button>

                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </Fragment>
    );
};

EditAccountSettings.propTypes = {
    showEditAccountSettings: PropTypes.bool.isRequired,
    handleCloseEditAccountSettings: PropTypes.func.isRequired,
    stepsSubmitted : PropTypes.func.isRequired
};
// const mapStateToProps = state => ({
//     showEditAccountSettings: PropTypes.bool.isRequired,
//     handleCloseEditAccountSettings: PropTypes.func.isRequired,
//     stepsSubmitted : PropTypes.func.isRequired

// });

export default connect(null, {stepsSubmitted})(EditAccountSettings);
