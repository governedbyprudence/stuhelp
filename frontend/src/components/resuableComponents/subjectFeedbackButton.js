import { useState, useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faTimes } from "@fortawesome/free-solid-svg-icons";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { AuthContext } from "../../context/AuthContext";
import { getTeacherName, postFeedback } from "../../apiCalls";

const SubjectFeedbackButton = ({ data, id }) => {
  const { user } = useContext(AuthContext);

  const [modal, setModal] = useState(false);
  const [textSubject, setTextSubject] = useState({ desc: "" });
  const [textFaculty, setTextFaculty] = useState({ desc: "" });
  const [techerName, setTeacherName] = useState("");

  console.log(data);

  const handleQuillEdit1 = (value) => {
    setTextSubject((prev) => {
      return {
        ...prev,
        desc: value,
      };
    });
  };
  const handleQuillEdit2 = (value) => {
    setTextFaculty((prev) => {
      return {
        ...prev,
        desc: value,
      };
    });
  };

  const HandleSubmit = () => {
    postFeedback({
      type: "teacher",
      text: textFaculty.desc.replace(/<\/?[^>]+(>|$)/g, ""),
      entity_id: data.id,
      id,
    });
    postFeedback({
      type: "subject",
      text: textSubject.desc.replace(/<\/?[^>]+(>|$)/g, ""),
      entity_id: data.id,
      id,
    });
  };

  return (
    <>
      <div
        className="feedbackButton"
        onClick={() => {
          setModal(true);
          getTeacherName(user.admin_id, data.teacher, setTeacherName);
        }}
      >
        <h2>{data.name}</h2>
        <div className="icon">
          <FontAwesomeIcon icon={faSquare} />
        </div>
      </div>
      {modal === true ? (
        <div className="modalContainer">
          <div className="modalContent">
            <div className="modal">
              <div className="modalHeader">
                <h2>Subject Feedback</h2>
                <div
                  className="closeBtn"
                  onClick={() => {
                    setModal(false);
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              </div>
              <h2 style={{ color: "black" }}>{data.name}</h2>
              <h3 className="italic">
                Write a concise summary about your teacher in proper english.
                Try to be as descriptive as possible.
              </h3>
              <h4>
                Single words or different language will be treated as spam!
              </h4>
              <ReactQuill
                value={textSubject.desc}
                onChange={handleQuillEdit1}
                modules={{ toolbar: false }}
                placeholder="Write something here..."
              />

              <div className="modalHeader">
                <h2>Faculty Feedback</h2>
              </div>
              <h2 style={{ color: "black" }}>{techerName}</h2>
              <h3 className="italic">
                Write a concise summary about your teacher in proper english.
                Try to be as descriptive as possible.
              </h3>
              <h4>
                Single words or different language will be treated as spam!
              </h4>
              <ReactQuill
                value={textFaculty.desc}
                onChange={handleQuillEdit2}
                modules={{ toolbar: false }}
                placeholder="Write something here..."
              />

              <div className="btnContainer">
                <button
                  onClick={() => {
                    HandleSubmit();
                    setModal(false);
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SubjectFeedbackButton;
