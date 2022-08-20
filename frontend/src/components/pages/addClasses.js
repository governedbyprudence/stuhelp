import { useContext, useEffect, useRef, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import { deleteClass, getClass, postClass } from "../../apiCalls";

import Navbar from "../resuableComponents/navbar";
import ClassListItem from "../resuableComponents/classListItem";
import AlertBox from "../resuableComponents/alertBox";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const AddStudent = () => {
  const { user } = useContext(AuthContext);

  const [classList, setClassList] = useState([]);
  const [dropdown1, setDropdown1] = useState("");
  const [dropdown2, setDropdown2] = useState("");
  const [dropdown3, setDropdown3] = useState("");
  const [dropdown4, setDropdown4] = useState("");
  const [messageBox, setMessageBox] = useState("");
  const degreeList = ["BSc", "MSc", "BTech", "MTech", "BCA", "MCA"];
  const subjectList = ["CSE", "ECE", "IT", "EE", "ME", "CE"];
  const yearList = ["1", "2", "3", "4", "5"];
  const semesterList = ["1", "2", "3", "4", "5", "6"];

  const formRef = useRef();

  useEffect(() => {
    FetchClassList();
  }, []);

  const FetchClassList = () => {
    getClass(user.id, setClassList);
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (!dropdown1 || !dropdown2 || !dropdown3 || !dropdown4) {
      setMessageBox("Select An Option From All The Dropdown Menus!");
      const timer = setTimeout(() => {
        setMessageBox("");
      }, 3000);
      return () => clearTimeout(timer);
    }

    const res = await postClass({
      admin_id: user.id,
      auth_token: user.auth_token,
      course_name: dropdown2,
      degree_name: dropdown1,
      year: dropdown3,
      sem: dropdown4,
    });

    formRef.current.reset();
    FetchClassList();
  };

  const HandleDelete = async (course_id) => {
    const res = await deleteClass({
      data: {
        auth_token: user.auth_token,
        admin_id: user.id,
        course_id: course_id,
      },
    });
    FetchClassList();
  };

  return (
    <div className="layout">
      <Navbar type={0} btn={3} />
      <div className="content">
        <div className="mainContent">
          <div className="classesPageContainer">
            <div className="classesContainer">
              <form
                className="inputField"
                onSubmit={HandleSubmit}
                ref={formRef}
              >
                <div>
                  <h2>Add Class</h2>
                  <div className="grid">
                    <Dropdown
                      options={degreeList}
                      onChange={(e) => setDropdown1(e.value)}
                      value={dropdown1}
                      placeholder="Select a Degree"
                    />
                    <Dropdown
                      options={subjectList}
                      onChange={(e) => setDropdown2(e.value)}
                      value={dropdown2}
                      placeholder="Select a Subject"
                    />
                    <Dropdown
                      options={yearList}
                      onChange={(e) => setDropdown3(e.value)}
                      value={dropdown3}
                      placeholder="Select Year"
                    />
                    <Dropdown
                      options={semesterList}
                      onChange={(e) => setDropdown4(e.value)}
                      value={dropdown4}
                      placeholder="Select Semester"
                    />
                  </div>
                </div>
                <button type="submit">Add</button>
              </form>
              {messageBox ? <AlertBox data={messageBox} /> : null}
              <div className="grid">
                {classList.map((e, index) => {
                  return (
                    <ClassListItem
                      data={e}
                      deleteFunc={() => {
                        HandleDelete(e.id);
                      }}
                      key={`facultyItem${index}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
