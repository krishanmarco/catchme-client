/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import {Icons} from '../../Config';
import ManagerWeekTimings from '../helpers/ManagerWeekTimings';
import Router from "../helpers/Router";
import type {TDataPoint, TSectionListDataPointSections} from '../Types';
import type {TLocation} from "../daos/DaoLocation";
import DaoLocation from "../daos/DaoLocation";


export default class LocationProfileDataPoints {

  static handleOnItemPress(pressedItemId: string, locationProfile: TLocation, navigator) {
    switch (pressedItemId) {
      case LocationProfileDataPoints.infoItemIdPhone:
      case LocationProfileDataPoints.infoItemIdEmail:
      case LocationProfileDataPoints.infoItemIdAddress:
        break;
      case LocationProfileDataPoints.infoItemIdTimings:
        const managerWeekTimings = ManagerWeekTimings.buildFromLocation(locationProfile);
        Router.toTimingModal(navigator, DaoLocation.gName(locationProfile), {managerWeekTimings});
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
      locationInfoSections.push({title: 'CATCH INFO', data: locationDataSectionData});

    return locationInfoSections;
  }


  _buildLocationDataSectionData(): Array<TDataPoint> {
    let locationInfo = [];

    if (DaoLocation.hasPhone(locationProfile))
      locationInfo.push(this._infoItemLocationPhone(locationProfile));

    if (DaoLocation.hasEmail(locationProfile))
      locationInfo.push(this._infoItemLocationEmail());

    if (DaoLocation.hasTimings(locationProfile))
      locationInfo.push(this._infoItemLocationTimings());

    if (DaoLocation.hasAddressObj(locationProfile))
      locationInfo.push(this._infoItemLocationAddress());

    return locationInfo;
  }


  _infoItemLocationPhone(): TDataPoint {
    return {
      id: LocationProfileDataPoints.infoItemIdPhone,
      title: DaoLocation.gPhone(locationProfile),
      icon: Icons.phone
    };
  }

  _infoItemLocationEmail(): TDataPoint {
    return {
      id: LocationProfileDataPoints.infoItemIdEmail,
      title: DaoLocation.gEmail(locationProfile),
      icon: Icons.email
    };
  }

  _infoItemLocationTimings(): TDataPoint {
    let managerWeekTimings = ManagerWeekTimings.buildFromLocation(locationProfile);

    return {
      id: LocationProfileDataPoints.infoItemIdTimings,
      title: managerWeekTimings.toStringRangeStatusAndCurrentDay(),
      icon: Icons.locationOpenTimes
    };
  }

  _infoItemLocationAddress(): TDataPoint {
    return {
      id: LocationProfileDataPoints.infoItemIdAddress,
      title: DaoLocation.gAddress(locationProfile),
      icon: Icons.address
    };
  }

}


