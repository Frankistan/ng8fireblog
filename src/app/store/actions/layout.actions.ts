import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum LayoutActionTypes {
	MENU_TOGGLE_VIEW_MODE = "[Menu] Toggle Posts View Mode",
	MENU_TOOGLE_THEME = "[Menu] Toggle App Theme",
	APP_SET_SETTINGS = "[App] Set Settings",
	APP_SET_SETTINGS_SUCCESS = "[App] Set Settings Success",
	APP_SET_SETTINGS_FAIL = "[App] Set Settings Fail",
	APP_GET_LOCATION = "[App] Get location",
	APP_SET_LOCATION_SUCCESS = "[App] Set location success",
	APP_SET_LOCATION_FAIL = "[App] Set location Fail",
	SETTINGS_PAGE_SAVE = "[Settings Page] Save",
};

export class MenuToggleViewMode implements Action {
	readonly type = LayoutActionTypes.MENU_TOGGLE_VIEW_MODE;
	constructor(public payload: any) { }
}

export class MenuToggleTheme implements Action {
	readonly type = LayoutActionTypes.MENU_TOGGLE_VIEW_MODE;
	constructor(public payload: any) { }
}

export class AppSetSettings implements Action {
	readonly type = LayoutActionTypes.APP_SET_SETTINGS;
	constructor(public payload: any) { }
}

export class AppSetSettingsSuccess implements Action {
	readonly type = LayoutActionTypes.APP_SET_SETTINGS_SUCCESS;
	constructor(public payload?: any) { }
}

export class AppSetSettingsFail implements Action {
	readonly type = LayoutActionTypes.APP_SET_SETTINGS_FAIL;
	constructor(public payload?: any) { }
}

export class AppGetLocation implements Action {
	readonly type = LayoutActionTypes.APP_GET_LOCATION;
}

export class AppSetLocationSuccess implements Action {
	readonly type = LayoutActionTypes.APP_SET_LOCATION_SUCCESS;
	constructor(public payload?: any) { }
}

export class AppSetLocationFail implements Action {
	readonly type = LayoutActionTypes.APP_SET_LOCATION_FAIL;
	constructor(public payload?: any) { }
}

export class SettingsPageSave implements Action {
	readonly type = LayoutActionTypes.SETTINGS_PAGE_SAVE;
	constructor(public payload: any) { }
}




export type Actions =
	MenuToggleViewMode
	| MenuToggleTheme
	| AppSetSettings
	| AppSetSettingsSuccess
	| AppSetSettingsFail
	| AppGetLocation
	| AppSetLocationSuccess
	| AppSetLocationFail
	| SettingsPageSave;