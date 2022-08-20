import "./styles/styles.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import AdminHome from "./components/pages/adminHome";
import StudentHome from "./components/pages/studentHome";
import AddFaculty from "./components/pages/addFaculty";
import AddStudent from "./components/pages/addClasses";
import Settings from "./components/pages/settings";
import Login from "./components/pages/login";
import Register from "./components/pages/register";
import HomePage from "./components/pages/homePage";
import ErrorPage from "./components/pages/errorPage";

const App = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <Router>
      {!user ? (
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : user.type === 0 ? (
        <Routes>
          <Route exact path="/" element={<Navigate to="/admin" />} />
          <Route exact path="/admin" element={<AdminHome />} />
          <Route exact path="/faculty" element={<AddFaculty />} />
          <Route exact path="/classes" element={<AddStudent />} />
          <Route exact path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : user.type === 1 ? (
        <Routes>
          <Route exact path="/" element={<Navigate to="/student" />} />
          <Route exact path="/student" element={<StudentHome />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : null}
    </Router>
  );
};

export default App;
