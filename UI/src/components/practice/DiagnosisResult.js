import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { clearAlert, setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { addDiagnosis } from "../../actions/chat";

const DiagnosisResult = ({
  showDiagnosisResult,
  handleCloseDiagnosisResult,
}) => {
  return (
    <Fragment>
      <Modal show={showDiagnosisResult} size="lg">
        <Modal.Body>
          <div className="row">
            <div className="col-lg-12 text-center">
              <div>
                <h3 className="title text-center mt-4">Diagnosis Results</h3>
                <span
                  className="close-btn"
                  onClick={() => handleCloseDiagnosisResult()}
                >
                  X
                </span>
              </div>
              <div className="form-wrapper">
                <h4 className="diagnosis-result attempt-sec">CORRECT !</h4>
                <table className="data-table">
                  <tbody>
                    <tr>
                      <td>Attempt 2</td>
                      <td className="attempt-sec">Score 80%</td>
                    </tr>
                    <tr>
                      <td>December 11 2020:11:34</td>
                      <td>Time 01:30</td>
                    </tr>
                  </tbody>
                </table>

                <div>
                  <img
                    src={require("./assets/images/diagnosis-result.png")}
                    className="img img-result"
                  />
                </div>
                <div className="trans-parent">
                  <div className="trans-div">Transcript</div>
                </div>
                <div className="dashboard-parent">
                  <div className="dashboard-div">Return to Dashboard</div>
                </div>
                <div className="restart-parent">
                  <div className="restart-div">Restart Case</div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

DiagnosisResult.propTypes = {
  showDiagnosisResult: PropTypes.bool.isRequired,
  handleCloseDiagnosisResult: PropTypes.func.isRequired,
};

export default connect(null, null)(DiagnosisResult);
