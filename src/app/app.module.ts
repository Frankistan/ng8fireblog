// MODULES
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CustomMaterialModule } from './modules/custom-material.module';
import { NgModule } from '@angular/core';
// COMPONENTS
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
	declarations: [
		AppComponent,
		DashboardComponent
	],
	imports: [
		AppRoutingModule,
		BrowserAnimationsModule,
		BrowserModule,
		CustomMaterialModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
