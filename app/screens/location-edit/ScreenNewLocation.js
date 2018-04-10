/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import DaoLocation from "../../lib/daos/DaoLocation";
import EditLocation from './EditLocation';
import React from 'react';
import {CACHE_ID_USER_PROFILE} from "../../lib/redux-pool/cache/def/CacheDefUserProfile";
import {NullableObjects, Screen} from '../../comp/Misc';
import {poolConnect} from '../../redux/ReduxPool';
import type {TLocation} from "../../lib/daos/DaoLocation";
import type {TNavigator} from "../../lib/types/Types";

// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
	navigator: TNavigator
};

type State = {
	location: TLocation
};

// _ScreenNewLocation ***********************************************************************************
// _ScreenNewLocation ***********************************************************************************

class _ScreenNewLocation extends React.Component<any, Props, State> {

	constructor(props, context) {
		super(props, context);

		// Create a new location as pass it down as the location to edit
		// Note: This object will never change because EditLocation component
		// will change the ReduxPool object rather than this one
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

const ScreenNewLocation = poolConnect(_ScreenNewLocation,
	// mapStateToProps
	(state) => ({}),

	// mapDispatchToProps
	(dispatch) => ({}),

	// Array of pools to subscribe to
	[CACHE_ID_USER_PROFILE]
);
export default ScreenNewLocation;
