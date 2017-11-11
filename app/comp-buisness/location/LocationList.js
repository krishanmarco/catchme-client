/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';

import DaoLocation from '../../lib/daos/DaoLocation';

import SearchableFlatList from '../../comp/misc/listviews/SearchableFlatList';

import {ListItemLocation, ListItemLocationFollow} from './LocationListItems';




export default class LocationList extends React.PureComponent {

  constructor(props, context) {
    super(props, context);
    this._filterExtractor = this._filterExtractor.bind(this);
  }

  _filterExtractor(location, regExp) {
    return regExp.test(DaoLocation.gName(location))
        || regExp.test(DaoLocation.gEmail(location))
        || regExp.test(DaoLocation.gPhone(location))
        || regExp.test(DaoLocation.gCity(location))
        || regExp.test(DaoLocation.gPostcode(location))
        || regExp.test(DaoLocation.gAddress(location));

  }


  render() {
    let {locations, ...searchableFlatListProps} = this.props;

    return (
        <SearchableFlatList
            {...searchableFlatListProps}

            data={locations}
            keyExtractor={(item, index) => DaoLocation.gId(item)}
            renderItem={({item}) => this._renderItem(item)}

            searchPlaceholder='Search by name, email, phone or address'
            filterExtractor={this._filterExtractor}
        />
    );
  }



  _renderItem(location) {
    let {favoriteIds} = this.props;
    let listItemProps = {location: location, onPress: this.props.onItemPress};

    if (favoriteIds && !favoriteIds.includes(DaoLocation.gId(location)))
      return <ListItemLocationFollow {...listItemProps}/>;

    return <ListItemLocation {...listItemProps}/>;
  }


}


LocationList.defaultProps = {};

LocationList.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  favoriteIds: PropTypes.array,
  onItemPress: PropTypes.func
};

