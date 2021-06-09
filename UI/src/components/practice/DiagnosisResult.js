import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { clearAlert, setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { addDiagnosis } from "../../actions/chat";
import "./diagnosisResults.css";

const DiagnosisResult = ({
  showDiagnosisResult,
  handleCloseDiagnosisResult,
  auth,
  case_results: { loading, attempt, diagnosis_results, steps_results, details },
}) => {
  const history = useHistory();

  return (
    <Fragment>
      <Modal show={showDiagnosisResult} size="lg">
        <Modal.Body>
          <div className="row">
            {loading && <div>Results are being fetched</div>}
            {!loading && (
              <div className="col-lg-12 ">
                <div>
                  <h3 className="title mt-4">Your results!</h3>
                  <span
                    className="close-btn"
                    onClick={() => handleCloseDiagnosisResult()}
                  >
                    X
                  </span>
                </div>

                <div className="form-wrapper p-2">
                  {/* <h4 className="diagnosis-result attempt-sec">CORRECT !</h4> */}
                  <table className="data-table">
                    <thead className="mb-4">
                      <tr className="f16">
                        <th>Attempt {attempt}</th>
                        <th className="attempt-sec"></th>
                      </tr>
                      <tr className="f16">
                        <th>{new Date(details.created_at).toString()}</th>
                        <th>Time {new Date(details.time).toString()}</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="p-2" style={{ margin: "10px" }}>
                        <th>Differentials</th>
                        <th>Next Steps</th>
                      </tr>
                      {[
                        ...Array(
                          Math.max(
                            diagnosis_results.length,
                            steps_results.length
                          )
                        ),
                      ].map((x, i) => (
                        <tr key={i}>
                          <td
                            className={
                              diagnosis_results &&
                              diagnosis_results[i] &&
                              diagnosis_results[i].status == true
                                ? "text-green"
                                : ""
                            }
                          >
                            {" "}
                            {diagnosis_results &&
                              diagnosis_results[i] &&
                              i + 1 + ".  " + diagnosis_results[i].name}
                          </td>
                          <td
                            className={
                              steps_results &&
                              steps_results[i] &&
                              steps_results[i].status == true
                                ? "text-green"
                                : ""
                            }
                          >
                            {" "}
                            {steps_results &&
                              steps_results[i] &&
                              i + 1 + ".  " + steps_results[i].name}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div>
                    <br />
                    <br />
                    {/* <img src="http://localhost:3000/assets/images/diagnosis-result.png" className="img img-result" /> */}
                  </div>
                  <div className="trans-parent">
                    <div className="trans-div">Transcript</div>
                  </div>
                  <div className="dashboard-parent">
                    <div
                      className="dashboard-div"
                      onClick={() => history.push("/dashboard")}
                    >
                      Return to Dashboard
                    </div>
                  </div>
                  <div className="restart-parent">
                    <div
                      className="restart-div"
                      onClick={() => window.location.reload()}
                    >
                      Restart Case
                    </div>
                  </div>
                </div>
              </div>
            )}
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
const mapStateToProps = (state) => ({
  auth: state.auth,
  case_results: state.case_results,
});
export default connect(mapStateToProps, null)(DiagnosisResult);
