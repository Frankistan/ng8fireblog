import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { MatSidenav } from "@angular/material";
import { DateAdapter } from "@angular/material/core";
import { Router, NavigationEnd, RouterEvent } from "@angular/router";
import { CoreService, PaginationService } from "@app/shared";
import { takeUntil, filter } from "rxjs/operators";
import { Subject } from "rxjs";
import * as moment from 'moment';

@Component({
    selector: "app-filters",
    templateUrl: "./filters.component.html",
    styleUrls: ["./filters.component.css"]
})
export class FiltersComponent implements OnInit, OnDestroy {
    @Input("filterNavRef") filterNavRef: MatSidenav;
    filtersForm: FormGroup;
    minimum = null;
    maximum = null;

    destroy = new Subject<any>();

    authors = [
        {
            uid: "3rVqxwGyjWZH9yAWTslXf47K1Fv1",
            displayName: "Iban Salgado",
            selected: true
        },
        {
            uid: "D0G8KfvW7gXqjUS4JpsxaFY4so93",
            displayName: "Úrsula Seijas",
            selected: true
        },
        {
            uid: "USpQ4GwiRNN1gPoUl5FEvMCttHw2",
            displayName: "Estefanía Conde",
            selected: true
        },
        {
            uid: "tXWXpHeP3pOf1eyiIqThueRjmqz1",
            displayName: "Alicia Aragón",
            selected: true
        },
        {
            uid: "Sa0LN1o1v0U5v1NW9Tye1kJMowa2",
            displayName: "Aníbal Báez",
            selected: true
        },
        {
            uid: "5doyO55GSTWQetWMhXw0jEJsLe32",
            displayName: "Felicidad Rey",
            selected: true
        }
    ];

    myFilter = (d: any): boolean => {
        const day = d.day();
        // Prevent Saturday and Sunday from being selected.
        return day !== 0 && day !== 6;
    };

    constructor(
        private _fb: FormBuilder,
        private adapter: DateAdapter<any>,
        private _core: CoreService,
        private _page: PaginationService,
        private _rtr: Router
    ) {
        this.createFiltersForm();

        this._rtr.events
        .pipe(
            takeUntil(this.destroy),
            filter(event => event instanceof NavigationEnd)
        )
        .subscribe((event: RouterEvent) => {
            if (event.url != "/posts(filtersPopup:filters)") {
                
                // Clear Auxiliary Route when navigating to another route
                this.filterNavRef.close();
                this._rtr.navigate([{ outlets: { filtersPopup: null } }]);
            } else {
                this._rtr.navigate([
                    { outlets: { filtersPopup: "filters" } }
                ]);
                this.filterNavRef.open();
            }
        });
    }

    ngOnInit() {
        this._core.language.pipe(takeUntil(this.destroy)).subscribe(lang => {
            this.adapter.setLocale(lang || "es");
        });
    }

    private createFiltersForm() {
        this.minimum = moment([2014, 1, 3]);
        let now = moment();
        let day = Number(now.format("d"));
        switch (day) {
            case 0:
                now.subtract(2, "day");
                this.maximum = moment([
                    Number(now.format("Y")),
                    Number(now.format("M")) - 1,
                    Number(now.format("D"))
                ]);
                break;
            case 6:
                now.subtract(1, "day");
                this.maximum = moment([
                    Number(now.format("Y")),
                    Number(now.format("M")) - 1,
                    Number(now.format("D"))
                ]);
                break;
            default:
                this.maximum = moment([
                    Number(now.format("Y")),
                    Number(now.format("M")) - 1,
                    Number(now.format("D"))
                ]);
                break;
        }

        this.filtersForm = this._fb.group({
            author: new FormControl(""),
            minDate: new FormControl(this.minimum),
            maxDate: new FormControl(this.maximum)
        });
    }

    save() {
        let input = this.filtersForm.value;

        let f = {
            date: {
                min: input.minDate.unix(),
                max: input.maxDate.unix()
            },
            author: input.author
        };

        this._page.reset();
        this._page.init("posts", "created_at", {
            filter: f,
            reverse: true
        });

        this.filterNavRef.close();
        // this._rtr.navigate(['/posts']);
        this._rtr.navigate([{ outlets: { filtersPopup: null } }]);
    }

    reset() {
        this.filtersForm.reset();
        this.filtersForm.patchValue({
            author: "",
            minDate: this.minimum,
            maxDate: this.maximum
        });
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }
}
