/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import {denormObj, seconds} from "../HelperFunctions";
import {Const} from "../../Config";


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


  static createInitialStatus(locationId = -1) {
    return denormObj({
      [DaoUserLocationStatus.pId]: -1,
      [DaoUserLocationStatus.pLocationId]: locationId,
      [DaoUserLocationStatus.pFromTs]: seconds(),
      [DaoUserLocationStatus.pUntilTs]: seconds() + (Const.UserLocationStatus.defaultStayHrs * 60 * 60),
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

}