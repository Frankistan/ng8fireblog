import { AuthActionTypes, AuthActions } from '../actions/auth.actions';
import { User } from '@app/models/user';

export interface State {
	// is a user authenticated?
	isAuthenticated: boolean;
	// if authenticated, there should be a user object
	user: User | null;
	// error 
	error: any;
}

export const initialState: State = {
	isAuthenticated: false,
	user: null,
	error: null
};


export function reducer(state = initialState, action: AuthActions): State {
	switch (action.type) {
		case AuthActionTypes.SET_CURRENT_USER:
			return {
				...state,
				user: action.payload,
				isAuthenticated: true
			};
		case AuthActionTypes.SET_AUTHENTICATED:
			return {
				...state,
				isAuthenticated: true
			};
		case AuthActionTypes.SET_UNAUTHENTICATED:
			return {
				...state,
				isAuthenticated: false,
				error: null
			};
		case AuthActionTypes.LOGIN_SUCCESS: {
			return {
				...state,
				isAuthenticated: true,
				error: null
			};
		}
		// case AuthActionTypes.LOGIN_FAILURE: {
		// 	return {
		// 		...state,
		// 		error: action.payload
		// 	};
		// }
		case AuthActionTypes.SIGNUP_SUCCESS: {
			return {
				...state,
				isAuthenticated: true,
				user: action.payload, 
				error: null
			};
		}
		case AuthActionTypes.SIGNUP_FAILURE: {
			return {
				...state,
				error: action.payload
			};
		}
		case AuthActionTypes.LOGOUT: {
			return initialState;
		}
		default:
			return state;
	}
}

export const getIsAuthenticated = (state: State) => state.isAuthenticated;