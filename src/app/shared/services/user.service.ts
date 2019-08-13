import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { NotificationService } from './../services/notification.service';
import { Observable } from 'rxjs';
import { User } from '@app/models/user';


@Injectable()
export class UserService {
	private userCol = this._db.collection<User>('users');

	constructor(
		private _afAuth: AngularFireAuth,
		private _db: AngularFirestore,
		private _ntf: NotificationService,
	) {}

	read(id: string): Observable<User> {
		return this.userCol.doc<User>(id).valueChanges();
	}

	update(user: any) {
		if (user.password) {

			this._afAuth.auth.currentUser.updatePassword(user.password)
				.then(_ => {
					this._afAuth.auth.currentUser.updateProfile({
						displayName: user.displayName,
						photoURL: user.photoURL
					});
					this._afAuth.auth.currentUser.reload()
						.then(_ => {
							this.userCol.doc(user.uid).set(user, {
									merge: true
								})
								.then(_ => {
									this._ntf.open('toast.profile', 'toast.close');
								})
								.catch(error => this.errorHandler(error.code));
						})
						.catch(error => this.errorHandler(error.code));
				})
				.catch(error => this.errorHandler(error.code));
		} else {

			// this.userCol.doc(user.uid).update(user)
			this.userCol.doc(user.uid).set(user, {
					merge: true
				}) // es lo mismo que update
				.then(success => {
					this._ntf.open('toast.profile', 'toast.close');
				})
				.catch(error => this.errorHandler(error.code));
		}
	}

	create(user: User) {
		this.userCol.doc(user.uid).set(user);
	}

	private errorHandler(error: any) {
		this._ntf.open('toast.firebase.' + error, 'toast.close');
	}
}