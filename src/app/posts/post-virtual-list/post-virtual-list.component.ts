import { Component, ViewChild, AfterViewInit, ChangeDetectorRef, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { CoreService, PaginationService } from "@app/shared";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { MediaObserver , MediaChange } from "@angular/flex-layout";
import { AppState } from '@app/store/reducers/app.reducer';
import { getMenuViewMode } from '@app/store/reducers/layout.reducer';

@Component({
	selector: 'app-post-virtual-list',
	templateUrl: './post-virtual-list.component.html',
	styleUrls: ['./post-virtual-list.component.scss'],
})
export class PostVirtualListComponent implements OnInit,AfterViewInit{
	@ViewChild(CdkVirtualScrollViewport, { static: false })
	viewport: CdkVirtualScrollViewport;

	isMobile$: Observable<boolean> = this._bpo
		.observe(Breakpoints.XSmall)
		.pipe(map(result => result.matches));

	theEnd = false;
	virtualViewport: CdkVirtualScrollViewport;
	mode$: Observable<boolean>;
	isSearchOpened$: Observable<boolean>;
	rowHeight: string = "240px";
	cols$: Observable<number>;

	constructor(
		public core: CoreService,
		public page: PaginationService,
		private _bpo: BreakpointObserver,
		private cd: ChangeDetectorRef,
		private store: Store<AppState>,
		private screen: MediaObserver ,
	) {
		this.page.reset();
		this.page.init("posts", "created_at", {
			reverse: true
		});

		this.cols$ = this.screen.media$
        .pipe(
            map((change: MediaChange) => {
                let cols = 0;
                switch (change.mqAlias) {
                    case "xs":
                        cols = 2; // 'screen and (max-width: 599px)'
                        break;
                    case "sm":
                        cols = 3; // 'screen and (min-width: 600px) and (max-width: 959px)'
                        break;
                    case "md":
                        cols = 3; // 'screen and (min-width: 960px) and (max-width: 1279px)'
                        break;
                    case "lg":
                        cols = 4; // 'screen and (min-width: 1280px) and (max-width: 1919px)'
                        break;
                }
                return cols;
            }));
	}

	ngOnInit(): void {
		// this.mode$ = this.store.select('layout').pipe(
		// 	map( state => state.isListView),
		// 	// tap(_ => this.cd.detectChanges())
		// );
		this.mode$ = this.store.select(getMenuViewMode).pipe(tap(_ => this.cd.detectChanges()));
		
		// this.isSearchOpened$ = this.store.select('layout').pipe(
		// 	map(state => state.isSearchOpened)
		// )
	}

	nextBatch() {
		if (this.theEnd) {
			return;
		}

		const end = this.viewport.getRenderedRange().end;
		const total = this.viewport.getDataLength();

		// console.log(`${end}, '>=', ${total}`);

		if (end === total) {
			this.page.more();
		}
	}

	trackByIdx(i) {
		return i;
	}

	ngAfterViewInit(): void {
		// https://stackoverflow.com/questions/43375532/expressionchangedafterithasbeencheckederror-explained
		// FIX ERROR ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked
		this.virtualViewport = this.viewport;
		this.cd.detectChanges();
	}

}