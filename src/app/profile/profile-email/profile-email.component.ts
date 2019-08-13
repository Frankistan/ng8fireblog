import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { UploadProfileImageDialog } from '../upload-profile-image-dialog/upload-profile-image-dialog.component';
import { takeUntil, map, tap, catchError, filter } from 'rxjs/operators';
import { Subject, Observable, merge, throwError } from 'rxjs';
import { MatDialog } from '@angular/material';
import { FileManagerService, GeocodingService, I18nService, UserManagerService, NotificationService, CoreService } from '@app/shared';
import { FormGroup } from '@angular/forms';
import { scaleAnimation } from '@app/animations/scale.animation';
import { ConfirmDialog } from '@app/layout/confirm-dialog/confirm-dialog.component';

import { ActivatedRoute } from '@angular/router';
import { User } from '@app/models/user';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/reducers/app.reducer';

@Component({
	selector: 'app-profile-email',
	templateUrl: './profile-email.component.html',
	styleUrls: ['./profile-email.component.scss'],
	animations: [scaleAnimation]
})
export class ProfileEmailComponent implements OnInit, OnDestroy {
	@Input() user: User;
	@Output() public changed = new EventEmitter<boolean>();
	@Output() public saved = new EventEmitter<boolean>();

	private _changed: boolean = false;
	private _saved: boolean = false;

	destroy = new Subject<any>();
	image: File = null;
	address$: Observable<any>;
	locale: string;
	profileForm: FormGroup;
	showFields: boolean = false;
	hide: boolean = true;

	constructor(
		private _dlg: MatDialog,
		private _fm: FileManagerService,
		private _geo: GeocodingService,
		private _i18n: I18nService,
		private _userSVC: UserManagerService,
		private _ntf: NotificationService,
		private _core: CoreService,
		private _route: ActivatedRoute,

	) {
		this.profileForm = this._userSVC.form();

		this.profileForm.valueChanges
			.pipe(takeUntil(this.destroy))
			.subscribe(_ => {
				// this._changed = true;
				this.changed.emit(true);
			});
	}

	ngOnInit() {
		this.address$ = this._geo.geocode(this.user.lastSignInLocation);
		this.locale = this._i18n.language;

		const id = this._route.snapshot.params["id"] || undefined;

		if (id) {
			this._userSVC.read(id)
				.pipe(takeUntil(this.destroy))
				.subscribe(user => this.user = user);
		} else {

			this.profileForm.patchValue(this.user);

			// this._changed = false;
			this.changed.emit(false);
			// this._saved = false;
			this.saved.emit(false);
			this.address$ = this._geo.geocode(this.user.lastSignInLocation);
		}

		this._fm.downloadURL.pipe(
			filter(url => url != ""),
			takeUntil(this.destroy))
			.subscribe(url => {
				this.profileForm.controls["photoURL"].setValue(url);
			});
	}

	save() {
		const data = {
			...this.user,
			...this.profileForm.value
		};

		//TODO: NGX_STORE
		this._userSVC
			.update(data)
			.then(_ => this._ntf.open("toast.profile", "toast.close"));

		// this._saved = true;
		this.saved.emit(true);
	}

	togglePasswordFields() {
		this.showFields = !this.showFields;
	}

	openUploadAvatarDlg(uid): void {
		let dialogRef = this._dlg.open(UploadProfileImageDialog, {
			panelClass: "custom-dialog",
			data: { file: this.image }
		});

		dialogRef
			.afterClosed()
			.pipe(takeUntil(this.destroy))
			.subscribe(result => {
				if (result && result.file) this.uploadAvatar(result.file, uid);
			});
	}

	private uploadAvatar(file, uid) {
		const path = `uploads/avatar/${uid}_${new Date().getTime()}`;

		this._fm.upload(file, path);
		this._fm.snapshot.pipe(takeUntil(this.destroy)).subscribe(_ => {
			return;
		});
	}

	deleteProfileImg($event: Event, url: string) {
		$event.preventDefault();
		if (url.search("https://firebasestorage.googleapis.com")) {
			this.profileForm.controls["photoURL"].setValue("");
			return;
		}

		url = decodeURIComponent(url);
		const parts = url.split("?")[0].split("/");
		const fileName = parts[parts.length - 1];
		const path = "uploads/avatar";

		this._fm
			.delete(fileName, path)
			.then(_ => {
				this.profileForm.controls["photoURL"].setValue("");
			})
			.catch(err => {
				this._ntf.open("toast.firebase." + err.code_, "toast.close");
			});
	}

	ngOnDestroy(): void {
		this.destroy.next();
	}

}
