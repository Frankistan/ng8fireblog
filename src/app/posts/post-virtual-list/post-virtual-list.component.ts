import { Component, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { CoreService, PaginationService } from "@app/shared";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
	selector: 'app-post-virtual-list',
	templateUrl: './post-virtual-list.component.html',
	styleUrls: ['./post-virtual-list.component.scss'],
})
export class PostVirtualListComponent implements AfterViewInit{
	@ViewChild(CdkVirtualScrollViewport, { static: false })
	viewport: CdkVirtualScrollViewport;

	isMobile$: Observable<boolean> = this._bpo
		.observe(Breakpoints.XSmall)
		.pipe(map(result => result.matches));

	theEnd = false;
	virtualViewport: CdkVirtualScrollViewport;

	constructor(
		public core: CoreService,
		public page: PaginationService,
		private _bpo: BreakpointObserver,
		private cd: ChangeDetectorRef
	) {
		this.page.reset();
		this.page.init("posts", "created_at", {
			reverse: true
		});
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