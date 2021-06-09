import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getCurrentProfile } from "../../actions/profile";
import { hideDiagnosisResult, hideCaseFeedBack } from "../../actions/chat";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar/Sidebar";
import Chat from "./Chat";
import MessageBox from "./MessageBox";
import DiagnoseSubmit from "./DiagnoseSubmit";
import Notes from "./Notes";
import ClinicInfo from "./ClinicInfo";
import { getCaseInfo } from "../../actions/chat";
import ReactMomentCountDown from "react-moment-countdown";
import moment from "moment";
import { useElapsedTime } from "use-elapsed-time";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

// Modals
import DiagnosisResult from "./DiagnosisResult";
import CaseFeedback from "./../modals/CaseFeedbackModal";

import "./Practice.css";

const Practice = ({
  getCurrentProfile,
  getCaseInfo,
  hideDiagnosisResult,
  hideCaseFeedBack,
  auth: { user },
  loading,
  match,
  chat: {
    showDiagnosisResult,
    showCaseFeedback,
    showLoading,
    caseInfo,
    isBotThinking,
  },
}) => {
  const duration = 10; // countdown duration in secsonds
  const [options, setOptions] = useState();

  const { elapsedTime, reset } = useElapsedTime(true, options);

  const caseId = match.params.id;
  const [startDate, setStartDate] = useState("2015-04-19");

  useEffect(() => {
    getCaseInfo(caseId);
    // console.log("Case info" , caseId  , caseInfo , getCaseInfo)
  }, [getCaseInfo, caseId]);

  useEffect(() => {
    if (caseInfo && caseInfo.length) {
      let time = moment(caseInfo[0].case_created).unix();
      var now = moment(new Date()); //todays date
      //    var end = moment("2015-12-1"); // another date
      var duration = moment.duration(now.diff(time));

      reset(duration._milliseconds / 1000);
      console.log(duration, caseInfo, "Case information");
    }
  }, [caseInfo]);
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showClinicInfo, setShowClinicInfo] = useState(false);

  const handleShowEndDialog = () => {
    setShowEndDialog(true);
  };

  const handleCloseEndDialog = () => {
    setShowEndDialog(false);
  };

  const handleShowNotes = () => {
    setShowNotes(true);
  };
  const handleShowClinicInfo = () => {
    setShowClinicInfo(true);
  };
  const handleCloseClinicInfo = () => {
    setShowClinicInfo(false);
  };
  const handleCloseNotes = () => {
    setShowNotes(false);
  };

  const handleCloseDiagnosisResult = () => {
    hideDiagnosisResult();
  };
  const handleCloseCaseFeedback = () => {
    hideCaseFeedBack();
  };
  const confirmEnd = () => {
    // ()
    confirmAlert({
      message: "Are you sure you want to end case?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleShowEndDialog(),
        },
        {
          label: "No",
          //   onClick: () => alert('Click No')
        },
      ],
    });
  };
  return loading === null || user == null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="case-main-container">
        <div className="row case-wrapper no-padding">
          <div className="col-2-cust case-col-left dashboard-width">
            <Sidebar />
          </div>
          <div className="col-4-cust no-padding">
            {caseInfo && (
              <div className="case-information">
                <div className="case-nav-top">
                  <div className="user-info-wrapper">
                    <div className="user-info-img">
                      <img
                        src="/assets/images/chat.png"
                        className="img img-responsive"
                        width="50"
                        height="50"
                      />
                    </div>
                    <div className="user-info-right pl-3">
                      <div className="uinfo-name">{caseInfo[0].case_name}</div>
                      <div className="uinfo-btm">
                        {caseInfo[0].case_department}
                      </div>
                    </div>
                    <div className="uinfo-right pt-1">
                      <div className="label">{caseInfo[0].case_difficulty}</div>
                    </div>
                  </div>
                </div>
                <div className="alert alert-warning alert-custom">
                  {caseInfo[0].case_description}
                  <br />
                </div>
              </div>
            )}
            <Chat
              caseID={caseId}
              showNotes={showNotes}
              showClinicInfo={showClinicInfo}
            />

            {showNotes && (
              <Notes
                handleCloseNotes={() => handleCloseNotes()}
                caseID={caseId}
              />
            )}

            {showClinicInfo && (
              <ClinicInfo handleCloseInfo={() => handleCloseClinicInfo()} />
            )}

            {!showNotes && !showClinicInfo && (
              <div className="footer-btn">
                <div className="left-btn-ftr">
                  <div
                    className="action-btn-ftr"
                    onClick={() => handleShowNotes()}
                  >
                    <i className="fa fa-sticky-note-o icon-custom"></i>
                    Notes
                  </div>
                </div>
                <div className="right-btn-ftr">
                  <div
                    className="action-btn-ftr action-btn-right"
                    onClick={() => handleShowClinicInfo()}
                  >
                    <i
                      className="fa fa-info-circle icon-custom"
                      aria-hidden="true"
                    ></i>
                    Clinical Info
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="col-5-cust no-padding">
            <div className="image-bg full-extend">
              {caseInfo[0].case_name == "Brian Montgomery" ? (
                <img src="/assets/images/BrianM.jpeg" className="full-extend" />
              ) : (
                ""
              )}
              {caseInfo[0].case_name == "Judith Palfrey" ? (
                <img
                  src="/assets/images/JudithPalfrey.jpeg"
                  className="full-extend"
                />
              ) : (
                <img src="/assets/images/lady.png" className="full-extend" />
              )}
            </div>

            {caseInfo && (
              <MessageBox
                caseID={caseId}
                user={user}
                showLoading={showLoading}
                sessionId={caseInfo[0].sessionid}
              />
            )}
            <div className="end-btn">
              <div className="end-btn-label" onClick={() => confirmEnd()}>
                End
              </div>
              {/* <Moment format="hh:mm:ss" from="2015-04-19" interval={1000} fromNow></Moment> */}
            </div>
            <div className="chat-timer">
              {moment.utc(elapsedTime.toFixed(2) * 1000).format("HH:mm:ss")}
            </div>
          </div>
        </div>
      </div>
      <DiagnoseSubmit
        caseID={caseId}
        sessionId={caseInfo ? caseInfo[0].sessionid : "0"}
        showEndDialog={showEndDialog}
        handleCloseEndDialog={handleCloseEndDialog}
      />

      <CaseFeedback
        caseId={caseId}
        sessionId={caseInfo ? caseInfo[0].sessionid : "0"}
        // showCaseFeedback={showCaseFeedback}
        showCaseFeedback={false}
        handleCloseCaseFeedback={handleCloseCaseFeedback}
      />
      <DiagnosisResult
        showDiagnosisResult={showDiagnosisResult}
        handleCloseDiagnosisResult={handleCloseDiagnosisResult}
      />
    </Fragment>
  );
};

Practice.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getCaseInfo: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  hideDiagnosisResult: PropTypes.func.isRequired,
  hideCaseFeedBack: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  hideDiagnosisResult,
  getCaseInfo,
  hideCaseFeedBack,
})(Practice);
