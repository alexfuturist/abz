import {
    formAPI
} from "../api/api";
import {
    clearUsers,
    getUsers
} from "./users-reducer";

const SET_POSITIONS = 'SET_POSITIONS';
const SET_TOKEN = 'SET_TOKEN';
const SET_ERROR = 'SET_ERROR';
const CLEAR_ERROR = 'CLEAR_ERROR';
const SET_SUCCESS = 'SET_SUCCESS';

let initialState = {
    success: false,
    positions: [],
    token: "",
    serverError: ""
};

const registrationReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_POSITIONS: {
            return {
                ...state,
                positions: [...action.positions]
            }
        }

        case SET_TOKEN: {
            return {
                ...state,
                token: action.token
            }
        }

        case SET_SUCCESS: {
            return {
                ...state,
                success: true
            }
        }

        case SET_ERROR: {
            return {
                ...state,
                serverError: action.serverError
            }
        }

        case CLEAR_ERROR: {
            return {
                ...state,
                serverError: ""
            }
        }

        default:
            return state;
    }
}

//AC
export const setPositions = (positions) => ({
    type: SET_POSITIONS,
    positions
});

export const setToken = (token) => ({
    type: SET_TOKEN,
    token
});

export const setSuccess = () => ({
    type: SET_SUCCESS,
});

export const setError = (serverError) => ({
    type: SET_ERROR,
    serverError
});

export const clearError = () => ({
    type: CLEAR_ERROR,
});

//TC
export const getPositions = () => async (dispatch) => {
    //side-effect
    let data = await formAPI.getPositions();
    dispatch(setPositions(data.positions));
};

export const getToken = () => async (dispatch) => {
    //side-effect
    let data = await formAPI.getToken();
    dispatch(setToken(data.token));
};

export const registerUser = (payload) => async (dispatch, getState) => {

    // debugger

    const token = getState().registrationPage.token;
    //side-effect
    try {
        let response = await formAPI.registerUser(token, payload);

        dispatch(setSuccess());
        dispatch(clearError());
        dispatch(clearUsers());
        dispatch(getUsers(1, 6));
        console.log(response);
        
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            dispatch(setError(error.response.data.message));
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    }

};



export default registrationReducer;