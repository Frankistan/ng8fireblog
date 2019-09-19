import { Component, Input } from "@angular/core";
import { MatSidenav } from "@angular/material";
import { Observable, } from "rxjs";
import { CoreService } from '@app/shared';

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent {
	@Input("drawer") drawer: MatSidenav;

	@Input("filterNavRef") filterNavRef: MatSidenav;

	postId$: Observable<any>;
	url$: Observable<string> = this.core.cRoute.asObservable();

	constructor(
		private core: CoreService
	) {}
}
