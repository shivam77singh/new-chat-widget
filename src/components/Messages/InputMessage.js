import React, { useState } from "react";

import { BiMessageSquareError } from "react-icons/bi";

import DateInput from "./InputTypeMessages/DateInput";
import TimeInput from "./InputTypeMessages/TimeInput";
import FormInput from "./InputTypeMessages/FormInput";

function InputMessage({ message, handleInputMessage }) {
  const inputType = message[1].message.input;
  const renderInputType = (inputType) => {
    switch (inputType) {
      case "date":
        return (
          <DateInput
            message={message}
            handleInputMessage={handleInputMessage}
          />
        );
      case "time":
        return (
          <TimeInput
            message={message}
            handleInputMessage={handleInputMessage}
          />
        );
      default:
        return (
          <FormInput
            message={message}
            handleInputMessage={handleInputMessage}
          />
        );
    }
  };
  return renderInputType(inputType);
}

export default InputMessage;
