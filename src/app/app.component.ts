import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import {
	Router,
	ActivatedRoute,
	NavigationEnd
} from "@angular/router";
import { Title } from "@angular/platform-browser";
import { MatSidenav } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import { Observable, merge, Subject } from "rxjs";
import { map, filter, mergeMap, tap, takeUntil } from "rxjs/operators";
import { environment } from "@env/environment";
import { Store } from "@ngrx/store";
import * as fromApp from "@app/store/reducers/app.reducer";
import * as fromLayout from "@app/store/actions/layout.actions";
import { AppState } from "@app/store/reducers/app.reducer";
import { SetAuthenticatedUser } from "./store/actions/auth.actions";
import { GeolocationService, I18nService, NotificationService, AuthService } from './shared';


@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
	@ViewChild("drawer", { static: false }) drawer: MatSidenav;

	isMobile$: Observable<boolean> = this._bpo
		.observe(Breakpoints.XSmall)
		.pipe(map(result => result.matches));

	isHandset$: Observable<boolean> = this._bpo
		.observe(Breakpoints.Handset)
		.pipe(map(result => result.matches));

	isLoading$: Observable<boolean>;
	isAuthenticated$: Observable<boolean>;
	isDarkTheme$: Observable<boolean>;
	destroy = new Subject<any>();

	constructor(
		private store: Store<AppState>,
		private _aRoute: ActivatedRoute,
		private _bpo: BreakpointObserver,
		private _geo: GeolocationService,
		private _i18n: I18nService,
		private _ntf: NotificationService,
		private _rtr: Router,
		private _title: Title,
		private _trans: TranslateService,
		public auth: AuthService,
	) {
		// THEME CENTER
		this.isDarkTheme$ = this.store.select('layout')
			.pipe(
				map(state => state.isDarkTheme)
			);

		this.isAuthenticated$ = this.store.select(fromApp.getIsAuth);
		this.isLoading$ = this.store.select(fromApp.getIsLoading);

		// ERRORS CENTER
		this.store.select('layout')
			.pipe(
				map(state => state.error),
				filter(error => error != null),
				takeUntil(this.destroy)
			).subscribe(error => {
				this._ntf.open("toast.firebase." + error, "toast.close");
				this.store.dispatch(new fromLayout.UnsetFirebaseError());
			});

		// GET USER LOCATION ON APP INIT
		this._geo.getCurrentPosition()
			.pipe(takeUntil(this.destroy))
			.subscribe(position => {
				this._geo.setPosition = position.coords;
			});



		this.auth.user
			.pipe(
				filter(user => user != null),
				tap(user => {
					this.store.dispatch(new SetAuthenticatedUser(user))
				}),
				takeUntil(this.destroy)
			)
			.subscribe();
	}

	ngOnInit() {
		// Setup translations
		this._i18n.init(
			environment.defaultLanguage,
			environment.supportedLanguages
		);

		const onNavigationEnd = this._rtr.events.pipe(
			filter(event => event instanceof NavigationEnd)
		);

		// Change page title on navigation or language change, based on route data
		merge(this._trans.onLangChange, onNavigationEnd)
			.pipe(
				map(() => {
					let route = this._aRoute;
					while (route.firstChild) {
						route = route.firstChild;
					}
					return route;
				}),
				filter(route => route.outlet === "primary"),
				mergeMap(route => route.data),
				takeUntil(this.destroy)
			)
			.subscribe(event => {
				const title = "title." + event["title"];

				if (title) {
					this._i18n.breadcrumb.next(title);
					this._title.setTitle(
						this._trans.instant(title)
					);
				}
			});
	}

	close() {
		this.isMobile$
			.pipe(takeUntil(this.destroy))
			.subscribe(result => {
				if (result) this.drawer.close();
			});
	}

	ngOnDestroy(): void {
		this.destroy.next();
	}
}
