import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { clearAlert, setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import ReactPlayer from "react-player/lazy";

const VideoTileModal = ({ show, onHide }) => {
  const [beingSaved, setBeingSaved] = useState(false);

  return (
    <Fragment>
      <Modal show={show} size="lg">
        <Modal.Body>
          <div className="row">
            <div className="col-lg-12 ">
              <div>
                <h3 className="title mt-4">Video Tutorials</h3>
                <span className="close-btn" onClick={() => onHide()}>
                  X
                </span>
              </div>

              <div className="video-container p-2">
                <ReactPlayer
                  className="react-player"
                  url="https://www.youtube.com/watch?v=dXLqYAu_uwE"
                  style={{ width: "90%" }}
                />

                {/* End of Next step section */}
                {/* <button className="btn-lg  mt-4 mb-2 btn btn-warning btn-yellow" >
                                    { beingSaved && (
                                        <span>
                                            Submitting
                                            <img className="modalsLoader" src="/assets/images/loader.gif" />
                                        </span>
                                    ) }
                                    {!beingSaved  && (
                                        'Submit Steps'
                                    )}
                                </button> */}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

VideoTileModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};
// const mapStateToProps = state => ({
//     show: PropTypes.bool.isRequired,
//     onHide: PropTypes.func.isRequired,
//     stepsSubmitted : PropTypes.func.isRequired

// });

export default connect(null, null)(VideoTileModal);
