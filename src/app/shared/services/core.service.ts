import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/reducers/app.reducer';
import { tap, filter, map, takeUntil } from 'rxjs/operators';
import { NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Router } from '@angular/router';
// import * as fromLayout from "@app/store/actions/layout.actions";

@Injectable()
export class CoreService {
    private _postId$: BehaviorSubject<string> = new BehaviorSubject("");
    postId: Observable<string> = this._postId$.asObservable();


    // darkTheme: BehaviorSubject<boolean> = new BehaviorSubject(false);
    isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
    isListView: BehaviorSubject<boolean> = new BehaviorSubject(true);
    isScrolling: BehaviorSubject<boolean> = new BehaviorSubject(false);
    isSearching: BehaviorSubject<boolean> = new BehaviorSubject(false);
    isSearchOpened: BehaviorSubject<boolean> = new BehaviorSubject(false);
	language: BehaviorSubject<string> = new BehaviorSubject("es");
	cRoute:BehaviorSubject<string> = new BehaviorSubject("");
	
	constructor(
		private store: Store<AppState>,
		private _rtr: Router,
		){
		
			// LOADING SPINNER CENTER
		this._rtr.events
			.pipe(
				tap(event => {
					switch (true) {
						case event instanceof NavigationStart:
							// this.store.dispatch(new fromLayout.StartLoading());
							break;

						case event instanceof NavigationEnd ||
							event instanceof NavigationCancel ||
							event instanceof NavigationError:
							// this.store.dispatch(new fromLayout.StopLoading());
							break;
					}
				}),
				filter(event => event instanceof NavigationEnd),
				map( (event:NavigationEnd ) => event.url),
				tap( url => this.cRoute.next(url)),
				tap( url => console.log(' core url: ',url)),
			)
			.subscribe();
	}
}
