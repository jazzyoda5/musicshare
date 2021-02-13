import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS
} from './types';
import axios from 'axios';
import Cookies from 'js-cookie';

export const load_user = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.API_URL}/accounts/load_user/`, config);

        if (!res.data.error) {
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: USER_LOADED_FAIL,
            });
        }
    } catch (err) {
        dispatch({
            type: USER_LOADED_FAIL,
        });
    }
};

export const checkAuthenticated = () => async dispatch => {
    console.log('login action');

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    };

    try {
        const res = await axios.get(`${process.env.API_URL}/accounts/authenticate/`, config);
        console.log('res.data: ', res.data);

        if (res.data.error || res.data.isAuthenticated === 'error') {
            dispatch({
                type: AUTHENTICATED_FAIL,
                payload: false
            })
        }
        else if (res.data.isAuthenticated === 'success') {
            dispatch({
                type: AUTHENTICATED_SUCCESS,
                payload: true
            })
        }

    } catch (err) {
        console.log('login error: '. err);
        dispatch({
            type: AUTHENTICATED_FAIL,
            payload: false
        })
    }
};


export const login = (username, password) => async dispatch => {
    console.log('login action');

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({ username, password });

    try {
        const res = await axios.post(`${process.env.API_URL}/accounts/login/`, body, config);
        console.log('res.data: ', res.data);

        if (res.data.success) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: LOGIN_FAIL
            })
        }

    } catch (err) {
        console.log('login error: '. err);
        dispatch({
            type: LOGIN_FAIL
        });
    }
};


export const logout = () => async dispatch => {
    console.log('logout');

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({
        'withCredentials': true
    });

    try {
        const res = await axios.post(`${process.env.API_URL}/accounts/logout/`, body, config);
        
        if (res.data.success) {
            dispatch({
                type: LOGOUT_SUCCESS,
            });
        } else {
            console.log('fail1');
            dispatch({
                type: LOGOUT_FAIL
            })
        }
    } catch (err) {
        console.log('fail2: ', err);
        dispatch({
            type: LOGOUT_FAIL
        });
    }
};



export const signup = (email, username, password, re_password) => async dispatch => {
    console.log('jakob2');

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({ email, username, password });
 
    try {
        const res = await axios.post(`${process.env.API_URL}/accounts/create/`, body, config);
        if (res.data.error) {
            dispatch({
                type: SIGNUP_FAIL
            })
        } else {
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data
            });
        }

    } catch (err) {
        console.log(err);
        dispatch({
            type: SIGNUP_FAIL
        });
    }
};