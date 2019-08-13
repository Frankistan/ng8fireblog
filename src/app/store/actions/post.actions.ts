import { Action } from '@ngrx/store';
import { Post } from '@app/models/post';

export enum PostActionTypes {
	SET_POSTS = '[Post] Set Posts',
	SET_POSTS_SUCCESS = '[Post] Set Posts Success',
	LOAD_POST = '[Post] Load Post',
	LOAD_POST_SUCCESS = '[Post] Load Post Ok',
	LOAD_POST_FAILURE = '[Post] Load Post Fail',
	SET_POSTS_FILTERS  = '[Post] Set Posts filters'
}

export class SetPosts implements Action {
	readonly type = PostActionTypes.SET_POSTS;
}

export class SetPostsSuccess implements Action {
	readonly type = PostActionTypes.SET_POSTS_SUCCESS;
	constructor(public payload: Post[]) { }
}

export class LoadPost implements Action {
	readonly type = PostActionTypes.LOAD_POST;
	constructor(public payload: string) { }
}

export class LoadPostSuccess implements Action {
	readonly type = PostActionTypes.LOAD_POST_SUCCESS;
	constructor(public payload: any) { }
}

export class LoadPostFailure implements Action {
	readonly type = PostActionTypes.LOAD_POST_FAILURE;
	constructor(public payload: any) { }
}

export class SetPostsFilters implements Action {
	readonly type = PostActionTypes.SET_POSTS_FILTERS;
	constructor(public payload: any) { }
}

export type PostActions = 
SetPosts 
| SetPostsSuccess 
| LoadPost
| LoadPostSuccess
| LoadPostFailure
| SetPostsFilters
;
