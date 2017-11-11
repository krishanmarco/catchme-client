/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';

import {Icons, Colors, Const} from '../../Config';

import ApiClient from '../../lib/data/ApiClient';

import DaoLocation from '../../lib/daos/DaoLocation';

import ListItemWithAction from '../../comp/misc/ListItemsWithActions';



export class ListItemLocation extends React.Component {

  constructor(props, context) {
    super(props, context);
    this._defaultOnPress = this._defaultOnPress.bind(this);
  }

  _getLocation() { return this.props.location; }


  _defaultOnPress() {
    if (this.props.onPress) {
      this.props.onPress(this._getLocation());
      return;
    }


  }


  render() {
    return (
        <ListItemWithAction
            header={DaoLocation.gName(this._getLocation())}
            content={DaoLocation.gDescription(this._getLocation())}
            avatar={DaoLocation.gPictureUrl(this._getLocation())}
            onPress={this._defaultOnPress}
            actions={this.props.actions}
            image={this.props.image}/>
    );
  }

}

ListItemLocation.defaultProps = {};

ListItemLocation.propTypes = {
  location: PropTypes.object.isRequired
};




export const ListItemLocationFollow = ({location, onPress}) => (
    <ListItemLocation
        location={location}
        onPress={onPress}
        actions={[{
          nameType: Icons.locationFavorites,
          color: Colors.primary,
          onPress: () => ApiClient.userLocationsFavoritesAddLid(DaoLocation.gId(location))
        }]}/>
);
