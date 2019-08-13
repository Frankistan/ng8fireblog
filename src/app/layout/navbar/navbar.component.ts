import { Component, Input, OnDestroy } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { MatSidenav } from "@angular/material";
import {
	AuthService,
	I18nService,
	CoreService,
	PaginationService
} from "@app/shared";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { map, filter, takeUntil, distinctUntilChanged, tap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import * as fromApp from "@app/store/reducers/app.reducer";
import { SetSearchbarOpenStatus, SetHaveSearched } from "@app/store/actions/layout.actions";
import { State } from "@app/store/reducers/post.reducer";

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnDestroy {
	@Input("drawer") drawer: MatSidenav;

	@Input("filterNavRef") filterNavRef: MatSidenav;

	isMobile$: Observable<boolean> = this._bpo
		.observe(Breakpoints.XSmall)
		.pipe(map(result => result.matches));

	isHandset$: Observable<boolean> = this._bpo
		.observe(Breakpoints.Handset)
		.pipe(map(result => result.matches));

	destroy = new Subject<any>();
	url: BehaviorSubject<string> = new BehaviorSubject("");
	router$: Observable<ActivatedRoute>;
	isSearchOpened: boolean = false;
	isSearching: boolean = false;
	isAuthenticated$: Observable<boolean>;
	postId$: Observable<any>;

	constructor(
		private _bpo: BreakpointObserver,
		private _route: ActivatedRoute,
		private _rtr: Router,
		public auth: AuthService,
		public i18n: I18nService,
		private core: CoreService,
		private page: PaginationService,
		private store: Store<State>
	) {

		this.store.select('layout')
			.pipe(
				distinctUntilChanged(),
				takeUntil(this.destroy))
			.subscribe(state => {
				this.isSearching = state.isSearchOpened;
				this.isSearchOpened = state.isSearching;
			})

		this.isAuthenticated$ = this.store.select(fromApp.getIsAuth);

		this.postId$ = this.store.select('posts').pipe(
			// filter(state => state.post != null),
			map(state => state.post.id),
			tap( id => console.log('id: ',id))
			)

		this._rtr.events
			.pipe(
				filter(event => event instanceof NavigationEnd),
				map((event: NavigationEnd) => {
					this.url.next(event.url);

					if (this.isSearching && event.url == "/posts") {
						this.page.reset();
						this.page.init("posts", "created_at", {
							reverse: true
						});

						this.store.dispatch(new SetHaveSearched(false));
					}


					this.store.dispatch(new SetSearchbarOpenStatus(event.url === "/posts(search:search)"));

					return this._route;
				}),
				map(route => {
					while (route.firstChild) route = route.firstChild;
					return route;
				}),
				filter(route => route.outlet === "primary")
			)
			.subscribe((event: ActivatedRoute) => {
				// this.postId.next(event.snapshot.params["id"]);
			});
	}

	ngOnDestroy(): void {
		this.destroy.next();
	}
}
