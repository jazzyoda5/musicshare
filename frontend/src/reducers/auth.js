import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  LOGOUT,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
} from "../actions/types";

const initialState = {
  isAuthenticated: null,
  username: "",
  email: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        isAuthenticated: null,
        username: "",
        email: "",
      };
    default:
      return state;
  }
}
