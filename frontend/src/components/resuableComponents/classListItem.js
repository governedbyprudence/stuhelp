import { useContext, useEffect, useRef, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import {
  deleteFacultyOfClass,
  deleteStudentOfClass,
  getFaculty,
  getFacultyOfClass,
  getStudentOfClass,
  postFacultyOfClass,
  postStudentOfClass,
} from "../../apiCalls";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import ListItem from "./listItem";

const ClassListItem = ({ data, deleteFunc }) => {
  const { user } = useContext(AuthContext);

  const [modal, setModal] = useState(false);
  const [faculty, setFaculty] = useState([]); //faculty array of object
  const [facultyClass, setFacultyClass] = useState([]);
  const [facultyList, setFacultyList] = useState([]); // array of faculty name for dropdown
  const [students, setStudents] = useState([]);
  const [dropdown, setDropdown] = useState("");

  const nameRef = useRef("");
  const formRef = useRef();

  const studentFirstNameRef = useRef("");
  const studentLastNameRef = useRef("");
  const studentEmailRef = useRef("");
  const studentFormRef = useRef();

  useEffect(() => {
    const func = async () => {
      const res = await getFaculty(user.id, setFaculty);

      let arr = [];
      for (let i = 0; i < faculty.length; i++) {
        arr.push(faculty[i].name);
      }

      setFacultyList(arr);
    };
    func();
  }, []);

  const FetchFacultyClass = async () => {
    getFacultyOfClass(user.id, data.id, setFacultyClass);
  };

  const FetchStudentClass = async () => {
    getStudentOfClass(user.id, data.id, setStudents);
  };

  const GetNameById = (id) => {
    for (let i = 0; i < faculty.length; i++) {
      if (faculty[i].id === id) return faculty[i].name;
    }
  };

  const HandleFacultySubmit = async (e) => {
    e.preventDefault();
    for (let i = 0; i < faculty.length; i++) {
      if (faculty[i].name === dropdown) {
        const req = {
          admin_id: user.id,
          auth_token: user.auth_token,
          name: nameRef.current.value,
          course: data.id,
          teacher: faculty[i].id,
        };
        console.log(req);
        const res = await postFacultyOfClass(req);
        FetchFacultyClass();
        break;
      }
    }
    formRef.current.reset();
  };

  const HandleStudentSubmit = async (e) => {
    e.preventDefault();
    if (
      !studentLastNameRef ||
      !studentFirstNameRef.current.value ||
      !studentEmailRef.current.value
    )
      return;

    const req = {
      admin_id: user.id,
      auth_token: user.auth_token,
      first_name: studentFirstNameRef.current.value,
      last_name: studentLastNameRef.current.value,
      email: studentEmailRef.current.value,
      course: data.id,
    };
    const res = await postStudentOfClass(req);
    FetchStudentClass();
    studentFormRef.current.reset();
  };

  const HandleFacultyDelete = async (subject_id) => {
    const res = await deleteFacultyOfClass({
      data: {
        auth_token: user.auth_token,
        admin_id: user.id,
        subject_id: subject_id,
      },
    });
    FetchFacultyClass();
  };

  const HandleStudentDelete = async (student_id) => {
    const res = await deleteStudentOfClass({
      data: {
        auth_token: user.auth_token,
        admin_id: user.id,
        student_id: student_id,
      },
    });
    FetchStudentClass();
  };

  return (
    <div className="classListItem">
      <div>
        <h2>{`${data.degree_name}-${data.course_name}`}</h2>
        <h2>{`Year ${data.year}-Sem ${data.sem}`}</h2>
      </div>
      <div
        className="icon"
        onClick={() => {
          setModal(true);
          FetchStudentClass();
          FetchFacultyClass();
        }}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
      {modal === true ? (
        <div className="modalContainer">
          <div className="modalContent">
            <div className="modal">
              <div className="modalHeader">
                <h2>Class Details</h2>
                <div
                  className="closeBtn"
                  onClick={() => {
                    setModal(false);
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              </div>

              <form
                className="inputField"
                onSubmit={HandleFacultySubmit}
                ref={formRef}
              >
                <div>
                  <h2>Add Faculty</h2>
                  <Dropdown
                    options={facultyList}
                    onChange={(e) => setDropdown(e.value)}
                    value={dropdown}
                    placeholder="Select an option"
                  />
                  <input
                    type="text"
                    ref={nameRef}
                    required
                    placeholder="Add Subject"
                  />
                </div>
                <button type="submit">Add</button>
              </form>

              <h3>{`List of Faculty - ${facultyClass.length}`}</h3>

              {facultyClass.length === 0 ? (
                <h4>No Faculty Added To This Class!</h4>
              ) : null}

              <div className="classGrid marginBottom">
                {facultyClass.map((e, index) => {
                  return (
                    <ListItem
                      name={
                        e.teacher === null
                          ? "No Teacher Assigned"
                          : GetNameById(e.teacher)
                      }
                      email={e.name}
                      deleteFunc={() => {
                        HandleFacultyDelete(e.id);
                      }}
                      key={`${data.name}classFacultyList${index}`}
                    />
                  );
                })}
              </div>

              <form
                className="inputField"
                onSubmit={HandleStudentSubmit}
                ref={studentFormRef}
              >
                <div>
                  <h2>Add Student</h2>
                  <input
                    type="text"
                    ref={studentFirstNameRef}
                    placeholder={"Type Student First Name"}
                    required
                  />
                  <input
                    type="text"
                    ref={studentLastNameRef}
                    placeholder={"Type Student Last Name"}
                    required
                  />
                  <input
                    type="email"
                    ref={studentEmailRef}
                    placeholder={"Type Email"}
                    required
                  />
                </div>
                <button type="submit">Add</button>
              </form>

              <h3>{`List of Students - ${students.length}`}</h3>

              {students.length === 0 ? (
                <h4>No Students Added To This Class!</h4>
              ) : null}

              <div className="classGrid">
                {students.map((e, index) => {
                  return (
                    <ListItem
                      name={`${e.first_name} ${e.last_name}`}
                      email={e.email}
                      deleteFunc={() => {
                        HandleStudentDelete(e.id);
                      }}
                      key={`${data.name}classStudentList${index}`}
                    />
                  );
                })}
              </div>

              <div className="btnContainer marginTop">
                <button
                  onClick={() => {
                    deleteFunc();
                    setModal(false);
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setModal(false);
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ClassListItem;
