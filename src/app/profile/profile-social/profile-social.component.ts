import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@app/models/user';
import { GeocodingService, I18nService } from '@app/shared';
import { scaleAnimation } from '@app/animations/scale.animation';

@Component({
	selector: 'app-profile-social',
	templateUrl: './profile-social.component.html',
	styleUrls: ['./profile-social.component.scss'],
	animations: [scaleAnimation]
})
export class ProfileSocialComponent implements OnInit {
	@Input() user: User;

	address$: Observable<any>;
	locale: string;

	constructor(
		private _geo: GeocodingService,
		private _i18n: I18nService,
	) { }

	ngOnInit() {
		this.address$ = this._geo.geocode(this.user.lastSignInLocation);
		this.locale = this._i18n.language;
	}

}
