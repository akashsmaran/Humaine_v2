import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import { ReactMic } from "@cleandersonlobo/react-mic";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { sendMessage, toggleMute } from "../../actions/chat";
import { useEffect } from "react";

import { fromEvent, interval, Observable, rxjs } from "rxjs";
import {
  filter,
  map,
  debounceTime,
  throttle,
  distinctUntilChanged,
} from "rxjs/operators";
import { BehaviorSubject } from "rxjs/Rx";

import useEventListener from "@use-it/event-listener";
import ReactTooltip from "react-tooltip";
import Popup from "./hints";
// import { combineLatest, of } from 'rxjs';
// import { map } from 'rxjs/operators';

const MessageBox = ({
  chat: { messages, chatLoading, isBotThinking, isMuted },
  sendMessage,
  toggleMute,
  caseID,
  sessionId,
  showLoading,
  user: { id },
}) => {
  const [inputKeyUpEventsSubscription, setKeyUpEventSubscription] =
    useState(null);
  const [inputKeyDownEventsSubscription, setKeyDownEventSubscription] =
    useState(null);
  const [spacePressed, setSpacePressed] = useState(false);
  const [cancelRecording, setCancelRecording] = useState(false);
  const [inputFocussed, setInputFocussed] = useState(false);

  const [stepArr, setStepArr] = useState([
    "First step",
    "Second step",
    "Third step",
    "Fourth step",
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const randomIndex = (max) => {
    return Math.floor(Math.random() * (max - 0 + 1)) + 0;
  };

  useEffect(() => {
    console.log("Input focus state changed", inputFocussed);
  }, [inputFocussed]);
  const ESCAPE_KEYS = ["27", "Escape"];
  const SPACE_KEYS = ["32", " "];

  const [formData, setFormData] = useState({
    comment: "",
    caseId: caseID,
    userId: id,
    sessionId: sessionId,
  });

  const [record, toggleRecord] = useState(false);
  const { comment } = formData;
  const {
    transcript,
    resetTranscript,
    interimTranscript,
    finalTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const keyDownHandler = ({ key }) => {
    //In case escape is pressed
    if (ESCAPE_KEYS.includes(String(key))) {
      console.log("Escape key pressed!");
    }
    //In case space is pressed
    if (
      !inputFocussed &&
      spacePressed == false &&
      SPACE_KEYS.includes(String(key))
    ) {
      //Setting the space pressed to true
      setSpacePressed(true);

      //Starting recoridng
      startRecording();
      console.log("Space bar key pressed!");
    }
  };
  useEventListener("keydown", keyDownHandler);

  const keyUpHandler = ({ key }) => {
    //In case escape was pressed
    if (ESCAPE_KEYS.includes(String(key))) {
      //In case space was pressed
      if (spacePressed) {
        setCancelRecording(true);
        console.log("Canceling the recording");
      }
    }
    //In case space was pressed
    if (
      !inputFocussed &&
      spacePressed == true &&
      SPACE_KEYS.includes(String(key))
    ) {
      //Setting the space pressed to true
      setSpacePressed(false);

      //Stopping the recording
      stopRecording();

      console.log("Space bar key up pressed!");
    }
  };
  useEventListener("keyup", keyUpHandler);

  useEffect(() => {
    //Keyboard eveents
    // setInterval(function(){ console.log("Listening state right now " , listening )} , 3000 )
    //In case the system stopped listening
    if (record && listening == false) {
      //We have to stop listening
      stopRecording();
      console.log("Stop listening", listening);
    }
    //Setting the current step to some random hint
    setCurrentStep(stepArr[randomIndex(stepArr.length)]);
  }, [listening]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      //Enter key pressed
      console.log(formData);
      sendChatMessage(formData);
    }
    if (event.keyCode === 0 || event.keyCode === 32) {
      console.log("CKLCIKED");
    }
  };

  const startRecording = () => {
    toggleRecord(true);
    SpeechRecognition.startListening();
  };

  const stopRecording = () => {
    toggleRecord(false);
    SpeechRecognition.stopListening();
    setTimeout(() => {
      if (cancelRecording) {
        setCancelRecording(false);
        resetTranscript();
        // clearState();
        return;
      }

      sendVoiceChatMessage(transcript);
    }, 2000);
  };

  const sendChatMessage = (formData) => {
    if (comment.trim() != "") {
      sendMessage(formData);
      clearState();
    }
  };

  const sendVoiceChatMessage = (message) => {
    console.log(message);
    const voiceData = {
      comment: message,
      caseId: caseID,
      userId: id,
      sessionId: sessionId,
    };
    if (message.trim() != "") {
      sendMessage(voiceData);
      resetTranscript();
      clearState();
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    sendChatMessage(formData);
  };

  const clearState = () => {
    setFormData({ ...formData, comment: "" });
  };

  const toggleRecording = () => {
    if (record) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  //Linking space pressed to recording
  const bindToButton = () => {
    spacePressed.subscribe(function (e) {
      console.log("It seems to me like space has changed its value", e);
    });
  };
  return (
    <Fragment>
      <div className="btm-action-right-wrapper">
        <div className="msg-trans mb-4">{transcript}</div>
        <div className="main-controls">
          <div className="ctrl-left">
            <div className="q-help help-tip" data-tip data-for="hint">
              <p>{currentStep}</p>
            </div>
          </div>
          <div className="ctrl-center ">
            <input
              type="text"
              className={"ctrl-text-area usid " + (listening ? "glowing" : "")}
              name="comment"
              value={comment}
              disabled={showLoading ? "disabled" : ""}
              onChange={(e) => onChange(e)}
              onKeyDown={(e) => handleKeyDown(e)}
              onFocus={(e) => setInputFocussed(true)}
              onBlur={(e) => setInputFocussed(false)}
              placeholder="Hold spacebar to talk to the patient, or type your response here"
              autoComplete="off"
            />
          </div>
          <div className="ctrl-right">
            <div>
              <span
                className={
                  "ml-2 mt-2 fa-adjust fa fa-microphone " +
                  (listening ? "recording-class" : "")
                }
                onClick={(e) => toggleRecording()}
              ></span>
            </div>

            <div>
              <span
                className={
                  "ml-2 mt-2  " +
                  (isMuted
                    ? "fa fa-volume-off red"
                    : " fa skyblue fa-volume-up ")
                }
                onClick={(e) => toggleMute()}
              ></span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

MessageBox.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  toggleMute: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  chat: state.chat,
});

export default connect(mapStateToProps, { sendMessage, toggleMute })(
  MessageBox
);
