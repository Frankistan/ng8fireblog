import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
// import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import { CoreService, NotificationService } from '@app/shared';
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

@Injectable()
export class OverlayInterceptor implements HttpInterceptor {

    private _ntf: NotificationService;
    core: CoreService;

    constructor(
        // private _loadingBar: SlimLoadingBarService,
        private inject: Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // this._loadingBar.start();
        this._ntf = this.inject.get(NotificationService);
        this.core = this.inject.get(CoreService);

        // start our loader here
        // this.core.isLoading.next(true);

        return next.handle(req).pipe(
            tap(
                (event: HttpEvent<any>) => {
                    // if the event is for http response
                    if (event instanceof HttpResponse) {
                        // stop our loader here
                        // this._loadingBar.complete();
                    }

                }, (err: any) => {

                    const msg = err.message + " - " + err.status + " : " + err.statusText;
                    this._ntf.open(msg, 'toast.close');

                    // if any error (not for just HttpResponse) we stop our loader bar
                    // this._loadingBar.complete();
                    // this.core.isLoading.next(false);
                },
                () => {
                    // this.core.isLoading.next(false);
                }
            ));
    }

}
