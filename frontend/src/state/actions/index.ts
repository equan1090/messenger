import {ActionTypes} from "../action-types";
export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}
export interface SetUserAction {
    type: ActionTypes.SET_USER,
    payload: User

}

export interface RemoveUserAction {
    type: ActionTypes.REMOVE_USER
}

export type Action = SetUserAction | RemoveUserAction;