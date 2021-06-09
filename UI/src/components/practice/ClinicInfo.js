import React, { Fragment, useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { clearAlert, setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { getNotes, } from '../../actions/note';
import Spinner from '../layout/Spinner';

const ClinicInfo = ({   handleCloseInfo }) => {      
    return (
        <Fragment>
            <div className="notes-btn">
                {/* <div className="left-btn-ftr-notes">
                    <div className="action-btn-ftr radius-updated"><i className="fa fa-sticky-note-o icon-custom"></i>Notes</div> 
                </div>
                <div className="middle-btn-notes" onClick={() => handleCloseInfo()}> X </div>
                <div className="right-btn-ftr-notes">
                    <div className="action-btn-ftr action-btn-right radius-updated-right"><i className="fa fa-comments-o icon-custom" aria-hidden="true"></i>Discussion Board</div>
                </div> */}
                <div className="left-btn-ftr-notes">
                    <div className="action-btn-ftr-full">
                        <i className="fa fa-sticky-note-o icon-custom"></i>Clinic Information 
                        <span className="close-notes" onClick={() => handleCloseInfo()}> X </span></div> 
            
                </div>

            </div>
            <div className="notes-show"id="style-11">
                <div className="notes-area" >
                <img width="50%" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdeexZueqUtzKW5lcJbgqv8CcqjfVfgW_GfQ&usqp=CAU"></img> 
                
                <img width="50%" src="https://image.shutterstock.com/image-photo/photo-human-neck-xray-image-260nw-1709523037.jpg"></img> 

                </div>
            </div>
        </Fragment>
    );
};

ClinicInfo.propTypes = {
    handleCloseInfo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {})(ClinicInfo);
