import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Moment from "react-moment";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import { getCases } from "../../actions/dashboard";
import VideoTileModal from "../modals/TrainingVideo";
import CaseCompleted from "../modals/caseCompleted";

const Dashboard = ({
  getCases,
  auth: { user },
  loading,
  case: { cases, casesLoading },
}) => {
  const [modalShow, setModalShow] = React.useState(false);
  const src = "/assets/images/play.png";
  const srcOnHover = "/assets/images/play_2.png";
  const findImg = (name) => {
    switch(name){
      case "Brian Montgomery":
        return "/assets/images/BrianM.jpeg"
      case "Judith Palfrey":
        return "/assets/images/JudithPalfrey.jpeg"
      default:
        return "/assets/images/lady.png"
    }
  }

  useEffect(() => {
    getCases();
  }, [getCases]);

  return loading === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="case-main-container">
        <div className="row case-wrapper no-padding">
          <div className="col-2-cust case-col-left dashboard-width">
            <Sidebar />
          </div>
          <div className="col-10-cust no-padding add-padding" id="style-10">
            <div className="row card-wrapper-whole">
              <div className="col-md-6 col-lg-4 col-xl-3 container-body no-padding">
                <div className="card-mini card-grey-bg">
                  <div className="div-training">Training Video</div>
                  <div className="div-training-desc">
                    Lean how to use Humaine's simulator!
                  </div>

                  <div className="div-training-img">
                    <img
                      className="div-training-pic"
                      src={src}
                      onClick={() => setModalShow(true)}
                      alt="rover"
                      onMouseOver={(e) => {
                        srcOnHover && (e.currentTarget.src = srcOnHover);
                      }}
                      onMouseOut={(e) => {
                        srcOnHover && (e.currentTarget.src = src || "");
                      }}
                    />
                  </div>
                </div>
              </div>

              {casesLoading && <Spinner />}
              {cases.map(function (caseItem, i) {
                let colorClass = "card-blue-bg";
                let tagClass = "";
                if (caseItem.user_cases.length > 0) {
                  if (caseItem.user_cases[0].status == "in_progress") {
                    colorClass = "card-green-bg";
                  }
                }
                if (caseItem.case_difficulty == "BETA") {
                  tagClass = "lbl-hard";
                } else if (caseItem.case_difficulty == "Moderate") {
                  tagClass = "lbl-medium";
                } else {
                  tagClass = "lbl-easy";
                }

                return (
                  <div
                    className="col-md-6 col-lg-4 col-xl-3 container-body no-padding"
                    key={caseItem.id}
                  >
                    <div
                      className={"card " + colorClass}
                      style={{ height: "50vh" }}
                    >
                      <div className={"status-label " + tagClass}>
                        {caseItem.case_difficulty}
                      </div>
                      <div className="card-header-fit">
                        <img
                          src={findImg(caseItem.case_name)}
                          alt="rover"
                        />
                      </div>
                      <div className="card-body">
                        <div className="main-card-head">
                          {caseItem.case_name}
                        </div>
                        <Link to={"/cases/support/" + caseItem.id}>
                          <div className="card-heading-text">
                            <span className="tag tag-teal mb-5">
                              {caseItem.case_department}
                            </span>
                            <p>{caseItem.case_description}</p>
                          </div>
                        </Link>
                      </div>
                      <div className="card-body-bottom">
                        {/* <div className="btm-image">
                          <img
                            src="/assets/images/play.png"
                            className="play-btn-resp"
                            alt="rover"
                          />
                        </div> */}
                        <div className="score-info-wrapper">
                          <table>
                            <tbody>
                              <tr className="tr-header">
                                <th>{caseItem.user_cases.length}</th>
                                {/* <th>{caseItem.score}</th> */}
                              </tr>
                              <tr className="tr-data">
                                <td>Attempts</td>
                                {/* <td>Best Score</td> */}
                              </tr>
                              <tr>
                                {/* <td className="tr-scorecard" colSpan="2">
                                  Scorecards
                                </td> */}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <VideoTileModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              ></VideoTileModal>
              <CaseCompleted></CaseCompleted>
              {/* <div className="col-md-6 col-lg-4 col-xl-3 container-body no-padding">
                                
                                <div className="card card-blue-bg">
                                    <div className="status-label lbl-hard">Hard</div>
                                    <div className="card-header-fit">
                                        <img src="http://localhost:3000/assets/images/user3.jpg" alt="rover" />
                                    </div>
                                    <div className="card-body">
                                        <div className="main-card-head">Mr. Brian Montgomery</div>
                                        <Link to="/cases/support/5">
                                        <div className="card-heading-text">
                                            <span className="tag tag-teal mb-5">Cardiology</span>
                                            <p>You are asked to see this man who is complaining of abdominal pain. Please take a full history with a view to making a diagnosis.</p>
                                        </div>
                                        </Link>
                                    </div>
                                    <div className="card-body-bottom">
                                        <div className="btm-image">
                                            <img src="http://localhost:3000/assets/images/play.png" alt="rover" />
                                        </div>
                                        <div className="score-info-wrapper">
                                            <table>
                                                <tr className="tr-header">
                                                    <th>2</th>
                                                    <th>68%</th>
                                                </tr>
                                                <tr className="tr-data">
                                                    <td>Attempts</td>
                                                    <td>Best Score</td>
                                                </tr>
                                                <tr >
                                                    <td className="tr-scorecard" colSpan="2">Scorecards</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                    
                            </div>
                            <div className="col-md-6 col-lg-4 col-xl-3 container-body no-padding">
                                
                                <div className="card card-green-bg">
                                    <div className="status-label">Easy</div>
                                    <div className="card-header-fit">
                                        <img src="http://localhost:3000/assets/images/user4.png" alt="rover" />
                                    </div>
                                    <div className="card-body">
                                        <div className="main-card-head">Mr. Brian Montgomery</div>
                                        <Link to="/cases/support/5">
                                        <div className="card-heading-text">
                                            <span className="tag tag-teal mb-5">Cardiology</span>
                                            <p>You are asked to see this man who is complaining of abdominal pain. Please take a full history with a view to making a diagnosis.</p>
                                        </div>
                                        </Link>
                                    </div>
                                    <div className="card-body-bottom">
                                        <div className="btm-image">
                                            <img src="http://localhost:3000/assets/images/play.png" alt="rover" />
                                        </div>
                                        <div className="score-info-wrapper">
                                            <table>
                                                <tr className="tr-header">
                                                    <th>2</th>
                                                    <th>68%</th>
                                                </tr>
                                                <tr className="tr-data">
                                                    <td>Attempts</td>
                                                    <td>Best Score</td>
                                                </tr>
                                                <tr >
                                                    <td className="tr-scorecard" colSpan="2">Scorecards</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                    
                            </div>

                            <div className="col-md-6 col-lg-4 col-xl-3 container-body no-padding">
                                
                                <div className="card card-green-bg">
                                    <div className="status-label">Easy</div>
                                    <div className="card-header-fit">
                                        <img src="http://localhost:3000/assets/images/user4.png" alt="rover" />
                                    </div>
                                    <div className="card-body">
                                        <div className="main-card-head">Mr. Brian Montgomery</div>
                                        <Link to="/cases/support/5">
                                        <div className="card-heading-text">
                                            <span className="tag tag-teal mb-5">Cardiology</span>
                                            <p>You are asked to see this man who is complaining of abdominal pain. Please take a full history with a view to making a diagnosis.</p>
                                        </div>
                                        </Link>
                                    </div>
                                    <div className="card-body-bottom">
                                        <div className="btm-image">
                                            <img src="http://localhost:3000/assets/images/play.png" alt="rover" />
                                        </div>
                                        <div className="score-info-wrapper">
                                            <table>
                                                <tr className="tr-header">
                                                    <th>2</th>
                                                    <th>68%</th>
                                                </tr>
                                                <tr className="tr-data">
                                                    <td>Attempts</td>
                                                    <td>Best Score</td>
                                                </tr>
                                                <tr >
                                                    <td className="tr-scorecard" colSpan="2">Scorecards</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                    
                            </div>

                            <div className="col-md-6 col-lg-4 col-xl-3 container-body no-padding">
                                
                                <div className="card card-blue-bg">
                                    <div className="status-label lbl-easy">Easy</div>
                                    <div className="card-header-fit">
                                        <img src="http://localhost:3000/assets/images/user.png" alt="rover" />
                                    </div>
                                    <div className="card-body">
                                        <div className="main-card-head">Mr. Brian Montgomery</div>
                                        <Link to="/cases/support/5">
                                        <div className="card-heading-text">
                                            <span className="tag tag-teal mb-5">Cardiology</span>
                                            <p>You are asked to see this man who is complaining of abdominal pain. Please take a full history with a view to making a diagnosis.</p>
                                        </div>
                                        </Link>
                                    </div>
                                    <div className="card-body-bottom">
                                        <div className="btm-image">
                                            <img src="http://localhost:3000/assets/images/play.png" alt="rover" />
                                        </div>
                                        <div className="score-info-wrapper">
                                            <table>
                                                <tr className="tr-header">
                                                    <th>2</th>
                                                    <th>68%</th>
                                                </tr>
                                                <tr className="tr-data">
                                                    <td>Attempts</td>
                                                    <td>Best Score</td>
                                                </tr>
                                                <tr >
                                                    <td className="tr-scorecard" colSpan="2">Scorecards</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                    
                            </div>
                            <div className="col-md-6 col-lg-4 col-xl-3 container-body no-padding">
                                
                                <div className="card card-blue-bg">
                                    <div className="status-label lbl-medium">Medium</div>
                                    <div className="card-header-fit">
                                        <img src="http://localhost:3000/assets/images/user2.jpeg" alt="rover" />
                                    </div>
                                    <div className="card-body">
                                        <div className="main-card-head">Mr. Brian Montgomery</div>
                                        <Link to="/cases/support/5">
                                        <div className="card-heading-text">
                                            <span className="tag tag-teal mb-5">Cardiology</span>
                                            <p>You are asked to see this man who is complaining of abdominal pain. Please take a full history with a view to making a diagnosis.</p>
                                        </div>
                                        </Link>
                                    </div>
                                    <div className="card-body-bottom">
                                        <div className="btm-image">
                                            <img src="http://localhost:3000/assets/images/play.png" alt="rover" />
                                        </div>
                                        <div className="score-info-wrapper">
                                            <table>
                                                <tr className="tr-header">
                                                    <th>2</th>
                                                    <th>68%</th>
                                                </tr>
                                                <tr className="tr-data">
                                                    <td>Attempts</td>
                                                    <td>Best Score</td>
                                                </tr>
                                                <tr >
                                                    <td className="tr-scorecard" colSpan="2">Scorecards</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                    
                            </div>
                            <div className="col-md-6 col-lg-4 col-xl-3 container-body no-padding">
                                
                                <div className="card card-blue-bg">
                                    <div className="status-label lbl-hard">Hard</div>
                                    <div className="card-header-fit">
                                        <img src="http://localhost:3000/assets/images/user3.jpg" alt="rover" />
                                    </div>
                                    <div className="card-body">
                                        <div className="main-card-head">Mr. Brian Montgomery</div>
                                        <Link to="/cases/support/5">
                                        <div className="card-heading-text">
                                            <span className="tag tag-teal mb-5">Cardiology</span>
                                            <p>You are asked to see this man who is complaining of abdominal pain. Please take a full history with a view to making a diagnosis.</p>
                                        </div>
                                        </Link>
                                    </div>
                                    <div className="card-body-bottom">
                                        <div className="btm-image">
                                            <img src="http://localhost:3000/assets/images/play.png" alt="rover" />
                                        </div>
                                        <div className="score-info-wrapper">
                                            <table>
                                                <tr className="tr-header">
                                                    <th>2</th>
                                                    <th>68%</th>
                                                </tr>
                                                <tr className="tr-data">
                                                    <td>Attempts</td>
                                                    <td>Best Score</td>
                                                </tr>
                                                <tr >
                                                    <td className="tr-scorecard" colSpan="2">Scorecards</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                    
                            </div>
                                 */}
            </div>
          </div>
          {/* <div className="col-3 no-padding">
                        <div className="text-center">
                            <img src="http://localhost:3000/assets/images/user.png" />
                            <p className="name-style">
                                <span>{user && user.title}</span>&nbsp;<span>{user && user.name}</span>
                            </p>
                            <table className="table table-stripped table-style-custom">
                                <tbody>
                                    <tr>
                                        <th width="30%">Email</th><td>{user && user.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Institution</th><td>{user && user.institution}</td>
                                    </tr>
                                    <tr>
                                        <th>Training Level</th><td>{user && user.level_of_training}</td>
                                    </tr>
                                    <tr>
                                        <th>Country</th><td>{user && user.country}</td>
                                    </tr>
                                    <tr>
                                        <th>Date of birth</th><td><Moment format="DD-MM-YYYY">{user && user.date_of_birth}</Moment></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                     */}
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getCases: PropTypes.func.isRequired,
  case: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  case: state.dashboard,
});

export default connect(mapStateToProps, { getCases })(Dashboard);
