import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad } from '@angular/router';
import { AuthService } from '@app/shared/services/auth.service';
import { NotificationService } from '@app/shared/services/notification.service';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Store } from "@ngrx/store";
import { AppState } from '@app/store/reducers/app.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
	constructor(
		private _auth: AuthService,
		private _rtr: Router,
		private _ntf: NotificationService,
		private store: Store<AppState>
	) { }

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		return this._auth.isAuthenticated.pipe(map<boolean, boolean>((isAuthenticated: boolean) => {
			if (!isAuthenticated) {
				this._ntf.open('toast.server.access_denied', 'toast.close', 1500);
				this._rtr.navigate(['/auth/login']);

				// not logged in so redirect to login page with the return url and return false
				// this._rtr.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
			}
			return isAuthenticated;
		}));

		// return this.store.select(fromApp.getIsAuth).pipe(

		//     map(isAuthenticated => {
		//         if (!isAuthenticated) {
		//             this._ntf.open('toast.server.access_denied', 'toast.close', 1500);
		//             this._rtr.navigate(['/auth/login']);
		//         }
		//         return isAuthenticated;
		//     }),
		//     take(1)
		// );
	}

	canLoad(): Observable<boolean> | Promise<boolean> | boolean {

		return this._auth.isAuthenticated.pipe(
			map(authenticated => {

				if (!authenticated) {
					this._rtr.navigate(['/auth/login']);
				}
				return authenticated;
			}),
			take(1)
		);
	}
}
