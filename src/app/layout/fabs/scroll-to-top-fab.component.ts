import { Component, Input } from "@angular/core";
import { slideUp } from "@app/animations/scale.animation";
import { CoreService } from "@app/shared";
import { Observable } from "rxjs";
import {
    ScrollDispatcher,
    CdkVirtualScrollViewport
} from "@angular/cdk/scrolling";
import { map, distinctUntilChanged } from "rxjs/operators";

@Component({
    selector: "fab-scroll-to-top",
    template: `
        <button
            [@slideUp]
            *ngIf="visible$ | async"
            mat-fab
            class="mat-fab-bottom-right"
            (click)="scrollToTop()"
        >
            <mat-icon aria-label="scroll to top">arrow_upward</mat-icon>
        </button>
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
    ],
    animations: [slideUp]
})
export class FabScrollToTopComponent {
    @Input() htmlElement:Element;
    visible$: Observable<boolean>;

    constructor(public core: CoreService) {
        this.visible$ = this.core.isScrolling.pipe(
            distinctUntilChanged()
        );
    }

    scrollToTop() {
        this.htmlElement.scroll({ top: 0, left: 0, behavior: "smooth" });
    }
    /*@Input() viewport: CdkVirtualScrollViewport;
    visible$: Observable<boolean>;

    scrollPosition: number = 0;
    visible: boolean = false;

    constructor(public core: CoreService, public scroll: ScrollDispatcher) {
        this.visible$ = this.scroll.scrolled().pipe(
            map((v: CdkVirtualScrollViewport) => v.measureScrollOffset()),
            map(scroll => {
                switch (true) {
                    case scroll == 0:
                        this.visible = false;
                        break;
                    case scroll > this.scrollPosition:
                        this.visible = false;
                        break;
                    case scroll < this.scrollPosition:
                        this.visible = true;
                        break;

                    default:
                        this.visible = false;
                        break;
                }

                this.scrollPosition = scroll;

                return this.visible;
            })
        );
    }

    scrollToTop() {
        this.viewport.elementRef.nativeElement.scroll({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
        this.visible = false;
    }*/
}
