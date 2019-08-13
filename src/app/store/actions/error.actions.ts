import { Action } from '@ngrx/store';

export enum ErrorActionTypes {
	ADD_ERROR = '[Error] Add Error',
	REMOVE_ERROR = '[Error] Remove Error'
}

export class AddError implements Action {
	readonly type = ErrorActionTypes.ADD_ERROR;
	constructor(public payload: any) { }
}

export class RemoveError implements Action {
	readonly type = ErrorActionTypes.REMOVE_ERROR;
}


export type ErrorActions = AddError | RemoveError;
