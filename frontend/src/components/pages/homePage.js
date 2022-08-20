import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homePageContainer">
      <div className="header">
        <button
          className="btns"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
        <button
          className="btns"
          onClick={() => {
            navigate("/register");
          }}
        >
          Register
        </button>
      </div>

      <div className="homePageContent">
        <h1>StuHelp</h1>
      </div>
    </div>
  );
};

export default HomePage;
