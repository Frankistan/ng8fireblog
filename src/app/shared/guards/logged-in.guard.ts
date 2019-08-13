import { Injectable } from "@angular/core";
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	Router
} from "@angular/router";
import { AuthService, NotificationService } from "@app/shared";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppState } from "@app/store/reducers/app.reducer";

@Injectable()
export class LoggedInGuard implements CanActivate {
	constructor(
		private _auth: AuthService,
		private _rtr: Router,
		private _ntf: NotificationService,
		private store: Store<AppState>
	) { }

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		return this._auth.isAuthenticated.pipe(map<boolean, boolean>((isAuthenticated: boolean) => {
			if (isAuthenticated) {
				this._ntf.open('toast.logged_in', 'X', 1000);
				this._rtr.navigate(['/posts']);
			}
			return !isAuthenticated;
		}));

		// return this.store.select(fromApp.getIsAuth).pipe(

		//     map(loggedIn => {
		//         if (loggedIn) {
		//             this._ntf.open('toast.logged_in', 'X', 1000);
		//         this._rtr.navigate(['/posts']);
		//         }
		//         return !loggedIn;
		//     })
		// );
	}
}
