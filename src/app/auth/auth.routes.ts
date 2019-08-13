import { Routes } from "@angular/router";
import { extract } from "@app/shared/services/i18n.service";
import { LoginComponent } from "./login/login.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { SignupComponent } from "./signup/signup.component";

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