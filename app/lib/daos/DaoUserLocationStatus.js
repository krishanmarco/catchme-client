/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import {denormObj, seconds} from "../HelperFunctions";
import {Const} from "../../Config";


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


  static gId(userStatus) {
    return _.get(userStatus, DaoUserLocationStatus.pId);
  }

  static gLocationId(userStatus) {
    return _.get(userStatus, DaoUserLocationStatus.pLocationId);
  }

  static gFromTs(userStatus) {
    return _.get(userStatus, DaoUserLocationStatus.pFromTs);
  }

  static gUntilTs(userStatus) {
    return _.get(userStatus, DaoUserLocationStatus.pUntilTs);
  }

}