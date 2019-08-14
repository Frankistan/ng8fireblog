import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomMaterialModule } from './custom-material.module';
import { CustomTranslateModule } from './custom-translate.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent, LoginComponent, ResetPasswordComponent, SignupComponent } from '@app/auth';

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
