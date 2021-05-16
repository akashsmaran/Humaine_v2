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

const Chat = ({
  getMessages,
  addMessageFlag,
  caseID,
  showNotes,
  chat: { messages, chatLoading, isBotThinking },
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
  const selector = useCallback(
    (voices) => [...voices].find((v) => v.name === "Google UK English Male"),
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
      >
        {chatLoading && <Spinner />}
        {messages.map((message) => {
          messagesCount++;
          console.log(
            "🚀 ~ file: Chat.js ~ line 82 ~ {messages.map ~ messagesCount",
            messagesCount
          );

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
        {sayings &&
          sayings.length > 0 &&
          sayings.map((saying) => (
            <Say
              pitch={1}
              volume={0.8}
              speak=""
              text={saying.comment}
              key={saying.key}
              voice={selector}
            ></Say>
          ))}
        {isBotThinking && (
          <div className="bot-parent">
            {/* <img src="assets/images/source.gif" className="bot-thinking" /> */}
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
