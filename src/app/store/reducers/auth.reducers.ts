import { User } from '../../models/user';
import {AuthActionTypes, All} from "../actions/auth.actions";

// Immutable data structure to represent the state of the application

export interface State {
    // is a user authenticated?
    isAuthenticated: boolean;
    // if authenticated, there should be a user object
    user: User | null;
    // error message
    errorMessage: string | null;
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
};

export function reducer(state = initialState, action: All): State{

    // You can create a variable for the remaining items in a list using the syntax ...:
    // let [first, ...rest] = [1, 2, 3, 4];
    // console.log(first); // outputs 1
    // console.log(rest); // outputs [ 2, 3, 4 ]

    switch(action.type){
        case AuthActionTypes.LOGIN_SUCCESS: {
            return {
                ...state,        // ...variable kennzeichnet den Rest einer Liste
                isAuthenticated: true,
                user: {
                    token: action.payload.token,
                    email: action.payload.email
                },
                errorMessage: null
            };
        }
        case AuthActionTypes.LOGIN_FAILURE: {
            return {
                ...state,
                errorMessage: 'Incorrect email and/or password.'
            };
        }

        case AuthActionTypes.SIGNUP_SUCCESS: {
            return {
                ...state,        // ...variable kennzeichnet den Rest einer Liste
                isAuthenticated: true,
                user: {
                    token: action.payload.token,
                    email: action.payload.email
                },
                errorMessage: null
            };
        }
        case AuthActionTypes.LOGIN_FAILURE: {
            return {
                ...state,
                errorMessage: 'Incorrect email and/or password.'
            };
        }

        case AuthActionTypes.SIGNUP_FAILURE: {
            return {
                ...state,
                errorMessage: 'Email already in use'
            };
        }


        default: {
            return state;
        }
    }
}