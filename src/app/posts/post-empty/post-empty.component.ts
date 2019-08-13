import { Component } from "@angular/core";
import { CoreService } from "@app/shared";

@Component({
    selector: "app-post-empty",
    templateUrl: "./post-empty.component.html",
    styleUrls: ["./post-empty.component.css"]
})
export class PostEmptyComponent {
    constructor(public core: CoreService) {}
}
