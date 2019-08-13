import { Action } from '@ngrx/store';

// FUENTE: https://mherman.org/blog/authentication-in-angular-with-ngrx/
// FUENTE: https://mherman.org/blog/authentication-in-angular-with-ngrx/
export enum AuthActionTypes {
	SET_CURRENT_USER = "[Auth] Set authenticated User",
	SET_AUTHENTICATED = "[Auth] Set authenticated",
	SET_UNAUTHENTICATED = "[Auth] Set unauthenticated",
	LOGIN = '[Auth] Login',
	LOGIN_SUCCESS = '[Auth] Login Success',
	LOGIN_FAILURE = '[Auth] Login Failure',
	SIGNUP = '[Auth] Signup',
	SIGNUP_SUCCESS = '[Auth] Signup Success',
	SIGNUP_FAILURE = '[Auth] Signup Failure',
	LOGOUT = '[Auth] Logout',
	GET_STATUS = '[Auth] GetStatus',
	GET_AUTH_USER = "[Auth] GET_AUTH_USER"
}

export class SetAuthenticatedUser implements Action {
	readonly type = AuthActionTypes.SET_CURRENT_USER;
	constructor(public payload: any) { }
}

export class SetAuthenticated implements Action {
	readonly type = AuthActionTypes.SET_AUTHENTICATED;
}

export class SetUnauthenticated implements Action {
	readonly type = AuthActionTypes.SET_UNAUTHENTICATED;
}


export class LogIn implements Action {
	readonly type = AuthActionTypes.LOGIN;
	constructor(public payload: any) { }
}

export class LogInSuccess implements Action {
	readonly type = AuthActionTypes.LOGIN_SUCCESS;
	constructor() { }
}

// export class LogInFailure implements Action {
// 	readonly type = AuthActionTypes.LOGIN_FAILURE;
// 	constructor(public payload: any) { }
// }

export class SignUp implements Action {
	readonly type = AuthActionTypes.SIGNUP;
	constructor(public payload: any) { }
}

export class SignUpSuccess implements Action {
	readonly type = AuthActionTypes.SIGNUP_SUCCESS;
	constructor(public payload: any) { }
}

export class SignUpFailure implements Action {
	readonly type = AuthActionTypes.SIGNUP_FAILURE;
	constructor(public payload: any) { }
}

export class LogOut implements Action {
	readonly type = AuthActionTypes.LOGOUT;
}

export class GetStatus implements Action {
	readonly type = AuthActionTypes.GET_STATUS;
}

export type AuthActions =
	SetAuthenticatedUser	
	| SetAuthenticated
	| SetUnauthenticated
	| LogIn
	| LogInSuccess
	// | LogInFailure
	| SignUp
	| SignUpSuccess
	| SignUpFailure
	| LogOut
	| GetStatus;