import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { InputTypeIcon } from "../../../icons/InputTypeIcon";

function AllOtherInput({
  field,
  error,
  handleUserInput,
  errorStyle,
  inputType,
  handleSubmit,
}) {
  const type = field.type;
  const name = field.field;
  const label = field.label;
  const myStyle = !(
    inputType != "form" ||
    (inputType == "form" && type == "phone")
  )
    ? { paddingLeft: "10px" }
    : {};

  return (
    <div className="sc-message--form-subfield">
      <p>{label}</p>
      <div className="sc-message--inputform">
        {inputType != "form" || (inputType == "form" && type == "phone")
          ? InputTypeIcon(type)
          : null}
        <input
          type={type}
          name={name}
          placeholder={inputType != "form" ? `Please enter your ${name}` : ""}
          onChange={(e) => handleUserInput(e.target.value, e.target.name)}
          style={myStyle}
        />
        {inputType != "form" && (
          <AiOutlineRight
            type="Submit"
            onClick={(e) => handleSubmit(e)}
            className="sc-message--inputbtn"
          />
        )}
      </div>
      {error ? (
        <p style={errorStyle} className="sc-message--error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default AllOtherInput;
