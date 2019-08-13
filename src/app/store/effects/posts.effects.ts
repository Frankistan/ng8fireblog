import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { PaginationService, PostsService } from '@app/shared';
import { SetPosts, PostActionTypes, SetPostsSuccess, LoadPost, LoadPostSuccess, SetPostsFilters } from '../actions/post.actions';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { SetFirebaseError } from '../actions/layout.actions';
import { Observable, of } from 'rxjs';

@Injectable()
export class PostsEffects {

	constructor(
		private actions$: Actions,
		private page: PaginationService,
		private postSVC: PostsService,
	) { }

	@Effect()
	getPosts: Observable<Action> = this.actions$.pipe(
		ofType<SetPosts>(PostActionTypes.SET_POSTS),
		switchMap(_ => {
			this.page.reset();
			this.page.init("posts", "created_at", {
				reverse: true
			});
			return this.page.data.pipe(
				map(posts => new SetPostsSuccess(posts)),
				catchError(error => of(new SetFirebaseError(error.code)))
			);
		}));

	@Effect()
	getFilteredPosts: Observable<Action> = this.actions$.pipe(
		ofType<SetPostsFilters>(PostActionTypes.SET_POSTS_FILTERS),
		map((action: SetPostsFilters) => action.payload),
		switchMap(filters => {
			this.page.reset();
			this.page.init(filters.collection, filters.orderBy, filters.opts);
			return this.page.data.pipe(
				map(posts => new SetPostsSuccess(posts)),
				catchError(error => of(new SetFirebaseError(error.code)))
			);
		}));

	@Effect()
	loadPost: Observable<Action> = this.actions$.pipe(
		ofType<LoadPost>(PostActionTypes.LOAD_POST),
		map((action: LoadPost) => action.payload),
		switchMap(id =>
			this.postSVC.read(id).pipe(
				tap(post => console.log('post: ', post)),
				map(post => new LoadPostSuccess(post)),
				catchError(error => of(new SetFirebaseError(error.code)))
			)
		));

}
