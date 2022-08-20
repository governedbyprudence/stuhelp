import { useContext, useEffect, useRef, useState } from "react";

import { AuthContext } from "../../context/AuthContext";

import Navbar from "../resuableComponents/navbar";

const AdminHome = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="layout">
      <Navbar type={0} btn={1} />
      <div className="content">
        <div className="mainContent">
          <h1>Home</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
