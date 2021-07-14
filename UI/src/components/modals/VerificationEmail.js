import React, { Fragment, useState, useCallback, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Checkmark from "./assets/images/checkmark.svg";

const VerificationEmail = ({
  showVerification,
  handleClose,
  handleCloseRegister,
}) => {
  if (showVerification) handleCloseRegister();
  return (
    <Fragment>
      <Modal show={showVerification} size="lg">
        <Modal.Body>
          <div className="row">
            <div className="col-lg-12 text-center">
              <div>
                <img src={Checkmark} className="title text-center mt-4" />
                <h2 className="title text-center mt-1">
                  Verification Email Sent!!
                </h2>
                <p className=" text-center mt-1">
                  Please click on the link that has just been sent to your email
                  to complete the registration process.
                </p>
                <span className="close-btn" onClick={() => handleClose()}>
                  X
                </span>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default VerificationEmail;
