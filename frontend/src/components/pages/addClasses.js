import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../resuableComponents/navbar";

const AddStudent = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="layout">
      <Navbar type={0} btn={3} />
      <div className="content">
        <div className="mainContent">
          <div className="classesPageContainer">
            <h1>Classes</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
