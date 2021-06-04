import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import { ReactMic } from "@cleandersonlobo/react-mic";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

import { sendMessage } from '../../actions/chat';
import { useEffect } from 'react';

const MessageBox = ({ sendMessage, caseID, sessionId, showLoading, user: { id } }) => {
    
    const [formData, setFormData] = useState({
        comment: '',
        caseId: caseID,
        userId: id,
        sessionId: sessionId
    });

    const [record, toggleRecord] = useState(false);

    const { comment } = formData;
    const { transcript, resetTranscript } = useSpeechRecognition()

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }

    const handleKeyDown = (event) => {
        if(event.keyCode === 13) {
            //Enter key pressed
            console.log(formData);
            sendChatMessage(formData);
        }
        if (event.keyCode === 0 || event.keyCode === 32) {
            console.log('CKLCIKED');
        }
    }

    const startRecording = () => {
        toggleRecord(true);
        SpeechRecognition.startListening();
    }
    
    const stopRecording = () => {
        toggleRecord(false);
        SpeechRecognition.stopListening();
        setTimeout(
            () => sendVoiceChatMessage(transcript), 
            2000
          );
    }
     
    const sendChatMessage = (formData) => {
        if (comment.trim() != "") {
            sendMessage(formData)
            clearState();
        }
    }
         
    const sendVoiceChatMessage = (message) => {
        console.log(message);
        const voiceData = {
            comment: message,
            caseId: caseID,
            userId: id,
            sessionId: sessionId
        }
        if(message.trim() != "") {
            sendMessage(voiceData);
            resetTranscript();
            clearState();
        }
    }

    const onSubmit = e => {
        e.preventDefault();
        sendChatMessage(formData);
    };

    const clearState = () => {
        setFormData({...formData, comment : ''});
    }

    const toggleRecording = () => {
        if(record) {
            stopRecording();
        }else {
            startRecording();
        }
    }

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });


    return (
        <Fragment>
            <div className="btm-action-right-wrapper">
                <div className="msg-trans mb-4">{transcript}</div>
                <div className="main-controls">
                    <div className="ctrl-left">
                        <div className="q-help">?</div>
                    </div>
                    <div className="ctrl-center">
                        
                        <input
                            type="text" 
                            className="ctrl-text-area"
                            name="comment"
                            value={comment}
                            disabled={ (showLoading) ? "disabled" : ""}
                            onChange={e => onChange(e)}
                            onKeyDown={e => handleKeyDown(e)}
                            placeholder="Hold spacebar to talk to the patient, or type your response here"
                        / >
                        
                    </div>
                    <div className="ctrl-right">
                        <div>
                            <span className={"ml-2 mt-2 fa-adjust fa fa-microphone " + (record ? 'recording-class' : '')} onClick={e => toggleRecording()}></span>
                            
                        </div>

                        <div><span className="ml-2 mt-2 fa-adjust-bell fa fa-bell "></span></div>
                    </div>
                </div>      
            </div>
        </Fragment>
    );
};

MessageBox.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};

export default connect(null, {sendMessage})(
    MessageBox
);
