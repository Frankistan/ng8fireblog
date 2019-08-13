import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { I18nService } from '@app/shared';
import { Observable } from 'rxjs';
import { LoadPost, LoadPostSuccess } from '@app/store/actions/post.actions';
import { State } from "@app/store/reducers/post.reducer";
import { map, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Post } from '@app/models/post';

@Component({
	selector: 'app-post-show',
	templateUrl: './post-show.component.html',
	styleUrls: ['./post-show.component.css']
})
export class PostShowComponent implements OnInit {
	post$: Observable<Post>;
	id: any;
	trustedContent: any;
	locale: string;

	constructor(
		private _activatedRoute: ActivatedRoute,
		public sanitizer: DomSanitizer,
		private _i18n: I18nService,
		private store: Store<State>
	) {
		// EXPLICACION DE LOS ROUTE PARAMS
		// https://kamranahmed.info/blog/2018/02/28/dealing-with-route-params-in-angular-5/
		// PARA ESTE CASO EN CONCRETO, HAY Q USAR LA OPCION 1
		// opcion 1
		const id = this._activatedRoute.snapshot.params['id'];
		this.store.dispatch(new LoadPost(id));
		// this.store.dispatch(new LoadPostSuccess(id));

		// opcion 2
		/*
		this._activatedRoute.params
		.pipe( 
			filter (params => params.id!=null),
			map( params => params.id )

		).subscribe(id => this.store.dispatch(new LoadPost(id)));
		this.store.dispatch(new LoadPost(id));
		*/
		

		this.post$ = this.store.select('posts').pipe(
			map(state => state.post),
			filter( (post:Post) => post!=null)		);
	}

	ngOnInit() {
		this.locale = this._i18n.language;
	}
}