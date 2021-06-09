import React, { FC, Fragment, useState, Component, useEffect } from "react";
import { connect } from "react-redux";
import { clearAlert, setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { addDiagnosis } from "../../actions/chat";
import arrayMove from "array-move";
import "./list.css";
//Sortable list item
import { ReactSortable } from "react-sortablejs";
import Select from "react-select";
//Data
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
const apiUrl = process.env.API_URL || "http://127.0.0.1:4000/";

const DiagnoseSubmit = ({
  caseID,
  showEndDialog,
  handleCloseEndDialog,
  addDiagnosis,
  sessionId,
}) => {
  //Select 2
  const [options, setOptions] = useState([]);
  let [stepsOptions, setStepsOptions] = useState([]);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const fetchDiagnosis = async () => {
      let resp = await axios.get(apiUrl + "api/cases/support/diagnosis/all");
      let options = resp.data.data.map((el) => ({
        value: el.id,
        label: el.name,
      }));
      setOptions(options);
    };
    const fetchSteps = async () => {
      let resp = await axios.get(
        apiUrl + "api/cases/support/diagnosis/all-steps"
      );
      let stepsOptions = resp.data.data.map((el) => ({
        value: el.id,
        label: el.name,
      }));

      setStepsOptions(stepsOptions);
    };
    fetchDiagnosis();
    fetchSteps();
  }, []);
  const [formData, setFormData] = useState({
    caseId: caseID,
    diagnosis: "",
    steps: "",
  });
  const [beingSaved, setBeingSaved] = useState(false);
  // const { diagnosis } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    try {
      if (beingSaved) {
        return;
      }
      setBeingSaved(true);
      e.preventDefault();
      //restructuring as per api
      formData.diagnosis = formData.diagnosis.split(",");
      formData.steps = formData.steps.split(",");

      //Since steps and diagnosis are string expected
      formData.steps = JSON.stringify(formData.steps);
      formData.diagnosis = JSON.stringify(formData.diagnosis);

      //set session id
      formData.sessionId = sessionId;
      console.log("Form data we have right now ", formData);
      let dataBeingSaved = await addDiagnosis(formData);
      console.log("Data after being saved", dataBeingSaved);
      handleCloseEndDialog();
    } catch (err) {
      console.log("An error occured while saving form", err);
    } finally {
      setBeingSaved(false);
    }
  };
  //Sortable
  const [state, setState] = useState([]);
  const [stepsState, setStepsState] = useState([]);

  const removeItem = (value) => {
    let tempState = state.filter((selected) => selected.id != value);
    setState(tempState);
  };
  const removeStepsItem = (value) => {
    let tempState = stepsState.filter((selected) => selected.id != value);
    setStepsState(tempState);
  };

  const state2 = {
    selectedOption: null,
    selectedNextStep: null,
  };
  const handleDifferentialChange = (selectedOption) => {
    let option = { id: selectedOption.value, name: selectedOption.label };
    //Make sure the option is not already in the list
    let isAlreadySelected = state.some((selected) => selected.id == option.id);
    //Make sure we have reached final threshhold of 3 items
    if (state.length > 2) {
      return;
    }
    if (!isAlreadySelected) {
      setState([...state, option]);
      console.log(`Option selected:`, selectedOption);
      let diagnosis = [...state, option].map((st) => st.id).join();
      console.log("Diagnosis", diagnosis);
      setFormData({ caseId: formData.caseId, ...formData, diagnosis });
    }
  };
  const handleStepsChange = (selectedOption) => {
    let option = { id: selectedOption.value, name: selectedOption.label };
    //Make sure the option is not already in the list
    let isAlreadySelected = stepsState.some(
      (selected) => selected.id == option.id
    );
    //Make sure we have reached final threshhold of 3 items
    if (stepsState.length > 2) {
      return;
    }
    if (!isAlreadySelected) {
      setStepsState([...stepsState, option]);
      console.log(`Option selected:`, selectedOption);
      let steps = [...stepsState, option].map((st) => st.id).join();
      console.log("nextSteps", steps);
      setFormData({ caseId: formData.caseId, ...formData, steps });
    }
  };
  const { selectedOption, selectedNextStep } = state2;

  return (
    <Fragment>
      <Modal show={showEndDialog} size="md">
        <Modal.Body>
          <div className="row">
            <div className="col-lg-12 text-center">
              <div>
                <h5 className="title text-center mt-4">
                  What are your differencials?
                </h5>
                <span
                  className="close-btn"
                  onClick={() => handleCloseEndDialog()}
                >
                  X
                </span>
              </div>
              <div className="form-wrapper">
                <form className="form" onSubmit={(e) => onSubmit(e)}>
                  <div className="form-container-box box-forget-pass">
                    <div className="row row-space">
                      <div className="col-12">
                        <div className="form-group text-left">
                          <Select
                            value={selectedOption}
                            onChange={handleDifferentialChange}
                            options={options}
                          />
                        </div>
                      </div>
                    </div>
                    {/* <SortableComponent style={{marginLeft:'-40px'}}></SortableComponent> */}
                    <ReactSortable list={state} setList={setState}>
                      {state.map((item) => (
                        <div className="sortableItem" key={item.id}>
                          <div className="handle">
                            <i className="fa fa-align-justify"></i>
                          </div>

                          <div className="listItem">{item.name}</div>
                          <div
                            className="remove"
                            onClick={() => removeItem(item.id)}
                          >
                            <i className="fa fa-times-circle"></i>
                          </div>
                        </div>
                      ))}
                    </ReactSortable>

                    {/* Start of Next step section */}
                    <h5 className="title text-center mt-4">
                      What will you do next for the patient?
                    </h5>

                    <div className="row row-space">
                      <div className="col-12">
                        <div className="form-group text-left">
                          <Select
                            value={selectedNextStep}
                            onChange={handleStepsChange}
                            options={stepsOptions}
                          />
                        </div>
                      </div>
                    </div>
                    {/* <SortableComponent style={{marginLeft:'-40px'}}></SortableComponent> */}
                    <ReactSortable list={stepsState} setList={setStepsState}>
                      {stepsState.map((item) => (
                        <div className="sortableItem" key={item.id}>
                          <div className="handle">
                            <i className="fa fa-align-justify"></i>
                          </div>

                          <div className="listItem">{item.name}</div>
                          <div
                            className="remove"
                            onClick={() => removeStepsItem(item.id)}
                          >
                            <i className="fa fa-times-circle"></i>
                          </div>
                        </div>
                      ))}
                    </ReactSortable>

                    {/* End of Next step section */}

                    <button className="btn-lg  mt-4 mb-2 btn btn-warning btn-yellow">
                      {beingSaved && (
                        <span>
                          Submitting
                          <img
                            className="modalsLoader"
                            src="/assets/images/loader.gif"
                          />
                        </span>
                      )}
                      {!beingSaved && "Submit"}
                    </button>
                    <button
                      className="btn-lg  mt-4 mb-2 btn btn-notify text-underline"
                      type="button"
                      onClick={() => handleCloseEndDialog()}
                    >
                      <u>Or, return to the patient</u>
                    </button>
                    {/* rgb(78 162 238) */}
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

export default connect(null, { addDiagnosis })(DiagnoseSubmit);
