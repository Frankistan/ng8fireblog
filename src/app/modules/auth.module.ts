import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthComponent } from '@app/auth/auth.component';
import { CustomMaterialModule } from './custom-material.module';
import { CustomTranslateModule } from './custom-translate.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from '@app/auth/login/login.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from '@app/auth/reset-password/reset-password.component';
import { SignupComponent } from '@app/auth/signup/signup.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    ResetPasswordComponent,
    SignupComponent,
  ],
  imports: [
	CommonModule,
	CustomMaterialModule,
	CustomTranslateModule,
	FlexLayoutModule,
	NgxCaptchaModule,
	ReactiveFormsModule,
	RouterModule,
  ]
})
export class AuthModule { }
