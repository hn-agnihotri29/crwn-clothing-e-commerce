import { AnyAction } from 'redux';

import {
  signInSuccess,
  signOutSuccess,
  signInFailed,
  signUpFailed,
  signOutFailed,
} from './user.action';

import { Userdata } from '../../utils/firebase/firebase.utils';

export type UserState = {
    readonly currentUser: Userdata | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
  };

const INITIAL_STATE : UserState = {
    currentUser: null,
    isLoading: false,
    error: null
}


export const userReducer = (state = INITIAL_STATE, action : AnyAction) => {
// payload store the value that is important for reducer to know what to update

    if (signInSuccess.match(action)) {
        return { ...state, currentUser: action.payload };
    }

    if (signOutSuccess.match(action)) {
        return { ...state, currentUser: null };
    }

    if ( signOutFailed.match(action) || signInFailed.match(action) || signUpFailed.match(action)) {
        return { ...state, error: action.payload };
    }

    return state;
}
  
