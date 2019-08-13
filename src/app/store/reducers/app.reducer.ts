import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '@env/environment';
import * as fromLayout from "./layout.reducer";
import * as fromAuth from "./auth.reducer";
import * as fromError from "./error.reducer";

export interface AppState {
	layout: fromLayout.State;
	auth: fromAuth.State;
	error: fromError.State
}

export const reducers: ActionReducerMap<AppState> = {
	layout: fromLayout.reducer,
	auth: fromAuth.reducer,
	error: fromError.reducer 
};


// Feature Selectors
export const getLayoutState = createFeatureSelector<fromLayout.State>("layout");
export const getIsLoading = createSelector(
    getLayoutState,
    fromLayout.getIsLoading
);

export const getAuthState = createFeatureSelector<fromAuth.State>("auth");
export const getIsAuth = createSelector(
    getAuthState,
    fromAuth.getIsAuthenticated
);


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
