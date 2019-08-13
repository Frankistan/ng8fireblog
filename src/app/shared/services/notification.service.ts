import { Injectable } from '@angular/core';
import { MatSnackBar, SimpleSnackBar, MatSnackBarRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class NotificationService {

    private snackBarRef: MatSnackBarRef<SimpleSnackBar>
    constructor(
        private snackBar: MatSnackBar,
        private translate: TranslateService,
    ) { }

    open(message: string, action: string = "", duration: number = 4000) {

        this.translate.get(message).subscribe((m: string) => {

            if (action != "") {
                this.translate.get(action).subscribe((a: string) => {
                    this.configure(m, a, duration);
                });
            } else {
                this.configure(m, action, duration);
            }
        });
    }

    private configure(m, a, d) {
        this.snackBarRef = this.snackBar.open(m, a, {
            duration: d,
        });
        this.snackBarRef.onAction().subscribe(() => {
            this.snackBarRef.dismiss();
        });
    }

}
