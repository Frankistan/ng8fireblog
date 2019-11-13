import { AuthActionTypes, AuthActions } from '../actions/auth.actions';
import { User } from '@app/models/user';
import { createSelector, createFeatureSelector } from '@ngrx/store';

//import or declare state

export interface State {
	// is a user authenticated?
	isAuthenticated: boolean;
	// if authenticated, there should be a user object
	user: User | null;
	// error 
	error: any;
	loading: boolean;
}

export const initialState: State = {
	isAuthenticated: false,
	user: null,
	error: null,
	loading: false
};

export function reducer(state = initialState, action: AuthActions): State {
	switch (action.type) {
		case AuthActionTypes.LOGIN: {
			return { ...state, loading: true };
		}

		case AuthActionTypes.LOGIN_SUCCESS: {
			return {
				...state,
				isAuthenticated: true,
				user: { ...action.payload },
				loading: false
			};
		}

		case AuthActionTypes.LOGIN_FAILURE: {
			return {
				...state,
				isAuthenticated: false,
				user: null,
				error: { ...action.payload },
				loading: false
			};
		}

		case AuthActionTypes.LOGOUT: {
			return {
				...state,
				loading: true
			};
		}

		case AuthActionTypes.LOGOUT_SUCCESS: {
			return {
				...initialState
			};
		}

		case AuthActionTypes.LOGOUT_FAILURE: {
			return {
				...state,
				error: { ...action.payload },
				loading: false
			};
		}

		case AuthActionTypes.AUTH_USER: {
			//add your code
			return {
				...state,
				isAuthenticated: true,
				user: { ...action.payload },
				loading: false
			};
		}

		case AuthActionTypes.NOT_AUTH_USER: {
			return {
				...state,
				isAuthenticated: false,
				user: null,
				error: { ...action.payload },
				loading: false
			};
		}
		

		default:
			return state;
	}
}

export const getAuthState = createFeatureSelector<State>('auth');

export const getIsAuth =
	createSelector(getAuthState, (state: State) => state.isAuthenticated);

export const getAuthUser = 
	createSelector(getAuthState, (state: State) => state.user);