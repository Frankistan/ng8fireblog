import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CoreService } from "@app/shared";

@Component({
    selector: "fab-create-post",
    template: `
        <a
            mat-fab
            [routerLink]="'/posts/create'"
            class="mat-fab-bottom-right">
            <mat-icon aria-label="create post">add</mat-icon>
        </a>
    `,
    styles: [
        `
            .mat-fab-bottom-right {
                top: auto !important;
                right: 1.5rem !important;
                bottom: 1.5rem !important;
                left: auto !important;
                position: fixed !important;
            }
        `
    ]
})
export class FabCreatePostComponent {
    // constructor(public core: CoreService) {}
}
