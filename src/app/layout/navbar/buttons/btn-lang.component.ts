import { Component } from "@angular/core";
import { I18nService } from "@app/shared";
import { Store } from "@ngrx/store";
import { AppState } from "@app/store/reducers/app.reducer";
import { map, tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { AppSetSettings } from '@app/store/actions/layout.actions';

@Component({
	selector: "btn-lang",
	template: `
        <button fxHide.xs="true" mat-button [matMenuTriggerFor]="langMenu" *ngIf="set$ | async">
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
			<ng-template matMenuContent>
				<button
					mat-menu-item
					*ngFor="let language of languages"
					(click)="setLanguage(language)">
					<img
						class="flag flag-{{ language.split('-')[1].toLocaleLowerCase() }}"/>
					{{ language.split("-")[1] == "ES" ? "Español" : "English" }}
				</button>
			</ng-template>
        </mat-menu>
    `
})
export class BtnLangComponent {
	settings: { language: string; isDarkTheme: boolean; };
	set$: Observable<any>;

	constructor(
		private i18nService: I18nService,
		private store: Store<AppState>
	) {
		this.set$ = this.store.select('layout').pipe(
			map(state => {
				return {
					language: state.language,
					isDarkTheme: state.isDarkTheme
				}
			}),
			tap(settings => this.settings = settings)
		);
	}

	setLanguage(language: string) {
		// this.i18nService.language = language;
		this.settings.language = language;
		this.store.dispatch(new AppSetSettings(this.settings));
	}

	get currentLanguage(): string {
		return this.i18nService.language.split("-")[1] == "ES"
			? "Español"
			: "English";
	}

	get languages(): any {
		return this.i18nService.supportedLanguages;
	}
}
