import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
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
    case AUTHENTICATED_SUCCESS:
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: payload
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        username: payload.username
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        username: ''
      };
    case LOGIN_FAIL:
    case SIGNUP_FAIL:
      return state;
    default:
      return state;
  }
}
