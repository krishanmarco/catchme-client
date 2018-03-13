/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';

import {Colors, Const, Icons} from '../../Config';

import ApiClient from '../../lib/data/ApiClient';

import DaoLocation from '../../lib/daos/DaoLocation';

import {ListItemWithActions} from "../../comp/Misc";
import type {TLocation} from "../../lib/daos/DaoLocation";
import Router from "../../lib/helpers/Router";
import type {TUserLocationStatus} from "../../lib/daos/DaoUserLocationStatus";
import DaoUserLocationStatus from "../../lib/daos/DaoUserLocationStatus";
import type {TUser} from "../../lib/daos/DaoUser";
import type {TNavigator} from "../../lib/types/Types";



// ListItemLocation *************************************************************************************
// ListItemLocation *************************************************************************************

type ListItemLocationProps = {
  location: TLocation,
  onPress?: (TLocation) => {}
};

export class ListItemLocation extends React.Component<any, ListItemLocationProps, any> {

  constructor(props, context) {
    super(props, context);
    this._defaultOnPress = this._defaultOnPress.bind(this);
  }

  _getLocation(): TLocation {
    return this.props.location;
  }

  _defaultOnPress() {
    if (this.props.onPress)
      this.props.onPress(this._getLocation());
  }


  render() {
    return (
        <ListItemWithActions
            onPress={this._defaultOnPress}
            header={DaoLocation.gName(this._getLocation())}
            content={this.props.content || DaoLocation.gDescription(this._getLocation())}
            avatarUri={DaoLocation.gPictureUrl(this._getLocation())}
            image={this.props.image}
            actions={this.props.actions}/>
    );
  }

}

ListItemLocation.defaultProps = {};

ListItemLocation.propTypes = {
  location: PropTypes.object.isRequired
};




// ListItemLocationFollow *******************************************************************************
// ListItemLocationFollow *******************************************************************************

export const ListItemLocationFollow = ({location, onPress}: ListItemLocationProps) => (
    <ListItemLocation
        location={location}
        onPress={onPress}
        actions={[{
          icon: Icons.locationFollow,
          color: Colors.primary,
          onPress: () => ApiClient.userLocationsFavoritesAddLid(DaoLocation.gId(location))
        }]}/>
);




// ListItemUserLocationStatus ***************************************************************************
// ListItemUserLocationStatus ***************************************************************************

type ListItemUserLocationStatusProps = TLocation & {
  navigator: TNavigator,
  allowEdit: boolean,
  status: TUserLocationStatus
}

export class ListItemUserLocationStatus extends React.Component<any, ListItemUserLocationStatusProps, any> {

  constructor(props, context) {
    super(props, context);
    this._onPressLocationStatusDelete = this._onPressLocationStatusDelete.bind(this);
    this._onPressLocationStatusEdit = this._onPressLocationStatusEdit.bind(this);
  }

  _onPressLocationStatusDelete() {
    ApiClient.userStatusDel(DaoUserLocationStatus.gId(this._userLocationStatus()));
    // todo: then????
  }

  _onPressLocationStatusEdit() {
    Router.toModalUserLocationStatus(
        this.props.navigator,
        {
          navigator: this.props.navigator,
          locationId: DaoLocation.gId(this._location()),
          initialStatus: this._userLocationStatus(),
          onStatusConfirm: (userLocationStatus: TUserLocationStatus) => {
            // todo: update this ui???!
          }
        }
    );
  }

  _userLocationStatus(): TUserLocationStatus {
    return this.props.status;
  }

  _location(): TLocation {
    return this.props.location;
  }

  render() {
    const {location, onPress} = this.props;
    return (
        <ListItemLocation
            location={location}
            onPress={onPress}
            content={this._renderContent()}
            actions={[{
              icon: Icons.statusEdit,
              color: Colors.neutralOrange,
              onPress: this._onPressLocationStatusEdit
            }, {
              icon: Icons.statusDelete,
              color: Colors.alertRed,
              onPress: this._onPressLocationStatusDelete
            }]}/>
    );
  }

  _renderContent() {
    return "Tomorrow, 08:00 - 19:00";
  }

}

