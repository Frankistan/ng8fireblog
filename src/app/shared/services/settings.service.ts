import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AppState } from '@app/store/reducers/app.reducer';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from './../services/notification.service';
import { SetSettings } from '@app/store/actions/layout.actions';
import { User } from '@app/models/user';

@Injectable()
export class SettingsService {

	loadSettings: BehaviorSubject<any> = new BehaviorSubject({});
	user: User;
	userRef: AngularFirestoreDocument<User>;

	constructor(
		private _db: AngularFirestore,
		private _ntf: NotificationService,
		private _fb: FormBuilder,
		private store: Store<AppState>,
	) { }

	get form(): FormGroup {
		return this._fb.group({
			isDarkTheme: [false],
			language: ['']
		});
	}

	save(newSettings: any, user: User) {

		const userRef = this._db.doc(`users/${user.uid}`);

		const NUser = {
			...user,
			settings: newSettings
		};

		userRef.set(NUser)
			.then(_ => {
				this.store.dispatch(new SetSettings(newSettings));
				this._ntf.open('toast.settings_saved', 'toast.close');
			})
			.catch(error => { this._ntf.open('toast.firebase.' + error.code, 'toast.close'); });

	}
}
