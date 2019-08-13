import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { NotificationService } from "./notification.service";
import { GeolocationService } from "./geolocation.service";
import { UserManagerService } from "./user-manager.service";
import { User } from "@app/models/user";
import { Observable, of } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import firebase from "firebase/app";
import { Store } from "@ngrx/store";
import * as fromAuth from "@app/store/actions/auth.actions";
import { AppState } from "@app/store/reducers/app.reducer";

// FUENTE: https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8

@Injectable()
export class AuthService {
	private _user$: Observable<User>;
	private _authStateUser: User;
	private _pvdr = null;
	private auth: firebase.auth.Auth = this._afAuth.auth;

	constructor(
		private _afAuth: AngularFireAuth,
		private _db: AngularFirestore,
		private _rtr: Router,
		private _ntf: NotificationService,
		private _uMngr: UserManagerService,
		private _loc: GeolocationService,
		private store: Store<AppState>
	) { }

	// async login(email: string, password: string): Promise<any> {
	//     try {
	//         await this.auth.signInWithEmailAndPassword(email, password);
	//         this._rtr.navigate(["/"]);
	//     } catch (error) {
	//         this.errorHandler(error.code);
	//     }
	// }  

	async login(email: string, password: string): Promise<firebase.auth.UserCredential> {
		return await this.auth.signInWithEmailAndPassword(email, password);
	}

	async signup(user: User) {
		try {
			const firebaseUser = await this.auth.createUserWithEmailAndPassword(
				user.email,
				user.password
			);

			let fUser = firebaseUser.user;
			const data: User = {
				uid: fUser.uid,
				displayName: user.displayName,
				email: fUser.email,
				lastSignInTime: fUser.metadata.lastSignInTime,
				lastSignInLocation: this._loc.position,
				photoURL: user.photoURL,
				profileURL: "",
				providerId: fUser.providerData[0].providerId
			};
			this.sendEmailVerification();
			await this._uMngr.create(data);
			this._ntf.open("toast.signup");
			this._rtr.navigate(["/posts"]);
		} catch (error) {
			return this.errorHandler(error.code);
		}
	}

	async logout() {
		if (!this._authStateUser) return false;

		const data: User = {
			uid: this._authStateUser.uid,
			lastSignInLocation: this._loc.position,
			lastSignInTime: this.timestamp || this._authStateUser.lastSignInTime
		};

		try {
			await this.auth.signOut();
			await this._uMngr.update(data);
			this.store.dispatch(new fromAuth.SetUnauthenticated());
			this._rtr.navigate(["/auth/login"]);
		} catch (error) {
			return this.errorHandler(error.code);
		}
	}

	async resetPassword(email: string) {
		await this.auth.sendPasswordResetEmail(email).catch(error => {
			this._ntf.open("toast.firebase." + error.code, "toast.close");
		});
		this._ntf.open("toast.reset_pwd", "toast.close");
	}

	async sendEmailVerification() {
		await this.auth.currentUser.sendEmailVerification();
	}

	socialLogin(providerName: string = "") {
		if (!providerName || providerName == "") return;
		this.provider = providerName;
		this.oAuthLogin();
	}

	private async oAuthLogin() {
		try {
			const credential: any = await this.auth.signInWithPopup(this._pvdr);
			let profile = credential.additionalUserInfo.profile || null;
			let user = credential.user;

			const data: User = {
				uid: user.uid,
				email: profile.email || user.email || "",
				displayName: profile.name || user.displayName,
				photoURL:
					user.photoURL ||
					profile.avatar_url ||
					profile.picture.data.url,
				// location: this._loc.position,
				lastSignInTime: user.metadata.lastSignInTime,
				profileURL: profile.link || profile.html_url || profile.id
			};

			this._uMngr.create(data);
			this._rtr.navigate(["/posts"]);
		} catch (error) {
			return this.errorHandler(error.code);
		}
	}

	private set provider(providerName: string) {
		switch (providerName) {
			case "google":
				this._pvdr = new firebase.auth.GoogleAuthProvider();
				break;
			case "facebook":
				this._pvdr = new firebase.auth.FacebookAuthProvider();
				break;
			case "github":
				this._pvdr = new firebase.auth.GithubAuthProvider();
				break;
		}
	}

	get user(): Observable<User> {
		return this._afAuth.authState.pipe(
			switchMap((fUser: firebase.User) => {
				if (!fUser) {
					this._rtr.navigate(["/auth/login"]);
					return of(null);
				}

				return this._db
					.doc<User>(`users/${fUser.uid}`)
					.valueChanges()
					.pipe(
						map((user: User) => {
							if (!user) {
								this._rtr.navigate(["/auth/login"]);
								return {};
							}

							const data: User = {
								uid: fUser.uid,
								lastSignInTime: fUser.metadata.lastSignInTime,
								lastSignInLocation:
									user.lastSignInLocation ||
									this._loc.position ||
									null,
								providerId: fUser.providerData[0].providerId
							};

							// this._rtr.navigate(["/"]);

							return this._authStateUser = {
								...user,
								...data
							}
						})
					);
			})
		);
	}

	get isAuthenticated(): Observable<boolean> {
		return this._afAuth.authState.pipe(
			tap((user: firebase.User) => {
				if (user && user != undefined) {
					this.store.dispatch(new fromAuth.SetAuthenticated());
				} else {
					this.store.dispatch(new fromAuth.SetUnauthenticated());
				}
			}),
			map<firebase.User, boolean>((user: firebase.User) => {
				return user && user != undefined;
			})
		);
	}

	private errorHandler(error: any) {
		console.log("auth SVC error: ", error);

		this._ntf.open("toast.firebase." + error, "toast.close");
	}

	private get timestamp() {
		return firebase.firestore.FieldValue.serverTimestamp();
		// return firebase.database.ServerValue.TIMESTAMP;
	}
}
