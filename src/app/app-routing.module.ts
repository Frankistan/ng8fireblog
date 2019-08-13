import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { FiltersComponent } from "./layout/filters/filters.component";
import { ProfileComponent } from "./profile/profile.component";
import { SearchbarComponent } from "./layout/searchbar/searchbar.component";
import { SettingsComponent } from "./settings/settings.component";
import { WelcomeComponent } from "./welcome/welcome.component";
//GUARDS
import { AuthGuard } from "./shared/guards/auth.guard";
import { DiscardChangesGuard } from "./shared/guards/discard-changes.guard";
import { LoggedInGuard } from "./shared/guards/logged-in.guard";
// ROUTES
import { authRoutes } from "./auth/auth.routes";
// HELPERS
import { extract } from "./shared/services/i18n.service";


// FUENTE: https://stackoverflow.com/questions/39601026/angular-2-scroll-to-top-on-route-change/51915623#51915623

const routes: Routes = [
	{
		path: "",
		pathMatch: "full",
		component: WelcomeComponent,
		canActivate: [AuthGuard],
		data: {
			title: extract("home"),
			animation: {
				value: "home"
			}
		}
	},
	{
		path: "auth",
		component: AuthComponent,
		canActivate: [LoggedInGuard],
		children: authRoutes
	},
	{
		path: "profile",
		component: ProfileComponent,
		canActivate: [AuthGuard],
		canDeactivate: [DiscardChangesGuard],
		data: {
			title: extract("profile"),
			animation: {
				value: "profile"
			}
		}
	},
	{
		path: "profile/:id",
		component: ProfileComponent,
		canActivate: [AuthGuard],
		data: {
			title: extract("profile-visiting"),
			animation: {
				value: "profile"
			}
		}
	},
	{
		path: "filters",
		component: FiltersComponent,
		outlet: "filtersPopup"
	},
	{
		path: "search",
		component: SearchbarComponent,
		canActivate: [AuthGuard],
		outlet: "search"
	},
	{
		path: "posts",
		loadChildren: "./modules/posts.module#PostsModule",
		canLoad: [AuthGuard],
	},
	{
		path: "settings",
		component: SettingsComponent,
		canActivate: [AuthGuard],
		// canDeactivate: [DiscardChangesGuard],
		data: {
			title: extract("settings"),
			animation: {
				value: "settings"
			}
		}
	},
	// {
	//     path: 'apps', component: CrmRciComponent, canActivate: [AuthGuard],
	//     data: {
	//         title: extract('apps'),
	//         animation: {
	//             value: 'apps',
	//         }
	//     }
	// },

	// otherwise redirect to home
	{ path: "**", redirectTo: "" }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: "enabled" // Add options right here
		})
	],
	providers: [AuthGuard, DiscardChangesGuard, LoggedInGuard],
	exports: [RouterModule]
})
export class AppRoutingModule { }
