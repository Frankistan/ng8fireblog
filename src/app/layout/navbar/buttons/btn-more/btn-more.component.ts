import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatSidenav } from '@angular/material';
import { NotificationService, PostsService, PaginationService, CoreService } from '@app/shared';
import { ConfirmDialog } from '@app/layout/confirm-dialog/confirm-dialog.component';
import { Subject, Observable } from 'rxjs';
import { map, takeUntil, tap, filter } from 'rxjs/operators';
import { AppState } from '@app/store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { MenuToggleViewMode } from '@app/store/actions/layout.actions';
import { getMenuViewMode } from '@app/store/reducers/layout.reducer';
// import { State } from '@app/store/reducers/post.reducer';

@Component({
    selector: 'btn-more',
    templateUrl: './btn-more.component.html',
    styleUrls: ['./btn-more.component.css']
})
export class BtnMoreComponent implements OnDestroy {
    @Input() path: string;
    // @Input() id: string;
    @Input('filterNavRef') filterNavRef: MatSidenav;
    reverse: boolean = true;
    field: string = "created_at";

    listView: boolean = true;
    destroy = new Subject<any>();
	id$: Observable<string>;
	id:string ='';
	mode: boolean;

    constructor(
        private _page: PaginationService,
        private _pst: PostsService,
        private _ntf: NotificationService,
        private _rtr: Router,
        private _dlg: MatDialog,
		private _core: CoreService,
		private store: Store<AppState>
    ) { 
		// this.id$ = this.store.select('posts').pipe(
		// 	filter(state => state ? state.post != null: false),
		// 	map(state => state.post.id),
		// 	tap( id => console.log('id: ',id)),
		// 	tap( id => this.id =id)
		// 	)
	}

	ngOnInit() {
		this.store.select(getMenuViewMode)
			.pipe(tap(mode => this.mode = mode));
	}

    orderBy(field: string) {
        this.field = field;
        this.reverse = !this.reverse;
        this._page.reset();
        this._page.init('posts', this.field, {
            reverse: this.reverse
        });
    }

    openDeleteDlg() {
        let dialogRef = this._dlg.open(ConfirmDialog, {
            data: { answer: false ,title: 'dialog.delete_post' }
        });

        dialogRef.afterClosed().pipe(
            map(result => {
                if (!result) return false;
                return result.answer;
            }),
            takeUntil(this.destroy))
            .subscribe(res => {if(res) this.deletePost()} );
    }

    deletePost() {
        this._core.isLoading.next(true);
        this._pst.delete(this.id)
            .pipe(takeUntil(this.destroy))
            .subscribe(_ => {
            this._core.isLoading.next(false);
            this._ntf.open('toast.post.deleted', 'toast.close');
            this._rtr.navigate(['/posts']);
        });
    }

    // changeView(mode:boolean){
    //     this.listView = !!mode;
	// 	// this._core.isListView.next(this.listView);
	// 	// this.store.dispatch(new SetViewMode(this.listView));
	// }
	
	changeView(listView:boolean) {
		if(this.mode != listView) {
			this.mode = listView;
			this.store.dispatch(new MenuToggleViewMode(listView));
		}
	}

    ngOnDestroy(): void {
		this.destroy.next();
	}
}
