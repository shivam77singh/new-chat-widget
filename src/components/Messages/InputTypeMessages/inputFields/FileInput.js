import React from "react";

function FileInput({ field, error, handleUserInput, errorStyle, inputType }) {
  const type = field.type;
  const name = field.field;
  const label = field.label;
  return (
    <div className="sc-message--form-subfield">
      <p>{label}</p>
      <div className="sc-message--form-input">
        <input
          type={type}
          name={name}
          onChange={(e) => handleUserInput(e.target.files[0], e.target.name)}
          style={{ paddingLeft: "8px", backgroundColor: "white" }}
        />
      </div>

      {error ? (
        <p style={errorStyle} className="sc-message--error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default FileInput;
