import { NgModule } from '@angular/core';
import { PostsComponent } from '@app/posts';
import { postsRoutes } from '@app/posts/posts.routes';
import { Routes, RouterModule } from '@angular/router';
import { PreloadPostsGuard } from '@app/shared/guards/preload-posts.guard';

const routes: Routes = [
	{
		path: "",
		component: PostsComponent,
		children: postsRoutes
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	// providers: [PreloadPostsGuard]
})
export class PostsRoutingModule { }
