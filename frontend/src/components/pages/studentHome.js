import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../resuableComponents/navbar";

const StudentHome = () => {
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [subjects, setSubjects] = useState(null);

  return (
    <div className="layout">
      <Navbar type={1} />
      <div className="content">
        <div className="mainContent">
          <div className="studentPageContainer">
            <h1>Home</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
