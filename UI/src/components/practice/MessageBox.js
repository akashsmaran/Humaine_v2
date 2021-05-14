import React, { useState, useRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import { ReactMic } from "@cleandersonlobo/react-mic";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

import { sendMessage } from '../../actions/chat';
import { useEffect } from 'react';

import { fromEvent, interval, Observable, rxjs } from 'rxjs';
import { filter, map, debounceTime, throttle, distinctUntilChanged } from 'rxjs/operators';
import { BehaviorSubject } from "rxjs/Rx";


import useEventListener from '@use-it/event-listener'


// import { combineLatest, of } from 'rxjs';
// import { map } from 'rxjs/operators';

const MessageBox = ({ sendMessage, caseID, sessionId, showLoading, user: { id } }) => {
    const [inputKeyUpEventsSubscription, setKeyUpEventSubscription] = useState(null);
    const [inputKeyDownEventsSubscription, setKeyDownEventSubscription] = useState(null);
    const [spacePressed, setSpacePressed] = useState(false);
    const [cancelRecording, setCancelRecording] = useState(false);
    const inputText = useRef(null);
    const ESCAPE_KEYS = ['27', 'Escape'];
    const SPACE_KEYS = ['32', ' '];


    const [formData, setFormData] = useState({
        comment: '',
        caseId: caseID,
        userId: id,
        sessionId: sessionId
    });

    const [record, toggleRecord] = useState(false);
    const { comment } = formData;
    const { transcript, resetTranscript, interimTranscript,
        finalTranscript,
        listening,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition()

    const keyDownHandler = ({ key }) => {
        //In case escape is pressed
        if (ESCAPE_KEYS.includes(String(key))) {
            console.log('Escape key pressed!');
        }
        //In case space is pressed
        if (spacePressed == false && SPACE_KEYS.includes(String(key))) {
            //Setting the space pressed to true
            setSpacePressed(true);

            //Starting recoridng
            startRecording();
            console.log('Space bar key pressed!');
        }

    }
    useEventListener('keydown', keyDownHandler);

    const keyUpHandler = ({ key }) => {
        //In case escape was pressed
        if (ESCAPE_KEYS.includes(String(key))) {
            //In case space was pressed
            if (spacePressed) {
                setCancelRecording(true);
                console.log("Canceling the recording")
            }
        }
        //In case space was pressed
        if (spacePressed == true && SPACE_KEYS.includes(String(key))) {
            //Setting the space pressed to true
            setSpacePressed(false);

            //Stopping the recording
            stopRecording();

            console.log('Space bar key up pressed!');
        }

    }
    useEventListener('keyup', keyUpHandler);

    useEffect(() => {
        //Keyboard eveents 
        // setInterval(function(){ console.log("Listening state right now " , listening )} , 3000 )
        //In case the system stopped listening 
        if (record && listening == false) {
            //We have to stop listening
            stopRecording();
            console.log("Stop listening", listening);

        }
    }, [listening])


    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            //Enter key pressed
            console.log(formData);

            sendChatMessage(formData);
            inputText.current.value = ""
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
            () => {
                if (cancelRecording) {
                    setCancelRecording(false);
                    resetTranscript();
                    // clearState();        
                    return;
                }

                sendVoiceChatMessage(transcript)
            },
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
        // const voiceData = {
        //     comment: message,
        //     caseId: caseID,
        //     userId: id,
        //     sessionId: sessionId
        // }

        if (message.trim() != "") {
            setFormData({ ...formData, comment: message });
            inputText.current.value = message;
            // sendMessage(voiceData);
            resetTranscript();
            // clearState();
        }
    }

    const onSubmit = e => {
        e.preventDefault();

        sendChatMessage(formData);
    };

    const clearState = () => {
        setFormData({ ...formData, comment: '' });
    }

    const toggleRecording = () => {
        if (record) {
            stopRecording();
        } else {
            startRecording();
        }
    }

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });


    //Linking space pressed to recording 
    const bindToButton = () => {
        spacePressed.subscribe(function (e) {
            console.log("It seems to me like space has changed its value", e);
        })
    }
    return (
        <Fragment>
            {transcript != "" ? inputText.current.value = transcript : false}
            <div className="btm-action-right-wrapper">
                {/* removed the below code so that transcript doesnt appear twice */}
                {/* <div className="msg-trans mb-4">{transcript}</div> */}
                <div className="main-controls">
                    <div className="ctrl-left">
                        <div className="q-help">?</div>
                    </div>
                    <div className="ctrl-center ">

                        <input
                            type="text"
                            className={"ctrl-text-area usid " + (listening ? "glowing" : "")}
                            name="comment"
                            // value={comment}
                            disabled={(showLoading) ? "disabled" : ""}
                            onChange={e => onChange(e)}
                            onKeyDown={e => handleKeyDown(e)}
                            ref={inputText}
                            placeholder="Hold spacebar to talk, or type your response here"
                        />
                    </div>
                    <div className="ctrl-right">
                        <div>
                            <span className={"ml-2 mt-2 fa-adjust fa fa-microphone " + (listening ? 'recording-class' : '')} onClick={e => toggleRecording()}></span>
                        </div>

                        <div><span className={"ml-2 mt-2 fa-adjust-bell fa fa-bell " + (listening ? "red" : "green")}></span></div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

MessageBox.propTypes = {
    sendMessage: PropTypes.func.isRequired,
};

export default connect(null, { sendMessage })(
    MessageBox
);