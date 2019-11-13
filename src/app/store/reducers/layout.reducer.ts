import { LayoutActionTypes, Actions } from '../actions/layout.actions';
import { environment } from '@env/environment';
import { createFeatureSelector, createSelector } from '@ngrx/store';

//import or declare state
export interface State {
	isDarkTheme: boolean;
	isListView: boolean;
	isLoading: boolean;
	isScrolling: boolean;
	isSearching: boolean;
	isSearchOpened: boolean;
	language: string;
	error: string;
	location: any;
}

export const initialState: State = {
	isDarkTheme: false,
	isListView: true,
	isLoading: false,
	isScrolling: false,
	isSearching: false,
	isSearchOpened: false,
	language: environment.defaultLanguage,
	error: null,
	location: null,
};
export function reducer(state = initialState, action: Actions) {
	switch (action.type) {
		case LayoutActionTypes.MENU_TOGGLE_VIEW_MODE: {
			return { ...state, isListView: action.payload };
		}

		case LayoutActionTypes.APP_SET_SETTINGS:
			return {
				...state,
				isDarkTheme: action.payload.isDarkTheme,
				language: action.payload.language
			};

		case LayoutActionTypes.APP_SET_LOCATION_SUCCESS:
			return {
				...state,
				location: action.payload
			};

		case LayoutActionTypes.APP_SET_LOCATION_FAIL:
			return {
				...state,
				location: null,
			};

		default:
			return state;
	}
}

export const getLayoutState = createFeatureSelector<State>('layout');

export const getIsDarkTheme =
	createSelector(getLayoutState, (state: State) => state.isDarkTheme);

export const getLocation =
	createSelector(getLayoutState, (state: State) => state.location);


export const getMenuViewMode =
	createSelector(getLayoutState, (state: State) => state.isListView);