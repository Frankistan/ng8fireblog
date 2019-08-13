import { Component, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import { FormGroup } from "@angular/forms";
import { SettingsService, I18nService } from "@app/shared";
import { takeUntil, map } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppState } from "@app/store/reducers/app.reducer";
import { User } from "@app/models/user";

@Component({
	selector: "app-settings",
	templateUrl: "./settings.component.html",
	styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements  OnDestroy {

	settingsForm: FormGroup;
	user: User;
	private _destroy = new Subject<any>();

	constructor(
		private settingsService: SettingsService,
		private i18n: I18nService,
		private store: Store<AppState>
	) {

		this.settingsForm = this.settingsService.form;

		this.store.select('layout')
			.pipe(
				takeUntil(this._destroy)
			)
			.subscribe(layout => {
				this.settingsForm.patchValue(layout);
			});

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
		this.settingsService.save(this.settingsForm.value, this.user);
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
