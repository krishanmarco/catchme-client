/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';

import DaoLocation from '../../lib/daos/DaoLocation';
import DaoUser from '../../lib/daos/DaoUser';

import StaticSectionList from '../../comp/misc/listviews/StaticSectionList';
import {ListItemLocation, ListItemLocationFollow} from '../location/LocationListItems';
import type {TLocation} from "../../lib/daos/DaoLocation";


export default class UserLocationsSectionedList extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  _getUserProfile() { return this.props.userProfile; }


  _getSections() {
    return [
      {title: 'NOW', data: DaoUser.gLocationsNow(this._getUserProfile())},
      {title: 'LATER', data: DaoUser.gLocationsFuture(this._getUserProfile())},
      {title: 'TOP 5 PLACES', data: DaoUser.gLocationsTop(this._getUserProfile())}
    ].filter(section => section.data.length > 0);
  }


  render() {
    return (
        <StaticSectionList
            sections={this._getSections()}
            renderItem={({item}) => this._renderItem(item)}/>
    );
  }



  _renderItem(location: TLocation) {
    let {favoriteIds} = this.props;
    let listItemProps = {location: location, onPress: this.props.onItemPress};

    if (favoriteIds && !favoriteIds.includes(DaoLocation.gId(location)))
      return <ListItemLocationFollow {...listItemProps}/>;

    return <ListItemLocation {...listItemProps}/>;
  }


}

UserLocationsSectionedList.propTypes = {
  userProfile: PropTypes.object.isRequired,
  onItemPress: PropTypes.func
};