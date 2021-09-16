import { prop, equals } from "ramda";
import React from "react";
import classNames from "classnames";
import TextMessage from "./TextMessage";
import EmojiMessage from "./EmojiMessage";
import FileMessage from "./FileMessage";
import CarouselMessage from "./CarouselMessage";
import QuickReplyMessage from "./QuickReplyMessage";
import InputMessage from "./InputMessage";
import chatIconUrl from "./../../assets/chat-icon.svg";
import UserInput from "../UserInput";
import UserInputMessage from "./UserInputMessage";

function Message({ message, handleInputMessage }) {
  const type = message[1];
  const author = prop("author", message);
  const me = message[1].channel === "channelName";

  function renderMessageOfType(type) {
    if (me) {
      return <UserInputMessage message={message} />;
    } else if (type.carousel) {
      return (
        <CarouselMessage
          message={message}
          handleInputMessage={handleInputMessage}
        />
      );
    } else if (type.message.quickReply) {
      return (
        <QuickReplyMessage
          message={message}
          handleInputMessage={handleInputMessage}
        />
      );
    } else if (type.message.input) {
      return (
        <InputMessage
          message={message}
          handleInputMessage={handleInputMessage}
        />
      );
    } else if (type.message.text) {
      return <TextMessage message={message} />;
    } else {
      console.log(`default'`);
    }
  }

  return (
    <div className="sc-message">
      <div className={`sc-message--content ${me ? "sent" : "received"}`}>
        <div
          className="sc-message--avatar"
          style={{
            backgroundImage: `url(${chatIconUrl})`,
          }}
        />

        {renderMessageOfType(type)}
      </div>
    </div>
  );
}

export default Message;
