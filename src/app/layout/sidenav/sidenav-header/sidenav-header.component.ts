import { Component, OnInit } from "@angular/core";
import { AuthService } from "@app/shared";
import { Observable } from "rxjs";
import { User } from "@app/models/user";
import { slideUpFadeIn } from "@app/animations/slide-up-fade-in";
import { scaleAnimation } from "@app/animations/scale.animation";
import { Store } from "@ngrx/store";
import { AppState } from "@app/store/reducers/app.reducer";
import { filter, map, tap } from "rxjs/operators";

@Component({
	selector: "app-sidenav-header",
	templateUrl: "./sidenav-header.component.html",
	styleUrls: ["./sidenav-header.component.scss"],
	animations: [slideUpFadeIn, scaleAnimation]
})
export class SidenavHeaderComponent {
	user$: Observable<User>;

	constructor(
		private store: Store<AppState>
	) {
		this.user$ = this.store.select('auth')
			.pipe(
				filter(state => state.user != null),
				map(state => state.user)
			);
	}


}
