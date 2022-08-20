import { useContext } from "react";

import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserTie,
  faChalkboardTeacher,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

import { AuthContext } from "../../context/AuthContext";
import { logoutStudent } from "../../apiCalls";

import Icon from "../../assets/icon.png";

const Navbar = ({ type, btn }) => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="navBar">
      <div className="navHeader">
        <h2>Username</h2>
        <h4>Institute Name</h4>
      </div>

      <div className="navButtons">
        {type === 0 ? (
          <>
            <Link to="/admin">
              <button className={btn === 1 ? "selected" : null}>
                <FontAwesomeIcon icon={faHome} />
                <p>Home</p>
              </button>
            </Link>

            <Link to="/faculty">
              <button className={btn === 2 ? "selected" : null}>
                <FontAwesomeIcon icon={faUserTie} />
                <p>Add Faculty</p>
              </button>
            </Link>

            <Link to="/classes">
              <button className={btn === 3 ? "selected" : null}>
                <FontAwesomeIcon icon={faChalkboardTeacher} />
                <p>Add Classes</p>
              </button>
            </Link>

            <Link to="/settings">
              <button className={btn === 4 ? "selected" : null}>
                <FontAwesomeIcon icon={faCog} />
                <p>Settings</p>
              </button>
            </Link>
          </>
        ) : (
          <button
            onClick={() => {
              logoutStudent(
                {
                  student_id: user.id,
                  auth_token: user.auth_token,
                },
                dispatch
              );
              navigate("/");
            }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <p>LogOut</p>
          </button>
        )}
      </div>

      <div className="navFooter">
        <img src={Icon} alt="profilePicture"></img>
        <h1>TestName</h1>
      </div>
    </div>
  );
};

export default Navbar;
