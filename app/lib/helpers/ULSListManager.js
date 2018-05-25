/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 13-Apr-18 © **/
import DaoLocation from '../daos/DaoLocation';
import DaoUser from '../daos/DaoUser';
import DaoUserLocationStatus from '../daos/DaoUserLocationStatus';
import moment from 'moment/moment';
import type {TLocation} from '../daos/DaoLocation';
import type {TUser} from '../daos/DaoUser';
import type {TUserLocationStatus} from '../daos/DaoUserLocationStatus';

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

	// Organizes the locations into ULSListState past, now, future arrays based
	// on the location.status.fromTs timestamp
	static _organizeState(locationsWithUls: Array<TLocationWithULS>): TULSListState {
		const state = new ULSListState();
		const now = moment();

		locationsWithUls.forEach((location: TLocationWithULS) => {
			const uls = DaoLocation.gUserLocationStatus(location);

			// If status is null this is not a TLocationWithULS
			if (uls == null)
				return;

			const mFrom = moment(DaoUserLocationStatus.gFromTs(uls) * 1000);
			const mUntil = moment(DaoUserLocationStatus.gUntilTs(uls) * 1000);

			if (now.isBefore(mFrom)) {
				state.future.push(location);

			} else if (now.isBetween(mFrom, mUntil)) {
				state.now.push(location);

			} else {
				state.past.push(location);
			}

		});

		return state;
	}


	// Calculates the top, past, now, later fields with only one iteration of locations
	static calculateState(userProfile: TUser): TULSListState {
		// Initialize the empty result state
		const state = new ULSListState(DaoUser.gLocationsTop(userProfile));

		// Get all the possible locations object
		const locations = DaoUser.gLocationsLocations(userProfile);

		// Get all the possible statuses (not organized)
		const ulsList = DaoUser.gLocationsUserLocationStatuses(userProfile);

		// Create a list of TLocationWithULS for each TUserLocationStatus
		const locationsWithUls = [];
		for (let i = 0; i < ulsList.length; i++) {
			const uls = ulsList[i];

			const location = locations
				.find(loc => DaoLocation.gId(loc) == DaoUserLocationStatus.gLocationId(uls));

			// A corresponding location might not have been given
			// this is a backend error (shouldn't happen)
			if (location != null)
				locationsWithUls.push(DaoLocation.sUserLocationStatus({...location}, uls));
		}

		// Organize the locationsWithUls state by timings
		const tempState = ULSListManager._organizeState(locationsWithUls);

		// Set into the return object
		state.past = tempState.past;
		state.now = tempState.now;
		state.future = tempState.future;

		return state;
	}


}