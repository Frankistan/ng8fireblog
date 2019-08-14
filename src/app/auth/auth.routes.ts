import { Routes } from "@angular/router";
import { extract } from "@app/shared/services/i18n.service";
import { LoginComponent, SignupComponent, ResetPasswordComponent } from '.';

export const authRoutes: Routes = [
	{
		path: "login",
		component: LoginComponent,
		data: {
			title: extract("login"),
			animation: {
				value: "login"
			}
		}
	},
	{
		path: "signup",
		component: SignupComponent,
		data: {
			title: extract("signup"),
			animation: {
				value: "signup"
			}
		}
	},
	{
		path: "reset-password",
		component: ResetPasswordComponent,
		data: {
			title: extract("reset_password"),
			animation: {
				value: "reset-password"
			}
		}
	}
  ];