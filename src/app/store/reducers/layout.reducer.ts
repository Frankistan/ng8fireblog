import { LayoutActionTypes, LayoutActions } from '../actions/layout.actions';
import { environment } from '@env/environment';


export interface State {
	isDarkTheme: boolean;
	isListView: boolean;
	isLoading: boolean;
	isScrolling: boolean;
	isSearching: boolean;
	isSearchOpened: boolean;
	language: string;
	error: string
}

export const initialState: State = {
	isDarkTheme: false,
	isListView: true,
	isLoading: false,
	isScrolling: false,
	isSearching: false,
	isSearchOpened: false,
	language: environment.defaultLanguage,
	error: null
};

export function reducer(state = initialState, action: LayoutActions): State {
	switch (action.type) {
		case LayoutActionTypes.START_LOADING:
			return {
				...state,
				isLoading: true
			};
		case LayoutActionTypes.STOP_LOADING:
			return {
				...state,
				isLoading: false
			};

		case LayoutActionTypes.SET_SEARCHBAR_OPEN_STATUS:
			return {
				...state,
				isSearchOpened: action.payload
			};
		case LayoutActionTypes.SET_HAVE_SEARCHED:
			return {
				...state,
				isSearching: action.payload
			};

		case LayoutActionTypes.SET_VIEW_MODE:
			return {
				...state,
				isListView: action.payload
			};

		case LayoutActionTypes.SET_SETTINGS:
			return {
				...state,
				isDarkTheme: action.payload.isDarkTheme,
				language: action.payload.language
			};

		case LayoutActionTypes.SET_FIREBASE_ERROR:
			return {
				...state,
				error: action.payload
			};
		case LayoutActionTypes.UNSET_FIREBASE_ERROR:
			return {
				...state,
				error: null
			}
		default:
			return state;
	}
}

export const getIsLoading = (state: State) => state.isLoading;