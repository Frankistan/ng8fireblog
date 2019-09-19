import { Component, OnInit, OnDestroy } from "@angular/core";
import {
	FormGroup,
	FormBuilder,
	Validators,
	AbstractControl
} from "@angular/forms";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { SetPostsFilters } from "@app/store/actions/post.actions";
import { Store } from "@ngrx/store";
import { State } from "@app/store/reducers/post.reducer";
import { SetSearchbarOpenStatus, SetHaveSearched } from "@app/store/actions/layout.actions";
import {
	map,
	distinctUntilChanged,
	debounceTime,
	takeUntil
} from "rxjs/operators";

@Component({
	selector: "app-searchbar",
	templateUrl: "./searchbar.component.html",
	styleUrls: ["./searchbar.component.css"]
})
export class SearchbarComponent implements OnInit, OnDestroy {
	searchForm: FormGroup;
	searchInput: AbstractControl;
	destroy = new Subject<any>();

	constructor(
		private _fb: FormBuilder,
		private _rtr: Router,
		private store: Store<State>
	) {
		this.createForm();
	}

	private createForm() {
		this.searchForm = this._fb.group({
			searchInput: ["", Validators.minLength(3)]
		});

		this.searchInput = this.searchForm.get("searchInput");
	}

	ngOnInit() {

		// this.store.select('layout')
		// 	.pipe(
		// 		map(state => state.isSearchOpened),
		// 		takeUntil(this.destroy))
		// 	.subscribe(isSearchOpened => {
		// 		if (!isSearchOpened) this._rtr.navigate([{ outlets: { search: null } }]);
		// 	});

		// this.core.isSearchOpened
		// 	.pipe(
		// 		takeUntil(this.destroy)
		// 	)
		// 	.subscribe(s => {
		// 		if (!s) this._rtr.navigate([{ outlets: { search: null } }]);
		// 	});

		this.searchInput.valueChanges
			.pipe(
				debounceTime(400),
				distinctUntilChanged(),
				map((term: string) => {
					this.store.dispatch(new SetHaveSearched(true));
					term = term.trim().toUpperCase();

					if (term.length < 3) return;

					this.store.dispatch(new SetPostsFilters({
						collection: "posts",
						orderBy: "created_at",
						opts: {
							search: term,
							reverse: true
						}
					}));
				}),
				takeUntil(this.destroy)
			)
			.subscribe();
	}

	clear() {
		this.searchForm.controls['searchInput'].setValue('');
	}

	close() {
		if (
			this.searchForm.valid &&
			this.searchForm.dirty &&
			this.searchForm.touched
		) {
			this.store.dispatch(new SetPostsFilters({
				collection: "posts",
				orderBy: "created_at",
				opts: {
					reverse: true
				}
			}));

			// this.store.dispatch(new SetHaveSearched(true));
		}

		// this.store.dispatch(new SetHaveSearched(false));
		// this.store.dispatch(new SetSearchbarOpenStatus(false));

		this._rtr.navigate(['/posts']);
	}

	ngOnDestroy(): void {
		this.destroy.next();
	}
}
