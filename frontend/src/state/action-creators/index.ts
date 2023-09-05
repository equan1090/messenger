import {ActionTypes} from "../action-types";
import {Dispatch} from "@reduxjs/toolkit";
import {Action, SetUserAction, RemoveUserAction} from "../actions/index";
export const authenticate = () => async (dispatch: Dispatch<Action>) => {
    const response = await fetch('/api/auth/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const data = await response.json();

        if (data.errors) {
            return;
        }
        const setUserAction: SetUserAction = {
            type: ActionTypes.SET_USER,
            payload: data
        }
        dispatch(setUserAction);

    }
}

export const login = (email: string, password: string) => async (dispatch: Dispatch<Action>) => {

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });



    if (response.ok) {
        const data = await response.json();

        const setUserAction: SetUserAction = {
            type: ActionTypes.SET_USER,
            payload: data
        }

        return dispatch(setUserAction);


    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }

}

export const logout = () => async (dispatch: Dispatch<Action>) => {
    const response = await fetch('/api/auth/logout', {
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        const removeUserAction: RemoveUserAction = {
            type: ActionTypes.REMOVE_USER
        }
        dispatch(removeUserAction);
    }
};


export const signUp = (
    firstName: string,
    lastName: string,
    email: string,
    password: string
) => async (dispatch: Dispatch<Action>) => {
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        const setUserAction: SetUserAction = {
            type: ActionTypes.SET_USER,
            payload: data,
        };

        dispatch(setUserAction); // Dispatch the action directly
        return setUserAction; // Return the action object

    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.'];
    }
};