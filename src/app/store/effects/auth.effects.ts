import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '@app/shared';
import { Observable, from } from 'rxjs';
import { Action } from '@ngrx/store';
import { AuthActionTypes, LogInSuccess,  LogIn, SetAuthenticatedUser } from '../actions/auth.actions';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '@app/models/user';
import { SetSettings, SetFirebaseError, UnsetFirebaseError } from '../actions/layout.actions';


@Injectable()
export class AuthEffects {

	constructor(
		private actions$: Actions,
		private auth: AuthService,
	) { }

	@Effect()
	loginUser: Observable<Action> = this.actions$.pipe(
		ofType<LogIn>(AuthActionTypes.LOGIN),
		map((action: LogIn) => action.payload),
		switchMap(credentials =>
			from(this.auth.login(credentials['email'], credentials['password']))
				.pipe(
					mergeMap(user => [ // EJECUTA 2 ACCIONES EN PARALELO
						new UnsetFirebaseError(),
						new LogInSuccess()
					]),
					catchError(error => of(new SetFirebaseError(error.code)))
				)
		));

	@Effect()
	loadSettings: Observable<Action> = this.actions$.pipe(
		ofType<SetAuthenticatedUser>(AuthActionTypes.SET_CURRENT_USER),
		map((action: SetAuthenticatedUser) => action.payload),
		map((user: User) => new SetSettings(user.settings))
	);

	// @Effect()
	// isAuthenticated: Observable<Action> = this.actions$.pipe(
	// 	ofType<SetAuthenticatedUser>(AuthActionTypes.SET_CURRENT_USER),
	// 	map((action: SetAuthenticatedUser) => action.payload),
	// 	map((user: User) => new SetSettings(user.settings))
	// );
}
