import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum AuthActionTypes {
	LOGIN = '[Auth] LOGIN',
	LOGIN_SUCCESS = '[Auth] LOGIN_SUCCESS',
	LOGIN_FAILURE = '[Auth] LOGIN_FAILURE',
	SIGNUP = '[Auth] SIGNUP',
	SIGNUP_SUCCESS = '[Auth] SIGNUP_SUCCESS',
	SIGNUP_FAILURE = '[Auth] SIGNUP_FAILURE',
	RESET_PASSWORD = '[Auth] RESET_PASSWORD',
	RESET_PASSWORD_SUCCESS = '[Auth] RESET_PASSWORD_SUCCESS',
	RESET_PASSWORD_FAILURE = '[Auth] RESET_PASSWORD_FAILURE',
	VERIFY_ACCOUNT = '[Auth] VERIFY_ACCOUNT',
	VERIFY_ACCOUNT_SUCCESS = '[Auth] VERIFY_ACCOUNT_SUCCESS',
	VERIFY_ACCOUNT_FAILURE = '[Auth] VERIFY_ACCOUNT_FAILURE',
	LOGOUT = '[Auth] LOGOUT',
	LOGOUT_SUCCESS = '[Auth] LOGOUT_SUCCESS',
	LOGOUT_FAILURE = '[Auth] LOGOUT_FAILURE',
	GET_USER = "[Auth] GET USER",
	AUTH_USER = "[Auth] Authenticated User",
	NOT_AUTH_USER = "[Auth] Not Authenticated User",
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */

export class GetUser implements Action {
	readonly type = AuthActionTypes.GET_USER;
}


export class Login implements Action {
	readonly type = AuthActionTypes.LOGIN;

	constructor(public payload: {}) { }
}

export class LoginSuccess implements Action {
	readonly type = AuthActionTypes.LOGIN_SUCCESS;

	constructor(public payload: any) { }
}

export class LoginFailure implements Action {
	readonly type = AuthActionTypes.LOGIN_FAILURE;

	constructor(public payload: any) { }
}

export class Signup implements Action {
	readonly type = AuthActionTypes.SIGNUP;

	constructor(public payload: any) { }
}

export class SignupSuccess implements Action {
	readonly type = AuthActionTypes.SIGNUP_SUCCESS;

	constructor(public payload: any) { }
}

export class SignupFailure implements Action {
	readonly type = AuthActionTypes.SIGNUP_FAILURE;

	constructor(public payload: any) { }
}

export class ResetPassword implements Action {
	readonly type = AuthActionTypes.RESET_PASSWORD;

	constructor(public payload: any) { }
}

export class ResetPasswordSuccess implements Action {
	readonly type = AuthActionTypes.RESET_PASSWORD_SUCCESS;

	constructor(public payload: any) { }
}

export class ResetPasswordFailure implements Action {
	readonly type = AuthActionTypes.RESET_PASSWORD_FAILURE;

	constructor(public payload: any) { }
}

export class VerifyAccount implements Action {
	readonly type = AuthActionTypes.VERIFY_ACCOUNT;

	constructor(public payload: any) { }
}

export class VerifyAccountSuccess implements Action {
	readonly type = AuthActionTypes.VERIFY_ACCOUNT_SUCCESS;

	constructor(public payload: any) { }
}

export class VerifyAccountFailure implements Action {
	readonly type = AuthActionTypes.VERIFY_ACCOUNT_FAILURE;

	constructor(public payload: any) { }
}

export class Logout implements Action {
	readonly type = AuthActionTypes.LOGOUT;

	constructor(public payload?: any) { }
}

export class LogoutSuccess implements Action {
	readonly type = AuthActionTypes.LOGOUT_SUCCESS;

	constructor(public payload?: any) { }
}

export class LogoutFailure implements Action {
	readonly type = AuthActionTypes.LOGOUT_FAILURE;

	constructor(public payload: any) { }
}

export class AuthenticatedUser implements Action {
	readonly type = AuthActionTypes.AUTH_USER;

	constructor(public payload?: any) { }
}

export class NotAuthenticatedUser implements Action {
	readonly type = AuthActionTypes.NOT_AUTH_USER;

	constructor(public payload?: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type AuthActions =
	Login
	| LoginSuccess
	| LoginFailure
	| Signup
	| SignupSuccess
	| SignupFailure
	| ResetPassword
	| ResetPasswordSuccess
	| ResetPasswordFailure
	| VerifyAccount
	| VerifyAccountSuccess
	| VerifyAccountFailure
	| Logout
	| LogoutSuccess
	| LogoutFailure
	| AuthenticatedUser
	| NotAuthenticatedUser

	;
