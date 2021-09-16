import React from "react";

function TextAreaInput({ field, error, handleUserInput, errorStyle }) {
  const type = field.type;
  const name = field.field;
  const label = field.label;
  return (
    <div className="sc-message--form-subfield">
      <p>{label}</p>
      <textarea
        style={{
          resize: "vertical",
          border: "1px solid rgb(218, 218, 218)",
          borderRadius: "7px",
          paddingLeft: "10px",
        }}
        cols="10"
        rows="3"
        charswidth="23"
        name={name}
        type={type}
        onChange={(e) => handleUserInput(e.target.value, e.target.name)}
      ></textarea>
      {error ? (
        <p style={errorStyle} className="sc-message--error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default TextAreaInput;
