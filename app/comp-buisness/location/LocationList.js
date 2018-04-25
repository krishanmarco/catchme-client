/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoLocation from '../../lib/daos/DaoLocation';
import React from 'react';
import SearchableFlatList from '../../comp/misc/listviews/SearchableFlatList';
import {ListItemLocation, ListItemLocationFollow} from './LocationListItems';
import type {TLocation} from "../../lib/daos/DaoLocation";


// Const ************************************************************************************************
// Const ************************************************************************************************

type Props = {
	locations: Array<TLocation>,
	favoriteIds: Array<number>,
	onItemPress: Function
};


// LocationList *****************************************************************************************
// LocationList *****************************************************************************************

export default class LocationList extends React.PureComponent<void, Props, void> {

	constructor(props, context) {
		super(props, context);
		this._filterExtractor = this._filterExtractor.bind(this);
		this._renderItem = this._renderItem.bind(this);
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
				keyExtractor={DaoLocation.gIdStr}
				renderItem={this._renderItem}

				searchPlaceholder='Search by name, email, phone or address'
				filterExtractor={this._filterExtractor}
			/>
		);
	}


	_renderItem({item}: { item: TLocation }) { // todo move follow/unfollow to here like UserList
		let {favoriteIds, onItemPress} = this.props;

		const listItemProps = {location: item, onPress: onItemPress};

		if (favoriteIds && !favoriteIds.includes(DaoLocation.gId(item)))
			return <ListItemLocationFollow {...listItemProps}/>;

		return <ListItemLocation {...listItemProps}/>;
	}

}

