import { Component } from "@angular/core";

@Component({
    selector: "app-posts",
    template: `
        <router-outlet></router-outlet>
	`,
	styles:[
		`
		.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper{
			min-width: 100%;
			width: 100%;
			height: 100vh;
		}
		`
	]
})
export class PostsComponent {}
