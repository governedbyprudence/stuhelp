import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../resuableComponents/navbar";

const AddFaculty = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="layout">
      <Navbar type={0} btn={2} />
      <div className="content">
        <div className="mainContent">
          <div className="facultyPageContainer">
            <h1>Faculty</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFaculty;
