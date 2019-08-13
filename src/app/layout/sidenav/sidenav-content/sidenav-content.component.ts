import { Component } from "@angular/core";
import { AuthService } from "@app/shared";

@Component({
    selector: "app-sidenav-content",
    templateUrl: "./sidenav-content.component.html",
    styleUrls: ["./sidenav-content.component.css"]
})
export class SidenavContentComponent {
    constructor(public auth: AuthService) {}
}
