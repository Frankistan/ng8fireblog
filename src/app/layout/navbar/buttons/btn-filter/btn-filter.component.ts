import { Component, Input, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { MatSidenav } from "@angular/material";
import { Subject } from "rxjs";

@Component({
    selector: "btn-filter",
    templateUrl: "./btn-filter.component.html",
    styleUrls: ["./btn-filter.component.css"]
})
export class BtnFilterComponent implements OnDestroy {
    @Input("filterNavRef") filterNavRef: MatSidenav;

    destroy = new Subject<any>();

    constructor(private _rtr: Router) {}

    toggle() {
        this.filterNavRef.toggle().then(state => {
            if (state == "open") {
                this._rtr.navigate([{ outlets: { filtersPopup: "filters" } }]);
            } else {
                this._rtr.navigate([{ outlets: { filtersPopup: null } }]);
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }
}
