import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType, } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of, Observable, from } from 'rxjs';
import { catchError, map, switchMap, tap, mergeMap } from 'rxjs/operators';
import { AuthActionTypes, Login, LoginSuccess, LoginFailure, LogoutSuccess, LogoutFailure, AuthenticatedUser, NotAuthenticatedUser } from '../actions/auth.actions';
import { AuthService } from '@app/shared';
import { AppSetSettings } from '../actions/layout.actions';

@Injectable()
export class AuthEffects {
	constructor(
		private action$: Actions,
		private auth: AuthService,
		private _rtr: Router, ) { }

	@Effect()
	login$: Observable<Action> = this.action$.pipe(
		ofType(AuthActionTypes.LOGIN),
		map((action: Login) => action.payload),
		switchMap(credentials => from(this.auth.login(credentials))),
		switchMap(_ => this.auth.user),
		mergeMap(user => {
			if (user) {
				return [
					new LoginSuccess(user),
					new AppSetSettings(user['settings'])
				]
			}
		}),
		tap(_ => this._rtr.navigate(["/posts"])),
		catchError(error => of(new LoginFailure(error)))
	);

	@Effect()
	getUser$: Observable<Action> = this.action$.pipe(
		ofType(AuthActionTypes.GET_USER),
		switchMap(_ => this.auth.user),
		map(user => {
			if (user) {
				return new AuthenticatedUser(user);
			}
			else {
				return new NotAuthenticatedUser()
			}
		}),
		catchError(error => of(new NotAuthenticatedUser()))
	);

	@Effect()
	logout$: Observable<Action> = this.action$.pipe(
		ofType(AuthActionTypes.LOGOUT),
		// switchMap(_ => from( this.auth.logout() ) ),
		switchMap(_ => from(this.auth.auth.signOut())),
		map(_ => new LogoutSuccess()),
		catchError(error => of(new LogoutFailure(error)))
	);

	logoutSuccess$: Observable<Action> = this.action$.pipe(
		ofType(AuthActionTypes.LOGOUT_SUCCESS),
	);

	logoutFail$: Observable<Action> = this.action$.pipe(
		ofType(AuthActionTypes.LOGOUT_FAILURE),
		tap((action: LogoutFailure) => action.payload),
		tap(error => console.log('error: ', error))
	);
}