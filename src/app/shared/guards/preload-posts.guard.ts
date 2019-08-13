import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, tap, filter, take, switchMap, map } from 'rxjs/operators';
import { SetPosts } from '@app/store/actions/post.actions';
import { State } from '@app/store/reducers/post.reducer';
import { PaginationService } from '../services/pagination.service';

@Injectable()
export class PreloadPostsGuard implements CanActivate {
	constructor(private store: Store<State>,public page: PaginationService,) { }

	getFromStoreOrAPI(): Observable<any> {

		return  this.store.select('posts').pipe(
			map(state => state.posts),
			tap((posts: any) => {
				console.log('paso por preload posts');
				if (!posts.length) {
					console.log('no hay posts, ejecuto acccion',);
					this.store.dispatch(new SetPosts()); }
			}),
			filter((posts: any) => posts.length > 0 ),
			take(2)
		);

	}

	canActivate(): Observable<boolean> {
		return this.getFromStoreOrAPI().pipe(
			switchMap(_ => of(true)),
			catchError(_ => of(false))
		);
	}

	canLoad(): Observable<boolean> | Promise<boolean> | boolean {

		return this.getFromStoreOrAPI().pipe(
			switchMap(_ => of(true)),
			catchError(_ => of(false))
		);
	}
}