import React, {
  useEffect,
  Fragment,
  useRef,
  useState,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getMessages, addMessageFlag } from "../../actions/chat";
import ChatItem from "./ChatItem";
import Say from "react-say";
import Parser from "html-react-parser";

const Chat = ({
  getMessages,
  addMessageFlag,
  caseID,
  showNotes,
  showClinicInfo,
  chat: { messages, chatLoading, isBotThinking, isMuted },
  auth: { user },
}) => {
  const [sayings, setSayings] = useState([]);

  useEffect(() => {
    getMessages(caseID);
  }, [getMessages, caseID]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    console.log(
      "Use effect method in chat is called with messages",
      messages,
      sayings
    );
    if (messages && messages.length > 0) {
      let messageObj = [messages[messages.length - 1]];
      if (messageObj && messageObj[0].intent) {
        messageObj[0].key = Math.random();
        setSayings(messageObj);
      }
    }
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const flagMessage = (messageId, isFlag) => {
    addMessageFlag(messageId, isFlag);
  };
  const findLang = (id) => {
    switch (id) {
      case "5":
        return "Google UK English Male";
      case "6":
        return "Google UK English Female";
      default:
        return "Google UK English Male";
    }
  };
  const selector = useCallback(
    (voices) => [...voices].find((v) => v.name === findLang(caseID)),
    []
  );
  let messagesCount = -1;
  return user == null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div
        className={
          "chat-section-main " +
          (showNotes ? "chat-section-mini" : "chat-section-full")
        }
        id="style-10"
        style={{ display: showClinicInfo ? "none" : "" }}
      >
        {chatLoading && <Spinner />}
        {messages.map((message) => {
          messagesCount++;
          return (
            <ChatItem
              key={message.id}
              message={message}
              user={user}
              flagMessage={flagMessage}
              messagesCount={messagesCount}
            />
          );
        })}
        {!isMuted &&
          sayings &&
          sayings.length > 0 &&
          sayings.map((saying) => 
          { //console.log(selector)
            console.log("id = "+caseID)
            return(
            <Say
              pitch={0}
              volume={0.8}
              speak=""
              text={saying.comment}
              key={saying.key}
              voice={selector}
            ></Say>
          )})}
        {isBotThinking && (
          <div className="bot-parent">
            <img
              src={require("./assets/images/source.gif")}
              className="bot-thinking"
            />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </Fragment>
  );
};

Chat.propTypes = {
  getMessages: PropTypes.func.isRequired,
  addMessageFlag: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  chat: state.chat,
  auth: state.auth,
});

export default connect(mapStateToProps, { getMessages, addMessageFlag })(Chat);
