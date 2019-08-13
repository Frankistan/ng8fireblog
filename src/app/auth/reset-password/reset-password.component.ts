import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@app/shared';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent  {

    resetForm: FormGroup;

    constructor(
        private _auth: AuthService,
        private _fb: FormBuilder,
    ) {
        this.resetForm = this._fb.group({
            email: ['fffernandez84@gmail.com', [Validators.required, Validators.email]]
        });
    }

    resetPassword() {
        this._auth.resetPassword(this.resetForm.value.email);
    }
}
