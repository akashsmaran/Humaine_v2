import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ForgetPasswordAlert = ({ forgetPasswordAlerts }) =>
    forgetPasswordAlerts !== null &&
    forgetPasswordAlerts.length > 0 &&
    forgetPasswordAlerts.map(forgetPasswordAlert => (
    <div key={forgetPasswordAlert.id} className={`alert alert-${forgetPasswordAlert.alertType}`}>
      {forgetPasswordAlert.msg}
    </div>
  ));

ForgetPasswordAlert.propTypes = {
  forgetPasswordAlerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    forgetPasswordAlerts: state.forgetPasswordAlert
});

export default connect(mapStateToProps)(ForgetPasswordAlert);
