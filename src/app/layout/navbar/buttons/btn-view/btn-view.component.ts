import { Component, OnInit } from "@angular/core";
import { CoreService } from "@app/shared";
import { Store } from "@ngrx/store";
import { AppState } from "@app/store/reducers/app.reducer";
import { SetViewMode } from "@app/store/actions/layout.actions";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
    selector: "btn-view",
    templateUrl: "./btn-view.component.html",
    styleUrls: ["./btn-view.component.css"]
})
export class BtnViewComponent implements OnInit {
    listView: boolean = true;
	mode$: Observable<boolean>;

    constructor(
		public core: CoreService,
		private store: Store<AppState>
		) {}

    ngOnInit() {
		this.mode$ = this.store.select('layout').pipe(
			map( state => state.isListView)
		);
	}

    changeView() {
        this.listView = !this.listView;
		// this.core.isListView.next(this.listView);
		this.store.dispatch(new SetViewMode(this.listView));
    }
}
