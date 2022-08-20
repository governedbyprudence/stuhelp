import { useContext, useEffect, useRef, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import { deleteFaculty, getFaculty, postFaculty } from "../../apiCalls";

import Navbar from "../resuableComponents/navbar";
import ListItem from "../resuableComponents/listItem";

const AddFaculty = () => {
  const { user } = useContext(AuthContext);

  const [facultyList, setFacultyList] = useState([]);
  const nameRef = useRef("");
  const formRef = useRef();

  useEffect(() => {
    getFaculty(user.id, setFacultyList);
  }, []);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (nameRef.current.value === "") return;

    const res = await postFaculty({
      admin_id: user.id,
      auth_token: user.auth_token,
      name: nameRef.current.value,
    });

    formRef.current.reset();
    getFaculty(user.id, setFacultyList);
  };

  const HandleDelete = async (teacher_id) => {
    const res = await deleteFaculty({
      data: {
        auth_token: user.auth_token,
        admin_id: user.id,
        teacher_id: teacher_id,
      },
    });
    getFaculty(user.id, setFacultyList);
  };

  return (
    <div className="layout">
      <Navbar type={0} btn={2} />
      <div className="content">
        <div className="mainContent">
          <div className="facultyPageContainer">
            <div className="facultyContainer">
              <form
                className="inputField"
                onSubmit={HandleSubmit}
                ref={formRef}
              >
                <div>
                  <h2>Add Faculty</h2>
                  <input
                    type="text"
                    ref={nameRef}
                    minLength="2"
                    placeholder={"Type Faculty Name"}
                    required
                  />
                </div>
                <button type="submit">Add</button>
              </form>
              <div className="grid">
                {facultyList.map((e, index) => {
                  return (
                    <ListItem
                      name={e.name}
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

export default AddFaculty;
