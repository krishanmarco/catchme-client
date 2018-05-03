/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoLocation from "../daos/DaoLocation";
import ManagerWeekTimings from '../helpers/ManagerWeekTimings';
import Router from "../navigation/Router";
import {Icons} from '../../Config';
import type {TDataPoint, TSectionListDataPointSections} from '../types/Types';
import type {TLocation} from "../daos/DaoLocation";
import {t} from "../i18n/Translations";


export default class LocationProfileDataPoints {

	static handleOnItemPress(pressedItemId: string, locationProfile: TLocation, navigator) {
		switch (pressedItemId) {
			case LocationProfileDataPoints.infoItemIdPhone:
			case LocationProfileDataPoints.infoItemIdEmail:
			case LocationProfileDataPoints.infoItemIdAddress:
				break;
			case LocationProfileDataPoints.infoItemIdTimings:
				const managerWeekTimings = ManagerWeekTimings.buildFromLocation(locationProfile);
				Router.toModalTimings(navigator, {managerWeekTimings});
				break;
		}
	}


	static infoItemIdPhone = 'infoItemIdPhone';
	static infoItemIdEmail = 'infoItemIdEmail';
	static infoItemIdTimings = 'infoItemIdTimings';
	static infoItemIdAddress = 'infoItemIdAddress';


	constructor(locationProfile: TLocation) {
		this.locationProfile = locationProfile;
	}

	locationProfile: TLocation;


	build(): Array<TSectionListDataPointSections> {
		const locationInfoSections = [];

		const locationDataSectionData = this._buildLocationDataSectionData();
		if (locationDataSectionData.length > 0)
			locationInfoSections.push({title: t('t_catch_info').toUpperCase(), data: locationDataSectionData});

		return locationInfoSections;
	}


	_buildLocationDataSectionData(): Array<TDataPoint> {
		let locationInfo = [];

		if (DaoLocation.hasPhone(this.locationProfile))
			locationInfo.push(this._infoItemLocationPhone(this.locationProfile));

		if (DaoLocation.hasEmail(this.locationProfile))
			locationInfo.push(this._infoItemLocationEmail());

		if (DaoLocation.hasTimings(this.locationProfile))
			locationInfo.push(this._infoItemLocationTimings());

		if (DaoLocation.hasAddressObj(this.locationProfile))
			locationInfo.push(this._infoItemLocationAddress());

		return locationInfo;
	}


	_infoItemLocationPhone(): TDataPoint {
		return {
			id: LocationProfileDataPoints.infoItemIdPhone,
			title: DaoLocation.gPhone(this.locationProfile),
			icon: Icons.locationPhone
		};
	}

	_infoItemLocationEmail(): TDataPoint {
		return {
			id: LocationProfileDataPoints.infoItemIdEmail,
			title: DaoLocation.gEmail(this.locationProfile),
			icon: Icons.locationEmail
		};
	}

	_infoItemLocationTimings(): TDataPoint {
		let managerWeekTimings = ManagerWeekTimings.buildFromLocation(this.locationProfile);

		return {
			id: LocationProfileDataPoints.infoItemIdTimings,
			title: managerWeekTimings.toStringRangeStatusAndCurrentDay(),
			icon: Icons.locationTimings
		};
	}

	_infoItemLocationAddress(): TDataPoint {
		return {
			id: LocationProfileDataPoints.infoItemIdAddress,
			title: DaoLocation.gAddress(this.locationProfile),
			icon: Icons.locationMap
		};
	}

}

