/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoLocation from "../../lib/daos/DaoLocation";
import EditLocation from './EditLocation';
import PropTypes from 'prop-types';
import React from 'react';
import {poolConnect} from '../../redux/ReduxPool';
import {NullableObjects, Screen} from '../../comp/Misc';
import type {TLocation} from "../../lib/daos/DaoLocation";
import type {TNavigator} from "../../lib/types/Types";
import {CACHE_ID_USER_PROFILE} from "../../lib/redux-pool/cache/CachePool";
import {CACHE_MAP_ID_LOCATION_PROFILES} from "../../lib/redux-pool/cache-map/def/CacheMapDefLocationProfiles";

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: TNavigator
};

type State = {
	location: TLocation
};

// PresentationalComponent ******************************************************************************
// PresentationalComponent ******************************************************************************

class ScreenNewLocationPresentational extends React.Component<any, Props, State> {

	constructor(props, context) {
		super(props, context);

		// Create a new location as pass it down as the location to edit
		// Note: This object will never change because the EditLocation
		// component will change the ReduxPool object rather than this one
		this.state = {location: DaoLocation.newInstance()};
	}

	componentWillMount() {
		this.props[CACHE_ID_USER_PROFILE].initialize();
	}

	_authenticatedUserProfile() {
		return this.props[CACHE_ID_USER_PROFILE].data;
	}

	render() {
		return (
			<Screen>
				<NullableObjects
					objects={[this._authenticatedUserProfile()]}
					renderChild={([authenticatedUserProfile]) => (
						<EditLocation
							navigator={this.props.navigator}
							locationProfile={this.state.location}
							authenticatedUserProfile={authenticatedUserProfile}/>
					)}/>
			</Screen>
		);
	}

}

// ContainerComponent ***********************************************************************************
// ContainerComponent ***********************************************************************************

const ScreenNewLocation = poolConnect(
	// Presentational Component
	ScreenNewLocationPresentational,

	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[CACHE_ID_USER_PROFILE]
);
export default ScreenNewLocation;
