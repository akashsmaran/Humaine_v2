import React, { Fragment, useState , useCallback , useEffect} from 'react';
import { connect } from 'react-redux';
import { clearAlert, setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { Modal } from "react-bootstrap";
import {Redirect} from "react-router-dom";
import {updateProfileInfo} from '../../actions/profile';

const UpdateBasicProfile = ({ showupdateBasicProfile, handleCloseupdateBasicProfile , updateProfileInfo , auth: { user } }) => {
    const [beingSaved , setBeingSaved] = useState(false);
    const [inputs,setInputs] = useState({});
    const [inputErrors , setInputErrors] = useState({});
    const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    const [message , setMessage] = useState(false);

    useEffect(()=>{
        console.log("modal fUser info " , user)
        if(user){
            let temp = {
                name :  user.name,
                email :  user.email ,
                institution :  user.institution ,
                country : user.country ,
                gender : user.gender,
                dateOfBirth : (user && user.date_of_birth  ) ? user.date_of_birth.split("T")[0] : ' ',
                levelOftraining :  user.level_of_training
            }
            setInputs(temp);
        }
    } , [user]);
    const onChangeHandler = useCallback(
        ({target:{name,value}}) => {
            setInputs(state => ({ ...state, [name]:value }), []);
            let errors = inputErrors;
  
            switch (name) {
              case 'name': 
                errors.name = 
                  value.length < 3
                    ? 'Name must be 3 characters long!'
                    : '';
                break;
              case 'email': 
                errors.email = 
                  validEmailRegex.test(value)
                    ? ''
                    : 'Email is not valid!';
                break;
              default:
                break;
            }
        
            setInputErrors(errors);
          }
      );

      const updateBasicProfileInfo = async ()=>{
        try{
            setBeingSaved(true);
            await updateProfileInfo(inputs);
            setMessage("Profile updated successfully")
        }catch(err){
            setMessage("Something went wrong while updating profile")
        }finally{
            setBeingSaved(false);
            setTimeout(()=>{
                setMessage(false);
            } , 5000);
        }
      }
    return (
        <Fragment>
            <Modal show={showupdateBasicProfile} size="lg">
                <Modal.Body>
                    <div className="row">
                        <div className="col-lg-12 ">
                            <div>
                                <h3 className="title mt-4">Update Basic Profile Info</h3>
                                <span className="close-btn" onClick={() => handleCloseupdateBasicProfile()}>X</span>
                            </div>

                            <div className="form-wrapper p-2">
                          

                                <div className="form-group{{ $errors->has('current-password') ? ' has-error' : '' }}">
                                    <label htmlFor="name" className="col-md-4 control-label">Name</label>
                                    <div className="col-md-12">
                                        <input type="text" className="form-control" name="name" onChange={onChangeHandler} value={inputs.name || ''} required />
                                        {inputErrors && inputErrors.name && inputErrors.name.length > 0 &&
                                            ( <span className="help-block">
                                                <strong>{inputErrors.name}</strong>
                                            </span> )}
                                    </div>
                                </div>

                                <div className="form-group{{ $errors->has('current-password') ? ' has-error' : '' }}">
                                    <label htmlFor="name" className="col-md-4 control-label">Gender</label>
                                    <div className="col-md-12">
                                        <select className="form-control" name="gender" onChange={onChangeHandler} value={inputs.gender || ''} >
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group{{ $errors->has('current-password') ? ' has-error' : '' }}">
                                    <label htmlFor="name" className="col-md-4 control-label">Date of Birth</label>
                                    <div className="col-md-12">
                                        <input type='date' className="form-control" name="dateOfBirth" onChange={onChangeHandler} value={inputs.dateOfBirth || ''} />
                                    </div>
                                </div>



                                <div className="form-group{{ $errors->has('current-password') ? ' has-error' : '' }}">
                                    <label htmlFor="email" className="col-md-4 control-label">Email</label>
                                    <div className="col-md-12">
                                        <input type="text" className="form-control" name="email" onChange={onChangeHandler} value={inputs.email || ''} required disabled />
                                        {inputErrors && inputErrors.email && inputErrors.email.length > 0 &&
                                            ( <span className="help-block">
                                                <strong>{inputErrors.email}</strong>
                                            </span> )}
                                    </div>
                                </div>

                                <div className="form-group{{ $errors->has('current-password') ? ' has-error' : '' }}">
                                    <label htmlFor="institution" className="col-md-4 control-label">Institution</label>
                                    <div className="col-md-12">
                                        <input type="text" className="form-control" name="institution" onChange={onChangeHandler} value={inputs.institution || ''} required />
                                        {inputErrors && inputErrors.institution && inputErrors.name.length > 0 &&
                                            ( <span className="help-block">
                                                <strong>{inputErrors.institution}</strong>
                                            </span> )}
                                    </div>
                                </div>

                                <div className="form-group{{ $errors->has('current-password') ? ' has-error' : '' }}">
                                    <label htmlFor="institution" className="col-md-4 control-label">Level of Training</label>
                                    <div className="col-md-12">
                                        <input type="text" className="form-control" name="levelOftraining" onChange={onChangeHandler} value={inputs.levelOftraining || ''}  />
                                    </div>
                                </div>


                                <div className="form-group{{ $errors->has('current-password') ? ' has-error' : '' }}">
                                    <label htmlFor="new-password" className="col-md-4 control-label">Country</label>
                                    <div className="col-md-12">
                                        <input type="text" className="form-control" name="country" onChange={onChangeHandler} value={inputs.country || ''} required />
                                        {inputErrors && inputErrors.country && inputErrors.country.length > 0 &&
                                            ( <span className="help-block">
                                                <strong>{inputErrors.country}</strong>
                                            </span> )}
                                    </div>
                                </div>
                                <br/>

                                {message && (
                                    <div className={"alert "+((message+'').toLowerCase().includes('success') ? 'alert-success' : 'alert-danger') }>
                                            {message}
                                    </div>

                                )}
                                {/* End of Next step section */}
                                <button className="btn-lg  mt-4 mb-2 btn btn-warning btn-yellow" onClick={() =>updateBasicProfileInfo()}>
                                    { beingSaved && (
                                        <span>
                                            Updating
                                            <img className="modalsLoader" src="/assets/images/loader.gif" />
                                        </span>
                                    ) }
                                    {!beingSaved  && (
                                        'Update'
                                    )}
                                </button>
                                <button className="btn-lg  mt-4 mb-2 btn btn-notify text-underline" type="button" onClick={() => handleCloseupdateBasicProfile()}>
                                    <u>Or, return to the account management</u>
                                </button>
                          
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </Fragment>
    );
};

UpdateBasicProfile.propTypes = {
    showupdateBasicProfile: PropTypes.bool.isRequired,
    handleCloseupdateBasicProfile: PropTypes.func.isRequired,
    updateProfileInfo : PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  
};
const mapStateToProps = state => ({
    auth: state.auth,
    case: state.dashboard
});

export default connect(mapStateToProps, {updateProfileInfo})(UpdateBasicProfile);
