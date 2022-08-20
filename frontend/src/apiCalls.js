import api from "./axios";

//AUTHENTICATION
export const loginCallAdmin = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await api.get(
      `/adm?email=${userCredential.email}&password=${userCredential.password}`
    );
    console.log(res);
    res.data.data.type = 0;
    const temp = { user: res.data.data, institute: "testInst" };
    dispatch({ type: "LOGIN_SUCCESS", payload: temp });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: true });
  }
};

export const loginCallStudent = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await api.get(
      `/student?email=${userCredential.email}&password=${userCredential.password}`
    );

    res.data.data.type = 1;
    res.data.data.instituteDetails = res.data.institute;
    const temp = { user: res.data.data, institute: "testInst" };
    dispatch({ type: "LOGIN_SUCCESS", payload: temp });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: true });
  }
};

export const registerAdmin = async (req, dispatch) => {
  try {
    const res = await api.post(`/adm`, req);
    console.log(res);
    loginCallAdmin({ email: req.email, password: req.password }, dispatch);
  } catch (err) {
    console.log(err);
  }
};

export const logoutAdmin = async (req, dispatch) => {
  try {
    const res = await api.post(`/logout`, req);
    localStorage.setItem("userFeedBackSystem", JSON.stringify(null));
    dispatch({ type: "LOGOUT" });
  } catch (err) {
    console.log(err);
  }
};

export const logoutStudent = async (req, dispatch) => {
  try {
    const res = await api.post(`/logout`, req);
    localStorage.setItem("userFeedBackSystem", JSON.stringify(null));
    dispatch({ type: "LOGOUT" });
  } catch (err) {
    console.log(err);
  }
};

//API ENDPOINTS
export const getCourse = async (admin_id, course, setData) => {
  try {
    const res = await api.get(
      `/getcourse?admin_id=${admin_id}&course_id=${course}`
    );
    setData(res.data.data);
  } catch (err) {
    console.log(err);
  }
};

export const getSubjects = async (admin_id, course, setData) => {
  try {
    const res = await api.get(
      `/getsubject?admin_id=${admin_id}&course_id=${course}`
    );
    setData(res.data.data);
  } catch (err) {
    console.log(err);
  }
};

export const getTeacherName = async (admin_id, teacher_id, setData) => {
  try {
    const res = await api.get(`/faculty?admin_id=${admin_id}`);

    for (let i = 0; i < res.data.data.length; i++) {
      if (res.data.data[i].id === teacher_id) {
        setData(res.data.data[i].name);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const postFeedback = async (req) => {
  try {
    const res = await api.post(`/feedback`, req);
    return "SUCCESS";
  } catch (err) {
    console.log(err);
    return "FAILURE";
  }
};

export const getFaculty = async (user_id, setData) => {
  try {
    const res = await api.get(`/faculty?admin_id=${user_id}`);
    setData(res.data.data);
    return "SUCCESS";
  } catch (err) {
    console.log(err);
    return "FAILURE";
  }
};

export const postFaculty = async (req) => {
  try {
    const res = await api.post(`/faculty`, req);
    return "SUCCESS";
  } catch (err) {
    console.log(err);
    return "FAILURE";
  }
};

export const deleteFaculty = async (req) => {
  try {
    const res = await api.delete(`/faculty`, req);
    return "SUCCESS";
  } catch (err) {
    console.log(err);
    return "FAILURE";
  }
};

export const getClass = async (user_id, setData) => {
  try {
    const res = await api.get(`/course?admin_id=${user_id}`);
    setData(res.data.data);
  } catch (err) {
    console.log(err);
  }
};

export const postClass = async (req) => {
  try {
    const res = await api.post(`/course`, req);
    return "SUCCESS";
  } catch (err) {
    console.log(err);
    return "FAILURE";
  }
};

export const deleteClass = async (req) => {
  try {
    const res = await api.delete(`/course`, req);
    return "SUCCESS";
  } catch (err) {
    console.log(err);
    return "FAILURE";
  }
};

export const getFacultyOfClass = async (admin_id, course_id, setData) => {
  try {
    const res = await api.get(
      `subject?admin_id=${admin_id}&course_id=${course_id}`
    );
    setData(res.data.data);
  } catch (err) {
    console.log(err);
  }
};

export const getStudentOfClass = async (admin_id, course_id, setData) => {
  try {
    const res = await api.get(
      `getstudent?admin_id=${admin_id}&course_id=${course_id}`
    );
    setData(res.data.data);
  } catch (err) {
    console.log(err);
  }
};

export const postFacultyOfClass = async (req) => {
  try {
    const res = await api.post(`/subject`, req);
    return "SUCCESS";
  } catch (err) {
    console.log(err);
    return "FAILURE";
  }
};

export const postStudentOfClass = async (req) => {
  try {
    const res = await api.post(`/student`, req);
    return "SUCCESS";
  } catch (err) {
    console.log(err);
    return "FAILURE";
  }
};

export const deleteFacultyOfClass = async (req) => {
  try {
    const res = await api.delete(`/subject`, req);
    return "SUCCESS";
  } catch (err) {
    console.log(err);
    return "FAILURE";
  }
};

export const deleteStudentOfClass = async (req) => {
  try {
    const res = await api.delete(`/student`, req);
    return "SUCCESS";
  } catch (err) {
    console.log(err);
    return "FAILURE";
  }
};
