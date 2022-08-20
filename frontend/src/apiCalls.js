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
