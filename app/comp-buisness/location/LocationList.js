/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoLocation from '../../lib/daos/DaoLocation';
import DaoUser from '../../lib/daos/DaoUser';
import React from 'react';
import SearchableFlatList from '../../comp/misc/listviews/SearchableFlatList';
import {CACHE_ID_USER_PROFILE, TCacheUserProfile} from '../../lib/redux-pool/cache/def/CacheDefUserProfile';
import {ListItemLocationFollow} from './LocationListItems';
import {poolConnect} from '../../redux/ReduxPool';
import {t} from '../../lib/i18n/Translations';
import type {TLocation} from '../../lib/daos/DaoLocation';


// Const ************************************************************************************************
// Const ************************************************************************************************

type Props = {
	locations: Array<TLocation>,
	showFollow: boolean,
	showUnfollow: boolean,
	onLocationPress: Function
};


// LocationList *****************************************************************************************
// LocationList *****************************************************************************************

class _LocationList extends React.PureComponent<void, Props, void> {

	constructor(props, context) {
		super(props, context);
		this._filterExtractor = this._filterExtractor.bind(this);
		this._renderItem = this._renderItem.bind(this);
	}

	componentWillMount() {
		this._cacheUserProfile().initialize();
	}

	_filterExtractor(location, regExp) {
		return regExp.test(DaoLocation.gName(location))
			|| regExp.test(DaoLocation.gEmail(location))
			|| regExp.test(DaoLocation.gPhone(location))
			|| regExp.test(DaoLocation.gCity(location))
			|| regExp.test(DaoLocation.gPostcode(location))
			|| regExp.test(DaoLocation.gAddress(location));
	}

	_cacheUserProfile(): TCacheUserProfile {
		return this.props[CACHE_ID_USER_PROFILE];
	}

	_getFavoriteIds() {
		return DaoUser.gLocationsFavoriteIds(this._cacheUserProfile().data);
	}


	render() {
		let {locations, ...searchableFlatListProps} = this.props;

		return (
			<SearchableFlatList
				{...searchableFlatListProps}

				data={locations}
				keyExtractor={DaoLocation.gIdStr}
				renderItem={this._renderItem}

				searchPlaceholder={t('t_search_location')}
				filterExtractor={this._filterExtractor}
			/>
		);
	}


	_renderItem({item}: { item: TLocation }) {
		const {showFollow, showUnfollow, onLocationPress} = this.props;

		const listItemProps = {
			location: item,
			onPress: onLocationPress
		};

		const followLocation = this._cacheUserProfile().followLocation;
		const unfollowLocation = this._cacheUserProfile().unfollowLocation;

		const lid = DaoLocation.gId(item);
		const favoriteIds = this._getFavoriteIds();
		const sFollow = showFollow && !favoriteIds.includes(lid);
		const sUnfollow = showUnfollow && favoriteIds.includes(lid);

		if (sFollow) {
			listItemProps.addLocationToFavorites = followLocation;

		} else if (sUnfollow) {
			listItemProps.removeLocationFromFavorites = unfollowLocation;
		}

		return <ListItemLocationFollow {...listItemProps}/>;
	}

}

const LocationList = poolConnect(_LocationList,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[CACHE_ID_USER_PROFILE]
);
export default LocationList;
