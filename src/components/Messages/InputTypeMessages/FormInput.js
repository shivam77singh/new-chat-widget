import React, { useEffect, useState } from "react";
import { FormValidator } from "../../FormValidation";
import { AiOutlineRight } from "react-icons/ai";
import { InputTypeIcon } from "../../icons/InputTypeIcon";
import DropDownInput from "./inputFields/DropDownInput";
import AllOtherInput from "./inputFields/AllOtherInput";
import TextAreaInput from "./inputFields/TextAreaInput";
import FileInput from "./inputFields/FileInput";
import { set } from "ramda";

function FormInput({ message, handleInputMessage }) {
  const [error, setError] = useState({});
  const [showForm, setShowForm] = useState(true);
  const [inputValue, setInputValue] = useState({});
  const [formFields, setFormFields] = useState([]);
  const [errorStyle, setErrorStyle] = useState({ display: "none" });
  const inputType = message[1].message.input;
  const messageHead = message[1].message.text;
  const singleInputStyle = { width: "350px" };

  // <<<<<<<<<=====================INITIALIZING THE FORM FIELDS==========>>>>>>
  useEffect(() => {
    if (inputType === "form") {
      const messageBody = message[1].message.init;
      const formField = messageBody.formConfig.sections[0].fields;
      setFormFields(formField);
    } else {
      const required = message[1].message.required;
      const label = message[1].message.text;
      const type = message[1].message.input;
      const field = type;
      setFormFields([
        [
          {
            label,
            type,
            field,
            required,
          },
        ],
      ]);
    }
  }, []);

  // <<<<<<<<<<=============HANDLES THE ERROR WHEN INPUTVALUE CHANGES============>>>>>>>>>>

  const handleError = (submit) => {
    const err = FormValidator(formFields, inputValue);
    setError({ ...err });

    for (const p in err) {
      if (err[p]) {
        setErrorStyle({ display: "block" });
        return true;
      }
    }
    const tempError = {};
    let isError = false;
    for (const p in err) {
      let req;
      formFields.forEach((field) => {
        field.forEach((subfield) => {
          if (subfield.field == p) req = subfield.required;
        });
      });
      if (
        (inputValue[p] == "" || inputValue[p] == undefined) &&
        req &&
        err[p] == ""
      ) {
        tempError[p] = "This field is required";
        isError = true;
      }
    }
    if (isError && submit) {
      setError({ ...error, ...tempError });
      setErrorStyle({ display: "block" });
      return true;
    }
    return false;
  };

  useEffect(() => {
    handleError(false);
    console.log(inputValue, "input");
  }, [inputValue]);

  // <<<<<<<<<<==========HANDLES SUBMIT FORM AND CHECKS ERRORS============>>>>>>>>>>

  const handleSubmit = (e) => {
    e.preventDefault();
    const buttonType = e.target.innerText;
    const isError = handleError(true);
    if (isError == true) {
      return;
    }
    var formData = new FormData();

    Object.entries(inputValue).map((obj) => {
      const key = obj[0];
      const value = obj[1];
      formData.append([key], value);
    });

    const message =
      inputType === "form" ? "Submit" : `${inputValue[inputType]}`;
    handleInputMessage({
      message,
      value: formData,
    });
    setShowForm(false);
  };

  const handleUserInput = (value, type) => {
    setInputValue({ ...inputValue, [type]: value });
  };
  // <<<<<<<<<<==============DISPLAY THE FORM==================>>>>>>>>>>

  const displayInputField = (field) => {
    const type = field.type;
    const name = field.field;
    const { [field.field]: err } = error;

    switch (type) {
      case "large-text":
        return (
          <TextAreaInput
            field={field}
            error={err}
            handleUserInput={handleUserInput}
            errorStyle={errorStyle}
          />
        );
      case "dropdown":
        const options = field.config.options;
        return (
          <DropDownInput
            field={field}
            error={err}
            handleUserInput={handleUserInput}
            errorStyle={errorStyle}
            inputType={inputType}
            options={options}
          />
        );
      case "file":
        return (
          <FileInput
            field={field}
            error={err}
            handleUserInput={handleUserInput}
            errorStyle={errorStyle}
            inputType={inputType}
          />
        );

      default:
        return (
          <AllOtherInput
            field={field}
            error={err}
            handleUserInput={handleUserInput}
            errorStyle={errorStyle}
            inputType={inputType}
            handleSubmit={handleSubmit}
          />
        );
    }
  };

  const displayForm = () => {
    let messageBody;
    let buttons;
    if (message[1].message.init) {
      messageBody = message[1].message.init;
      buttons = messageBody.formConfig.cta;
    }

    return (
      <form className="sc-message--form">
        {formFields.map((field, index) => {
          return (
            <div className="sc-message--form-fields" key={index}>
              {field.map((subfield, index) => {
                return displayInputField(subfield);
              })}
            </div>
          );
        })}

        {inputType === "form" && (
          <div className="sc-message--form-btn">
            {Object.keys(buttons).map((btn) => {
              return (
                <button
                  onClick={(e) => handleSubmit(e)}
                  type={buttons[btn].label}
                >
                  {buttons[btn].label}
                </button>
              );
            })}
          </div>
        )}
      </form>
    );
  };

  return (
    <div
      className="sc-message--form-container"
      style={inputType == "form" ? {} : singleInputStyle}
    >
      {inputType == "form" && <h4>{messageHead}</h4>}

      {showForm && displayForm()}
    </div>
  );
}

export default FormInput;
