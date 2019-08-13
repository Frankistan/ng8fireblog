import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material";
import {
    CoreService,
    FileManagerService,
    GeocodingService,
    UserManagerService,
    NotificationService,
    AuthService,
    I18nService
} from "@app/shared";
import { ConfirmDialog } from "@app/layout/confirm-dialog/confirm-dialog.component";
import { UploadProfileImageDialog } from "./upload-profile-image-dialog/upload-profile-image-dialog.component";
import { scaleAnimation } from "@app/animations/scale.animation";
import { Subject, Observable, throwError } from "rxjs";
import { tap, catchError, takeUntil, map, filter } from "rxjs/operators";
import { User } from "@app/models/user";
import { merge } from "lodash";
import { Store } from "@ngrx/store";
import { AppState } from "@app/store/reducers/app.reducer";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"],
    animations: [scaleAnimation]
})
export class ProfileComponent implements OnInit, OnDestroy {
    changed: boolean = false;
    saved: boolean = false;

    destroy = new Subject<any>();

    address$: Observable<any>;
    hide: boolean = true;
    id = undefined;
    image: File = null;
    locale: string;
    profileForm: FormGroup;
    showFields: boolean = false;
    user$: Observable<User>;
    user: User;

    constructor(
        private _auth: AuthService,
        private _core: CoreService,
        private _dlg: MatDialog,
        private _fm: FileManagerService,
        private _geo: GeocodingService,
        private _i18n: I18nService,
        private _ntf: NotificationService,
        private _route: ActivatedRoute,
		private _userSVC: UserManagerService,
		private store: Store<AppState>
    ) {
      
    }

    ngOnInit(): void {
        this.locale = this._i18n.language;

		const id = this._route.snapshot.params["id"] || undefined;
		
		

        if (id) {
            this.user$ = this._userSVC.read(id);
        } else {

			this.user$ = this.store.select('auth')
			.pipe(
				filter(state => state.user != null),
				map(state => state.user),
				tap(user => {
					// this.profileForm.patchValue(user);
                    this.user = user;
                    // this._changed = false;
                    // this._saved = false;
                    this.address$ = this._geo.geocode(user.lastSignInLocation);
				})
			);

        }

    }

    private opendDiscardDlg(): Observable<boolean> {
        let dialogRef = this._dlg.open(ConfirmDialog, {
            data: { answer: false, title: "dialog.discard_changes" }
        });

        return dialogRef.afterClosed().pipe(
            map(result => {
                if (!result) return false;
                return result.answer;
            })
        );
    }

    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (this.changed && !this.saved) {
            return this.opendDiscardDlg();
        } else {
            this._core.isLoading.next(true);
            return true;
        }
    }

    

    ngOnDestroy(): void {
        this.destroy.next();
    }
}
