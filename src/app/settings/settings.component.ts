import { Component, OnDestroy } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { FormGroup } from "@angular/forms";
import { SettingsService, I18nService } from "@app/shared";
import { takeUntil, map, tap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppState } from "@app/store/reducers/app.reducer";
import { User } from "@app/models/user";
import { SettingsPageSave } from '@app/store/actions/layout.actions';

@Component({
	selector: "app-settings",
	templateUrl: "./settings.component.html",
	styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnDestroy {

	settingsForm: FormGroup;
	user: User;
	private _destroy = new Subject<any>();
	settings$: Observable<any>;

	constructor(
		private settingsService: SettingsService,
		private i18n: I18nService,
		private store: Store<AppState>
	) {

		this.settingsForm = this.settingsService.form;

		this.settings$ = this.store.select('layout')
			.pipe(
				tap(layout => this.settingsForm.patchValue(layout))
			);


		this.store.select('auth')
			.pipe(
				map(state => state.user),
				takeUntil(this._destroy)
			)
			.subscribe(user => this.user = user);
	}


	// canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
	// 	this.save();
	// 	return true;
	// }

	save() {
		const NUser = {
			...this.user,
			settings: this.settingsForm.value
		};

		this.store.dispatch(new SettingsPageSave(NUser));
	}

	get language(): string {
		return this.i18n.language;
	}

	get languages(): any {
		return this.i18n.supportedLanguages;
	}

	ngOnDestroy(): void {
		this._destroy.next();
	}
}
