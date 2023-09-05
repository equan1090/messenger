import {Action} from '../actions/index';
import {ActionTypes} from "../action-types";


const initialState = {id: null, firstName: null, lastName: null, email: null};
const reducer = (state= initialState, action: Action) => {
    switch(action.type) {
        case ActionTypes.SET_USER:
            return {
                ...state,
                user: action.payload
            }
        case ActionTypes.REMOVE_USER:
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
}

export default reducer;