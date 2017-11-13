/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';

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
  static pGooglePlaceId = `googlePlaceId`;
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


  static shallowCopy(location) {
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
    _.set(newLocation, DaoLocation.pAddress, DaoLocation.gAddress(location));
    _.set(newLocation, DaoLocation.pPeople, DaoLocation.gPeople(location));
    _.set(newLocation, DaoLocation.pConnections, DaoLocation.gConnections(location));
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
  

  static gId(location) {
    return _.get(location, DaoLocation.pId);
  }

  static gName(location) {
    return _.get(location, DaoLocation.pName);
  }

  static gDescription(location) {
    return _.get(location, DaoLocation.pDescription);
  }

  static gCapacity(location) {
    return _.get(location, DaoLocation.pCapacity);
  }

  static gPictureUrl(location) {
    return _.get(location, DaoLocation.pPictureUrl);
  }

  static gTimings(location) {
    return _.get(location, DaoLocation.pTimings);
  }

  static gPhone(location) {
    return _.get(location, DaoLocation.pPhone);
  }

  static gEmail(location) {
    return _.get(location, DaoLocation.pEmail);
  }

  static gGooglePlaceId(location) {
    return _.get(location, DaoLocation.pGooglePlaceId);
  }

  static gAddressObj(location) {
    return _.get(location, DaoLocation.pAddress);
  }

  static gCountry(location) {
    return _.get(location, DaoLocation.pAddressCountry);
  }

  static gState(location) {
    return _.get(location, DaoLocation.pAddressState);
  }

  static gCity(location) {
    return _.get(location, DaoLocation.pAddressCity);
  }

  static gPostcode(location) {
    return _.get(location, DaoLocation.pAddressPostcode);
  }

  static gAddress(location) {
    return _.get(location, DaoLocation.pAddressAddress);
  }

  static gLatLng(location) {
    return _.get(location, DaoLocation.pAddressLatLng);
  }

  static gImageUrls(location) {
    return _.get(location, DaoLocation.pImageUrls, []);
  }

  static gPeople(location) {
    return _.get(location, DaoLocation.pPeople);
  }

  static gMen(location) {
    return _.get(location, DaoLocation.pPeopleMen, 0);
  }

  static gWomen(location) {
    return _.get(location, DaoLocation.pPeopleWomen, 0);
  }

  static gTotal(location) {
    return _.get(location, DaoLocation.pPeopleTotal, 0);
  }



  static gConnections(location) {
    return _.get(location, DaoLocation.pConnections);
  }

  static gFriendsNow(location) {
    return _.get(location, DaoLocation.pConnectionsNow, []);
  }

  static gFriendsFuture(location) {
    return _.get(location, DaoLocation.pConnectionsFuture, []);
  }



  static hasTimings(location) {
    return DaoLocation.pTimings in location;
  }

  static hasPhone(location) {
    return DaoLocation.pPhone in location;
  }

  static hasEmail(location) {
    return DaoLocation.pEmail in location;
  }

  static hasConnections(location) {
    return DaoLocation.pConnections in location;
  }

  static hasAddressObj(location) {
    return DaoLocation.pAddress in location;
  }

  static hasPeople(location) {
    return DaoLocation.pPeople in location;
  }


}