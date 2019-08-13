import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PasswordValidator } from '@app/shared/validators/match-password.validator';
import { environment } from '@env/environment';
import { AuthService, I18nService } from '@app/shared';

// url pattern
// https://www.quora.com/What-is-the-best-way-to-validate-for-a-URL-in-JavaScript

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
	hide = true;
	signupForm: FormGroup;
	urlPattern: string = "^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$";

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
		private auth: AuthService,
		private _fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		public i18n: I18nService
	) {
		this.createForm();
	}

	ngOnInit() { }

	private createForm() {

		this.signupForm = this._fb.group({
			displayName: ['test', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
			email: ['test@example.com', [Validators.required, Validators.email]],
			photoURL: ['', [Validators.pattern(this.urlPattern)]],
			recaptcha: ['', Validators.required],
			password: ['123456', Validators.required],
			password_confirm: ['123456', Validators.required]
		}, {
				validator: PasswordValidator.MatchPassword // your custom validation method
			});

	}

	signup() {
		this.auth.signup(this.signupForm.value);
	}

	handleSuccess(captchaResponse: string): void {
		this.signupForm.controls['recaptcha'].setValue(captchaResponse);
		this.cdr.detectChanges();
	}

	handleLoad(): void {
		this.cdr.detectChanges();
	}

	handleExpire(): void {
		this.signupForm.controls['recaptcha'].setValue('');
		this.cdr.detectChanges();
	}
}
