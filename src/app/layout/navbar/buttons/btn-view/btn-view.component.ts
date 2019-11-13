import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "@app/store/reducers/app.reducer";
import { Observable } from "rxjs";
import { MenuToggleViewMode } from '@app/store/actions/layout.actions';
import { getMenuViewMode } from '@app/store/reducers/layout.reducer';
import { tap } from 'rxjs/operators';

@Component({
	selector: "btn-view",
	templateUrl: "./btn-view.component.html",
	styleUrls: ["./btn-view.component.css"]
})
export class BtnViewComponent implements OnInit {
	mode$: Observable<boolean>;
	mode: boolean;

	constructor(private store: Store<AppState>) { }

	ngOnInit() {
		this.mode$ = this.store.select(getMenuViewMode)
			.pipe(tap(mode => this.mode = mode));
	}

	changeView() {
		this.store.dispatch(new MenuToggleViewMode(!this.mode));
	}
}
