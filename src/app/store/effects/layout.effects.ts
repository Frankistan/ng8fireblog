import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of, Observable, from } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { GeolocationService, I18nService, SettingsService, NotificationService } from '@app/shared';
import { LayoutActionTypes, AppSetLocationSuccess, AppSetLocationFail, AppSetSettingsSuccess, AppSetSettingsFail, AppSetSettings, SettingsPageSave } from '../actions/layout.actions';
import { User } from '@app/models/user';

//import all requried services or any dependencies

@Injectable()
export class LayoutEffects {

	constructor(
		private action$: Actions,
		private _geo: GeolocationService,
		private i18n: I18nService,
		private settService: SettingsService,
		private _ntf: NotificationService,
	) { }



	@Effect()
	setLocation$: Observable<Action> = this.action$.pipe(
		ofType(LayoutActionTypes.APP_GET_LOCATION),
		switchMap(_ => this._geo.getCurrentPosition()),
		map( position => position['coords']),
		map( position => {
			this._geo.setPosition = position;
			return new AppSetLocationSuccess( this._geo.position);
		} ),
		catchError(error => of(new AppSetLocationFail())),
	);

	@Effect()
	setSettings$: Observable<Action> = this.action$.pipe(
		ofType(LayoutActionTypes.APP_SET_SETTINGS),
		map((action: AppSetSettings) => action.payload),
		map((settings) => {
			this.i18n.language = settings['language'];
			return new AppSetSettingsSuccess();
		}),
		catchError(error => of(new AppSetSettingsFail(error))),
	);

	@Effect()
	saveSettings$: Observable<Action> = this.action$.pipe(
		ofType(LayoutActionTypes.SETTINGS_PAGE_SAVE),
		map((action: SettingsPageSave) => action.payload),
		switchMap( (user:User) => from(this.settService.save(user)) ),
		map((settings) => {
			this._ntf.open('toast.settings_saved', 'toast.close');
			return new AppSetSettings(settings);
		}),
		catchError(error => of(new AppSetSettingsFail(error))),
	);


}