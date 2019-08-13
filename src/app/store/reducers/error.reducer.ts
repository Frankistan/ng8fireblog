import { ErrorActionTypes, ErrorActions } from '../actions/error.actions';


export interface State {
	error: any;
}

export const initialState: State = {
	error: null
};

export function reducer(state = initialState, action: ErrorActions): State {
	switch (action.type) {
		case ErrorActionTypes.ADD_ERROR:
			return {
				...state,
				error: action.payload
			};

		case ErrorActionTypes.REMOVE_ERROR:
			return {
				...state,
				error: null
			};
		default:
			return state;
	}
}
