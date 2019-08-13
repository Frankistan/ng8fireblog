import { Component, OnInit, OnDestroy } from "@angular/core";
import { SettingsService, I18nService } from "@app/shared";
import { Store } from "@ngrx/store";
import { AppState } from "@app/store/reducers/app.reducer";
import { map, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { User } from "@app/models/user";

@Component({
    selector: "btn-lang",
    template: `
        <button fxHide.xs="true" mat-button [matMenuTriggerFor]="langMenu">
            {{ 'navbar.language' | translate  }}
        </button>
        <button
            fxHide.gt-xs="true"
            matTooltip="{{ 'tooltips.language' | translate }}"
            [matTooltipClass]="'tooltip'"
            mat-icon-button
            [matMenuTriggerFor]="langMenu"
        >
            <mat-icon>language</mat-icon>
        </button>
        <mat-menu #langMenu="matMenu">
            <button
                mat-menu-item
                *ngFor="let language of languages"
                (click)="setLanguage(language)"
            >
                <img
                    class="flag flag-{{ language.split('-')[1].toLocaleLowerCase() }}"
                />
                {{ language.split("-")[1] == "ES" ? "Español" : "English" }}
            </button>
        </mat-menu>
    `
})
export class BtnLangComponent implements OnDestroy {
	private _destroy = new Subject<any>();
	user: User;

    constructor(
        private _settings: SettingsService,
		private i18nService: I18nService,
		private store: Store<AppState>
    ) {
		this.store.select('auth')
		.pipe(
			map(state => state.user),
			takeUntil(this._destroy)
		)
		.subscribe(user => this.user = user);
	}

    setLanguage(language: string) {
        this.i18nService.language = language;

        let settings = {
            language: language
        };

        this._settings.save(settings,this.user);
    }

    get currentLanguage(): string {
        return this.i18nService.language.split("-")[1] == "ES"
            ? "Español"
            : "English";
    }

    get languages(): any {
        return this.i18nService.supportedLanguages;
	}
	
	ngOnDestroy(): void {
        this._destroy.next();
    }
}
