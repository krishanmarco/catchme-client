/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 13-Apr-18 © **/
import _ from 'lodash';
import DaoLocation from "../daos/DaoLocation";
import DaoUser from "../daos/DaoUser";
import DaoUserLocationStatus from "../daos/DaoUserLocationStatus";
import moment from "moment/moment";
import type {TLocation} from "../daos/DaoLocation";
import type {TUser} from "../daos/DaoUser";
import type {TUserLocationStatus} from "../daos/DaoUserLocationStatus";

export type TLocationWithULS = TLocation & {
	status?: TUserLocationStatus
}

export type TULSListState = {
	top: Array<TLocation>,
	past: Array<TLocationWithULS>,
	now: Array<TLocationWithULS>,
	future: Array<TLocationWithULS>
};

class ULSListState {
	constructor(top = [], past = [], now = [], future = []) {
		this.top = top;
		this.past = past;
		this.now = now;
		this.future = future;
	}
}

export default class ULSListManager {
	static pStatus = 'status';

	// Calculates the top, past, now, later fields with only one iteration of locations
	static calculateState(userProfile: TUser): TULSListState {

		// Initialize the raw state
		const state = new ULSListState();
		const tempState = new ULSListState(DaoUser.gLocationsTopIds(userProfile));

		// Iterate the UserLocationStatuses and populate past, now, later accordingly
		const ulsList = DaoUser.gLocationsUserLocationStatuses(userProfile);
		const now = moment();
		for (let i = 0; i < ulsList.length; i++) {
			const uls = ulsList[i];
			const mFrom = moment(DaoUserLocationStatus.gFromTs(uls) * 1000);
			const mUntil = moment(DaoUserLocationStatus.gUntilTs(uls) * 1000);

			// Figure out how if the {mFrom} timestamp is part of {past}, {now} or {future}
			if (now.isBefore(mFrom)) {
				tempState.future.push(uls);

			} else if (now.isBetween(mFrom, mUntil)) {
				tempState.now.push(uls);

			} else {
				tempState.past.push(uls);
			}

		}

		// Iterate the Locations and map the ids from state.top, state.past
		// state.now, state.future to TLocation Objects
		// Note, if there is an id in eg state.top that is not present
		// in the locations list, it won't get displayed (this is a backend error)
		const locations = DaoUser.gLocationsLocations(userProfile);

		const tryFindAndCallback = (locationId, onLocationFound) => {
			const location = locations.find(l => DaoLocation.gId(l) == locationId);
			if (location != null)
				onLocationFound({...location});
		};

		const ulsSetter = (uls, arrayToAddItemTo) => {
			tryFindAndCallback(
				DaoUserLocationStatus.gLocationId(uls),
				location => arrayToAddItemTo.push(ULSListManager.sStatus(location, uls))
			);
		};

		// Set the top items (no status)
		tempState.top.forEach(topId => tryFindAndCallback(topId, location => state.top.push(location)));
		tempState.past.forEach(uls => ulsSetter(uls, state.past));
		tempState.now.forEach(uls => ulsSetter(uls, state.now));
		tempState.future.forEach(uls => ulsSetter(uls, state.future));

		return state;
	}


	static deleteAndGetState(state: TULSListState, uls: TUserLocationStatus) {
		const {top, past, now, future} = state;
		const ulsId = DaoUserLocationStatus.gId(uls);

		const removeFilter = (location) =>
			ULSListManager._isULSInLocation(ulsId, location);

		_.remove(past, removeFilter);
		_.remove(now, removeFilter);
		_.remove(future, removeFilter);

		return new ULSListState(top, past, now, future);
	}

	static editAndGetState(state: TULSListState, newUls: TUserLocationStatus) {
		const {past, now, future} = state;
		return new ULSListState(
			state.top,
			ULSListManager._updateULSInLocation(past, newUls),
			ULSListManager._updateULSInLocation(now, newUls),
			ULSListManager._updateULSInLocation(future, newUls)
		);
	}

	static _isULSInLocation(ulsId: number, location: TLocationWithULS) {
		const status = ULSListManager.gStatus(location);
		return status != null && DaoUserLocationStatus.gId(status) === ulsId;
	}

	static _updateULSInLocation(newStatus: TUserLocationStatus, locations: Array<TLocationWithULS>) {
		for (let i = 0; i < locations.length; i++) {
			const location = locations[i];
			const ulsId = DaoUserLocationStatus.gId(ULSListManager.gStatus(location));
			const newUlsId = DaoUserLocationStatus.gId(newStatus);

			if (ulsId == newUlsId) {
				ULSListManager.sStatus(location, newStatus);
			}
		}

		return locations;
	}

	static gStatus(location: TLocationWithULS) {
		return _.get(location, ULSListManager.pStatus);
	}

	static sStatus(location: TLocation, status: TUserLocationStatus): TLocationWithULS {
		_.set(location, ULSListManager.pStatus, status);
		return location;
	}

}