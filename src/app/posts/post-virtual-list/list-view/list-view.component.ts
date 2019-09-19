import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";

@Component({
	selector: "app-list-view",
	templateUrl: "./list-view.component.html",
	styleUrls: ["./list-view.component.css"]
})
export class ListViewComponent {
	@Input()
	data$: Observable<any>;
}
