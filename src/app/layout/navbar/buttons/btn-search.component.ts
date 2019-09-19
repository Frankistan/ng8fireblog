import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CoreService } from "@app/shared";
import { Store } from "@ngrx/store";
import { AppState } from "@app/store/reducers/app.reducer";
import { SetSearchbarOpenStatus } from "@app/store/actions/layout.actions";

@Component({
    selector: "btn-search",
    template: `
        <a
            mat-icon-button
            matTooltip="{{ 'tooltips.search' | translate }}"
            [matTooltipClass]="'tooltip'"
		
			[routerLink]="'/posts/search'"
        >
            <mat-icon>search</mat-icon>
        </a>
    `
})
export class BtnSearchComponent {
    constructor(
		private _rtr: Router,
		public core:CoreService,
		private store: Store<AppState>
		) {}

    open(){
        this.store.dispatch(new SetSearchbarOpenStatus(true));
		// this._rtr.navigate([{ outlets: { search: ['search'] } }]);
    }
}
