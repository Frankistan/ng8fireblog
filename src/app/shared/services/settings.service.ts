import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { User } from '@app/models/user';

@Injectable()
export class SettingsService {

	loadSettings: BehaviorSubject<any> = new BehaviorSubject({});
	user: User;
	userRef: AngularFirestoreDocument<User>;

	constructor(
		private _db: AngularFirestore,
		private _fb: FormBuilder,
	) { }

	get form(): FormGroup {
		return this._fb.group({
			isDarkTheme: [false],
			language: ['']
		});
	}

	async save(user: User) {

		const _ = await this._db.doc(`users/${user.uid}`).set(user, { merge: true });
		return user.settings;

	}
}
