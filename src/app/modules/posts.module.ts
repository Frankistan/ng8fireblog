import { NgModule } from '@angular/core';
import { AvatarModule } from "ngx-avatar";
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from './custom-material.module';
import { CustomTinymceModule } from './custom-tinymce.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { LazyModule } from './lazy-module/lazy.module';
import { MomentModule } from 'ngx-moment';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ScrollTrackerModule } from '@nicky-lenaers/ngx-scroll-tracker/scroll-tracker.module';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
// Components
import { FabCreatePostComponent } from '@app/layout/fabs/create-post-fab.component';
import { FabEditPostComponent } from '@app/layout/fabs/edit-post-fab.component';
import { FabScrollToTopComponent } from '@app/layout/fabs/scroll-to-top-fab.component';
import { FileUploadDropzoneComponent } from '@app/layout/file-upload-dropzone/file-upload-dropzone.component';
import {
	GridViewComponent,
	ListViewComponent,
	PostElementComponent,
	PostEmptyComponent,
	PostFormComponent,
	PostListComponent,
	PostsComponent,
	PostShowComponent,
	VirtualComponent,
} from '@app/posts';

// Directives & Pipes
import { FileSizePipe } from '@app/shared/pipes/file-size.pipe';
import { DropzoneDirective } from '@app/shared/directives/drop-zone.directive';
import { PostsRoutingModule } from '../posts/posts-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from '@app/store/reducers/post.reducer';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
	declarations: [
		DropzoneDirective,
		FabCreatePostComponent,
		FabEditPostComponent,
		FabScrollToTopComponent,
		FileSizePipe,
		FileUploadDropzoneComponent,
		GridViewComponent,
		ListViewComponent,
		PostElementComponent,
		PostEmptyComponent,
		PostFormComponent,
		// PostListComponent,
		PostsComponent,
		PostShowComponent,
		VirtualComponent,
	],
	imports: [
		AvatarModule,
		CommonModule,
		CustomMaterialModule,
		CustomTinymceModule,
		FlexLayoutModule,
		HttpClientModule,
		LazyModule,
		MomentModule,
		PostsRoutingModule,
		ReactiveFormsModule,
		RouterModule,
		ScrollingModule,
		ScrollTrackerModule,
		StoreModule.forFeature('posts', reducer),
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		})
	]
})
export class PostsModule { }
