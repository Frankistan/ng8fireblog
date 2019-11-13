import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '@env/environment';
import * as fromLayout from "./layout.reducer";
import * as fromAuth from "./auth.reducer";
// import * as fromError from "./error.reducer";

export interface AppState {
	layout: fromLayout.State;
	auth: fromAuth.State;
	// error: fromError.State
}

export const reducers: ActionReducerMap<AppState> = {
	layout: fromLayout.reducer,
	auth: fromAuth.reducer,
	// error: fromError.reducer 
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
