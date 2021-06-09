import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { clearAlert, setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import {
  feedbackSubmitted,
  handleCloseCaseCompleted,
} from "../../actions/dashboard";
import { ReactTypeformEmbed } from "react-typeform-embed";

const CaseCompleted = ({
  showCaseCompleted,
  handleCloseCaseCompleted,
  feedbackSubmitted,
}) => {
  const [beingSaved, setBeingSaved] = useState(false);
  const [typeformEmbed, setTypeformEmbed] = useState(false);
  return (
    <Fragment>
      {/* {showCaseCompleted && (<ReactTypeformEmbed */}
      {false && (
        <ReactTypeformEmbed
          popup
          autoOpen={true}
          url="https://38ti4g7ro2d.typeform.com/to/HdGxpP1J"
          hideHeaders
          hideFooter
          buttonText="Go!"
          style={{ display: "none" }}
          ref={(tf) => {
            setTypeformEmbed(tf);
          }}
        ></ReactTypeformEmbed>
      )}
    </Fragment>
  );
};

CaseCompleted.propTypes = {
  showCaseCompleted: PropTypes.bool.isRequired,
  handleCloseCaseCompleted: PropTypes.func.isRequired,
  feedbackSubmitted: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  showCaseCompleted: state.dashboard.allCasesCompleted,
});

export default connect(mapStateToProps, {
  feedbackSubmitted,
  handleCloseCaseCompleted,
})(CaseCompleted);
