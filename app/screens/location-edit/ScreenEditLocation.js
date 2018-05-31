/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoLocation from '../../lib/daos/DaoLocation';
import EditLocation from './EditLocation';
import React from 'react';
import {CACHE_ID_USER_PROFILE} from '../../lib/redux-pool/cache/def/CacheDefUserProfile';
import {CACHE_MAP_ID_LOCATION_PROFILES} from '../../lib/redux-pool/cache-map/def/CacheMapDefLocationProfiles';
import {NullableObjects, Screen} from '../../comp/Misc';
import {poolConnect} from '../../redux/ReduxPool';
import type {TCacheMapPool} from '../../lib/redux-pool/cache-map/CacheMapPool';
import type {TCachePool} from '../../lib/redux-pool/cache/CachePool';
import type {TLocation} from '../../lib/daos/DaoLocation';
import type {TNavigator} from '../../lib/types/Types';

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: TNavigator,
	locationId: number
};

// _ScreenEditLocation **********************************************************************************
// _ScreenEditLocation **********************************************************************************

class _ScreenEditLocation extends React.Component<void, Props, void> {

	constructor(props, context) {
		super(props, context);
		this._renderEditLocation = this._renderEditLocation.bind(this);
	}

	componentWillMount() {
		const {navigator, locationId} = this.props;

		this._cacheUserProfile().initialize();

		this._cacheMapLocationProfiles().initializeItem(locationId)
			.then(location => navigator.setTitle({title: DaoLocation.gName(location)}));
	}

	_cacheMapLocationProfiles(): TCacheMapPool {
		return this.props[CACHE_MAP_ID_LOCATION_PROFILES];
	}

	_cacheUserProfile(): TCachePool {
		return this.props[CACHE_ID_USER_PROFILE];
	}

	_locationProfile(): ?TLocation {
		const {locationId} = this.props;
		return this._cacheMapLocationProfiles().get(locationId);
	}

	render() {
		return (
			<Screen>
				<NullableObjects
					objects={[this._locationProfile(), this._cacheUserProfile().data]}
					renderChild={this._renderEditLocation}/>
			</Screen>
		);
	}

	_renderEditLocation([locationProfile, authUserProfile]) {
		const {navigator} = this.props;
		return (
			<EditLocation
				navigator={navigator}
				locationProfile={locationProfile}
				authUserProfile={authUserProfile}/>
		);
	}

}

const ScreenEditLocation = poolConnect(_ScreenEditLocation,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[CACHE_MAP_ID_LOCATION_PROFILES, CACHE_ID_USER_PROFILE]
);
export default ScreenEditLocation;
