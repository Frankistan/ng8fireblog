import { Component, OnInit } from "@angular/core";
import { ScrollTrackerEventData } from "@nicky-lenaers/ngx-scroll-tracker";
import { CoreService, PaginationService } from "@app/shared";
import { Subject, Observable } from "rxjs";
import { State } from "@app/store/reducers/post.reducer";
import { Store } from "@ngrx/store";
import { Post } from "@app/models/post";
import { map, distinctUntilChanged } from "rxjs/operators";
import { SetPosts, SetPostsFilters } from "@app/store/actions/post.actions";

@Component({
	selector: "app-post-list",
	templateUrl: "./post-list.component.html",
	styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit {
	scrollPosition: number;
	scrollableElement: Element;
	destroy = new Subject<any>();
	posts$: Observable<Post[]>;
	mode$: Observable<boolean>;
	isSearchOpened$: Observable<boolean>;

	constructor(
		public core: CoreService,
		public page: PaginationService,
		private store: Store<State>
	) { }

	ngOnInit() {
		
		// this.store.dispatch( new SetPosts());

		this.store.dispatch(new SetPostsFilters({
			collection: "posts",
			orderBy: "created_at",
			opts: {
				reverse: true
			}
		}));
		
		this.posts$ = this.store.select('posts').pipe(
			distinctUntilChanged(),
			map(state => state.posts)
		);

		this.mode$ = this.store.select('layout').pipe(
			map( state => state.isListView)
		);

		this.isSearchOpened$ = this.store.select('layout').pipe(
			map(state => state.isSearchOpened)
		)

	}

	scrollListener(eventData: ScrollTrackerEventData) {
		const nEl = eventData.elementRef.nativeElement;
		const sEl = eventData.$event.srcElement;
		const top = sEl ? nEl.scrollTop : 0;
		const cheight = sEl ? nEl.clientHeight : 0;
		const height = nEl.scrollHeight;
		const offSet = 144;

		let scroll = sEl ? nEl.scrollTop : 0;

		if (scroll > this.scrollPosition) {
			this.core.isScrolling.next(false);
		} else {
			this.core.isScrolling.next(true);
			if (sEl) {
				this.scrollableElement = nEl;
			}
		}

		this.scrollPosition = scroll;

		if (scroll + cheight > height - offSet) {
			this.page.more();
		}

		if (top === 0) this.core.isScrolling.next(false);
	}
}
