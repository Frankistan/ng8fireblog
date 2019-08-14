import { Component, Input, NgZone } from "@angular/core";
import { slideUp } from "@app/animations/scale.animation";
import { Subject } from "rxjs";
import {
	ScrollDispatcher,
	CdkVirtualScrollViewport,
	CdkScrollable
} from "@angular/cdk/scrolling";
import { takeUntil } from "rxjs/operators";

@Component({
	selector: "fab-scroll-to-top",
	template: `
        <button
            [@slideUp]
			*ngIf="visible"
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

	scrollPosition: number = 0;
	visible: boolean = false;

	destroy = new Subject<any>();

	constructor(
		private sDispatcher: ScrollDispatcher,
		private zone: NgZone
	) {

		this.sDispatcher.scrolled()
			.pipe(takeUntil(this.destroy))
			.subscribe((cdk: CdkScrollable) => {
				// https://github.com/angular/components/pull/6679
				// the ScrollDispatcher in not running in the angular update cycle. 
				// You need to run your changes in a NgZone
				this.zone.run(() => {
					let scroll = cdk.measureScrollOffset('top');
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

				});
			});
	}

	scrollToTop() {

		this.viewport.elementRef.nativeElement.scroll({
			top: 0,
			left: 0,
			behavior: "smooth"
		});
	}

	ngOnDestroy(): void {
		this.destroy.next();
	}
}
