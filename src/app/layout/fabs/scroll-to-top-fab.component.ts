import { Component, Input } from "@angular/core";
import { slideUp } from "@app/animations/scale.animation";
import { CoreService } from "@app/shared";
import { Observable, BehaviorSubject } from "rxjs";
import {
	ScrollDispatcher,
	CdkVirtualScrollViewport
} from "@angular/cdk/scrolling";
import { map, tap, distinctUntilChanged } from "rxjs/operators";

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

	@Input() viewport: CdkVirtualScrollViewport;
	visible$: BehaviorSubject<boolean> = new BehaviorSubject(false);

	scrollPosition: number = 0;
	visible: boolean = false;
	

	constructor(public core: CoreService, public scroll: ScrollDispatcher) {
		this.scroll.scrolled().pipe(
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

				return this.visible ;
			}),
			distinctUntilChanged(),
			tap( visible => {
				this.visible$.next(visible);
			})
		).subscribe();
	}

	scrollToTop() {
		
		this.viewport.elementRef.nativeElement.scroll({
			top: 0,
			left: 0,
			behavior: "smooth"
		});
		this.visible$.next(false);
	}
}
