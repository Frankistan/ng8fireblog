import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService, I18nService } from '@app/shared';
import { environment } from '@env/environment';
import { Store } from '@ngrx/store';
import { AppState } from '@app/store/reducers/app.reducer';
import { LogIn } from '@app/store/actions/auth.actions';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	hide = true;
	loginForm: FormGroup;

	size: string = "normal";
	lang: string = "es";
	theme: string = "light";
	type: string = "image";
	siteKey: string = environment.recaptcha.siteKey;

	captchaIsLoaded = false;
	captchaSuccess = false;
	captchaIsExpired = false;
	captchaResponse?: string;

	constructor(
		public auth: AuthService,
		private _fb: FormBuilder,
		public i18n: I18nService,
		private store: Store<AppState>
	) { }

	ngOnInit() {
		this.loginForm = this._fb.group({
			email: ['ffontanesf@unisono.es', [Validators.required, Validators.email]],
			password: ['123456', Validators.required],
			// recaptcha: ['', Validators.required]
			recaptcha: ['']
		});
	}

	login() {
		this.store.dispatch(new LogIn(this.loginForm.value));
	}

	socialLogin(provider: string) {
		this.auth.socialLogin(provider);
	}

	handleSuccess(captchaResponse: string): void {
		this.loginForm.controls['recaptcha'].setValue(captchaResponse);
	}

	handleLoad(): void {
	}

	handleExpire(): void {
		this.loginForm.controls['recaptcha'].setValue('');
	}
}