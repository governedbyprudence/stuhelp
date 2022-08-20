import { useContext, useEffect, useRef, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import { getCourse, getSubjects } from "../../apiCalls";

import Navbar from "../resuableComponents/navbar";
import SubjectFeedbackButton from "../resuableComponents/subjectFeedbackButton";
import InstituteFeedbackButton from "../resuableComponents/instituteFeedbackButton";

const StudentHome = () => {
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [subjects, setSubjects] = useState(null);

  useEffect(() => {
    getCourse(user.admin_id, user.course, setCourse);
    getSubjects(user.admin_id, user.course, setSubjects);
  }, []);

  if (!course || !subjects) return <div></div>;

  return (
    <div className="layout">
      <Navbar type={1} />
      <div className="content">
        <div className="mainContent">
          <div className="studentPageContainer">
            <div className="headerSection">
              <h1>Institute Feedback</h1>
              <h3>{`Degree ${course.degree_name} | Course ${course.course_name} `}</h3>
              <h3>{`${course.year}${
                course.year === 1
                  ? "st"
                  : course.year === 2
                  ? "nd"
                  : course.year === 3
                  ? "rd"
                  : "th"
              } Year | ${course.sem}${
                course.sem === 1
                  ? "st"
                  : course.sem === 2
                  ? "nd"
                  : course.sem === 3
                  ? "rd"
                  : "th"
              } Sem`}</h3>
            </div>
            <div className="feedBackButtonsContainer">
              <InstituteFeedbackButton
                name={user.instituteDetails.name}
                id={user.id}
                institute={user.institute}
              />
              <div className="headerSection marginTop">
                <h1>Subject Feedbacks</h1>
              </div>
              <div className="grid">
                {subjects.map((e, index) => {
                  return (
                    <SubjectFeedbackButton
                      id={user.id}
                      data={e}
                      deleteFunc={() => {
                        const newUsers = "";
                      }}
                      key={`subjects ${index}`}
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

export default StudentHome;
