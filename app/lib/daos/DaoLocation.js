/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import DaoMetadata from './DaoMetadata';
import DaoUserLocationStatus from './DaoUserLocationStatus';
import ManagerWeekTimings from '../helpers/ManagerWeekTimings';
import {Const} from '../../Config';
import {denormObj, isValidUrl} from '../HelperFunctions';
import type {TLatLng} from '../types/Types';
import type {TLocationWithULS} from '../helpers/ULSListManager';
import type {TMetadata} from './DaoMetadata';
import type {TUser} from './DaoUser';
import type {TUserLocationStatus} from './DaoUserLocationStatus';

export type TLocation = {
	id: number,
	name: string,
	description: string,
	capacity: number,
	pictureUrl: string,
	email: string,
	phone: string,
	timings: string,
	imageUrls: string,
	country: string,
	state: string,
	city: string,
	town: string,
	postcode: string,
	address: string,
	latLng: TLatLng,
	googlePlaceId: string,
	peopleMenCount: number,
	peopleWomenCount: number,
	peopleTotalCount: number,
	connectionsNowIds: Array<number>,
	connectionsFutureIds: Array<number>,
	metadata: TMetadata,
	status?: TUserLocationStatus,
};

export default class DaoLocation {
	static pId = 'id';
	static pName = 'name';
	static pDescription = 'description';
	static pCapacity = 'capacity';
	static pPictureUrl = 'pictureUrl';
	static pEmail = 'email';
	static pPhone = 'phone';
	static pTimings = 'timings';
	static pImageUrls = 'imageUrls';
	static pAddressCountry = 'country';
	static pAddressState = 'state';
	static pAddressCity = 'city';
	static pAddressTown = 'town';
	static pAddressPostcode = 'postcode';
	static pAddressAddress = 'address';
	static pAddressLatLng = 'latLng';
	static pGooglePlaceId = 'googlePlaceId';
	static pPeopleMenCount = 'peopleMenCount';
	static pPeopleWomenCount = 'peopleWomenCount';
	static pPeopleTotalCount = 'peopleTotalCount';
	static pConnectionsNowIds = 'connectionsNowIds';
	static pConnectionsFutureIds = 'connectionsFutureIds';
	static pMetadata = 'metadata';
	static pStatus = 'status';

	static shallowCopy(location: TLocation): TLocation {
		const newLocation = {};
		_.set(newLocation, DaoLocation.pId, DaoLocation.gId(location));
		_.set(newLocation, DaoLocation.pName, DaoLocation.gName(location));
		_.set(newLocation, DaoLocation.pDescription, DaoLocation.gDescription(location));
		_.set(newLocation, DaoLocation.pCapacity, DaoLocation.gCapacity(location));
		_.set(newLocation, DaoLocation.pPictureUrl, DaoLocation.gPictureUrl(location));
		_.set(newLocation, DaoLocation.pEmail, DaoLocation.gEmail(location));
		_.set(newLocation, DaoLocation.pPhone, DaoLocation.gPhone(location));
		_.set(newLocation, DaoLocation.pTimings, DaoLocation.gTimings(location));
		_.set(newLocation, DaoLocation.pImageUrls, DaoLocation.gImageUrls(location));
		_.set(newLocation, DaoLocation.pAddressCountry, DaoLocation.gCountry(location));
		_.set(newLocation, DaoLocation.pAddressState, DaoLocation.gState(location));
		_.set(newLocation, DaoLocation.pAddressCity, DaoLocation.gCity(location));
		_.set(newLocation, DaoLocation.pAddressTown, DaoLocation.gTown(location));
		_.set(newLocation, DaoLocation.pAddressPostcode, DaoLocation.gPostcode(location));
		_.set(newLocation, DaoLocation.pAddressAddress, DaoLocation.gAddress(location));
		_.set(newLocation, DaoLocation.pAddressLatLng, DaoLocation.gLatLng(location));
		_.set(newLocation, DaoLocation.pGooglePlaceId, DaoLocation.gGooglePlaceId(location));
		_.set(newLocation, DaoLocation.pPeopleMenCount, DaoLocation.gMen(location));
		_.set(newLocation, DaoLocation.pPeopleWomenCount, DaoLocation.gWomen(location));
		_.set(newLocation, DaoLocation.pPeopleTotalCount, DaoLocation.gTotal(location));
		_.set(newLocation, DaoLocation.pConnectionsNowIds, DaoLocation.gConnectionsNowIds(location));
		_.set(newLocation, DaoLocation.pConnectionsFutureIds, DaoLocation.gConnectionsFutureIds(location));
		_.set(newLocation, DaoLocation.pMetadata, DaoMetadata.shallowCopy(DaoLocation.gMetadata(location)));
		// Private fields (_) will have to be recalculated...
		return newLocation;
	}

	static newInstance(): TLocation {
		return denormObj({
			// To allow a new location to be saved to the server
			// through the 'edit' entry-point the id has to be -1
			[DaoLocation.pId]: Const.locationNewId,
			[DaoLocation.pName]: '',
			[DaoLocation.pPictureUrl]: Const.locationDefaultAvatar,
			[DaoLocation.pDescription]: '',
			[DaoLocation.pEmail]: '',
			[DaoLocation.pPhone]: '',
			[DaoLocation.pCapacity]: 0,
			[DaoLocation.pTimings]: ManagerWeekTimings.strWeekDefault,
			[DaoLocation.pAddressCountry]: '',
			[DaoLocation.pAddressState]: '',
			[DaoLocation.pAddressCity]: '',
			[DaoLocation.pAddressTown]: '',
			[DaoLocation.pAddressPostcode]: '',
			[DaoLocation.pAddressAddress]: '',
			[DaoLocation.pAddressLatLng]: {lat: null, lng: null,},
			[DaoLocation.pMetadata]: DaoMetadata.newInstance()
		});
	}

	static apiClean(location: TLocation): TLocation {
		const newLocation = {};
		_.set(newLocation, DaoLocation.pId, DaoLocation.gId(location));
		_.set(newLocation, DaoLocation.pName, DaoLocation.gName(location));
		_.set(newLocation, DaoLocation.pDescription, DaoLocation.gDescription(location));
		_.set(newLocation, DaoLocation.pCapacity, DaoLocation.gCapacity(location));
		_.set(newLocation, DaoLocation.pPictureUrl, DaoLocation.gPictureUrl(location));
		_.set(newLocation, DaoLocation.pPhone, DaoLocation.gPhone(location));
		_.set(newLocation, DaoLocation.pEmail, DaoLocation.gEmail(location));
		_.set(newLocation, DaoLocation.pTimings, DaoLocation.gTimings(location));
		_.set(newLocation, DaoLocation.pGooglePlaceId, DaoLocation.gGooglePlaceId(location));
		_.set(newLocation, DaoLocation.pAddressCountry, DaoLocation.gCountry(location));
		_.set(newLocation, DaoLocation.pAddressState, DaoLocation.gState(location));
		_.set(newLocation, DaoLocation.pAddressCity, DaoLocation.gCity(location));
		_.set(newLocation, DaoLocation.pAddressTown, DaoLocation.gTown(location));
		_.set(newLocation, DaoLocation.pAddressPostcode, DaoLocation.gPostcode(location));
		_.set(newLocation, DaoLocation.pAddressAddress, DaoLocation.gAddress(location));
		_.set(newLocation, DaoLocation.pAddressLatLng, DaoLocation.gLatLng(location));
		return newLocation;
	}
	
	static gId(location: TLocation): number {
		return _.get(location, DaoLocation.pId);
	}
	
	static gName(location: TLocation): string {
		return _.get(location, DaoLocation.pName);
	}
	
	static gDescription(location: TLocation): string {
		return _.get(location, DaoLocation.pDescription);
	}
	
	static gCapacity(location: TLocation): number {
		return _.get(location, DaoLocation.pCapacity);
	}
	
	static gPictureUrl(location: TLocation): string {
		const pictureUri = _.trim(_.get(location, DaoLocation.pPictureUrl));
		return _.isEmpty(pictureUri) ? Const.locationDefaultAvatar : pictureUri;
	}
	
	static gTimings(location: TLocation): string {
		return _.get(location, DaoLocation.pTimings, ManagerWeekTimings.strWeekDefault);
	}
	
	static gPhone(location: TLocation): string {
		return _.get(location, DaoLocation.pPhone);
	}
	
	static gEmail(location: TLocation): string {
		return _.get(location, DaoLocation.pEmail);
	}
	
	static gGooglePlaceId(location: TLocation): string {
		return _.get(location, DaoLocation.pGooglePlaceId);
	}
	
	static gCountry(location: TLocation): string {
		return _.get(location, DaoLocation.pAddressCountry);
	}
	
	static gState(location: TLocation): string {
		return _.get(location, DaoLocation.pAddressState);
	}
	
	static gCity(location: TLocation): string {
		return _.get(location, DaoLocation.pAddressCity);
	}

	static gTown(location: TLocation): string {
		return _.get(location, DaoLocation.pAddressTown);
	}
	
	static gPostcode(location: TLocation): string {
		return _.get(location, DaoLocation.pAddressPostcode);
	}
	
	static gAddress(location: TLocation): string {
		return _.get(location, DaoLocation.pAddressAddress);
	}
	
	static gLatLng(location: TLocation): TLatLng {
		return _.get(location, DaoLocation.pAddressLatLng);
	}
	
	static gImageUrls(location: TLocation): Array<string> {
		return _.get(location, DaoLocation.pImageUrls, []);
	}
	
	static gMen(location: TLocation): number {
		return _.get(location, DaoLocation.pPeopleMenCount, 0);
	}
	
	static gWomen(location: TLocation): number {
		return _.get(location, DaoLocation.pPeopleWomenCount, 0);
	}
	
	static gTotal(location: TLocation): number {
		return _.get(location, DaoLocation.pPeopleTotalCount, 0);
	}

	static gConnectionsNowIds(location: TLocation): Array<number> {
		return _.get(location, DaoLocation.pConnectionsNowIds, []);
	}

	static gConnectionsFutureIds(location: TLocation): Array<number> {
		return _.get(location, DaoLocation.pConnectionsFutureIds, []);
	}

	static gMetadata(location: TLocation): TMetadata {
		return _.get(location, DaoLocation.pMetadata, {});
	}

	static gUserLocationStatus(location: TLocationWithULS): TUserLocationStatus {
		return _.get(location, DaoLocation.pStatus, null);
	}

	static sUserLocationStatus(location: TLocationWithULS, userLocationStatus: TUserLocationStatus): TLocationWithULS {
		_.set(location, DaoLocation.pStatus, userLocationStatus);
		return location;
	}


// HelperAccessors **************************************************************************************
// HelperAccessors **************************************************************************************

	static gConnectionsNow(location: TLocation): Array<TUser> {
		return DaoMetadata.gUsers(DaoLocation.gMetadata(location), DaoLocation.gConnectionsNowIds(location));
	}

	static gConnectionsFuture(location: TLocation): Array<TUser> {
		return DaoMetadata.gUsers(DaoLocation.gMetadata(location), DaoLocation.gConnectionsFutureIds(location));
	}
	
	static hasTimings(location: TLocation): boolean {
		return !_.isEmpty(DaoLocation.gTimings(location));
	}
	
	static hasPhone(location: TLocation): boolean {
		return !_.isEmpty(DaoLocation.gPhone(location));
	}
	
	static hasEmail(location: TLocation): boolean {
		return !_.isEmpty(DaoLocation.gEmail(location));
	}

	static hasAddress(location: TLocation): boolean {
		return DaoLocation.pAddressAddress in location;
	}
	
	static hasLatLng(location: TLocation): boolean {
		const {lat, lng} = DaoLocation.gLatLng(location);
		return _.isFinite(lat) && _.isFinite(lng);
	}

	static hasGooglePlaceId(location: TLocation): boolean {
		return !_.isEmpty(DaoLocation.gGooglePlaceId(location));
	}

	static hasNewImage(location: TLocation): boolean {
		const image = DaoLocation.gPictureUrl(location);
		return image != null
			&& image != Const.locationDefaultAvatar
			&& !isValidUrl(image);
	}

	static gIdStr(location: TLocation): string {
		return DaoLocation.gId(location).toString();
	}

	static hasUserLocationStatus(location: TLocation|TLocationWithULS): boolean {
		return DaoLocation.gUserLocationStatus(location) != null;
	}

	static isUlSInLocation(ulsId: number, location: TLocation|TLocationWithULS) {
		return DaoLocation.gUserLocationStatusId(location) == ulsId;
	}

	static gUserLocationStatusId(location: TLocationWithULS): number {
		return _.get(location, `${DaoLocation.pStatus}.${DaoUserLocationStatus.pId}`, null);
	}
	
}