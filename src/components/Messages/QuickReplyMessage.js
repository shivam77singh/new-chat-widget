import React, { useState } from "react";

function QuickReplyMessage({ message, handleInputMessage }) {
  const [showQuickReply, setShowquickReply] = useState(true);
  const text = message[1].message.text;
  const options = [...message[1].message.quickReply];

  const handleSubmit = (value) => {
    let obj = { quickReply: value, payload: "" };
    obj = JSON.stringify(obj);
    handleInputMessage({
      message: value,
      value: obj,
    });
    setShowquickReply(false);
  };

  return (
    <div className="sc-message--quickreply">
      <div className="sc-message--text">{text}</div>
      {showQuickReply && (
        <div className="sc-message--options">
          {options.map((option, index) => {
            return (
              <span
                key={index}
                onClick={(e) => handleSubmit(option.title)}
                className="sc-message--option"
              >
                {option.title}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default QuickReplyMessage;
