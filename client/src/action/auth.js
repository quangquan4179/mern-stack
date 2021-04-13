import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE
} from "./types";
import setAuthToken from "../utills/setAuthToken";
//load user
export const loaduser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
//register
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
  const newUser = {
    name,
    email,
    password,
  };
  try {
    const res = await axios.post("/api/users", newUser, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loaduser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
//login
export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
  const User = {
    email,
    password,
  };

  try {
    const res = await axios.post("/api/auth", User, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loaduser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
export const logout = () =>dispatch=> {
  dispatch({
    type:LOGOUT
  })
  dispatch({
    type:CLEAR_PROFILE
  })
}
