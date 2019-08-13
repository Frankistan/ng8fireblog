import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SetSettings, LayoutActionTypes, SetSettingsSuccess } from '../actions/layout.actions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { I18nService } from '@app/shared';

@Injectable()
export class LayoutEffects {

	constructor(
		private actions$: Actions,
		private i18n: I18nService, ) { }

	@Effect()
	setLayoutSettings: Observable<Action> = this.actions$
		.pipe(
			ofType<SetSettings>(LayoutActionTypes.SET_SETTINGS),
			map((action: SetSettings) => action.payload),
			map((settings) => {
				this.i18n.language = settings.language;
				return new SetSettingsSuccess();
			})
		);

}
