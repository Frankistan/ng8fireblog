import { Component } from "@angular/core";
import { AppState } from '@app/store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { Logout } from '@app/store/actions/auth.actions';

@Component({
	selector: "app-sidenav-content",
	templateUrl: "./sidenav-content.component.html",
	styleUrls: ["./sidenav-content.component.css"]
})
export class SidenavContentComponent {
	constructor(private store: Store<AppState>) { }

	logout() {
		this.store.dispatch(new Logout());
	}
}
