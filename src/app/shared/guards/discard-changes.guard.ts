import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CoreService } from '@app/shared';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}


@Injectable()
export class DiscardChangesGuard implements CanDeactivate<CanComponentDeactivate> {
    constructor(
        private _core:CoreService
    ){}
    canDeactivate(
        component: CanComponentDeactivate,
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            this._core.isLoading.next(false);
        return component.canDeactivate();
    }
}
