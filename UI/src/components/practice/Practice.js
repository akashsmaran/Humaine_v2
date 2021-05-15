import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getCurrentProfile } from "../../actions/profile";
import { hideDiagnosisResult } from "../../actions/chat";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar/Sidebar";
import Chat from "./Chat";
import MessageBox from "./MessageBox";
import DiagnoseSubmit from "./DiagnoseSubmit";
import Notes from "./Notes";
import DiagnosisResult from "./DiagnosisResult";
import { getCaseInfo } from "../../actions/chat";
import Moment from "react-moment";

const Practice = ({
  getCurrentProfile,
  getCaseInfo,
  hideDiagnosisResult,
  auth: { user },
  loading,
  match,
  chat: { showDiagnosisResult, showLoading, caseInfo, isBotThinking },
}) => {
  const caseId = match.params.id;
  const [startDate, setStartDate] = useState("2015-04-19");

  useEffect(() => {
    getCaseInfo(caseId);
    console.log("Case info", caseId, caseInfo, getCaseInfo);
  }, [getCaseInfo, caseId]);

  const [showEndDialog, setShowEndDialog] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const handleShowEndDialog = () => {
    setShowEndDialog(true);
  };

  const handleCloseEndDialog = () => {
    setShowEndDialog(false);
  };

  const handleShowNotes = () => {
    setShowNotes(true);
  };

  const handleCloseNotes = () => {
    setShowNotes(false);
  };

  const handleCloseDiagnosisResult = () => {
    hideDiagnosisResult();
  };

  return loading === null || user == null || caseInfo == null ? (
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
                        src="assets/images/chat.png"
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
            <Chat caseID={caseId} showNotes={showNotes} />

            {showNotes && (
              <Notes
                handleCloseNotes={() => handleCloseNotes()}
                caseID={caseId}
              />
            )}
            {!showNotes && (
              <div className="footer-btn">
                <div className="left-btn-ftr">
                  <div
                    className="action-btn-ftr"
                    onClick={() => handleShowNotes()}
                  >
                    <i className="fa fa-sticky-note-o icon-custom"></i>Notes
                  </div>
                </div>
                <div className="right-btn-ftr">
                  <div className="action-btn-ftr action-btn-right">
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
              <img
                src={require("./assets/images/lady.png")}
                className="full-extend"
              />
              {/* <img src="assets/images/lady.png" className="full-extend" /> */}
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
              <div
                className="end-btn-label"
                onClick={() => handleShowEndDialog()}
              >
                End
              </div>
              {/* <Moment format="hh:mm:ss" from="2015-04-19" interval={1000} fromNow></Moment> */}
            </div>
            <div className="chat-timer">
              <Moment
                from={caseInfo[0].case_created}
                interval={1000}
                ago
              ></Moment>
            </div>
          </div>
        </div>
      </div>
      <DiagnoseSubmit
        caseID={caseId}
        showEndDialog={showEndDialog}
        handleCloseEndDialog={handleCloseEndDialog}
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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  hideDiagnosisResult,
  getCaseInfo,
})(Practice);
