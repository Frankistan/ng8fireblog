import { Component, Input, OnInit } from '@angular/core';
import { AuthService, I18nService } from '@app/shared';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, tap } from 'rxjs/operators';
import { MatSidenav } from '@angular/material';
import { Observable, Subject } from 'rxjs';
// import { State } from "@app/store/reducers/post.reducer";
import { AppState } from "@app/store/reducers/app.reducer";
import { Store } from '@ngrx/store';
import { getIsAuth } from '@app/store/reducers/auth.reducer';
import { Logout } from '@app/store/actions/auth.actions';

@Component({
	selector: 'app-main-bar',
	templateUrl: './main-bar.component.html',
	styleUrls: ['./main-bar.component.css']
})
export class MainBarComponent implements OnInit {

	@Input("drawer") drawer: MatSidenav;

	@Input("filterNavRef") filterNavRef: MatSidenav;
	@Input("url") url: string;

	isMobile$: Observable<boolean> = this._bpo
		.observe(Breakpoints.XSmall)
		.pipe(map(result => result.matches));

	isHandset$: Observable<boolean> = this._bpo
		.observe(Breakpoints.Handset)
		.pipe(map(result => result.matches));

	destroy = new Subject<any>();
	isSearchOpened: boolean = false;
	isSearching: boolean = false;
	isAuthenticated$: Observable<boolean>;
	postId$: Observable<any>;

	constructor(
		private _bpo: BreakpointObserver,
		public auth: AuthService,
		public i18n: I18nService,
		private store: Store<AppState>
	) {

		// this.postId$ = this.store.select('posts').pipe(
		// 	// filter(state => state.post != null),
		// 	map(state => state.post.id),
		// 	tap(id => console.log('id: ', id))
		// );

	}

	ngOnInit(){
		this.isAuthenticated$ = this.store.select(getIsAuth);
	}

	logout() {
		this.store.dispatch(new Logout());
	}

}
