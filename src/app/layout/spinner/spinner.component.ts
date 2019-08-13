import { Component } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { CoreService } from "@app/shared";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
    selector: "app-spinner",
    template: `
        <div
            class="spinner"
            [ngClass]="{ 'spinner-xsmall': isMobile$ | async }"
            fxLayout="row"
            fxLayoutAlign="center center"
        >
            <mat-spinner [strokeWidth]="3" [diameter]="50"></mat-spinner>
        </div>
    `,
    styles: [
        `
            .spinner {
                background-color: rgba(255, 255, 255, 0.9) !important;
                transition: all 0.4s linear !important;
                height: calc(100% - 4.5rem);
            }
            .spinner-xsmall {
                height: calc(100% - 3.5rem);
            }
        `
    ]
})
export class SpinnerComponent {
    isMobile$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.XSmall)
        .pipe(map(result => result.matches));

    constructor(
        private breakpointObserver: BreakpointObserver
    ) {}
}
