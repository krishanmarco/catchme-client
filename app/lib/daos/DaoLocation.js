/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import DaoUserLocationStatus from './DaoUserLocationStatus';
import ManagerWeekTimings from '../helpers/ManagerWeekTimings';
import {Const} from '../../Config';
import {denormObj, isValidUrl} from '../HelperFunctions';
import type {TLocationWithULS} from '../helpers/ULSListManager';
import type {TUser} from './DaoUser';
import type {TUserLocationStatus} from './DaoUserLocationStatus';


export type TLocation = {
	id: number,                         // 1                                Unique feed item identifier
	name: string,                       // 'Area Docks'                     Location name
	description: string,                // 'Area Docks club'                Location Description
	capacity: number,                   // 500                              Maximum capacity of this location
	pictureUrl: string,                 // 'http://catchme.top/image.png'   URL of the location profile picture
	phone: string,                      // '+393347014935'                  Location phone number
	email: string,                      // 'admin@areadocks.com'            Location email address
	timings: string,                    // '01001101010101...'              Timing string for location (len=24) 0=closed, 1=open
	imageUrls: string,                  // ['http:...', 'http:...']         Array of location images
	address: TLocationAddress,          // {...TLocationAddress}            Address object for this location
	googlePlaceId?: string,             // '203948230ksa98'                 Google places location ID
	status?: TUserLocationStatus,  			// {...TUserLocationStatus}  				Only present if this is a TLocationWithULS
	people?: TLocationPeople,           // {...TLocationPeople}             People object for this location
	connections?: TLocationConnections  // {...TLocationConnections}  Connections object for this location
};

export type TLocationAddress = {
	country: string,                    // 'US'                             Country ISO code
	postcode: string,                   // '25038'                          Postcode
	address: string,                    // 'Via Francesco Baracca 61'       Other address fields
	state: ?string,                     // 'CA'                             State ISO code
	city: ?string,                      // 'San Francisco'                  City or province
	latLng?: TLocationAddressLatLng     // {...TLocationAddressLatLng}      Latitude and Longitude
};

export type TLocationAddressLatLng = {
	lat: number,
	lng: number
};

export type TLocationPeople = {
	men: number,                        // 50                               Number of men currently in this location
	women: number,                      // 50                               Number of women currently in this location
	total: number                       // 150                              Total number of people in this location
};

export type TLocationConnections = {
	now: Array<TUser>,                  // [{...TUser}, ...]                Friends of current user in location now
	future: Array<TUser>,               // [{...TUser}, ...]                Friends of current user in location later
	past?: Array<TUser>                 // [{...TUser}, ...]                Friends of current user in location later
};


export default class DaoLocation {
	static pId = 'id';
	static pName = 'name';
	static pDescription = 'description';
	static pCapacity = 'capacity';
	static pPictureUrl = 'pictureUrl';
	static pPhone = 'phone';
	static pEmail = 'email';
	static pTimings = 'timings';
	static pImageUrls = 'imageUrls';
	static pAddress = 'address';
	static pPeople = 'people';
	static pConnections = 'connections';
	static pGooglePlaceId = 'googlePlaceId';
	static pStatus = 'status';
	static pAddressCountry = `${DaoLocation.pAddress}.country`;
	static pAddressState = `${DaoLocation.pAddress}.state`;
	static pAddressCity = `${DaoLocation.pAddress}.city`;
	static pAddressPostcode = `${DaoLocation.pAddress}.postcode`;
	static pAddressAddress = `${DaoLocation.pAddress}.address`;
	static pAddressLatLng = `${DaoLocation.pAddress}.latLng`;
	static pPeopleMen = `${DaoLocation.pPeople}.men`;
	static pPeopleWomen = `${DaoLocation.pPeople}.women`;
	static pPeopleTotal = `${DaoLocation.pPeople}.total`;
	static pConnectionsNow = `${DaoLocation.pConnections}.now`;
	static pConnectionsFuture = `${DaoLocation.pConnections}.future`;
	
	
	static shallowCopy(location: TLocation): TLocation {
		const newLocation = {};
		_.set(newLocation, DaoLocation.pId, DaoLocation.gId(location));
		_.set(newLocation, DaoLocation.pName, DaoLocation.gName(location));
		_.set(newLocation, DaoLocation.pDescription, DaoLocation.gDescription(location));
		_.set(newLocation, DaoLocation.pCapacity, DaoLocation.gCapacity(location));
		_.set(newLocation, DaoLocation.pPictureUrl, DaoLocation.gPictureUrl(location));
		_.set(newLocation, DaoLocation.pPhone, DaoLocation.gPhone(location));
		_.set(newLocation, DaoLocation.pEmail, DaoLocation.gEmail(location));
		_.set(newLocation, DaoLocation.pTimings, DaoLocation.gTimings(location));
		_.set(newLocation, DaoLocation.pImageUrls, DaoLocation.gImageUrls(location));
		_.set(newLocation, DaoLocation.pGooglePlaceId, DaoLocation.gGooglePlaceId(location));
		_.set(newLocation, DaoLocation.pAddressCountry, DaoLocation.gCountry(location));
		_.set(newLocation, DaoLocation.pAddressState, DaoLocation.gState(location));
		_.set(newLocation, DaoLocation.pAddressCity, DaoLocation.gCity(location));
		_.set(newLocation, DaoLocation.pAddressPostcode, DaoLocation.gPostcode(location));
		_.set(newLocation, DaoLocation.pAddressAddress, DaoLocation.gAddress(location));
		_.set(newLocation, DaoLocation.pAddressLatLng, DaoLocation.gLatLng(location));
		_.set(newLocation, DaoLocation.pPeopleMen, DaoLocation.gMen(location));
		_.set(newLocation, DaoLocation.pPeopleWomen, DaoLocation.gWomen(location));
		_.set(newLocation, DaoLocation.pPeopleTotal, DaoLocation.gTotal(location));
		_.set(newLocation, DaoLocation.pConnectionsNow, DaoLocation.gFriendsNow(location));
		_.set(newLocation, DaoLocation.pConnectionsFuture, DaoLocation.gFriendsFuture(location));
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
			[DaoLocation.pAddressPostcode]: '',
			[DaoLocation.pAddressAddress]: '',
			[DaoLocation.pAddressLatLng]: {lat: null, lng: null,}
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
	
	static gAddressObj(location: TLocation): TLocationAddress {
		return _.get(location, DaoLocation.pAddress);
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
	
	static gPostcode(location: TLocation): string {
		return _.get(location, DaoLocation.pAddressPostcode);
	}
	
	static gAddress(location: TLocation): string {
		return _.get(location, DaoLocation.pAddressAddress);
	}
	
	static gLatLng(location: TLocation): TLocationAddressLatLng {
		return _.get(location, DaoLocation.pAddressLatLng);
	}
	
	static gImageUrls(location: TLocation): Array<string> {
		return _.get(location, DaoLocation.pImageUrls, []);
	}
	
	static gPeople(location: TLocation): TLocationPeople {
		return _.get(location, DaoLocation.pPeople);
	}
	
	static gMen(location: TLocation): number {
		return _.get(location, DaoLocation.pPeopleMen, 0);
	}
	
	static gWomen(location: TLocation): number {
		return _.get(location, DaoLocation.pPeopleWomen, 0);
	}
	
	static gTotal(location: TLocation): number {
		return _.get(location, DaoLocation.pPeopleTotal, 0);
	}
	
	
	static gConnections(location: TLocation): TLocationConnections {
		return _.get(location, DaoLocation.pConnections);
	}
	
	static gFriendsNow(location: TLocation): Array<TUser> {
		return _.get(location, DaoLocation.pConnectionsNow, []);
	}
	
	static gFriendsFuture(location: TLocation): Array<TUser> {
		return _.get(location, DaoLocation.pConnectionsFuture, []);
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
	
	
	static hasTimings(location: TLocation): boolean {
		return !_.isEmpty(DaoLocation.gTimings(location));
	}
	
	static hasPhone(location: TLocation): boolean {
		return !_.isEmpty(DaoLocation.gPhone(location));
	}
	
	static hasEmail(location: TLocation): boolean {
		return !_.isEmpty(DaoLocation.gEmail(location));
	}
	
	static hasConnections(location: TLocation): boolean {
		return DaoLocation.pConnections in location;
	}
	
	static hasAddressObj(location: TLocation): boolean {
		return DaoLocation.pAddress in location;
	}
	
	static hasPeople(location: TLocation): boolean {
		return DaoLocation.pPeople in location;
	}

	static hasLatLng(location: TLocation): boolean {
		const {lat, lng} = DaoLocation.gLatLng(location);
		return _.isFinite(lat) && _.isFinite(lng);
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