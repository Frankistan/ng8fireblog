//MODULES
import { NgModule } from "@angular/core";
import { AvatarModule } from "ngx-avatar";
import { AppRoutingModule } from "./app-routing.module";
import { AppStoreModule } from "./store/app-store.module";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CustomFirebaseModule } from "./modules/custom-firebase.module";
import { CustomFormsModule } from "ngx-custom-validators";
import { AuthModule } from "./modules/auth.module";
import { CustomMaterialModule } from "./modules/custom-material.module";
import { CustomTinymceModule } from "./modules/custom-tinymce.module";
import { CustomTranslateModule } from "./modules/custom-translate.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ImageCropperModule } from "ngx-image-cropper";
import { MomentModule } from "ngx-moment";
import { NgxCaptchaModule } from "ngx-captcha";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { ScrollTrackerModule } from "@nicky-lenaers/ngx-scroll-tracker";
//COMPONENTS
import { AppComponent } from "./app.component";
import { BtnFilterComponent } from "@app/layout/navbar/buttons/btn-filter/btn-filter.component";
import { BtnLangComponent } from "@app/layout/navbar/buttons/btn-lang.component";
import { BtnMoreComponent } from "@app/layout/navbar/buttons/btn-more/btn-more.component";
import { BtnSearchComponent } from "@app/layout/navbar/buttons/btn-search.component";
import { BtnSortByComponent } from "@app/layout/navbar/buttons/btn-sort-by/btn-sort-by.component";
import { BtnViewComponent } from "@app/layout/navbar/buttons/btn-view/btn-view.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FiltersComponent } from "./layout/filters/filters.component";
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { ProfileComponent } from "./profile/profile.component";
import { SearchbarComponent } from "./layout/searchbar/searchbar.component";
import { SettingsComponent } from "./settings/settings.component";
import { SidenavContentComponent } from "./layout/sidenav/sidenav-content/sidenav-content.component";
import { SidenavHeaderComponent } from "./layout/sidenav/sidenav-header/sidenav-header.component";
import { SpinnerComponent } from "./layout/spinner/spinner.component";
import { WelcomeComponent } from './welcome/welcome.component';
// import { VirtualInfinityScrollComponent } from './posts/virtual-infinity-scroll/virtual-infinity-scroll.component';
//DIALOGS
import { ConfirmDialog } from "./layout/confirm-dialog/confirm-dialog.component";
import { UploadProfileImageDialog } from "./profile/upload-profile-image-dialog/upload-profile-image-dialog.component";
//DIRECTIVES
import { AutofocusDirective } from "./shared/directives/autofocus.directive";
//SERVICES
import {
    AuthService,
    CoreService,
    FileManagerService,
    GeocodingService,
    GeolocationService,
    I18nService,
    NotificationService,
    PaginationService,
    PostsService,
    SettingsService,
    UserManagerService
} from "./shared";
import { ProfileEmailComponent } from './profile/profile-email/profile-email.component';
import { ProfileSocialComponent } from './profile/profile-social/profile-social.component';


@NgModule({
    declarations: [
        AppComponent,
        AutofocusDirective,
        BtnFilterComponent,
        BtnLangComponent,
        BtnMoreComponent,
        BtnSearchComponent,
        BtnSortByComponent,
        BtnViewComponent,
        ConfirmDialog,
        DashboardComponent,        
        FiltersComponent,
        NavbarComponent,
        ProfileComponent,
        SearchbarComponent,
        SettingsComponent,
        SidenavContentComponent,
        SidenavHeaderComponent,
        SpinnerComponent,
        UploadProfileImageDialog,
        WelcomeComponent,
        ProfileEmailComponent,
        ProfileSocialComponent
        // VirtualInfinityScrollComponent,
    ],
    imports: [
		AppRoutingModule,
		AppStoreModule,
		BrowserAnimationsModule,
		AuthModule,
        AvatarModule,
        BrowserModule,
        CustomFirebaseModule,
        CustomFormsModule,
        CustomMaterialModule,
        CustomTinymceModule,
        CustomTranslateModule,
        FlexLayoutModule,
        FormsModule,
        SlickCarouselModule,
        ImageCropperModule,
        MomentModule,
        NgxCaptchaModule,
        ReactiveFormsModule,
        ScrollTrackerModule.forRoot(),
        ScrollingModule,
        
        
    ],
    providers: [
        AuthService,
        CoreService,
        FileManagerService,
        GeocodingService,
        GeolocationService,
        I18nService,
        NotificationService,
        PaginationService,
        PostsService,
        SettingsService,
        UserManagerService
    ],
    entryComponents: [ConfirmDialog, UploadProfileImageDialog],
    bootstrap: [AppComponent]
})
export class AppModule {}
