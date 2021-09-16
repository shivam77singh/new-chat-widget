import React, { useEffect, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function NameInput({ message, handleInputMessage }) {
  const inputType = message[1].message.input;
  const [showInput, setShowInput] = useState(true);
  const [inputDate, setInputDate] = useState("");
  const [open, setOpen] = useState(false);
  const text = message[1].message.text;

  useEffect(() => {
    document.addEventListener("mouseup", function (e) {
      var container = document.querySelector(".sc-message--calendar");
      if (container != null && !container.contains(e.target)) {
        setOpen(false);
      }
    });
    return () => {
      document.removeEventListener("mouseup", () => {});
    };
  }, []);

  const handleCalendar = () => {
    setOpen(!open);
  };
  const formatDate = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    setInputDate(`${day}-${month}-${year}`);
    setOpen(false);
  };

  const handleSubmit = () => {
    let obj = JSON.stringify({ date: inputDate, payload: "" });
    handleInputMessage({
      message: `${inputDate}`,
      value: obj,
    });
    setInputDate("");
    setShowInput(false);
  };

  return (
    <div className="sc-message--input">
      <div className="sc-message--text">
        {text}
        {showInput && (
          <form className="sc-message--inputform">
            <BiCalendar
              style={{ width: "21px" }}
              className="sc-message--inputavatar"
              onClick={handleCalendar}
            />
            <input
              style={{ paddingLeft: "35px" }}
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              placeholder="dd-mm-yyyy"
            />
            <AiOutlineRight
              onClick={handleSubmit}
              className="sc-message--inputbtn"
            />
            {open && (
              <div className="sc-message--calendar">
                <div className="sc-message--calendar-date">Pick a Date</div>
                <Calendar
                  onChange={formatDate}
                  minDate={new Date()}
                  next2Label=""
                  prev2Label=""
                  nextLabel={
                    <IoIosArrowForward
                      style={{ fontSize: "20px", color: "#150e5b" }}
                    />
                  }
                  prevLabel={
                    <IoIosArrowBack
                      style={{ fontSize: "20px", color: "#150e5b" }}
                    />
                  }
                />
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default NameInput;
