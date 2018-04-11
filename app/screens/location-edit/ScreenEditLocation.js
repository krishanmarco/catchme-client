/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoLocation from "../../lib/daos/DaoLocation";
import EditLocation from './EditLocation';
import React from 'react';
import {CACHE_ID_USER_PROFILE} from "../../lib/redux-pool/cache/def/CacheDefUserProfile";
import {CACHE_MAP_ID_LOCATION_PROFILES} from "../../lib/redux-pool/cache-map/def/CacheMapDefLocationProfiles";
import {NullableObjects, Screen} from '../../comp/Misc';
import {poolConnect} from '../../redux/ReduxPool';
import type {TNavigator} from "../../lib/types/Types";

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: TNavigator,
	locationId: number
};

// _ScreenEditLocation **********************************************************************************
// _ScreenEditLocation **********************************************************************************

class _ScreenEditLocation extends React.Component<void, Props, void> {

	componentWillMount() {
		this.props[CACHE_ID_USER_PROFILE].initialize();

		this.props[CACHE_MAP_ID_LOCATION_PROFILES].initializeItem(this.props.locationId)
			.then(location => this.props.navigator.setTitle({title: DaoLocation.gName(location)}));
	}

	_locationProfile() {
		return this.props[CACHE_MAP_ID_LOCATION_PROFILES].get(this.props.locationId);
	}

	_authenticatedUserProfile() {
		return this.props[CACHE_ID_USER_PROFILE].data;
	}

	render() {
		return (
			<Screen>
				<NullableObjects
					objects={[this._locationProfile(), this._authenticatedUserProfile()]}
					renderChild={([locationProfile, authenticatedUserProfile]) => (
						<EditLocation
							navigator={this.props.navigator}
							locationProfile={locationProfile}
							authenticatedUserProfile={authenticatedUserProfile}/>
					)}/>
			</Screen>
		);
	}

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const ScreenEditLocation = poolConnect(_ScreenEditLocation,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[CACHE_MAP_ID_LOCATION_PROFILES, CACHE_ID_USER_PROFILE]
);
export default ScreenEditLocation;
