import { Component, OnInit, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "@app/store/reducers/app.reducer";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
    selector: "app-post-element",
    templateUrl: "./post-element.component.html",
    styleUrls: ["./post-element.component.scss"]
})
export class PostElementComponent implements OnInit {
    @Input() post;
    @Input() index;
	mode$: Observable<boolean>;

    constructor(
		private store: Store<AppState>
		) {}

    ngOnInit() {
		this.mode$ = this.store.select('layout').pipe(
			map( state => state.isListView)
		);
	}
}
