import Navbar from "../resuableComponents/navbar";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="layout">
      <Navbar type={0} btn={4} />
      <div className="content">
        <div className="mainContent">
          <div className="settingsContainer">
            <button
              onClick={() => {
                logoutAdmin(
                  {
                    admin_id: user.id,
                    auth_token: user.auth_token,
                  },
                  dispatch
                );
                navigate("/");
              }}
            >
              LogOut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
