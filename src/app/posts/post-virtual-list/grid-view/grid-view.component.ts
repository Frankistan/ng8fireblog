import { Component, OnInit, Input } from "@angular/core";
import { MediaObserver , MediaChange } from "@angular/flex-layout";
import { Store } from "@ngrx/store";
import { AppState } from "@app/store/reducers/app.reducer";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
    selector: "app-grid-view",
    templateUrl: "./grid-view.component.html",
    styleUrls: ["./grid-view.component.css"]
})
export class GridViewComponent implements OnInit{
    @Input() post: any;
    @Input() index: any;

    rowHeight: string = "240px";
	cols$: Observable<number>;
	mode$: Observable<boolean>;

    constructor(
		private screen: MediaObserver , 
		private store: Store<AppState>
		) {

        // Option 2: The Angular way
        // https://youtu.be/w9InzT-SdIE?t=6m20s
        this.cols$ = this.screen.media$
        .pipe(
            map((change: MediaChange) => {
                let cols = 0;
                switch (change.mqAlias) {
                    case "xs":
                        cols = 2; // 'screen and (max-width: 599px)'
                        break;
                    case "sm":
                        cols = 3; // 'screen and (min-width: 600px) and (max-width: 959px)'
                        break;
                    case "md":
                        cols = 3; // 'screen and (min-width: 960px) and (max-width: 1279px)'
                        break;
                    case "lg":
                        cols = 4; // 'screen and (min-width: 1280px) and (max-width: 1919px)'
                        break;
                }
                return cols;
            }));
	}
	
	ngOnInit() {
		this.mode$ = this.store.select('layout').pipe(
			map( state => state.isListView)
		);
	}
}
