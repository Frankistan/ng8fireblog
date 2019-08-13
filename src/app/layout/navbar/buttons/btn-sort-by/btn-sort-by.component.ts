import { Component } from '@angular/core';
import { PaginationService } from '@app/shared';

@Component({
    selector: 'btn-sort-by',
    templateUrl: './btn-sort-by.component.html',
    styleUrls: ['./btn-sort-by.component.css']
})
export class BtnSortByComponent  {
    reverse:boolean = true;
    field:string ="created_at";

    constructor(
        private _page: PaginationService
    ) { }

    orderBy(field: string) {
        this.field = field;
        this.reverse =!this.reverse;
        this._page.reset();
        this._page.init('posts', this.field, {
            reverse: this.reverse
        });
    }

}
