import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { clearAlert, setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { stepsSubmitted } from "../../actions/chat";
import { ReactTypeformEmbed } from "react-typeform-embed";

const CaseFeedback = ({
  caseId,
  sessionId,
  showCaseFeedback,
  handleCloseCaseFeedback,
  stepsSubmitted,
}) => {
  const [beingSaved, setBeingSaved] = useState(false);
  const [typeformEmbed, setTypeformEmbed] = useState(false);

  return (
    <Fragment>
      {showCaseFeedback && (
        <ReactTypeformEmbed
          popup
          autoOpen={true}
          url="https://38ti4g7ro2d.typeform.com/to/HdGxpP1J"
          hideHeaders
          hideFooter
          onSubmit={() => {
            setTimeout(() => {
              stepsSubmitted({ caseId: caseId, sessionId: sessionId });
            }, 6000);
          }}
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

CaseFeedback.propTypes = {
  showCaseFeedback: PropTypes.bool.isRequired,
  handleCloseCaseFeedback: PropTypes.func.isRequired,
  stepsSubmitted: PropTypes.func.isRequired,
};
// const mapStateToProps = state => ({
//     showCaseFeedback: PropTypes.bool.isRequired,
//     handleCloseCaseFeedback: PropTypes.func.isRequired,
//     stepsSubmitted : PropTypes.func.isRequired

// });

export default connect(null, { stepsSubmitted })(CaseFeedback);
