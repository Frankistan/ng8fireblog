import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './effects/auth.effects';
import { reducers, metaReducers } from './reducers/app.reducer';
import { environment } from '@env/environment';
import { LayoutEffects } from './effects/layout.effects';
import { PostsEffects } from './effects/posts.effects';

export const effectsArr:any[] = [
	AuthEffects,
	LayoutEffects,
	PostsEffects
];


@NgModule({
  declarations: [],
  imports: [
	CommonModule,
	EffectsModule.forRoot(effectsArr),
	StoreModule.forRoot(reducers, { metaReducers }),
	// Following import tell the application not to work with the store-devtools if in production
    !environment.production ? StoreDevtoolsModule.instrument({
		maxAge: 25, // Retains last 25 states
		logOnly: environment.production, // Restrict extension to log-only mode
	}) : [] 
  ]
})
export class AppStoreModule { }
