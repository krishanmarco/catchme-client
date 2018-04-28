/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import TimestampFormatter from "../helpers/TimestampFormatter";
import {Const} from "../../Config";
import {denormObj, seconds} from "../HelperFunctions";
import DaoUser from "./DaoUser";


export type TUserLocationStatus = {
	id: number,                   // 1                            Unique feed item identifier
	locationId: number,           // 3                            Id if the location associated with this status
	fromTs: number,               // 1000000000                   When the user is at this location (start time)
	untilTs: number,              // 1000000000                   When the user is at this location (end time)
};


export default class DaoUserLocationStatus {
	static pId = 'id';
	static pLocationId = 'locationId';
	static pFromTs = 'fromTs';
	static pUntilTs = 'untilTs';
	
	
	static shallowCopy(userLocationStatus: TUserLocationStatus): TUserLocationStatus {
		const newUserLocationStatus = {};
		_.set(newUserLocationStatus, DaoUserLocationStatus.pId, DaoUserLocationStatus.gId(userLocationStatus));
		_.set(newUserLocationStatus, DaoUserLocationStatus.pLocationId, DaoUserLocationStatus.gLocationId(userLocationStatus));
		_.set(newUserLocationStatus, DaoUserLocationStatus.pFromTs, DaoUserLocationStatus.gFromTs(userLocationStatus));
		_.set(newUserLocationStatus, DaoUserLocationStatus.pUntilTs, DaoUserLocationStatus.gUntilTs(userLocationStatus));
		
		// Private fields (_) will have to be recalculated...
		return newUserLocationStatus;
	}
	
	
	static newInstance(locationId = -1) {
		return denormObj({
			[DaoUserLocationStatus.pId]: -1,
			[DaoUserLocationStatus.pLocationId]: locationId,
			[DaoUserLocationStatus.pFromTs]: seconds(),
			[DaoUserLocationStatus.pUntilTs]: seconds() + (Const.userLocationStatusDefaultStayHrs * 60 * 60),
		});
	}
	
	
	static gId(userStatus: TUserLocationStatus) {
		return _.get(userStatus, DaoUserLocationStatus.pId);
	}
	
	static gLocationId(userStatus: TUserLocationStatus) {
		return _.get(userStatus, DaoUserLocationStatus.pLocationId);
	}
	
	static gFromTs(userStatus: TUserLocationStatus) {
		return _.get(userStatus, DaoUserLocationStatus.pFromTs);
	}
	
	static gUntilTs(userStatus: TUserLocationStatus) {
		return _.get(userStatus, DaoUserLocationStatus.pUntilTs);
	}


// HelperAccessors **************************************************************************************
// HelperAccessors **************************************************************************************

	static getFormattedRange(userStatus: TUserLocationStatus) {
		const fromTs = DaoUserLocationStatus.gFromTs(userStatus);
		const toTs = DaoUserLocationStatus.gUntilTs(userStatus);
		return TimestampFormatter.parseFromTo(fromTs, toTs);
	}

	static isNew(userStatus: TUserLocationStatus) {
		return DaoUserLocationStatus.gId(userStatus) == -1;
	}


}