import React from "react";
import PropTypes from "prop-types";
import { propTypes } from "react-bootstrap/esm/Image";

const ChatItem = ({
  message: { id, user_id, comment, comment_created, is_flagged },
  user,
  flagMessage,
  messagesCount,
}) => {
  return (
    <div className="chat-section-wrapper">
      {messagesCount % 2 == 0 ? (
        <div className="chat-div">
          <div className="col-2">
            <div className="user-info-img-chat">
              <img
                // src="assets/images/chat.png"
                src={require("./assets/images/chat.png")}
                className="img img-responsive"
                width="35"
                height="35"
              />
            </div>
          </div>
          <div className="col-9 chat-message chat-msg-left">
            <div>{comment}</div>
            <div className="make-flag">
              <i
                className={
                  "fa fa-flag flag-msg " +
                  (is_flagged ? "flag-green" : "flag-blue")
                }
                onClick={() => flagMessage(id, is_flagged)}
              ></i>
            </div>
          </div>
        </div>
      ) : (
        <div className="chat-div">
          <div className="col-1"></div>
          <div className="col-9 chat-message chat-msg-right">{comment}</div>
          <div className="col-2">
            <div className="user-info-img-chat">
              <img
                // src="assets/images/user.png"
                src={require("./assets/images/user.png")}
                className="img img-responsive"
                width="35"
                height="35"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ChatItem.propTypes = {
  message: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  flagMessage: PropTypes.func.isRequired,
};

export default ChatItem;
